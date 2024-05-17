import {useEffect, useState} from "react";
import CustomAxios from "../../../lib/customAxios";

export function useDebateRoom(roomId) {
    const {debateRoomInfo, setDebateRoomInfo} = useState(null)
    const {agreeRatio, setAgreeRatio} = useState(0)
    const [disagreeRatio, setDisagreeRatio] = useState(0);

    useEffect(() => {
        const getDebateRoomInfo = async () => {
            try {
                const response = await CustomAxios.put(`/debate-room/${roomId}`, null);
                // response에서 원하는 데이터 추출하여 상태 업데이트
                setDebateRoomInfo(response.data.data);
            } catch (error) {
                console.error('Debate room 정보를 가져오는 중 오류가 발생했습니다.', error);
            }
        };
        getDebateRoomInfo();
    }, [roomId]);

    function updateRatio(){
        if (debateRoomInfo.agreeLikesNum === 0
            && debateRoomInfo.disagreeLikesNum === 0){
            setAgreeRatio(0);
            setDisagreeRatio(0);
        } else {
            let ratio;
            const likesSum = (debateRoomInfo.agreeLikesNum + debateRoomInfo.disagreeLikesNum) * 100
            if (debateRoomInfo.agreeLikesNum >= debateRoomInfo.disagreeLikesNum){
                ratio = debateRoomInfo.agreeLikesNum / likesSum
                setAgreeRatio(ratio);
                setDisagreeRatio(100 - ratio);
            } else{
                ratio = debateRoomInfo.disagreeLikesNum / likesSum
                setAgreeRatio(100 - ratio);
                setDisagreeRatio(ratio);
            }
        }
    }
    async function handlePutPreference(messageId, position){
        const isAgree = position !== 'DISAGREE';
        const dto = await CustomAxios.put(`/message/preference/${messageId}`,
            {
                isAgree: isAgree
            }
        );
        updateRatio();
        return dto;
    }
    return {debateRoomInfo, agreeRatio, disagreeRatio, updateRatio, handlePutPreference};
}