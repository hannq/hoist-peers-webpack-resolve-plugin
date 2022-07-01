import type { ResolvePluginInstance, Resolver } from "webpack";

export interface Options {
  /** deps needs hoist peers */
  deps: string[];
}

export class HoistPeersWebpackResolvePlugin implements ResolvePluginInstance {
  name = 'HoistPeersWebpackResolvePlugin';

  constructor(private options: Options) {}

  apply(resolver: Resolver) {
    const { deps = [] } = this.options;
    const ignoreList = deps.map(depName => [
      depName,
      Object
        .keys(require(`${depName}/package.json`)?.peerDependencies || {})
        .map(peerName => `node_modules/${depName}/node_modules/${peerName}`)
    ] as const);
    resolver.getHook('existingFile').tapAsync(this.name, function(request, resolveContext, callback) {
      try {
        const matchedDep = ignoreList.find(([, peers]) => peers.some(peer => request.path && request.path.includes(peer)));
        if (matchedDep) {
          request.path = (request.path as string).replace(`/${matchedDep[0]}/node_modules`, '');
        }
        callback();
      } catch (err) {
        callback(err as Error, request);
      }
    });
  }
}

export default HoistPeersWebpackResolvePlugin;
