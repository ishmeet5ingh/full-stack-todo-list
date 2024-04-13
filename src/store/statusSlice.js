import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    statu: false
}

const statusSlice = createSlice({
    name: "status",
    initialState,
    reducers: {
        toggle: (state) => {
            state.statu = !state.statu
        }
    }
})

export const {toggle} = statusSlice.actions

export default statusSlice.reducer