import {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./SummaryWriting.module.css";
import customAxios from "../../lib/customAxios";
import formatDateTime from "../../util/FormatDateTime"
import {FormControl, FormLabel, RadioGroup, FormControlLabel, Radio} from '@mui/material';
import Swal from "sweetalert2";

const OpinionWriting = () => {
  const location = useLocation().state.data;
  const navigate = useNavigate();
  const [opinion, setOpinion] = useState([]);
  const [isWaitingOpinion, setIsWaitingOpinion] = useState(false);
  const [position, setPosition] = useState("AGREE");

  const submitOpinion = async () => {

    if (opinion.length === 0) {
      alert("내용을 입력해주세요.");
      return;
    }

    setIsWaitingOpinion(true); 

    return await customAxios.post(`/opinion/submit`, {
      content: opinion,
      articleId: location.id,
      position: position

    }).then((response) => {
      if(response.data.code === 200) {
        Swal.fire({
          title: "AI 견해 피드백 완성",
          text: "AI 견해 피드백이 완성됐어요 :)",
          icon: "success",
          timer: 2000,
          html: "<b>2</b> 초 뒤에 피드백 확인하기",
          width: "300px",
          confirmButtonColor: "#B5C9C0",
        }).then(() => {
          navigate("/opinion-feedback", {state: {opinion: response.data.data, title : location.title, category: location.category, position: position, articleId: location.id}});

        })
      }

      else {
        Swal.fire({
          title: "AI 견해 피드백 생성 실패",
          text: "AI 견해 피드백을 생성하는 도중에 오류가 발생했어요 :(",
          icon: "error",
          width: "350px",
          confirmButtonColor: "#B5C9C0",
        }).then((res) => {
          if(res.isConfirmed) {
            navigate("/article-list")
          }
        })
      }
    }).catch((error) => {
      Swal.fire({
        title: "AI 견해 피드백 생성 실패",
        text: "AI 견해 피드백을 생성하는 도중에 오류가 발생했어요 :(",
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
        setOpinion(e.target.value);
    }

    const onChangePosition = (e) => {
      setPosition(e.target.value);
    }


    if (isWaitingOpinion) {
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
            <p className={styles.summaryNotice}>견해 작성</p>
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">입장 선택</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={position}
                        onChange={onChangePosition}
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="AGREE" control={<Radio />} label="찬성" />
                        <FormControlLabel value="DISAGREE" control={<Radio />} label="반대" />
                    </RadioGroup>
                </FormControl>
            </div>

            <textarea className={styles.textarea} onChange={onChangeTextArea} value={opinion}></textarea>
            <div className={styles.btnDiv}>
                <button className={styles.summaryBtn} onClick={submitOpinion}>견해 제출</button>
            </div>
        </div>
    )
}

export default OpinionWriting;