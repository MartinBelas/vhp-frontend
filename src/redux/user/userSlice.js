import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'user',
    initialState: {
        userEmail: ""
    },
    reducers: {
        login: (state, action) => {
            state.userEmail = action.payload;
        },
        logout: state => {
            state.userEmail = "";
            console.log('xxxxx----- LOGOUT 2');
        }
    }
});

export const { login, logout } = slice.actions;

export default slice.reducer;