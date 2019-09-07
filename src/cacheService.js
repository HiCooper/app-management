import { ListProjectOptionApi } from './api/project';

class CacheService {
  /**
   * 获取项目选项列表，对项目进行更改操作需要清除缓存
   * @returns {Promise<*>}
   */
  static async getProjectOption() {
    let projectOption;
    const tempData = sessionStorage.getItem('projectOption');
    if (tempData) {
      projectOption = JSON.parse(tempData);
    } else {
      await ListProjectOptionApi().then((res) => {
        if (res.code === '200') {
          projectOption = res.data;
          sessionStorage.setItem('projectOption', JSON.stringify(projectOption));
        }
      });
    }
    return projectOption;
  }

  /**
   * 清除项目选项列表缓存
   */
  static cleanProjectOption() {
    sessionStorage.removeItem('projectOption');
  }
}

export default CacheService;
