import React, { useEffect } from 'react';
import styles from './MessageThread.module.css';
import {TopNavBar} from "../TopNavBar/TopNavBar";
import {MessageItem} from "../MessageItem/MessageItem";

export function MessageThread({ roomId, isOpen, close, message, handlePutPreference, children }){
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div>
            <TopNavBar handleOnClick={close}>
                <div>답글</div>
                <div className={styles.smallText}>{`${roomId}번 토론방`}</div>
            </TopNavBar>
            <div className={styles.fixedMessageItem}>
                <MessageItem
                    message={message}
                    isThread={true}
                    handlePutPreference={handlePutPreference}
                />
                <div>
                    #개의 답글
                </div>

            </div>
            <div className={styles.modalOverlay}></div>

        </div>
    );
}

