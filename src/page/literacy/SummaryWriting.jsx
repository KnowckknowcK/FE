import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SummaryWriting.module.css";
import customAxios from "../../lib/customAxios";
import { userId } from "../../util/userId";

const SummaryWriting = () => {
  const location = useLocation().state.data;
  const navigate = useNavigate();
  const [summaryHistory, setSummaryHistory] = useState([]);
  const [summary, setSummary] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWaitingFeedback, setIsWaitingFeedback] = useState(false);
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    const loadSummaryHistory = async () => {
        return await customAxios
        //   .get(`/summary/load?articleId=${location.id}&userId=${sessionStorage.getItem("userId")}`)
        .get(`/summary/load?articleId=${location.id}&userId=1`)
          .then((response) => {
            setSummaryHistory(response.data.data);
            if(response.data.data.status ===  "ING") {
                setSummary(response.data.data.content);
                setTime(response.data.data.takenTime);
            }
          });
      };
  
      const fetchData = async () => {
        await loadSummaryHistory();
        setIsLoading(false);
      };
  
      fetchData();

    },[])


    useEffect(() => {
      let interval
  
      if (isRunning) {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime + 10)
        }, 10)
      } else {
        clearInterval(interval)
      }
  
      return () => clearInterval(interval)
    }, [isRunning])

    useEffect(async() => {
      if (summary.length === 0) {
        return;
      }
      const interval = setInterval(async () =>{
        return await customAxios
          .post(`/summary/save`, {
                  content: summary,
                  articleId: location.id,
                  writerId: userId,
                  status: "ING",
                  takenTime: time
              }).then((response) => {
                  if(response.data.code === 200) {
                      console.log("자동 저장 완료");
                  }
              })
      }, 5000);
      return () => clearInterval(interval);
    },[])


    const useSaveSummary = async () => {

      if (summary.length === 0) {
        alert("내용을 입력해주세요.");
        return;
      }

        return await customAxios
        .post(`/summary/save`, {
                content: summary,
                articleId: location.id,
                writerId: userId,
                status: "ING",
                takenTime: time
            }).then((response) => {
              console.log(response.data);
                if(response.data.code === 200) {
                    alert("저장되었습니다.");
                }else { 
                    alert("저장에 실패했습니다.");
                }
                navigate("/article-list");
                setIsRunning(false);
                  
            })
  }

  const submitSummary = async () => {

    if (summary.length === 0) {
      alert("내용을 입력해주세요.");
      return;
    }

    setIsWaitingFeedback(true); 

    return await customAxios.post(`/summary/save`, {
      content: summary,
      articleId: location.id,
      writerId: userId,
      status: "DONE",
      takenTime: time
    }).then((response) => {
      if(response.data.code === 200) {
        alert("제출되었습니다.");
        navigate("/feedback", {state: {summary: response.data.data, title : location.title, takenTime: time}});

      } else {
        console.log(response.data);
        alert("제출에 실패했습니다.");
      }
    })
  }

    const onChangeTextArea = (e) => {
        setSummary(e.target.value);
    }   


    if (isLoading) return <p>로딩중...</p>
    if (isWaitingFeedback) return <p>피드백을 기다리는 중입니다.</p>

    return (
        <div>
            <div className={styles.articleDiv}>
                <h2 className={styles.title}>{location.title}</h2>
                <h4>{location.createdTime}</h4>
                <p className={styles.content}>{location.content}</p>
            </div>
            <time>
              {`0${Math.floor((time / 60000) % 60)}`.slice(-2)} : {`0${Math.floor((time / 1000) % 60)}`.slice(-2)}
            </time>
            <p className={styles.summaryNotice}>요약 작성</p>
            <textarea className={styles.textarea} onChange={onChangeTextArea} value={summary}></textarea>
            <div className={styles.btnDiv}>
                <button className={styles.summaryBtn} onClick={useSaveSummary}>요약 저장</button>
                <button className={styles.summaryBtn} onClick={submitSummary}>요약 제출</button>
            </div>
        </div>
    )
}

export default SummaryWriting;