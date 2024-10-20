import {createSlice} from "@reduxjs/toolkit";
import {removeItem,clearState} from "./reduxHelpers.js";

const feedSlice = createSlice({
    name: "feed",
    initialState: [],
    reducers: {
        addUserToFeed: (state, action) => [...new Set(action.payload)],
        removeUserFromFeed: (state, action) => removeItem(state, action),
        clearFeed: clearState
    }
})

export const {clearFeed,addUserToFeed, removeUserFromFeed} = feedSlice.actions;
export default feedSlice.reducer;