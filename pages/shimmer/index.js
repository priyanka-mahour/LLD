import styles from '../../styles/Home.module.scss';

const Shimmer = () => {
    return Array(10).fill(0).map((n, i) => <div className={styles.card} key={i}>
        <div className={`${styles.shimmerBG} ${styles.media}`}></div>
    </div>)
}

export default Shimmer
