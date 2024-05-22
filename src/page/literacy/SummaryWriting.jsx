import React, {useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SummaryWriting.module.css";
import customAxios from "../../lib/customAxios";
import formatDateTime from "../../util/FormatDateTime"
import Swal from "sweetalert2";

const SummaryWriting = () => {
  const location = useLocation().state.data;
  const navigate = useNavigate();
  const [summaryHistory, setSummaryHistory] = useState(null);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWaitingFeedback, setIsWaitingFeedback] = useState(false);
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(true)

  const loadSummaryHistory = async () => {
    return await customAxios
    .get(`/summary/load?articleId=${location.id}`)
      .then((response) => {
        setSummaryHistory(response.data.data);
        if(response.data.data.status ===  "ING") {
            setSummary(response.data.data.content);
            setTime(response.data.data.takenTime);
        }
      });
  };

  useEffect(() => {
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


    const useSaveSummary = async () => {

      if (summary.length === 0) {
        alert("내용을 입력해주세요.");
        return;
      }

        return await customAxios
        .post(`/summary/save`, {
                content: summary,
                articleId: location.id,
                status: "ING",
                takenTime: time
            }).then((response) => {
              console.log(response.data);
                if(response.data.code === 200) {
                    Swal.fire({
                      title: "요약 임시 저장 완료",
                      text: "요약 임시 저장이 완료됐어요 :)",
                      icon: "success",
                      timer: 2000,
                      html: "<b>2</b> 초 뒤에 메인페이지로 이동",
                      width: "300px",
                      confirmButtonColor: "#B5C9C0",
                    }).then(() => {
                      navigate("/article-list");})
                }
                setIsRunning(false); 
            }).catch((error) => {
              Swal.fire({
                title: "요약 임시 저장 실패",
                text: "요약을 임시저장하는 도중에 오류가 발생했어요 :(",
                icon: "error",
                width: "350px",
                confirmButtonColor: "#B5C9C0",
              }).then((res) => {
                if(res.isConfirmed) {
                  navigate("/article-list")
                }
              })})
  }

  const submitSummary = async () => {

    if (summary.length === 0) {
      alert("내용을 입력해주세요.");
      return;
    }

    setIsWaitingFeedback(true); 

    return await customAxios.post(`/summary/submit`, {
      content: summary,
      articleId: location.id,
      status: "DONE",
      takenTime: time
    }).then((response) => {
      if(response.data.code === 200) {
        Swal.fire({
          title: "AI 요약 피드백 완성",
          text: "AI 요약 피드백이 완성됐어요 :)",
          icon: "success",
          timer: 2000,
          html: "<b>2</b> 초 뒤에 피드백 확인하기",
          width: "300px",
          confirmButtonColor: "#B5C9C0",
        }).then(() => {
          navigate("/feedback", {state: {data: location, summary: response.data.data, title : location.title, takenTime: time, category: location.category}});
        })
      } 
    }).catch((error) => {
      Swal.fire({
        title: "AI 요약 피드백 생성 실패",
        text: "AI 요약 피드백을 생성하는 도중에 오류가 발생했어요 :(",
        icon: "error",
        width: "350px",
        confirmButtonColor: "#B5C9C0",
      }).then((res) => {
        if(res.isConfirmed) {
          navigate("/article-list")
        }
      })})
  }

    const onChangeTextArea = (e) => {
        setSummary(e.target.value);
    }   


    if (isLoading) {
        return (
        <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
            <div className={styles.text}>로딩중...</div>
        </div>
    );
    } 
    if (isWaitingFeedback) {
      return (
        <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
            <div className={styles.text}>피드백을 기다리는 중입니다...</div>
        </div>
    );
    }

    return (
        <div style={{overflow:"hidden", display:"flex", flexDirection:"column", gap:"10px",padding:"20px"}}>
            <div className={styles.articleDiv}>
                <h2 className={styles.title}>{location.title}</h2>
                <h4>{formatDateTime(location.createdTime)}</h4>
                <p className={styles.content}>{location.content}</p>
            </div>

            <div style={{display:"flex", justifyContent:"space-between"}}>
            <p className={styles.takenTime}> 경과 시간 <time>
              {`0${Math.floor((time / 60000) % 60)}`.slice(-2)} : {`0${Math.floor((time / 1000) % 60)}`.slice(-2)}
            </time></p>
            <p className={styles.summaryNotice}>요약 작성</p>
            </div>

            <textarea className={styles.textarea} onChange={onChangeTextArea} value={summary}></textarea>
            <div className={styles.btnDiv}>
                <button className={styles.summaryBtn} onClick={useSaveSummary}>요약 저장</button>
                <button className={styles.summaryBtn} onClick={submitSummary}>요약 제출</button>
            </div>
        </div>
    )
}

export default SummaryWriting;