import { configureStore } from "@reduxjs/toolkit";
import authProvider from "./authSlice";

const provider = configureStore({
    reducer : authProvider
})

export default provider;