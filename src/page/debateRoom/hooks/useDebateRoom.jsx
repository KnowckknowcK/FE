import {useEffect, useState} from "react";
import customAxios from "../../../lib/customAxios";

export function useDebateRoom(roomId) {
    const [debateRoomInfo, setDebateRoomInfo] = useState({})
    const [agreeRatio, setAgreeRatio] = useState(0)
    const [disagreeRatio, setDisagreeRatio] = useState(0);

    useEffect(() => {
        const getDebateRoomInfo = async () => {
            try {
                const response = await customAxios.put(`/debate-room/${roomId}`, null);
                // response에서 원하는 데이터 추출하여 상태 업데이트
                const dto = response.data.data;
                setDebateRoomInfo(dto);
            } catch (error) {
                console.error('Debate room 정보를 가져오는 중 오류가 발생했습니다.', error);
            }
        };
        getDebateRoomInfo();

    }, [roomId]);

    useEffect(() => {
        if (debateRoomInfo) {
            updateRatio(debateRoomInfo.agreeLikesNum, debateRoomInfo.disagreeLikesNum);
        }
    }, [debateRoomInfo]);

    function updateRatio(agreeLikesNum, disagreeLikesNum){
        debateRoomInfo.agreeLikesNum = agreeLikesNum
        debateRoomInfo.disagreeLikesNum = disagreeLikesNum
        if (debateRoomInfo.agreeLikesNum === 0
            && debateRoomInfo.disagreeLikesNum === 0){
            setAgreeRatio(0);
            setDisagreeRatio(0);
        } else {
            let ratio;
            const likesSum = (debateRoomInfo.agreeLikesNum + debateRoomInfo.disagreeLikesNum)
            if (debateRoomInfo.agreeLikesNum >= debateRoomInfo.disagreeLikesNum){
                ratio = debateRoomInfo.agreeLikesNum / likesSum * 100
                setAgreeRatio(ratio);
                setDisagreeRatio(100 - ratio);
            } else{
                ratio = debateRoomInfo.disagreeLikesNum / likesSum * 100
                setAgreeRatio(100 - ratio);
                setDisagreeRatio(ratio);
            }
        }
    }
    return {debateRoomInfo, agreeRatio, disagreeRatio, updateRatio};
}