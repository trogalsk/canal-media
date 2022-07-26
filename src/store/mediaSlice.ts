import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AppState, AppThunk } from "./store";
import { DiscoverService, SearchService, MovieService } from "../services";
import {
  IMovieFilterModel,
  IMovieListModel,
  IMovieListStateModel,
  IMovieModel,
  IMovieStateModel,
} from "../models";

const discoverService = new DiscoverService();
const searchService = new SearchService();
const movieService = new MovieService();

export interface MediaState {
  movieList: { [key: string]: IMovieListStateModel };
  mediaSearch: IMovieListStateModel;
  media: IMovieStateModel;
}

const initialState: MediaState = {
  mediaSearch: {
    results: [],
    pending: false,
  },
  movieList: {},
  media: {
    pending: false,
  },
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getMovieList = createAsyncThunk<
  IMovieListModel,
  { mediaListId: string; filter?: IMovieFilterModel }
>("media/getMediaList", async (payload) => {
  return discoverService.getMovieList(payload.filter);
});

export const searchMovie = createAsyncThunk<
  IMovieListModel,
  { filter?: IMovieFilterModel }
>("media/searchMovie", async (payload) => {
  return searchService.searchMovie(payload.filter);
});

export const getMovie = createAsyncThunk<IMovieModel, { id: number }>(
  "media/get",
  async (payload) => {
    return movieService.get(payload.id);
  },
);

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    clearMediaSearch: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.mediaSearch.results = [];
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    clearMediaList: (state, action: PayloadAction<string>) => {
      state.movieList[action.payload].results = [];
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getMovieList.pending, (state, action) => {
        const mediaListId = action.meta.arg.mediaListId;
        state.movieList = {
          ...state.movieList,
          [mediaListId]: {
            ...state.movieList[mediaListId],
            filter: action.meta.arg.filter,
            error: undefined,
            pending: true,
          },
        };
      })
      .addCase(getMovieList.fulfilled, (state, action) => {
        const mediaListId = action.meta.arg.mediaListId;
        state.movieList = {
          ...state.movieList,
          [mediaListId]: {
            ...state.movieList[mediaListId],
            ...action.payload,
            error: undefined,
            pending: false,
          },
        };
      })
      .addCase(getMovieList.rejected, (state, action) => {
        const mediaListId = action.meta.arg.mediaListId;
        state.movieList = {
          ...state.movieList,
          [mediaListId]: {
            ...state.movieList[mediaListId],
            error: action.error,
            pending: false,
          },
        };
      })
      .addCase(searchMovie.pending, (state) => {
        state.mediaSearch.pending = true;
      })
      .addCase(searchMovie.fulfilled, (state, action) => {
        const pageNumber = action.payload.page || 1;
        let entities: IMovieModel[] = [];

        if (pageNumber === 1) {
          entities = action.payload.results;
        } else if (pageNumber > 1) {
          entities = [...state.mediaSearch.results, ...action.payload.results];
        }

        state.mediaSearch = {
          ...state.mediaSearch,
          ...action.payload,
          results: entities,
          filter: action.meta.arg.filter,
          pending: false,
          error: undefined,
        };
      })
      .addCase(searchMovie.rejected, (state, action) => {
        state.mediaSearch = {
          ...state.mediaSearch,
          pending: false,
          error: action.error,
        };
      })
      .addCase(getMovie.pending, (state) => {
        state.media.pending = true;
      })
      .addCase(getMovie.fulfilled, (state, action) => {
        state.media = {
          data: action.payload,
          pending: false,
          error: undefined,
        };
      })
      .addCase(getMovie.rejected, (state, action) => {
        state.media = {
          data: undefined,
          pending: false,
          error: action.error,
        };
      });
  },
});

/// Export actions
export const { clearMediaSearch, clearMediaList } = mediaSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectMovieLists = (state: AppState) => state.media.movieList;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const clearMovieList =
  (id: string): AppThunk =>
  (dispatch, getState) => {
    const movieLists = selectMovieLists(getState());
    if (movieLists[id]) {
      dispatch(clearMediaList(id));
    }
  };

export default mediaSlice.reducer;
