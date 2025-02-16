import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiEndPoints } from "../../config/path";
import { showError } from "../../helpers/messageHelper";
import { authPostApi, getApi } from "services/api";

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

type UserDataValues = {
  page: number;
  limit: number;
};

export const userData = createAsyncThunk(
  "/userData",
    async (values: UserDataValues) => {
    try {
      const payload = await getApi(`${apiEndPoints.GET_USERS}?page=${values.page}&limit=${values.limit}`);
      console.log("payload:::", payload);
      return payload;
    } catch (e: any) {
      showError(e.response.data.message);
      
    }
  }
);
export const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.responseCode = payload && payload?.status;
        state.responseData = payload && payload.data.data;
      })
      .addCase(userData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

export const userDataReducer = userDataSlice.reducer;
