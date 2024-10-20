import {createSlice} from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: "feedSlice",
    initialState: [],
    reducers: {
        addUserToFeed: (state, action) => {
            return [...new Set(action.payload)];
        },
        removeUserFromFeed: (state, action) => {
            return state.filter((user) => user._id !== action.payload);
        },
        clearFeed : (state,action) => {
            return  null;
        }
    }
})

export const {clearFeed,addUserToFeed, removeUserFromFeed} = feedSlice.actions;
export default feedSlice.reducer;