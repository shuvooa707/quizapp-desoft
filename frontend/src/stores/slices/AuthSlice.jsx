import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    auth : null
}

const authSlice = createSlice({
    name: "AuthSlice",
    initialState,
    reducers: {
        setAuth : (state, action) => {
            state.auth = action.payload;
        }
    }
});

export const {
    setAuth,
} = authSlice.actions;


export default authSlice.reducer;
