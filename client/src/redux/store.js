import { configureStore } from "@reduxjs/toolkit"
import newOrderCounterReducer from "./newOrdersCounter/newOrderCounterSlice"

export const store = configureStore({
    reducer: {
        newOrderCounterReducer
    }
}) 