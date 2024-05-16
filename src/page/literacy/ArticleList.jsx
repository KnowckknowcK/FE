import React, {useState, useEffect} from "react";
import styles from "./ArticleList.module.css";
import Article from "../literacy/Article";
import customAxios from "../../lib/customAxios";
import {Pagination} from '@mui/material';
import BottomNavBar from '../../components/bottomNavBar/bottomNavBar';


const ArticleList = () => {

    const [articleList, setArticleList] = useState([]);
    const [articleCnt, setArticleCnt] = useState(0);
    const [isLoading, setIsLoading] = useState([true]);
    const [category, setCategory] = useState("ECONOMICS");
    const [pageNum, setPageNum] = useState(1);


    useEffect(() => {
        setPageNum(1);
        const loadArticle = async () => {
            return await customAxios
              .get(`/article/list/${category}/${pageNum}`)
              .then((response) => {
                setArticleList(response.data.data.content);
                setArticleCnt(response.data.data.totalElements);
              });
          };
      
          const fetchData = async () => {
            await loadArticle();
            setIsLoading(false);
          };
      
          fetchData();
          
    },[category, pageNum])

    const handlePageChange = (event, page) => {
        setPageNum(page);
        console.log(page);
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
                <button className={styles.menu} onClick={() => onclickCategory("ENTERTAINMENT")}>연예</button>
                <button className={styles.menu} onClick={() => onclickCategory("SPORT")}>스포츠</button>
            </div>
            <div className={styles.articleList}>
                {articleList.length !== 0  && articleList.map((article) => (
                    <Article data = {article}/>
                ))}
            <Pagination count={10} page={pageNum} setPage={setPageNum} variant="outlined" style={{marginBottom:"40px"}} onChange={handlePageChange}/>
            </div>
        <BottomNavBar/>
        </div>
    )
}

export default ArticleList;