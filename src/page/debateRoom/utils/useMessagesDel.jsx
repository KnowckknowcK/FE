// hooks/useMessages.js
import { useState, useEffect } from 'react';
import { useFetch } from "./useFetch";

const useMessagesDel = (roomId) => {

    const [messages, setMessages] = useState({});
    const [agreeLikesNum, setAgreeLikesNum] = useState(0)
    const [disagreeLikesNum, setDisagreeLikesNum] = useState(0)
    const [agreeRatio, setAgreeRatio] = useState(0);
    const [disagreeRatio, setDisagreeRatio] = useState(0);


    // 토론방 입장 시 찬/반 비율 보여줌
    useEffect(()=>{
        updateRatio()
    }, [])


    // 해당 메세지 구독 -> 실시간 채팅 제공


    // 좋아요 추가 로직
    async function handlePutPreference(messageId, position){
        const isAgree = position !== 'DISAGREE';
        const dto = await useFetch(`/message/preference/${messageId}`, {
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

    return {
        messages,
        agreeRatio,
        disagreeRatio,
        handlePutPreference,
        forceRefresh,
        updateRatio };
};
