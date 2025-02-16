import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { loginDataReducer } from "features/auth/loginSlice";
import { changePaymentPhotoReducer } from "features/payment/changePaymentPhotoSlice";
import { currentPaymentPhotoReducer } from "features/payment/currentPaymentPhotoSlice";
import { changeTheStatusReducer } from "features/userData/changeTheStatuSlice";
import { updateUserDataReducer } from "features/userData/updateUserDataSlice";
import { userDataReducer } from "features/userData/userInfoSlice";


const store = configureStore({
  reducer: combineReducers({
    loginDataReducer: loginDataReducer,
    userDataReducer: userDataReducer,
    changeTheStatusReducer: changeTheStatusReducer,
    updateUserDataReducer: updateUserDataReducer,
    currentPaymentPhotoReducer: currentPaymentPhotoReducer,
    changePaymentPhotoReducer: changePaymentPhotoReducer  
  }),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
