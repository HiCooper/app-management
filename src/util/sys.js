const rs = require('../routerConfig');

/**
 * 递归后去路由名字 数组返回
 * @param paths
 * @param configList
 * @returns {[]}
 */
function recursiveGetName(paths, configList) {
  let nodes = [];
  if (paths.length > 0) {
    const path = paths[0];
    const find = configList.find(item => item.path === `/${path}`);
    if (find) {
      nodes.push(find.name);
      if (find.children && find.children.length > 0) {
        nodes = nodes.concat(recursiveGetName(paths.slice(1), find.children));
      }
    }
  }
  return nodes;
}

/**
 * 根据路径获取名字列表
 * @param pathname
 * @returns {[]}
 */
export function getBreadNamesByPathname(pathname) {
  let result = [];
  const paths = pathname && pathname !== '/' ? pathname.split('/').slice(1) : result;
  if (paths.length > 0) {
    result = result.concat(recursiveGetName(paths, rs.routerConfig));
  }
  return result;
}
