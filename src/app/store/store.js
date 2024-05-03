

import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/authSlice"; // esempio di reducer

const store = configureStore({
    reducer: {
        auth: authReducer,
      },
});

export default store;
