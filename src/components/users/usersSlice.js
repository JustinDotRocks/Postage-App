import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    { id: '0', name: 'Person 1'},
    { id: '1', name: 'Person 2'},
    { id: '2', name: 'Person 3'}
];

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
});

export default usersSlice.reducer;