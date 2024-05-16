// hooks/useMessages.js
import { useState, useEffect } from 'react';
import { fetchUtil } from "./fetchUtil";
import {useStomp} from "../../../context/StompContext";

export const useMessages = (roomId) => {
    const stompClient = useStomp();
    const [messages, setMessages] = useState({});
    const [agreeNum, setAgreeNum] = useState(0)
    const [disagreeNum, setDisagreeNum] = useState(0)
    const [agreeLikesNum, setAgreeLikesNum] = useState(0)
    const [disagreeLikesNum, setDisagreeLikesNum] = useState(0)
    const [agreeRatio, setAgreeRatio] = useState(0);
    const [disagreeRatio, setDisagreeRatio] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);
    const [title, setTitle] = useState("")
    // 토론방 입장 시 찬/반 비율 보여줌
    useEffect(()=>{
        const getDebateRoomInfo = async () => {
            const dto = await fetchUtil(`/debate-room/${roomId}`, {
                method: 'PUT'
            });
            setAgreeLikesNum(dto.agreeLikesNum);
            setDisagreeLikesNum(dto.disagreeLikesNum);
            setAgreeNum(dto.agreeNum);
            setDisagreeNum(dto.disagreeNum);
            setTitle(dto.title);
        }
        getDebateRoomInfo();
        updateRatio()
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
    }, [refreshKey]);

    // 해당 메세지 구독 -> 실시간 채팅 제공
    useEffect(() => {
        if (!stompClient) {
            console.log('Stomp client is not available yet.');
            return;
        }

        console.log(`Attempting to subscribe to room: ${roomId}`);
        const url = `/sub/room/${roomId}`;

        // 구독 로직
        const subscription = stompClient.subscribe(url, (chat) => {
            const message = JSON.parse(chat.body);
            setMessages((prevMessages) => ({
                ...prevMessages,
                [message.messageId]: message,
            }));
        });

        // 구독 해제, 컴포넌트가 언마운트 되거나 roomId가 변경될 때 호출
        return () => {
            if (subscription) {
                console.log(`Unsubscribing from room: ${roomId}`);
                subscription.unsubscribe();
            }
        };
    }, [stompClient, roomId]);

    // 좋아요 추가 로직
    async function handlePutPreference(messageId, position){
        const isAgree = position !== 'DISAGREE';
        const dto = await fetchUtil(`/message/preference/${messageId}`, {
            method: 'PUT',
            body: {
                isAgree: isAgree
            }
        });
        setAgreeLikesNum(dto.agreeLikesNum);
        setDisagreeLikesNum(dto.disagreeLikesNum);
        updateRatio();
        updateLikesNum(messageId, dto.isIncrease);
        return dto;
    }

    function updateRatio(){
        if (agreeLikesNum === 0 && disagreeLikesNum === 0){
            setAgreeRatio(0);
            setDisagreeRatio(0);
        } else {
            let ratio;
            if (agreeLikesNum >= disagreeLikesNum){
                ratio = agreeLikesNum / (agreeLikesNum + disagreeLikesNum) * 100
                setAgreeRatio(ratio);
                setDisagreeRatio(100 - ratio);
            } else{
                ratio = disagreeLikesNum / (agreeLikesNum + disagreeLikesNum) * 100
                setAgreeRatio(100 - ratio);
                setDisagreeRatio(ratio);
            }
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

    const forceRefresh = () => {
        setRefreshKey(prevKey => prevKey + 1);
    }
    return { messages, agreeNum, disagreeNum, agreeRatio, disagreeRatio, title,handlePutPreference, forceRefresh, updateRatio };
};
