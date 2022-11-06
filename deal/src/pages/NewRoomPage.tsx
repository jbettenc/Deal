import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/root";
import Room from "../components/Room";

function RoomPage() {
  const newRoomId = useSelector((state: RootState) => state.room.new.id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!newRoomId) {
      navigate("/create");
    }
  }, []);

  return (
    <>
      <Room isNew id={newRoomId} />
    </>
  );
}

export default RoomPage;
