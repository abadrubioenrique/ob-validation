import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/auth';
import messageReducer from '../slices/message';
import userSlice from '../slices/user';
// Reducers combination
const reducer = {
    auth: authReducer,
    message: messageReducer,
    user: userSlice,
  };

/** Store configuration, combine all app states */
const store = configureStore({
    reducer,
    devTools: true,
  });

  export default store;
