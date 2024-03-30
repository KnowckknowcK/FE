/** @format */

import { Routes, Route } from "react-router-dom";
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./dashboard/Dashboard";
import ArticleList from "./literacy/ArticleList";
import Feedback from "./literacy/Feedback";
import OpinionWriting from "./literacy/OpinionWriting";
import SummaryWriting from "./literacy/SummaryWriting";
import SignIn from "./signup&in/SignIn";
import SignUp from "./signup&in/SignUp";
import MyDebateRoom from "./user/MyDebateRoom";
import OpinionHistory from "./user/OpinionHistory";
import SummaryHistory from "./user/SummaryHistory";
import UserInfo from "./user/UserInfo";

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='article-list' element={<ArticleList />} />
        <Route path='/opinion-writing' element={<OpinionWriting />} />
        <Route path='/summary-writing' element={<SummaryWriting />} />
        <Route path='/feedback' element={<Feedback />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/debate-room' element={<MyDebateRoom />} />
        <Route path='/opinion-history' element={<OpinionHistory />} />
        <Route path='summary-history' element={<SummaryHistory />} />
        <Route path='/user-info/:userId' element={<UserInfo />} />
      </Routes>
    </div>
  );
}

export default App;
