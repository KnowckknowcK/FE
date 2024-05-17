import React from 'react';
import styles from "./MyDebateRoom.module.css";
import {useNavigate} from "react-router-dom";

const MyDebateRoom = ({data}) => {
    const navigate = useNavigate();

    const handleRoomClick = (id) => {
        navigate(`/debate-room/${id}`)
    }
    const imageOptions = {
        AGREE: require('./Position/agree.png'),
        DISAGREE: require('./Position/disagree.png')
    };
    const imagePath = imageOptions[data.position];
    return (
        <div className={styles.block}
            onClick={() => handleRoomClick(data.id)}>
            <p>{data.title}</p>
            <p className={styles.vector}></p>
            <div className={styles.line}>
                <img src={imagePath} alt="이미지" />
                {data.position=== "AGREE" ? <p>찬성</p> : <p>반대</p>}
            </div>
        </div>
    );
};

export default MyDebateRoom;