import React from 'react';
import styles from './Summary.module.css';
import formatDateTime from "../../../util/FormatDateTime";
const Summary = ({data,onClick}) => {
    return (
        <div className={styles.block}
            onClick={onClick}>
            <p style={{fontWeight : "bold",maxWidth:"95%",height:"auto"}}>{data.title}</p>
            <p className={styles.vector}></p>
            <div className={styles.line}>
                <p style={{color:"#6B9080", fontSize:"12px"}}>{formatDateTime(data.createdTime)}</p>
                <p className={styles.category}>{data.category}</p>
            </div>
        </div>
    );
};

export default Summary;