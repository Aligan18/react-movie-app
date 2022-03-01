
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: null ,
    id:null,
    email: null,
    token: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
        setUser(state, actions,) {
            state.name = actions.payload.name;
            state.id = actions.payload.id;
            state.email = actions.payload.email;
            state.token = actions.payload.token

        },
        removeUser(state, actions,) {
            state.name =null
            state.id = null
            state.email = null
            state.token = null

        }



  }
});

export const {setUser, removeUser} = userSlice.actions

export default userSlice.reducer
