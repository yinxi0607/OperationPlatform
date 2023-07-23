import React, {useEffect} from 'react';
import {Layout, theme, Watermark} from 'antd';
import NavHeader from "@/components/NavHeader";
import NavFooter from "@/components/NavFooter";
import SideMenu from "@/components/Menu";
import {Outlet} from "react-router-dom";
import styles from './index.module.less'
import api from "@/api";
import store from "@/store";

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    void getUserInfo();
  },[])

  const getUserInfo = async () => {
    const data = await api.getUserInfo()
    store.updateUserInfo(data)
    console.log('data',data.userName)
  }

  return (
    <Watermark content="Yinxi">
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <SideMenu/>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <NavHeader/>
        </Header>
        <Content className={styles.content}>
          <div className={styles.wrapper}>
            <Outlet/>
          </div>

        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <NavFooter/>
        </Footer>
      </Layout>
    </Layout>
    </Watermark>
  );

};

export default App;
