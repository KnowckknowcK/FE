import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecommendedItem from './RecommendedItem';
import styled from "styled-components";

function Main(props) {
    const [data, setData] = useState([]);
  	
  	useEffect(() => {
		const fetchData = async() => {
          const res = await axios.get('http://api.knowckknowck.com:8080/api/article/recommand');
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
            {data.map((item, index) =>(
                <RecommendedItem title={item.title} category={item.category} />
            ))}
        </RecommandList>
        <SelectButton>

        </SelectButton>

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

const SelectButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    background-color: #E3D5CA;
`

export default Main;