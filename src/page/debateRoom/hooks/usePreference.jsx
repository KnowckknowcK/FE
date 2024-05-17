import customAxios from "../../../lib/customAxios";

export const usePreference = (messages, updateRatio, updateLikesNum) => {
    async function handlePutPreference(messageId, position){
        const isAgree = position !== 'DISAGREE';
        const response = await customAxios.put(`/message/preference/${messageId}`,
            {
                isAgree: isAgree
            }
        );
        const dto = response.data.data
        updateRatio(dto.agreeLikesNum, dto.disagreeLikesNum);
        updateLikesNum(messageId, dto.isIncrease);

        return dto;
    }

    return handlePutPreference;
}