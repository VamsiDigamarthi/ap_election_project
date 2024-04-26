const camsReducer = (
  state = { cams: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case "UPLOAD_START":
      return { ...state, error: false, loading: true };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        cams: action.data,
        loading: false,
        error: false,
      };
    case "UPLOAD_FAIL":
      return { ...state, loading: false, error: true };

    default:
      return state;
  }
};

export default camsReducer;
