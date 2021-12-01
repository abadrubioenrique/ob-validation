import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setMessage } from './message';

import userService from '../../services/user.service';

const userInfo = JSON.parse(localStorage.getItem('USER_INFO'));

export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (token, thunkAPI) => {
    try {
      const data = await userService.getUserInfo(token);
      return { userInfo: data };
    } catch (error) {
      const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  },
);

export const removeUserInfo = createAsyncThunk('user/removeUserInfo', async () => {
  await userService.removeUserInfo();
});

const initialState = userInfo
  ? { isFetched: true, userInfo }
  : { isFetched: false, userInfo: null };

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [getUserInfo.fulfilled]: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.isFetched = true;
      // eslint-disable-next-line no-param-reassign
      state.userInfo = action.payload.userInfo;
    },
    // eslint-disable-next-line no-unused-vars
    [getUserInfo.rejected]: (state, action) => {
        // eslint-disable-next-line no-param-reassign
      state.isFetched = false;
      // eslint-disable-next-line no-param-reassign
      state.userInfo = null;
    },
    [removeUserInfo.fulfilled]: (state, action) => {
      // eslint-disable-next-line no-param-reassign
    state.isFetched = false;
    // eslint-disable-next-line no-param-reassign
    state.userInfo = null;
  },
  },
});

const { reducer } = userSlice;
export default reducer;
