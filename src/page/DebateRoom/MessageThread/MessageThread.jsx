import React, {useEffect, useState} from 'react';
import styles from './MessageThread.module.css';
import {TopNavBar} from "../TopNavBar/TopNavBar";
import {MessageItem} from "../MessageItem/MessageItem";
import {useThread} from "../utils/useThread";
import {useStomp} from "../../../context/StompContext";
import {BottomNavBar} from "../BottomNavBar/BottomNavBar";
import {ThreadItem} from "./ThreadItem";

export function MessageThread({ roomId, isOpen, close, message, handlePutPreference, forceRefresh}){
    const stompClient = useStomp();
    const threads = useThread(message? message.messageId:null, stompClient, isOpen)
    const [threadMessage, setThreadMessage] = useState('');

    function sendThreadMessage() {
        if (stompClient) {
            stompClient.send(`/pub/message/${message.messageId}`, {},
                JSON.stringify({roomId: roomId, content: threadMessage}));
            setThreadMessage('');
        }
        forceRefresh();
    }

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
        <div>
            <TopNavBar handleOnClick={close}>
                <div>답글</div>
                <div className={styles.smallText}>{`${roomId}번 토론방`}</div>
            </TopNavBar>
            <div className={styles.fixedModalBody}>
                <MessageItem key={message.messageId}
                    message={message}
                    isThread={true}
                    handlePutPreference={handlePutPreferenceInThread}
                />
                <div>
                    {`${threads.length}개의 답글`}
                </div>
                <div>
                    {threads.map((thread) => (
                        <div key={thread.id}>
                            <ThreadItem thread={thread}/>
                        </div>
                    ))}
                </div>

                <div className={styles.bottomMargin}>
                    <BottomNavBar roomNumber={roomId}
                                  onSendMessage={sendThreadMessage}
                                  message={threadMessage}
                                  setMessage={setThreadMessage}
                                  isThread={true}
                    />
                </div>
            </div>


            <div className={styles.modalOverlay}></div>

        </div>
    );
}

