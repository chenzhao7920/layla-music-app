import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signIn, signUp, logOut } from "../../api/firebase/authApi";

// Thunks
export const signInUser = createAsyncThunk(
  "auth/signIn",
  //TODO: persistent-login authentication
  async ({ email, password, remember }, { dispatch }) => {
    try {
      dispatch(loginStart());
      const user = await signIn(email, password);
      const userData = { ...transformFirebaseUser(user), remember };
      dispatch(loginSuccess(userData));
      return userData;
    } catch (error) {
      console.log("error", error);
      dispatch(loginFailure("The email or password you entered is incorrect"));
      throw error;
    }
  }
);
export const signOutUser = createAsyncThunk(
  "auth/signOut",
  async (_, { dispatch }) => {
    try {
      await logOut();
      dispatch(logout());
    } catch (error) {
      // Handle any sign-out errors if needed
      throw error;
    }
  }
);

export const signUpUser = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }, { dispatch }) => {
    try {
      dispatch(loginStart());
      const user = await signUp(email, password);
      const userData = transformFirebaseUser(user);
      dispatch(loginSuccess(userData));
      return userData;
    } catch (error) {
      dispatch(loginFailure("Could not create account. Please try again."));
      throw error;
    }
  }
);

//slice
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
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
      state.error = null;
      const { uid, email, accessToken } = action.payload;
      state.user = { uid, email, accessToken };
      // Store in localStorage
      localStorage.setItem("layla_access_token", accessToken);
      localStorage.setItem("layla_user", JSON.stringify({ uid, email }));
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isAuthenticated = false;
      // Clear localStorage on failure
      localStorage.removeItem("layla_access_token");
      localStorage.removeItem("layla_user");
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      // Clear stored data on logout
      localStorage.removeItem("layla_access_token");
      localStorage.removeItem("layla_user");
    },
    restoreSession: (state) => {
      const storedToken = localStorage.getItem("layla_access_token");
      const storedUser = localStorage.getItem("layla_user");

      if (storedToken && storedUser) {
        try {
          const user = JSON.parse(storedUser);
          state.user = { ...user, storedToken };
          state.isAuthenticated = true;
          state.loading = false;
        } catch (error) {
          state.error = "Failed to restore session";
          state.isAuthenticated = false;
          localStorage.removeItem("layla_access_token");
          localStorage.removeItem("layla_user");
        }
      }
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
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  restoreSession,
} = authSlice.actions;

// Export reducer
export default authSlice.reducer;
