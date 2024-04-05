// hooks/useMessages.js
import { useState, useEffect } from 'react';
import { fetchUtil } from "../../../utils/fetchUtil";

export const useMessages = (roomId, stompClient) => {
    const [messages, setMessages] = useState({});
    const [agreeNum, setAgreeNum] = useState(0)
    const [disagreeNum, setDisagreeNum] = useState(0)
    const [agreeRatio, setAgreeRatio] = useState(0);
    const [disagreeRatio, setDisagreeRatio] = useState(0);

    // 토론방 입장 시 찬/반 비율 보여줌
    useEffect(()=>{
        const getDebateRoomInfo = async () => {
            const dto = await fetchUtil(`/debate-room/${roomId}`, {
                method: 'PUT'
            });
            updateRatio(dto.ratio)
            setAgreeNum(dto.agreeNum);
            setDisagreeNum(dto.disagreeNum);
        }
        getDebateRoomInfo();
    }, [])

    // 메세지 받아오기
    useEffect(() => {
        const fetchMessages = async () => {
            const dataList = await fetchUtil(`/message/${roomId}`, {
                method: 'GET'
            });

            const messagesObject = dataList.reduce((acc, cur) => {
                acc[cur.messageId] = cur;
                return acc;
            }, {});

            setMessages(messagesObject);
        };
        fetchMessages();
    }, []);

    // 해당 메세지 구독 -> 실시간 채팅 제공
    useEffect(() => {
        if (!stompClient || stompClient.connected === false) {
            console.log('Stomp client is not connected. Attempting to reconnect...');
            stompClient.connect();
        }
        const url = `/sub/room/${roomId}`;
        console.log(`subscribe room: ${roomId}`);
        const subscription = stompClient.subscribe(url, function (chat) {
            const message = JSON.parse(chat.body);
            setMessages((prevMessages) => {
                return {
                    ...prevMessages,
                    [message.messageId]: message
                };
            });
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [roomId, stompClient]);




    // 좋아요 추가 로직
    async function handlePutPreference(messageId, position){
        const isAgree = position !== 'DISAGREE';
        const dto = await fetchUtil(`/message/preference/${messageId}`, {
            method: 'PUT',
            body: {
                isAgree: isAgree
            }
        });

        updateRatio(dto.ratio);
        updateLikesNum(messageId, dto.isIncrease);
    }

    function updateRatio(ratio){
        setAgreeRatio(ratio);
        if(ratio === 0  && disagreeRatio ===0){
            setDisagreeRatio(ratio)
        }else{
            setDisagreeRatio(100 - ratio)
        }
    }

    function updateLikesNum(messageId, isIncrease){
        let newLikesNum = messages[messageId].likesNum;
        if(isIncrease){
            newLikesNum += 1;
        }else{
            newLikesNum -= 1;
        }
        setMessages((prevMessages) => ({
            ...prevMessages,
            [messageId]: { ...prevMessages[messageId], likesNum: newLikesNum }
        }));
    }
    return { messages, agreeNum, disagreeNum, agreeRatio, disagreeRatio, handlePutPreference };
};
