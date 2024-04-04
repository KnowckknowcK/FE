import React, { useEffect } from 'react';
import styles from './MessageThread.module.css';
import {TopNavBar} from "../TopNavBar/TopNavBar";

export function MessageThread({ roomId, isOpen, close, message, children }){
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!isOpen) return null;



    return (
        <div >
            <TopNavBar handleOnClick={close}>
                <div>답글</div>
                <div className={styles.smallText}>{`${roomId}번 토론방 ${message.position}`}</div>
            </TopNavBar>
            <div>
                <p>{message?.content}</p>
                {/*<p>{message?.repliesCount}개의 댓글</p>*/}
                {children}
            </div>
        </div>
    );
};

