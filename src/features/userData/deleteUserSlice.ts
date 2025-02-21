
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiEndPoints } from "../../config/path";
import { showError } from "../../helpers/messageHelper";
import { patchApi, postApi } from "services/api";

type UserData = {
  _id: string;
  full_name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

type ResponseData = {
  user?: UserData;
  is_already_logged_in?: boolean;
  access_token?: string;
  refresh_token?: string;
};

type LoginDataState = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  responseCode: number | null;
  responseData: ResponseData;
  token: string;
};

const initialState: LoginDataState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  responseCode: 0,
  responseData: {},
  token: "",
};

type deleteUserDataValues = {
  userId: string;
};

export const deleteUserData = createAsyncThunk(
  "/deleteUser",
    async (values: deleteUserDataValues) => {
    try {
      const valuesData = { ...values };
      const payload = await postApi(apiEndPoints.DELETE_USER, valuesData);
      return payload;
    } catch (e: any) {
      showError(e.response.data.message);
      
    }
  }
);
export const deleteUserSlice = createSlice({
  name: "deleteUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteUserData.pending, (state) => {
        state.isLoading = true;
      })
        .addCase(deleteUserData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.responseCode = payload && payload?.status;
        state.responseData = payload && payload.data.data;
      })
      .addCase(deleteUserData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

export const deleteUserReducer = deleteUserSlice.reducer;
