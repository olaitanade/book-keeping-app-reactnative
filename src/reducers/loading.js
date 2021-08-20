import { LOADING, LOADING_MORE, REFRESHING } from '../types'

const initialState = {
  isLoading: false,
  isRefreshing: false,
  isLoadingMore: false
}

const loadingReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADING:
      return {
        ...state,
        isLoading: payload,
      }
    case LOADING_MORE:
      return {
        ...state,
        isLoadingMore: payload
      }
    case REFRESHING:
      return {
        ...state,
        isRefreshing: payload,
      }
    default:
      return state
  }
}

export default loadingReducer
