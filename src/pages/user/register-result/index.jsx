import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import styles from './style.less';

const actions = (
  <div className={styles.actions}>
    <Button size="large" type="primary" style={{ marginRight: '8px' }}>
      检查邮箱
    </Button>
    <Link to="/">
      <Button size="large">
        返回首页
      </Button>
    </Link>
  </div>
);

const RegisterResult = () => (
  <DocumentTitle title="注册成功-应用运行监控系统">
    <Result
      className={styles.registerResult}
      status="success"
      title={(
        <div className={styles.title}>
          <span>注册成功!</span>
        </div>
      )}
      subTitle="激活邮箱"
      extra={actions}
    />
  </DocumentTitle>
);

export default RegisterResult;
