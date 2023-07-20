import styles from './index.module.less'
export default function Index(){
  return(
    <div className={styles.welcome}>
      <div className={styles.content}>
        <div className={styles.subTitle}>欢迎体验</div>
        <div className={styles.title}>React18</div>
        <div className={styles.desc}>React18 Ant5.0 Vite</div>
      </div>
      <div className={styles.img}></div>
    </div>
  )
}
