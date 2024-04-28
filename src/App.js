/** @format */

import "./App.css";
import { Routes, Route } from "react-router-dom";
import { DebateRoom } from "./page/DebateRoom/Main/DebateRoom/DebateRoom";
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

function App() {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='article-list' element={<ArticleList />} />
      <Route path='/opinion-writing' element={<OpinionWriting />} />
      <Route path='/summary/:id' element={<SummaryWriting />} />
      <Route path='/feedback' element={<Feedback />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/debate-room' element={<MyDebateRoom />} />
      <Route path='/opinion-history' element={<OpinionHistory />} />
      <Route path='summary-history' element={<SummaryHistory />} />
      <Route path='/user-info/:userId' element={<UserInfo />} />
      <Route path='/room' element={<RoomPage />} />
      <Route path='/room/:roomId' element={<DebateRoom />} />
    </Routes>
  );
}

export default App;
