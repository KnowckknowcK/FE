import React, {useEffect} from 'react';
import styles from './MessageThread.module.css';
import {TopNavBar} from "../../common/topNavBar/TopNavBar";
import {MessageItem} from "../../common/messageItem/MessageItem";
import {BottomNavBar} from "../../common/bottomNavBar/BottomNavBar";
import {ThreadItem} from "../../common/messageItem/ThreadItem";
import {useThreads} from "../../hooks/useThreads";

export function MessageThread({ roomId, isOpen, close, message, handlePutPreference, refreshKey}){
    const threads = useThreads(roomId, message? message.messageId:null, isOpen)

    async function handlePutPreferenceInThread(){
        const dto = await handlePutPreference(message.messageId, message.position)
        let newLikesNum = message.likesNum;
        if(dto.isIncrease){
            newLikesNum += 1;
        }else{
            newLikesNum -= 1;
        }
        message.likesNum = newLikesNum;
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.background}>
            <TopNavBar handleOnClick={close}>
                <div>답글</div>
                <div className={styles.smallText}>{`${roomId}번 토론방`}</div>
            </TopNavBar>
            <div className={styles.fixedModalBody}>
                <div>
                    <MessageItem key={message.messageId}
                                 message={message}
                                 isThread={true}
                                 handlePutPreference={handlePutPreferenceInThread}
                    />
                </div>

                <div className={styles.numOfThread }>
                    {`${threads.length}개의 답글`}
                </div>
                <div>
                    {threads.map((thread) => (
                        <div key={thread.id}>
                            <ThreadItem thread={thread}/>
                        </div>
                    ))}
                </div>

                <div>
                    <BottomNavBar roomId={roomId}
                                  isThread={true}
                                  messageId={message.messageId}
                    />
                </div>
            </div>


            <div className={styles.modalOverlay}></div>

        </div>
    );
}

