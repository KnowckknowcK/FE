import { Link } from 'react-router-dom';
export function RoomPage() {
    return (
        <>
            <div>토론방 페이지</div>
            <div>
                {Array.from({length: 5}, (_, i) => i + 1).map(roomId => (
                    <div key={roomId}>
                        <Link to={`/room/${roomId}`}>Room {roomId}</Link>
                    </div>
                ))}
            </div>
        </>
    )
}