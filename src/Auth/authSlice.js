import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, loginUser } from "./authAPI";
// import { stat } from "fs";
// import { get } from "http";

const initialState = {
  loggedInUserToken: null,
  status: "idle",
  error: null,
  creatUser:null,
  userCheck: false,
};
 
export const createUserDataAsyc = createAsyncThunk(
    "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
      return response.data;
      
  }
);

export const loginUserAsyc = createAsyncThunk(
  "user/loginUser",
  async (loggedData, { rejectWithValue }) => {
    try {
      const response = await loginUser(loggedData);
      return response.data;
    } catch (err) {
      // console.log("hh",err)
      return rejectWithValue(err);
    }
  }
);
// export const checkAuthAsyc = createAsyncThunk("user/checkAuth", async () => {
//   try {
//     const response = await checkAuth();
//     return response.data;
//   } catch (err) {
//     // console.log("hh",err)
//   }
// });
// export const signOutAsyc = createAsyncThunk("user/signOut", async () => {
//   const response = await signOut();
//   return response.data;
// });

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
  },

  extraReducers: (builder) => {
      builder
          .addCase(createUserDataAsyc.pending, (state) => {
              state.status = "loading";
          })
          .addCase(createUserDataAsyc.fulfilled, (state, action) => {
              state.status = "idle";
            //   state.loggedInUserToken = action.payload.token;
               state.creatUser=action.payload
            //   console.log(state.loggedInUserToken, "jbcjhsd");
          })
          .addCase(loginUserAsyc.pending, (state) => {
              state.status = "loading";
              console.log("h")
          })
          .addCase(loginUserAsyc.rejected, (state,action) => {
            state.status = "reject";
            state.error=action.payload.data
            console.log("here->",action.payload)
        } )
          .addCase(loginUserAsyc.fulfilled, (state, action) => {
              state.status = "idle";
              state.loggedInUserToken = localStorage.getItem("token");
          });
      
    //   .addCase(loginUserAsyc.rejected, (state, action) => {
    //     state.status = "idle";
    //     state.error = action.payload.data;
    //     console.log(state.error);
    //   })
    //   .addCase(signOutAsyc.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(signOutAsyc.fulfilled, (state, action) => {
    //     state.status = "idle";
    //     state.loggedInUserToken = null;
    //   })
    //   .addCase(checkAuthAsyc.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(checkAuthAsyc.fulfilled, (state, action) => {
    //     state.status = "idle";
    //     state.loggedInUserToken = action.payload;
    //     state.userCheck = true;
    //   })
    //   .addCase(checkAuthAsyc.rejected, (state, action) => {
    //     state.status = "idle";
    //     state.userCheck = true;
    //   });
  },
});

// export const selectCount = (state) => state.counter.value;
  


export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const errorForLogin = (state) => state.auth.error
export const selectCreatUser =  (state)=> state.auth.creatUser
// export const selectError = (state) => state.auth.error;
// export const selectUserChecked = (state) => state.auth.userCheck;

export default authSlice.reducer;
