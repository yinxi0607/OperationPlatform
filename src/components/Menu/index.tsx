import {Menu} from 'antd';
import styles from './index.module.less';
import {DesktopOutlined,SettingOutlined,TeamOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";
const SideMenu = () => {
  const navigate = useNavigate()
  const items = [
    {
      label: '工作台',
      key: '1',
      icon: <DesktopOutlined />,
    },
    {
      label: '系统管理',
      key: '2',
      icon: <SettingOutlined />,
      children: [
        {
          label: '用户管理',
          key: '3',
          icon: <TeamOutlined />,
        }
      ]
    }
  ]

  const handleClickLogo = () => {
    navigate('/dashboard')
  }
  return (
    <div>
      <div className={styles.logo} onClick={handleClickLogo}>
        <img src='https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg' alt='logo' className={styles.img}/>
        <span>尹曦客运</span>
      </div>
      <Menu
        items={items}
        mode="inline"
        theme="dark"
        defaultSelectedKeys={['1']}
      />
    </div>
  )
}

export default SideMenu
