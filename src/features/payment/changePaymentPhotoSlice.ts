
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiEndPoints } from "../../config/path";
import { showError } from "../../helpers/messageHelper";
import { authPostApi, patchApi } from "services/api";

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

type updateUserDataValues = {
  userId: string;
  people_count: number;
  total_earnings: number;
  username: string;
  password: string;
};

export const changePaymentPhoto = createAsyncThunk(
  "/changePaymentPhoto",
  async (values: any) => {
    try {
      const valuesData = { ...values };
      console.log("valuesData", valuesData);
      const payload = await patchApi(apiEndPoints.CHANGE_PAYMENT_PHOTO, valuesData);
      return payload;
    } catch (e: any) {
      showError(e.response.data.message);
      
    }
  }
);
export const changePaymentPhotoSlice = createSlice({
  name: "changePaymentPhoto",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePaymentPhoto.pending, (state) => {
        state.isLoading = true;
      })
        .addCase(changePaymentPhoto.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.responseCode = payload && payload?.status;
        state.responseData = payload && payload.data.data;
      })
      .addCase(changePaymentPhoto.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

export const changePaymentPhotoReducer = changePaymentPhotoSlice.reducer;
