import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import {ChatRoom} from "./page/ChatRoom";
import {RoomPage} from "./page/RoomPage";

function App() {
  return (
      <Routes>
        <Route path="/room" element={<RoomPage />} />
        <Route path="/room/:roomId" element={<ChatRoom />} />
      </Routes>
  );
}

export default App;
