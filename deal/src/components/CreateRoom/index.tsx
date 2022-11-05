import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RootState } from "../../store/root";
import {
  goToNext,
  goToPrev,
  setNfts,
  setCollections,
  setTokens,
  setNotes,
  initializeRoom,
  setNewRoom,
  IRoom
} from "../../store/roomSlice";
import CreateRoom from "./CreateRoom";

function CreateRoomWrapper(props: any) {
  return <CreateRoom {...props} />;
}

const mapStateToProps = (state: RootState) => {
  const { step, nfts, tokens, collections, note } = state.room;
  return {
    step,
    nfts,
    tokens,
    collections,
    note
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    goToNext: () => dispatch(goToNext()),
    goToPrev: () => dispatch(goToPrev()),
    onSetNFTs: (nfts = []) => dispatch(setNfts(nfts)),
    onSetTokens: (tokens = []) => dispatch(setTokens(tokens)),
    onSetCollections: (collections = []) => dispatch(setCollections(collections)),
    onSetNotes: (notes = "") => dispatch(setNotes(notes)),
    onInitialize: () => dispatch(initializeRoom()),
    onCreateRoom: (room: IRoom) => dispatch(setNewRoom(room))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRoomWrapper);
