import {createSlice} from '@reduxjs/toolkit';

export const darkModeReducer = createSlice({
    name: "darkMode",
    initialState: {
        isDarkMode: false
    },
    reducers: {
        toggleDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
        },
    },
});


export const {toggleDarkMode} = darkModeReducer.actions;

export default darkModeReducer.reducer;