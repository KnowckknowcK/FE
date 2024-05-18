import { useNavigate} from 'react-router-dom';
import CustomAxios from "../lib/customAxios";

export function RoomPage() {
    const navigate = useNavigate();
    const getDebateRoomInfo = async (roomId) => {
        await CustomAxios.put(`/debate-room/${roomId}`, null)
        navigate(`/debate-room/${roomId}`);
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