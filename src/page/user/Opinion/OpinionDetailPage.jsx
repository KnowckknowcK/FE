import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import styles from "./MyOpinion.module.css"
import MoveBackButton from "../MoveBackButton";
import customAxios from "../../../lib/customAxios";
const OpinionDetailPage = () => {
    const location = useLocation();
    const { opinion } = location.state;
    const navigate = useNavigate();
    const enterDebateRoom = async(roodId) => {
        navigate('/debate-room/', {state: {roodId}});
    }
    return (
        <div>
            {opinion ? (<div className={styles.bg}>
                    <MoveBackButton style={{marginLeft:"5%"}}/>
                    <div>
                        <p className={styles.title} >{opinion.article.title}</p>
                        <p className={styles.content}>{opinion.article.content}</p>
                    </div>
                    <div>
                        <p className={styles.title}>내가 작성한 견해</p>
                        <p className={styles.content}>{opinion.content}</p>
                    </div>
                    <div>
                        <p className={styles.title}>AI 피드백</p>
                        <p className={styles.content}>{opinion.feedBackContent}</p>
                    </div>
                    <div className={styles.moveBtn}>
                        <img src={'/arrow.png'} alt={'이미지'}/>
                        <p className={styles.btnText} onClick={() => enterDebateRoom(opinion.article.id)} >토론방으로 이동하기</p>
                    </div>
                </div>
            ) : (
                <p>Opinion not found</p>
            )}
        </div>
    );
};

export default OpinionDetailPage;