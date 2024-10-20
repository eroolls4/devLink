import {createSlice} from "@reduxjs/toolkit";
import {addUniqueItems, removeItem, clearState} from "./reduxHelpers.js";

const connectionsSlice = createSlice({
    name: "connections",
    initialState: [],
    reducers: {
        addConnection: (state, action) => addUniqueItems(state, action),
        removeConnection: (state, action) => removeItem(state, action),
        clearSlice: clearState
    }
})

export const {addConnection, removeConnection, clearSlice} = connectionsSlice.actions;
export default connectionsSlice.reducer;