// Message.js 파일
import React from 'react';
import styles from './MessageItem.module.css';
import {FaThumbsUp} from "react-icons/fa6";
import {timeSince} from "./TimeSince";

export const MessageItem = ({ message, handlePutPreference, curTime, isThread}) => {
    const handleLikeClick = (e) => {
        e.stopPropagation();
        handlePutPreference(message.messageId, message.position);
    };

    return (
        <div className={`${styles.messageContainer}`} key={message.messageId}>
            <div className={styles.header}>
                <img src={message.profileImage} alt="" className={styles.profileImage}/>
                <div className={styles.flexContainer}>
                    <div>
                        <p className={styles.name}>{message.writer}</p>
                        <p className={styles.time}>{timeSince(message.createdTime, curTime)}</p>
                    </div>
                    <div className={styles.content}>{message.content}</div>
                    <div className={styles.reactions}>
                        <div className={`${styles.position}`}>
                            {message.position === 'AGREE' ? '찬성 입장' : message.position === 'DISAGREE' ? '반대 입장' : ''}
                        </div>
                        <div onClick={(e) => handleLikeClick(e)}>
                            <FaThumbsUp style={{color:"#ffffff"}}/>
                        </div>
                        {message.likesNum > 0 && (
                            <div>{message.likesNum}</div>
                        )}
                        {!isThread && message.threadNum > 0 && (
                            <div className={styles.replies}>답글 {message.threadNum}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};