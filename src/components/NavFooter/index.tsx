import styles from './index.module.less'
const NavFooter = () => {
  return (
    <div className={styles.footer}>
      <div>
        <a href='https://github.com/yinxi0607' target='_blank' rel='noreferrer'>
          Yinxi Github
        </a>
      </div>
      <div>Copyright 2023 Yinxi All Rights Reserved.</div>
    </div>
  )
}

export default NavFooter
