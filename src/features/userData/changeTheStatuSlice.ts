
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

type changeTheStatusDataValues = {
  userId: string;
};

export const changeTheStatusData = createAsyncThunk(
  "/changeTheStatus",
    async (values: changeTheStatusDataValues) => {
    try {
      const valuesData = { ...values };
      const payload = await patchApi(apiEndPoints.CHANGE_THE_STATUS, valuesData);
      return payload;
    } catch (e: any) {
      showError(e.response.data.message);
      
    }
  }
);
export const changeTheStatusSlice = createSlice({
  name: "changeTheStatus",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeTheStatusData.pending, (state) => {
        state.isLoading = true;
      })
        .addCase(changeTheStatusData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.responseCode = payload && payload?.status;
        state.responseData = payload && payload.data.data;
      })
      .addCase(changeTheStatusData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

export const changeTheStatusReducer = changeTheStatusSlice.reducer;
