
import styles from "./Article.module.css";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ArticleSkeleton = ({data}) => {

    return (
        <div className={styles.articleDiv}>
         <Skeleton type="article" />
        </div>
    )
}

export default ArticleSkeleton;