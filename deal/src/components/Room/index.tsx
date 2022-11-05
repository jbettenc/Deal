import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RootState } from "../../store/root";
import { setNfts, setCollections, setTokens, setNotes } from "../../store/roomSlice";
import RoomContent from "./RoomContent";

interface RoomOwnProps {
  isNew?: boolean;
  id?: string;
}

function RoomWrapper(props: any) {
  return <RoomContent {...props} />;
}

const mapStateToProps = (state: RootState, ownProps: RoomOwnProps) => {
  const { new: RoomData, selected } = state.room;
  return {
    RoomData: ownProps.isNew ? RoomData : selected,
    id: ownProps.id,
    isNew: ownProps.isNew
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSetNFTs: (nfts = []) => dispatch(setNfts(nfts)),
    onSetTokens: (tokens = []) => dispatch(setTokens(tokens)),
    onSetCollections: (collections = []) => dispatch(setCollections(collections)),
    onSetNotes: (notes = "") => dispatch(setNotes(notes))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomWrapper);
