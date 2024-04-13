import {configureStore} from '@reduxjs/toolkit'
import authSlice from './authSlice'
import statusSlice from './statusSlice'

const store = configureStore({
    reducer: {
        auth: authSlice,
        status: statusSlice
    }
})

export default store