import fs from "fs";
import path from "path";
import type { ResolvePluginInstance, Resolver } from "webpack";

export interface Options {
  /** deps needs hoist peers */
  deps: string[];
}

export class HoistPeersWebpackResolvePlugin implements ResolvePluginInstance {
  name = 'HoistPeersWebpackResolvePlugin';

  constructor(private options: Options) {}

  apply(resolver: Resolver) {
    const { options: { symlinks, modules, roots } } = resolver;
    const { deps = [] } = this.options;
    const projectRoot = Array.from(roots)[0];
    const nodeModulesBasePath = modules.find(module => typeof module === 'string' && path.isAbsolute(module) && module.endsWith('node_modules')) as string | null;
    if (!nodeModulesBasePath || !nodeModulesBasePath.startsWith(projectRoot)) throw new Error(`valid node_modules not found !`);

    const ignoreList = deps.map(depName => {
      const expectPkgJsonPath = path.join(nodeModulesBasePath, `${depName}/package.json`);
      const expectPkgDir = path.dirname(expectPkgJsonPath);
      const realPkgDir = path.dirname(require.resolve(expectPkgJsonPath));
      const isSymlink = symlinks && expectPkgDir !== realPkgDir;

      return {
        depName,
        isSymlink,
        expectPkgDir,
        realPkgDir,
        peers: Object
          .keys(require(expectPkgJsonPath)?.peerDependencies || {})
          .map(peerName => path.join(isSymlink ? realPkgDir : expectPkgDir, `node_modules/${peerName}`))
      } as const
    });
    resolver.getHook('existingFile').tapAsync(this.name, function(request, _resolveContext, callback) {
      try {
        const matchedDep = ignoreList.find(item => item.peers.some(peer => request.path && request.path.startsWith(peer)));
        if (matchedDep) {
          const { isSymlink, expectPkgDir, realPkgDir } = matchedDep;
          const rawRequestPath = request.path as string;
          request.path = rawRequestPath.replace(path.join(isSymlink ? realPkgDir : expectPkgDir, 'node_modules'), nodeModulesBasePath);
        }
        callback();
      } catch (err) {
        callback(err as Error, request);
      }
    });
  }
}

export default HoistPeersWebpackResolvePlugin;
