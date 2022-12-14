import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    currentUser: {},
    isAuth: false
  },
  reducers: {

  }
})

export  default userSlice.reducer