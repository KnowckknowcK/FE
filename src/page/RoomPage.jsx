import { useNavigate} from 'react-router-dom';
import {fetchUtil} from "../utils/fetchUtil";

export function RoomPage() {
    const navigate = useNavigate();
    const getDebateRoomInfo = async (roomId) => {
        const dto = await fetchUtil(`/debate-room/${roomId}`, {
            method: 'PUT'
        });
        navigate(`/room/${roomId}`);
    }
    return (
        <>
            <div>토론방 페이지</div>
            <div>
                {Array.from({length: 5}, (_, i) => i + 1).map(roomId => (
                    <div key={roomId} onClick={() => getDebateRoomInfo(roomId)}>
                        Room {roomId}
                    </div>
                ))}
            </div>
        </>
    )
}