import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStomp } from '../../../context/StompContext';
import { fetchUtil } from "../../../utils/fetchUtil";
import {MessageItem} from "../MessageItem/MessageItem";
import {TopNavBar} from "../TopNavBar/TopNavBar";
import styles from './DebateRoom.module.css';
import {BottomNavBar} from "../BottomNavBar/BottomNavBar";
import {useMessages} from "../utils/useMessages";

export function DebateRoom() {
    const stompClient = useStomp();
    let { roomId } = useParams();
    const [yourMessage, setYourMessage] = useState('');
    const [messageThreads, setMessageThreads] = useState({});
    const { messages, agreeRatio, disagreeRatio, handlePutPreference } = useMessages(roomId, stompClient);


    function sendMessage() {
        if (stompClient) {
            stompClient.send(`/pub/message`, {},
                JSON.stringify({roomId: roomId, content: yourMessage}));
            setYourMessage('');
        }
    }

    async function handleShowComments(messageId){
        const prevThreads = await fetchUtil(`/message/thread/${messageId}`, {
            method: 'GET'
        });
        setMessageThreads(prevThread => ({
            ...prevThread,
            [messageId]: prevThreads.data
        }));
    }
    return (
        <div>
            <TopNavBar roomNumber={roomId} participantCount={10} agreeRate={agreeRatio} disagreeRate={disagreeRatio}/>

            <div className={styles.topMargin}>
                {Object.values(messages).map((message) => (
                    <MessageItem key={message.messageId} message={message} handleShowComments={handleShowComments}
                                 messageThreads={messageThreads} handlePutPreference={handlePutPreference}/>
                ))}
            </div>

            <div className={styles.bottomMargin}>
                <BottomNavBar roomNumber={roomId}
                              onSendMessage={sendMessage}
                              message={yourMessage}
                              setMessage={setYourMessage}/>
            </div>

        </div>
    );
}
