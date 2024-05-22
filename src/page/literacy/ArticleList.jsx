import {useState, useEffect} from "react";
import styles from "./ArticleList.module.css";
import Article from "../literacy/Article";
import customAxios from "../../lib/customAxios";
import {Pagination} from '@mui/material';
import BottomNavBar from '../../components/bottomNavBar/bottomNavBar';


const ArticleList = () => {

    const [articleList, setArticleList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [category, setCategory] = useState("ECONOMICS");
    const [pageNum, setPageNum] = useState(1);

    const getButtonStyle = (selectedCategory) => {
        return {
          backgroundColor: category === selectedCategory ? 'var(--color-green)' : 'var(--color-white)',
          color: category === selectedCategory ? 'var(--color-white)' : 'var(--color-green)',
        };
      };


    useEffect(() => {
        setPageNum(1);
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

    const handlePageChange = (event, page) => {
        setPageNum(page);
        console.log(page);
      };

      const onclickCategory = (category) => {
        setCategory(category);
      }

    
    if (isLoading) {
        <>
            <div className={styles.spinnerContainer}>
                <div className={styles.spinner}></div>
                <div className={styles.text}>지문 목록 가져오는 중...</div>
            </div>
        </>
    }

    return (
        <div>
            <div className={styles.menuBtn}>
                <button style={getButtonStyle('ECONOMICS')} className={styles.menu} onClick={() => onclickCategory("ECONOMICS")}>경제</button>
                <button style={getButtonStyle('POLITICS')} className={styles.menu} onClick={() => onclickCategory("POLITICS")}>정치</button>
                <button style={getButtonStyle('SOCIAL')} className={styles.menu} onClick={() => onclickCategory("SOCIAL")}>사회</button>
                <button style={getButtonStyle('CULTURE')} className={styles.menu} onClick={() => onclickCategory("CULTURE")}>문화</button>
                <button style={getButtonStyle('WORLD')} className={styles.menu} onClick={() => onclickCategory("WORLD")}>세계</button>
                <button style={getButtonStyle('IT')} className={styles.menu} onClick={() => onclickCategory("IT")}>IT</button>
                <button style={getButtonStyle('ENTERTAINMENT')} className={styles.menu} onClick={() => onclickCategory("ENTERTAINMENT")}>연예</button>
                <button style={getButtonStyle('SPORT')} className={styles.menu} onClick={() => onclickCategory("SPORT")}>스포츠</button>
            </div>
            <div className={styles.articleList}>
                {articleList.length !== 0  && articleList.map((article) => (
                    <Article data = {article}/>
                ))}
            <Pagination activePage={pageNum} count={10} variant="outlined" style={{marginBottom:"40px"}} onChange={handlePageChange}/>
            </div>
        <BottomNavBar/>
        </div>
    )
}

export default ArticleList;