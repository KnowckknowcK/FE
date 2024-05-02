import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecommendedItem from './RecommendedItem';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Main(props) {
    const [data, setData] = useState([]);

    const navigate = useNavigate();
 
    const clickHandler = () => {
        navigate("/article-list");
    };
  	
  	useEffect(() => {
		const fetchData = async() => {
          const res = await axios.get('https://api.knowckknowck.com/api/article/recommand');
          return res.data;
        }	
        
        fetchData().then(
            res => setData(res.data));
    }, []);


    return (
        <div>

        <Wrapper>
            <Intro>
                똑똑과 함께 <br/> AI 피드백 받고, <br/> 문해력을 향상해보세요<br/> 
            </Intro>
        </Wrapper>
        <Subtitle1>오늘의 맞춤 추천 기사</Subtitle1>
        <RecommandList>
            {data.map((item) =>(
                <RecommendedItem data = {item}/>
            ))}
        </RecommandList>
        <ButtonWrapper>
            <SelectButton onClick={clickHandler}>
                <ButtonText>
                <span>카테고리별 기사 분류가 제공되요</span>
                <span style={{fontSize: '1.25rem', fontWeight: 'bold'}}>기사 선택하기</span>
                </ButtonText>
                <div></div>
                <div>
                <img src="/img/buttonImg1.png" alt="Button Image" style={{ width: '50px', margin: '5px'}} />
                </div>
            </SelectButton>
        </ButtonWrapper>

        </div>
    )
    
}


const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    background-color: #E3D5CA;
`;

const Intro = styled.h2`
    color: white;
    padding: 20px;
`;

const Subtitle1 = styled.div`
    font-weight: bold;
    font-size: '0.875rem';
    padding: 10px;
`;

const RecommandList = styled.div`
    padding-left: 10px;
    padding-right: 10px;
    width: 100%;
    display: flex;
    gap: 32px;
    overflow-x: auto;
    scrollbar-color: transparent transparent;
    user-select: none;
    &::-webkit-scrollbar {
        height: 1px;
        background-color: transparent;
    }
`

const ButtonWrapper = styled.div`
    display: flex;
    padding-top: 30px;
    text-align: center;
    padding: 10px;
`

const SelectButton = styled.button`
    display: grid;
    grid-template-columns: 4fr 1fr 1fr;
    align-items: center;
    weight: 340px;
    height: 100px;
    border: none;
    border-radius: 10px;
    background-color: #D9D9D9;
`

const ButtonText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`

export default Main;