import {MenuFoldOutlined } from '@ant-design/icons';
import {Breadcrumb, Dropdown, MenuProps} from "antd";
import styles from './index.module.less'
import store from '@/store'
const NavHeader: React.FC = () => {
  const breadcrumbItems = [
    {
      title: '首页'
    },
    {
      title: 'Dashboard'
    }
  ]
  const items:MenuProps['items'] =[
    {
      key: 'email',
      label: '邮箱: '+store.userInfo.userEmail,
    },
    {
      key: 'logout',
      label: '退出',
    }
  ]

  const onClick: MenuProps['onClick'] = ({key}) => {
    if(key === 'logout'){
      store.userInfo = {
        userName: '',
        userEmail: ''
      }
      location.href = '/login?callback='+encodeURIComponent(location.href)
    }
  }

  return (
    <div className={styles.navHeader}>
      <div className={styles.left}>
       <MenuFoldOutlined />
        <Breadcrumb items={breadcrumbItems} style={{marginLeft: 10}} />
      </div>
      <div className="right">
        <Dropdown menu={{items,onClick}} trigger={['click']}>
          <span className={styles.nickName}>{store.userInfo.userName}</span>
        </Dropdown>
      </div>
    </div>
  );
}

export default NavHeader;
