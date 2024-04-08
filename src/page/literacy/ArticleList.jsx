import React, {useState, useEffect} from "react";
import styles from "./ArticleList.module.css";
import Article from "../literacy/Article";
import axios from "axios";

const api = process.env.REACT_APP_API_URL;

const ArticleList = () => {

    const [articleList, setArticleList] = useState([]);
    const [isLoading, setIsLoading] = useState([true]);
    const [category, setCategory] = useState("economics")

    useEffect(() => {
        const loadArticle = async () => {
            return await axios
              .get(api + `/api/article/list`)
              .then((response) => {
                setArticleList(response.data);
              });
          };
      
          const fetchData = async () => {
            console.log("here")
            await loadArticle();
            console.log(articleList)
            setIsLoading(false);
          };
      
          fetchData();
          
    },[])

    
    if (isLoading) return <p>로딩중...</p>
    
    return (
        <div>
            <div className={styles.menuBtn}>
                <btn className={styles.menu}>경제</btn>
                <btn className={styles.menu}>정치</btn>
                <btn className={styles.menu}>사회</btn>
            </div>
            <div className={styles.articleList}>
                {articleList.map((article) => (
                    <Article data = {article}/>
                ))}
            </div>
        </div>
    )
}

export default ArticleList;