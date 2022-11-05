import { createSlice } from "@reduxjs/toolkit";

export type IStep = "my-nft" | "add-token" | "add-collection" | "final" | null;

const getNextStep = (step: IStep, dir = 1): IStep => {
  switch (step) {
    case "my-nft":
      return dir === 1 ? "add-token" : "my-nft";
    case "add-token":
      return dir === 1 ? "add-collection" : "my-nft";
    case "add-collection":
      return dir === 1 ? "final" : "add-token";
    case "final":
      return dir === 1 ? "final" : "add-collection";
    default:
      return null;
  }
};

export interface IRoom {
  nfts: any[];
  tokens: any[];
  collections: any[];
  note: string;
  id?: string;
}

export interface RoomState {
  step: IStep;
  nfts: any[];
  tokens: any[];
  collections: any[];
  note: string;
  new: IRoom;
  selected: IRoom;
}

const roomSlice = createSlice({
  name: "room",
  initialState: {
    step: "my-nft",
    nfts: [],
    tokens: [],
    collections: [],
    note: "",
    new: {
      nfts: [],
      tokens: [],
      collections: [],
      note: "",
      id: ""
    },
    selected: {
      nfts: [],
      tokens: [],
      collections: [],
      note: "",
      id: ""
    }
  } as RoomState,
  reducers: {
    goToNext(state) {
      state.step = getNextStep(state.step);
    },
    goToPrev(state) {
      state.step = getNextStep(state.step, -1);
    },
    setNfts(state, action) {
      state.nfts = action.payload;
    },
    setTokens(state, action) {
      state.tokens = action.payload;
    },
    setCollections(state, action) {
      state.collections = action.payload;
    },
    setNotes(state, action) {
      state.note = action.payload;
    },
    setNewRoom(state, action) {
      state.new = action.payload;
    },
    selectRoom(state, action) {
      state.selected = action.payload;
    },
    initializeRoom(state) {
      state.step = "my-nft";
      state.nfts = [];
      state.tokens = [];
      state.collections = [];
      state.note = "";
    }
  }
});

export const {
  goToNext,
  goToPrev,
  initializeRoom,
  setNewRoom,
  setNfts,
  setTokens,
  setCollections,
  setNotes,
  selectRoom
} = roomSlice.actions;

export const roomReducer = roomSlice.reducer;
