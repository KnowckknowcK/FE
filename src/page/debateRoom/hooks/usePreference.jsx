export function usePreference(debateRoomInfo, messages, setMessages ) {

    function updateRatio(){
        if (debateRoomInfo.agreeLikesNum === 0 && debateRoomInfo.disagreeLikesNum === 0){
            setAgreeRatio(0);
            setDisagreeRatio(0);
        } else {
            let ratio;
            if (debateRoomInfo.agreeLikesNum >= debateRoomInfo.disagreeLikesNum){
                ratio = debateRoomInfo.agreeLikesNum
                    / (debateRoomInfo.agreeLikesNum + debateRoomInfo.disagreeLikesNum) * 100
                setAgreeRatio(ratio);
                setDisagreeRatio(100 - ratio);
            } else{
                ratio = debateRoomInfo.disagreeLikesNum
                    / (debateRoomInfo.agreeLikesNum + debateRoomInfo.disagreeLikesNum) * 100
                setAgreeRatio(100 - ratio);
                setDisagreeRatio(ratio);
            }
        }
    }


}