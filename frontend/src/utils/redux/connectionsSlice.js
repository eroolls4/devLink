import {createSlice} from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
    name: "connection",
    initialState: [],
    reducers: {
        addConnection: (state, action) => {
            const existingIds = state.map(conn => conn._id);
            const newConnections = action.payload.filter(conn => !existingIds.includes(conn._id));
            return [...state, ...newConnections];
        },
        removeConnection : (state,action) => {
           return state.filter( (conn) => conn._id !== action.payload._id)
        },
        clearSlice : () => {
            return null;
        }
    }
})



export const {addConnection,removeConnection,clearSlice} =connectionsSlice.actions;
export default connectionsSlice.reducer;