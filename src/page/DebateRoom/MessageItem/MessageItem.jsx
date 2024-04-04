// Message.js 파일
import React from 'react';
import styles from './MessageItem.module.css';

export const MessageItem = ({ message, handlePutPreference, isThread }) => {

    const handleLikeClick = (e) => {
        e.stopPropagation();
        handlePutPreference(message.messageId, message.position);
    };

    return (
        <div className={`${styles.messageContainer} ${isThread ? styles.thread: ""}`} key={message.messageId}>
            <div className={styles.header}>
                <img src={message.profileImage} alt="" className={styles.profileImage}/>
                <div className={styles.flexContainer}>
                    <div>
                        <p className={styles.name}>{message.writer}</p>
                        <p className={styles.time}>{message.createdTime}</p>
                    </div>
                    <p className={styles.content}>{message.content}</p>
                    <div className={styles.reactions}>
                        <div className={`${styles.position}`}>
                            {message.position}
                        </div>
                        <button onClick={(e) => handleLikeClick(e)}>👍</button>
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