import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";

const Feedback = ({state}) => {
    const location = useLocation();
    const title = location.state?.title;
    const summary = location.state?.summary;
    const takenTime = location.state?.takenTime;

    
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <p>AI 피드백 점수</p>
                <h4>{summary.score}</h4>
                <p>소요 시간</p>
                <p>{`0${Math.floor((takenTime / 60000) % 60)}`.slice(-2)} 분 {`0${Math.floor((takenTime / 1000) % 60)}`.slice(-2)} 초</p>
                <p>피드백 내용</p>
                <p>{summary.content}</p>
            </div>
        </div>
    )
}

export default Feedback;