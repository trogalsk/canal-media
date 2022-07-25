import reducer from '../../store/mediaSlice'

describe('Store - mediaSlice', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(
      {
        mediaSearch: {
          results: [],
          pending: false,
        },
        movieList: {},
        media: {
          pending: false,
        },
      })
  })
})