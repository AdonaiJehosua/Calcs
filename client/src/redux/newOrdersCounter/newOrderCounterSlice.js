import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    newOrderCount: 0 
}

export const newOrderCounterSlice = createSlice({
    name: 'newOrderCounter',
    initialState,
    reducers: {
        increment: (state) => {
            state.newOrderCount += 1
        },
        decrement: (state) => {
            state.newOrderCount -= 1
        },
    }
})

export const { increment, decrement } = newOrderCounterSlice.actions

export default newOrderCounterSlice.reducer