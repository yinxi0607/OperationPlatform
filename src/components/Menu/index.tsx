import {Menu, MenuProps} from 'antd';
import styles from './index.module.less';
import {MailOutlined,AppstoreOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";
import React, {useState} from "react";
import devopslogo from '/images/devopslogo.png'

type MenuItem = Required<MenuProps>["items"][number] & {
  path?: string;
  children?: MenuItem[];
};

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,

    type?: 'group',
    path?: string,
    children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,

    label,
    type,
    path,
    children,
  } as MenuItem;
}

function findItemByKey(key: string, items: MenuItem[]): MenuItem | undefined {
  for (const item of items) {
    if (item.key === key) {
      return item;
    }
    if (item.children) {
      const foundItem = findItemByKey(key, item.children);
      if (foundItem) {
        return foundItem;
      }
    }
  }
  return undefined;
}

const items: MenuItem[] = [
  getItem("Dashboard", "1", <MailOutlined />,  undefined, "/dashboard"),
  getItem("K8S", "2", <AppstoreOutlined />, undefined,undefined,[
    getItem("Namespaces", "3", null, undefined,undefined,[
      getItem("List", "3-1", null, undefined, "/namespaces/list"),
    ]),
    getItem("Deployments", "4", null, undefined,undefined,[
      getItem("List", "4-1", null, undefined, "/deployments/list"),
      getItem("Create", "4-2", null, undefined, "/deployments/create"),
    ]),
    getItem("Pods", "5", null, undefined,undefined,[
      getItem("List", "5-1", null, undefined, "/pods/list"),
    ]),
    getItem("Configmaps", "6", null,undefined,undefined, [
      getItem("List", "6-1", null,  undefined, "/configmaps/list"),
      getItem("Create", "6-2", null, undefined, "/configmaps/create"),
    ]),
  ]),
];

const SideMenu = () => {
  const navigate = useNavigate()
  const [current, setCurrent] = useState('1');

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);

    // 获取点击的 MenuItem 的 path
    const item = findItemByKey(e.key, items);

    if (item && item.path) {
      navigate(item.path);
    }
  };
  const handleClickLogo = () => {
    navigate('/dashboard')
  }
  return (
    <div>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img src={devopslogo} alt='logo' className={styles.img}/>
        <span>Devops</span>
      </div>
      <Menu
          theme='dark'
          onClick={onClick}
          defaultOpenKeys={['sub1']}
          selectedKeys={[current]}
          mode="inline"
          items={items}
      />
    </div>
  )
}

export default SideMenu
