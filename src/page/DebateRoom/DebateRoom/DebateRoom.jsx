import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useStomp } from '../../../context/StompContext';
import { fetchUtil } from "../../../utils/fetchUtil";
import {MessageItem} from "../MessageItem/MessageItem";
import {TopNavBar} from "../TopNavBar/TopNavBar";
import styles from './DebateRoom.module.css';
import {BottomNavBar} from "../BottomNavBar/BottomNavBar";

export function DebateRoom() {
    const stompClient = useStomp();
    let { roomId } = useParams();
    const [yourMessage, setYourMessage] = useState('');
    const [messages, setMessages] = useState({});
    const [messageThreads, setMessageThreads] = useState({});
    const [agreeRatio, setAgreeRatio] = useState(0);
    const [disagreeRatio, setDisagreeRatio] = useState(0);

    useEffect(() => {
        const fetchMessages = async () => {
            const dataList = await fetchUtil(`/message/${roomId}`, {
                method: 'GET'
            });// 비동기 결과를 직접 상태에 할당

            const messagesObject = dataList.reduce((acc, cur) => {
                acc[cur.messageId] = cur;
                return acc;
            }, {});

            setMessages(messagesObject);
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
    // likesNum을 업데이트하는 함수
    const updateLikesNum = (messageId, newLikesNum) => {
        setMessages((prevMessages) => ({
            ...prevMessages,
            [messageId]: { ...prevMessages[messageId], likesNum: newLikesNum }
        }));
    };

    async function handlePutPreference(messageId, position){
        const isAgree = position !== 'DISAGREE';
        const dto = await fetchUtil(`/message/preference/${messageId}`, {
            method: 'PUT',
            body: {
                isAgree: isAgree
            }
        });

        setAgreeRatio(dto.ratio)
        if(dto.ratio === 0  && disagreeRatio ===0){
            setDisagreeRatio(dto.ratio)
        }else{
            setDisagreeRatio(100 - dto.ratio)
        }

        let newLikesNum = messages[messageId].likesNum;
        if(dto.isIncrease){
            newLikesNum += 1;
        }else{
            newLikesNum -= 1;
        }
        updateLikesNum(messageId, newLikesNum);
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
