import React from "react";
import styled from "styled-components";


function RecommendedItem(props) {
    return (
        <Wrapper>
            <Intro>
                똑똑과 함께 <br/> AI 피드백 받고, <br/> 문해력을 향상해보세요<br/> 
            </Intro>
        </Wrapper>
        
    )
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    background-color: #E3D5CA;
`;

const Intro = styled.h2`
    // Global style 에서 바꿀 부분 정의
    color: white;
`;

export default RecommendedItem;