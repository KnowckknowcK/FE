// hooks/useMessages.js
import { useState, useEffect } from 'react';
import { fetchUtil } from "../../../utils/fetchUtil";

export const useMessages = (roomId, stompClient) => {
    const [messages, setMessages] = useState({});
    const [agreeRatio, setAgreeRatio] = useState(0);
    const [disagreeRatio, setDisagreeRatio] = useState(0);

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
    }, [roomId]);

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
                // 메시지 객체에 새로운 메시지를 추가
                // message.id를 키로 사용하여 메시지를 저장
                return {
                    ...prevMessages,
                    [message.id]: message
                };
            });
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [roomId, stompClient]);

    // 토론방 입장 시 찬/반 비율 보여줌 -> 수정 필요 현재 받고 있는 있는 ratio가 잘못됨(좋아요 비율이 바뀌는 중)
    useEffect(()=>{
        const getRatio = async () => {
            const curRatio = await fetchUtil(`/debate-room/${roomId}`, {
                method: 'PUT'
            });
            setAgreeRatio(curRatio);
        }
        getRatio();
    }, [])


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
    };
    return { messages, agreeRatio, disagreeRatio, handlePutPreference };
};
