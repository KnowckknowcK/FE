// Message.js 파일
import React from 'react';
import {MessageThread} from '../MessageThread/MessageThread';
import styles from './MessageItem.module.css';
import {fetchUtil} from "../../../utils/fetchUtil";

export const MessageItem = ({ message, handleShowComments, messageThreads, handlePutPreference }) => {

    return (
        <div className={styles.messageContainer} key={message.messageId}>
            <div className={styles.header}>
                <img src={message.profileImage} alt="" className={styles.profileImage}/>
                <div className={styles.flexContainer}>
                    <div>
                        <p className={styles.name}>{message.writer}</p>
                        <p className={styles.time}>{message.createdTime}</p>
                    </div>
                    <p className={styles.content}>{message.content}</p>
                    <div className={styles.reactions}>
                        <div className={`${styles.position} ${message.position === 'DISAGREE' ? styles.oppose : ''}`}>
                            {message.position}
                        </div>
                        <button onClick={() => handlePutPreference(message.messageId, message.position, message.likesNum)}>👍</button>

                        {message.likesNum > 0 && (
                            <div>{message.likesNum}</div>
                        )}
                        {message.threadNum > 0 && (
                            <div className={styles.replies}>답글 {message.threadNum}</div>
                        )}
                    </div>
                </div>
            </div>

            {/*<button onClick={() => handleShowComments(message.messageId)}>댓글</button>*/}
            {/*{messageThreads[message.messageId] && (*/}
            {/*    <div>*/}
            {/*        {messageThreads[message.messageId].map((messageThread) => (*/}
            {/*            <MessageThread key={messageThread.threadId} messageThread={messageThread} />*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};