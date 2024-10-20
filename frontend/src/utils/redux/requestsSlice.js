import {createSlice} from "@reduxjs/toolkit";
import {addUniqueItems,removeItem,clearState} from "./reduxHelpers.js";


const requestsSlice = createSlice({
    name: "requests",
    initialState: [],
    reducers: {
        addRequest: (state, action) => addUniqueItems(state, action),
        removeRequest: (state, action) => removeItem(state, action),
        clearSlice: clearState
    }
})


export const {addRequest, removeRequest, clearSlice} = requestsSlice.actions;
export default requestsSlice.reducer;