import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStomp } from '../context/StompContext';

function ChatRoom() {
    const stompClient = useStomp();
    let { roomId } = useParams();
    const [yourMessage, setYourMessage] = useState(''); // 메시지 입력을 위한 상태
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const url = `/sub/room/${roomId}`
        console.log(`subscribe room: ${roomId}`)
        stompClient.subscribe(url, function (chat) {
            const message = JSON.parse(chat.body).content;
            showGreeting(message);
        });

        // return () => {
        //     if (stompClient && stompClient.connected) {
        //         stompClient.disconnect();
        //     }
        // };
    }, []);

    // 메시지 보내기 함수
    function sendMessage() {
        if (stompClient) {
            stompClient.send(`/pub/message`, {},
                JSON.stringify({roomId: roomId, content: yourMessage}));
            setYourMessage(''); // 메시지 전송 후 입력 필드 초기화
        }
    }

    // 메시지를 화면에 표시하는 함수
    function showGreeting(message) {
        setMessages((prevMessages) => [...prevMessages, message]);
    }

    return (
        <div>
            <div>{roomId}</div>
            {/*<div>*/}
            {/*    {messages.map((message, index) => (*/}
            {/*        <div key={index}>{message}</div>*/}
            {/*    ))}*/}
            {/*</div>*/}
            <input
                type="text"
                value={yourMessage}
                onChange={(e) => setYourMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );

}

export default ChatRoom;
