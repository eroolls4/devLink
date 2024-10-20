import {createSlice} from "@reduxjs/toolkit";


const requestsSlice = createSlice({
    name: "request",
    initialState: [],
    reducers: {
        addRequest: (state, action) => {
            return  [...new Set([...state ,...action.payload])];
        },
        removeRequest: (state, action) => {
            return state.filter((conn) => conn._id !== action.payload._id)
        },
        clearSlice: () => {
            return null;
        }
    }
})


export const {addRequest, removeRequest, clearSlice} = requestsSlice.actions;
export default requestsSlice.reducer;