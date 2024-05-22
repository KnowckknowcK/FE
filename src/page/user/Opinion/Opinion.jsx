import React from 'react';
import styles from "../Summary/Summary.module.css";
import formatDateTime from "../../../util/FormatDateTime";
import {useNavigate} from "react-router-dom";

const Opinion = ({data}) => {
    const navigate = useNavigate();
    const handleClick = (opinion) => {
        navigate(`/opinion-detail/${data.opinionId}`,{state:{opinion}})
    }
    return (
        <div>
            <div className={styles.block} onClick={() => handleClick(data)}>
                <p style={{fontWeight : "bold",maxWidth:"95%",height:"auto"}}>{data.title}</p>
                <p className={styles.vector}></p>
                <div className={styles.line}>
                    <p style={{color:"#6B9080"}}>{formatDateTime(data.createdTime)}</p>
                    <p className={styles.category}>{data.category}</p>
                </div>
            </div>
        </div>
    );
};

export default Opinion;