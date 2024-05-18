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
                <div className={styles.user}>
                    <img src={message.profileImage} alt="" className={styles.profileImage}/>
                    <div className={`${styles.position}`} style={{backgroundColor: message.position === 'AGREE'? '#65B891' : '#569CA2'}}>
                        {message.position === 'AGREE' ? '찬성' : message.position === 'DISAGREE' ? '반대' : ''}
                    </div>
                </div>
                <div className={styles.flexContainer}>
                    <div>
                        <p className={styles.name}>{message.writer}</p>
                        <p className={styles.time}>{timeSince(message.createdTime, curTime)}</p>
                    </div>
                    <div className={styles.contentWrapper}>
                        <div className={styles.content}>{message.content}</div>
                    </div>
                    <div className={styles.reactions}>
                        
                        <div onClick={(e) => handleLikeClick(e)}>
                            <FaThumbsUp className={styles.thumpUp}/>
                        </div>
                        {message.likesNum > 0 && (
                            <div style={{fontSize: '0.75rem', color:'#7A7A7A'}}>{message.likesNum}</div>
                        )}
                        {!isThread && message.threadNum > 0 
                            ? <div className={styles.replies}>답글 {message.threadNum}</div>
                            : <div className={styles.replies}>답글 달기</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};