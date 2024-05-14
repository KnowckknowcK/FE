/** @format */

import "./App.css";
import { Routes, Route } from "react-router-dom";
import { DebateRoom } from "./page/debateRoom/main/debateRoom/DebateRoom";
import { RoomPage } from "./page/RoomPage";
import Dashboard from "./page/dashboard/Dashboard";
import ArticleList from "./page/literacy/ArticleList";
import Feedback from "./page/literacy/Feedback";
import OpinionWriting from "./page/literacy/OpinionWriting";
import SummaryWriting from "./page/literacy/SummaryWriting";
import SignIn from "./page/signup&in/SignIn";
import SignUp from "./page/signup&in/SignUp";
import MyDebateRoom from "./page/user/MyDebateRoom";
import OpinionHistory from "./page/user/OpinionHistory";
import SummaryHistory from "./page/user/SummaryHistory";
import UserInfo from "./page/user/UserInfo";
import Main from "./page/main/Main";
import StompProvider from "./Provider/StompProvider";
import { GlobalStyle } from "./styles/GlobalStyle";
import { Global } from "@emotion/react";
import { useEffect } from "react";
import OpinionFeedback from "./page/literacy/OpinionFeedback";

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });
  return (
    <>
      <Global styles={GlobalStyle} />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/article-list' element={<ArticleList />} />
        <Route path='/opinion-writing' element={<OpinionWriting />} />
        <Route path='/summary/:id' element={<SummaryWriting />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/opinion-feedback' element={<OpinionFeedback />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/debate-room' element={<MyDebateRoom />} />
        <Route path='/opinion-history' element={<OpinionHistory />} />
        <Route path='/summary-history' element={<SummaryHistory />} />
        <Route path='/mypage' element={<UserInfo />} />
        <Route path='/room' element={<RoomPage />} />
        <Route
          path='/debate-room/:roomId'
          element={
            <StompProvider>
              <DebateRoom />
            </StompProvider>
          }
        />
      </Routes>
    </>
  );
}

export default App;
