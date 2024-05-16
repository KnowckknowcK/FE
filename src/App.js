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
import OpinionHistory from "./page/user/Opinion/OpinionHistory";
import ProfileUpdate from "./page/user/ProfileUpdate";
import UserInfo from "./page/user/UserInfo";
import Main from "./page/main/Main";
import StompProvider from "./Provider/StompProvider";
import { GlobalStyle } from "./styles/GlobalStyle";
import { Global } from "@emotion/react";
import { useEffect } from "react";
import OpinionFeedback from "./page/literacy/OpinionFeedback";
import SummaryHistoryIng from "./page/user/Summary/SummaryHistoryIng";
import SummaryHistoryDone from "./page/user/Summary/SummaryHistoryDone";
import SummaryPage from "./page/user/Summary/SummaryPage";
import GoogleLoginSuccess from "./page/signup&in/GoogleLoginSuccess"

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
        <Route path="/opinion/:id" element={<OpinionPage/>}/>
        <Route path='/summary-history/ing' element={<SummaryHistoryIng/>}/>
        <Route path='/summary-history/done' element={<SummaryHistoryDone/>}/>
        <Route path="/summary-detail/:id" element={<SummaryPage/>}/>
        <Route path='/mypage' element={<UserInfo />} />
        <Route path='/room' element={<RoomPage />} />
        <Route path='/profile-update' element={<ProfileUpdate />} />
        <Route
          path='/debate-room/:roomId'
          element={
            <StompProvider>
              <DebateRoom />
            </StompProvider>
          }
        />
        <Route path='/google-login' element={<GoogleLoginSuccess />} />
      </Routes>
    </>
  );
}

export default App;
