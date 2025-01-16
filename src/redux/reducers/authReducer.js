import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signIn, signUP, signOut } from "../../api/firebase/authApi";

// Thunks
export const signInUser = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { dispatch }) => {
    try {
      dispatch(loginStart());
      const user = await signIn(email, password);
      const userData = transformFirebaseUser(user);
      dispatch(loginSuccess(userData));
      return userData;
    } catch (error) {
      dispatch(loginFailure("The email or password you entered is incorrect"));
      throw error;
    }
  }
);

//slice
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      const { uid, email, accessToken } = action.payload;
      state.user = { uid, email, accessToken };
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});
// Helpers
const transformFirebaseUser = (user) => ({
  uid: user.uid,
  email: user.email,
  accessToken: user.stsTokenManager.accessToken,
  refreshToken: user.stsTokenManager.refreshToken,
  providerId: user.providerId,
});
// Actions
export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

// Export reducer
export default authSlice.reducer;
