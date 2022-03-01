import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false

}

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
        startLoading(state, actions){
            state.loading = true;
        },
        finishLoading(state, actions){
            state.loading = false;
        }

  }
});

export const {startLoading, finishLoading} = loadingSlice.actions

export default loadingSlice.reducer