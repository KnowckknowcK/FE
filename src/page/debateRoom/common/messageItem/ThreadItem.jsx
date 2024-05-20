// Message.js 파일
import React from 'react';
import styles from './MessageItem.module.css';
import {timeSince} from "./TimeSince";

export const ThreadItem = ({ thread, curTime }) => {
    return (
        <div  style={{paddingLeft: '20px', backgroundColor: '#F5F5F5'}} className={`${styles.messageContainer}`} key={thread.id}>
            <div className={styles.header}>
            <div className={styles.user}>
                <img src={thread.profileImage} alt="" className={styles.profileImage}/>
                <div className={styles.position}  style={{backgroundColor: thread.position === 'AGREE'? '#65B891' : '#569CA2'}}>
                    {thread.position === 'AGREE' ? '찬성' : thread.position === 'DISAGREE' ? '반대' : ''}
                </div>
                </div>
                <div className={styles.flexContainer}>
                    <div>
                        <p className={styles.name}>{thread.writer}</p>
                        <p className={styles.time}>{timeSince(thread.createdTime, curTime)}</p>
                    </div>
                    <div className={styles.contentWrapper}>
                        <div className={styles.content}>{thread.content}</div>
                    </div>
                    <div className={styles.reactions}>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};