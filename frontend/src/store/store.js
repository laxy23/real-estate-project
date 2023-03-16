import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import propertyReducer from '../features/propertySlice'

export default configureStore({
    reducer: {
        auth: authReducer,
        property: propertyReducer
    }
})