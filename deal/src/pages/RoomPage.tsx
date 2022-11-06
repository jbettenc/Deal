import { useParams } from "react-router-dom";
import Room from "../components/Room";

function RoomPage() {
  const params = useParams();

  return (
    <>
      <Room isNew id={params.id} />
    </>
  );
}

export default RoomPage;
