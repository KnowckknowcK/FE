import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStomp } from '../../context/StompContext';
import { fetchUtil } from "../../utils/fetchUtil";
import {MessageItem} from "./MessageItem";
import {TopNavBar} from "./TopNavBar";
import styles from './DebateRoom.module.css';
import {BottomNavBar} from "./BottomNavBar";

export function DebateRoom() {
    const stompClient = useStomp();
    let { roomId } = useParams();
    const [yourMessage, setYourMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [messageThreads, setMessageThreads] = useState({}); // 객체로 초기화

    useEffect(() => {
        const fetchMessages = async () => {
            const data = await fetchUtil(`/message/${roomId}`, {
                method: 'GET'
            });
            setMessages(data.data); // 비동기 결과를 직접 상태에 할당
        };
        fetchMessages();
    }, [roomId]); // roomId를 의존성 배열에 추가

    useEffect(() => {
        if (!stompClient || stompClient.connected === false) {
            console.log('Stomp client is not connected. Attempting to reconnect...');
            stompClient.connect();
        }
        const url = `/sub/room/${roomId}`;
        console.log(`subscribe room: ${roomId}`);
        const subscription = stompClient.subscribe(url, function (chat) {
            const message = JSON.parse(chat.body);
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [roomId, stompClient]);

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
            <TopNavBar roomNumber={roomId} participantCount={10} agreeRate={70} disagreeRate={30}/>

            <div className={styles.topMargin}>
                {messages.map((message) => (
                    <MessageItem key={message.messageId} message={message} handleShowComments={handleShowComments}
                                 messageThreads={messageThreads}/>
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
