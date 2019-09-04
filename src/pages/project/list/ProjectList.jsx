import React, { Component } from 'react';
import {Avatar, Button, Card, Form, Icon, List, Typography} from 'antd';
import './style.less';
import { Link } from 'react-router-dom';
import PageHeaderWrapper from '../../../components/PageHeaderWrapper';
import { ListProjectApi } from '../../../api/project';

import AddProjectModel from './AddProjectModel';

const FormItem = Form.Item;
const { Paragraph } = Typography;
export default class ProjectList extends Component {
  static displayName = 'ProjectList';

  constructor(props) {
    super(props);
    this.state = {
      projectList: [],
      loading: false,
      total: 0,
      pageNum: 1,
      pageSize: 10,
      addProjectModelVisible: false,
    };
  }

  componentDidMount() {
    this.initListData();
  }

  initListData = () => {
    const params = {
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
      keyword: '',
    };
    let { projectList } = this.state;
    ListProjectApi(params).then((res) => {
      if (res.code === '200') {
        projectList = projectList.concat(res.data.records);
        this.setState({
          projectList,
          total: res.data.total,
          loading: false,
        });
      }
    }).catch((err) => {
      console.error(err);
    });
  };

  onLoadMore = async () => {
    const { pageNum, total } = this.state;
    if (pageNum < total) {
      await this.setState({
        loading: true,
        pageNum: pageNum + 1,
      });
      this.initListData();
    }
  };

  createProjectSuccess = () => {
    this.closeCreateProjectModel();
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

  render() {
    const { projectList, loading, addProjectModelVisible } = this.state;
    const loadMore = !loading ? (
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


    return (
      <PageHeaderWrapper>
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
                return (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      className="card"
                      actions={[<Link to="/" key="option1">查看</Link>, <Link to="/" key="option2">编辑</Link>]}
                    >
                      <Card.Meta
                        avatar={<Avatar className="cardAvatar" size="large">{item.name.substr(0,1)}</Avatar>}
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
                    <Icon type="plus" />
                    新增产品
                  </Button>
                </List.Item>
              );
            }}
          />
          <AddProjectModel onClose={this.closeCreateProjectModel} onSubmitSuccess={this.createProjectSuccess} visible={addProjectModelVisible} />
        </div>
      </PageHeaderWrapper>
    );
  }
}
