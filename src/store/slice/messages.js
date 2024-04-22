import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    successmsg: "",
    errormsg: "",
  },
  reducers: {
    setErrorMsg: (state, action) => {
      state.errormsg = action.payload;
    },
    setSucessMsg: (state, action) => {
      state.successmsg = action.payload;
    },
  },
});

export const { setErrorMsg, setSucessMsg } = messageSlice.actions;
export default messageSlice.reducer;
