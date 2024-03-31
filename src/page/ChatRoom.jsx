import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStomp } from '../context/StompContext';
import { fetchUtil } from "../utils/fetchUtil";

export function ChatRoom() {
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
            <div>{roomId}</div>
            <div>
                {messages.map((message) => (
                    <div key={message.messageId}>
                        <p>작성자: {message.writer}</p>
                        <p>내용: {message.content}</p>
                        <p>작성 시간: {message.createdTime}</p>
                        <button onClick={() => handleShowComments(message.messageId)}>댓글</button>
                        {messageThreads[message.messageId] && (
                            <div>
                                {messageThreads[message.messageId].map((messageThread) => (
                                    <div key={messageThread.threadId}>
                                        <p>댓글 작성자: {messageThread.writer}</p>
                                        <p>댓글 내용: {messageThread.content}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <input type="text" value={yourMessage} onChange={(e) => setYourMessage(e.target.value)} />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}
