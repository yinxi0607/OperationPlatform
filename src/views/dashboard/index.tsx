import styles from './index.module.less'
export default function Dashboard(){
  return(
    <div className={styles.welcome}>
      <div className={styles.content}>
        <div className={styles.subTitle}>Operation Platform</div>
        {/*<div className={styles.title}>React18</div>*/}
        <div className={styles.desc}>Devops</div>
      </div>
      <div className={styles.img}></div>
    </div>
  )
}
