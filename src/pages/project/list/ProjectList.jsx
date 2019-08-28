import React, { Component } from 'react';
import { Button, Card, Icon, List, Typography } from 'antd';
import './style.less';
import PageHeaderWrapper from '../../../components/PageHeaderWrapper';
import { fakeList } from './_mock';

const { Paragraph } = Typography;
export default class ProjectList extends Component {
  static displayName = 'ProjectList';

  constructor(props) {
    super(props);
    this.state = {
      listCardList: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.initListData();
  }

  initListData = () => {
    this.setState({
      listCardList: fakeList(21),
    });
  };

  render() {
    const { listCardList, loading } = this.state;
    const nullData = {};
    return (
      <PageHeaderWrapper>
        <div className="cardList">
          <List
            rowKey="id"
            loading={loading}
            grid={{
              gutter: 24,
              lg: 3,
              md: 2,
              sm: 1,
              xs: 1,
            }}
            dataSource={[nullData, ...listCardList]}
            renderItem={(item) => {
              if (item && item.id) {
                return (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      className="card"
                      actions={[<a key="option1">查看</a>, <a key="option2">编辑</a>]}
                    >
                      <Card.Meta
                        avatar={<img alt="" className="cardAvatar" src={item.avatar} />}
                        title={<a>{item.title}</a>}
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
                  <Button type="dashed" className="newButton">
                    <Icon type="plus" />
                    新增产品
                  </Button>
                </List.Item>
              );
            }}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}
