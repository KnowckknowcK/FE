import { Link } from 'react-router-dom';
import {fetchUtil} from "../utils/fetchUtil";
export function RoomPage() {
    const getDebateRoomInfo = async (roomId) => {
        const dto = await fetchUtil(`/debate-room/${roomId}`, {
            method: 'PUT'
        });
    }
    return (
        <>
            <div>토론방 페이지</div>
            <div>
                {Array.from({length: 5}, (_, i) => i + 1).map(roomId => (
                    <div key={roomId} onClick={() => getDebateRoomInfo(roomId)}>
                        <Link to={`/room/${roomId}`}>Room {roomId}</Link>
                    </div>
                ))}
            </div>
        </>
    )
}