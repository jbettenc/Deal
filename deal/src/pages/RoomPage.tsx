import { useParams } from "react-router-dom";

function RoomPage() {
  const params = useParams();

  return <>{params.id}</>;
}

export default RoomPage;
