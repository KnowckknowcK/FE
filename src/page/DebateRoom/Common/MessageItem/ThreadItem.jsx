// Message.js 파일
import React from 'react';
import styles from './MessageItem.module.css';
import {timeSince} from "./TimeSince";

export const ThreadItem = ({ thread: thread}) => {
    return (
        <div className={`${styles.messageContainer}`} key={thread.id}>
            <div className={styles.header}>
                <img src={thread.profileImage} alt="" className={styles.profileImage}/>
                <div className={styles.flexContainer}>
                    <div>
                        <p className={styles.name}>{thread.writer}</p>
                        <p className={styles.time}>{timeSince(thread.createdTime)}</p>
                    </div>
                    <p className={styles.content}>{thread.content}</p>
                    <div className={styles.reactions}>
                        <div className={`${styles.position}`}>
                            {thread.position}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};