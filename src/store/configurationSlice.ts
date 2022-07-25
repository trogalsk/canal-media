import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ConfigurationService } from "../services";
import { IErrorModel, IConfigurationModel } from "../models";

const configurationService = new ConfigurationService();

export interface ConfigurationState {
  configuration?: IConfigurationModel;
  error?: IErrorModel;
  pending: boolean;
}

const initialState: ConfigurationState = {
  pending: false,
};

export const getConfiguration = createAsyncThunk<IConfigurationModel>(
  "configuration/get",
  async () => {
    return configurationService.get();
  }
);

export const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getConfiguration.pending, (state) => {
        state.pending = true;
      })
      .addCase(getConfiguration.fulfilled, (state, action) => {
        state.pending = false;
        state.configuration = action.payload;
      })
      .addCase(getConfiguration.rejected, (state) => {
        state.pending = false;
      });
  },
});

export default configurationSlice.reducer;
