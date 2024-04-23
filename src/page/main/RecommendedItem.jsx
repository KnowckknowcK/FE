import React from "react";
import styled from "styled-components";


function RecommendedItem(props) {
    return (
        
        <div>
            <Wrapper>
                <Category>{`${props.category}`}</Category>
                <Title>{`${props.title}`}</Title>
                <Button>문해력 진단 시작하기</Button>
            </Wrapper>
        </div>

    )
}


const Wrapper = styled.div`
    padding: 15px;
    width: 200px;
    height: 250px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #6B9080;
`;

const Category = styled.div`
    position: relative;
    top: 10px;
    font-size: 0.75rem;
`;

const Title = styled.div`
    position: relative;
    top: 10px;
    height: 80%;
    font-weight: bold;
    font-size: 1rem;
`;

const Button = styled.button`
    margin: 0 auto;
    padding: 10px;
    border: none;
    border-radius: 30px;
    position: relative;
    font-weight: bold;
    font-size: 0.875rem;
    color: #6B9080;
    background-color: #E8EBEA;
`;


export default RecommendedItem;
