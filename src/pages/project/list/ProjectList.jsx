import React, {Component} from 'react';
import {Avatar, Button, Card, Icon, List, Typography} from 'antd';
import './style.less';
import {Link} from 'react-router-dom';
import Search from 'antd/es/input/Search';
import PageHeaderWrapper from '../../../components/PageHeaderWrapper';
import {ListProjectApi} from '../../../api/project';

import AddProjectModel from './AddProjectModel';
import {getColorByWord} from '../../../util/sys';

const {Paragraph} = Typography;
export default class ProjectList extends Component {
  static displayName = 'ProjectList';

  constructor(props) {
    super(props);
    this.state = {
      projectList: [],
      loading: false,
      total: 0,
      pageNum: 1,
      pageSize: 8,
      addProjectModelVisible: false,
    };
  }

  componentDidMount() {
    this.initListData();
  }

  initListData = async () => {
    const data = await this.getPageData();
    this.setState({
      projectList: data,
    });
  };

  getPageData = async () => {
    let result = [];
    const params = {
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
      keyword: this.state.keyword,
    };
    await ListProjectApi(params).then((res) => {
      if (res.code === '200') {
        this.setState({
          total: res.data.total,
        });
        result = res.data.records;
      }
    });
    return result;
  };

  onLoadMore = async () => {
    const {pageNum, total} = this.state;
    if (pageNum < total && total > 1) {
      await this.setState({
        loading: true,
        pageNum: pageNum + 1,
      });
      const {projectList} = this.state;
      const data = await this.getPageData();
      this.setState({
        projectList: projectList.concat(data),
        loading: false,
      });
    }
  };

  createProjectSuccess = async () => {
    this.closeCreateProjectModel();
    await this.setState({
      pageNum: 1,
    });
    this.initListData();
  };

  closeCreateProjectModel = () => {
    this.setState({
      addProjectModelVisible: false,
    });
  };

  openCreateProjectModel = () => {
    this.setState({
      addProjectModelVisible: true,
    });
  };

  goSearchProject = async (value) => {
    await this.setState({
      keyword: value.trim(),
      pageNum: 1,
    });
    this.initListData();
  };

  render() {
    const {projectList, total, loading, addProjectModelVisible} = this.state;
    const loadMore = projectList.length < total && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={this.onLoadMore}>loading more</Button>
      </div>
    ) : null;

    const headerSearch = (
      <div style={{textAlign: 'center'}}>
        <Search
          placeholder="请输入项目名称"
          enterButton="搜索"
          size="large"
          style={{width: 400}}
          onSearch={value => this.goSearchProject(value)}
        />
      </div>
    );

    return (
      <PageHeaderWrapper content={headerSearch}>
        <div className="cardList">
          <List
            rowKey="id"
            loading={loading}
            loadMore={loadMore}
            grid={{
              gutter: 24,
              lg: 3,
              md: 2,
              sm: 1,
              xs: 1,
            }}
            dataSource={[{}, ...projectList]}
            renderItem={(item) => {
              if (item && item.id) {
                const firstWord = item.name.substr(0, 1);
                return (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      className="card"
                      actions={[<Link to="/" key="option1">查看</Link>, <Link to="/" key="option2">编辑</Link>]}
                    >
                      <Card.Meta
                        avatar={(
                          <Avatar
                            className="cardAvatar"
                            style={{background: getColorByWord(firstWord)}}
                            size="large"
                          >
                            {firstWord}
                          </Avatar>
                        )}
                        title={item.name}
                        description={(
                          <Paragraph
                            className="item"
                            ellipsis={{
                              rows: 3,
                            }}
                          >
                            {item.description}
                          </Paragraph>
                        )}
                      />
                    </Card>
                  </List.Item>
                );
              }
              return (
                <List.Item>
                  <Button type="dashed" className="newButton" onClick={this.openCreateProjectModel}>
                    <Icon type="plus"/>
                    新增产品
                  </Button>
                </List.Item>
              );
            }}
          />
          <AddProjectModel onClose={this.closeCreateProjectModel}
                           onSubmitSuccess={this.createProjectSuccess}
                           visible={addProjectModelVisible}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}
