import React, {useState, useEffect} from "react";
import styles from "./ArticleList.module.css";
import Article from "../literacy/Article";
import customAxios from "../../lib/customAxios";
import Pagination from '@mui/material/Pagination';
import BottomNavBar from '../../components/bottomNavBar/bottomNavBar';


const ArticleList = () => {

    const [articleList, setArticleList] = useState([]);
    const [isLoading, setIsLoading] = useState([true]);
    const [category, setCategory] = useState("POLITICS");
    const [pageNum, setPageNum] = useState(0);


    useEffect(() => {
        const loadArticle = async () => {
            return await customAxios
              .get(`/article/list/${category}/${pageNum}`)
              .then((response) => {
                setArticleList(response.data.data.content);
              });
          };
      
          const fetchData = async () => {
            await loadArticle();
            setIsLoading(false);
          };
      
          fetchData();
          
    },[category, pageNum])

    const handlePageChange = (e) => {
        const nowPageInt = parseInt(e.target.outerText);
        setPageNum(nowPageInt-1);
      };

      const onclickCategory = (category) => {
        setCategory(category);
      }

    
    if (isLoading) return <p>로딩중...</p>
    
    return (
        <div>
            <div className={styles.menuBtn}>
                <button className={styles.menu} onClick={() => onclickCategory("ECONOMICS")}>경제</button>
                <button className={styles.menu} onClick={() => onclickCategory("POLITICS")}>정치</button>
                <button className={styles.menu} onClick={() => onclickCategory("SOCIAL")}>사회</button>
                <button className={styles.menu} onClick={() => onclickCategory("CULTURE")}>문화</button>
                <button className={styles.menu} onClick={() => onclickCategory("WORLD")}>세계</button>
                <button className={styles.menu} onClick={() => onclickCategory("IT")}>IT</button>
                <button className={styles.menu} onClick={() => onclickCategory("IT")}>IT</button>
                <button className={styles.menu} onClick={() => onclickCategory("ENTERTAINMENT")}>연예</button>
                <button className={styles.menu} onClick={() => onclickCategory("SPORT")}>스포츠</button>
            </div>
            <div className={styles.articleList}>
                {articleList.length !== 0  && articleList.map((article) => (
                    <Article data = {article}/>
                ))}
            </div>
        <Pagination className={styles.page} count={3} shape="rounded" onChange={(e) => handlePageChange(e)}/>
        <BottomNavBar user="1"></BottomNavBar>
        </div>
    )
}

export default ArticleList;