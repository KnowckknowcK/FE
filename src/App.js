import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import {DebateRoom} from "./page/DebateRoom/DebateRoom/DebateRoom";
import {RoomPage} from "./page/RoomPage";

function App() {
  return (
      <Routes>
        <Route path="/room" element={<RoomPage />} />
        <Route path="/room/:roomId" element={<DebateRoom />} />
      </Routes>
  );
}

export default App;
