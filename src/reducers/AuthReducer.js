const authReducer = (
  state = {
    authData: null,
    loading: false,
    error: false,
    fail: null,
  },
  action
) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: false };
    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, error: false };
    case "AUTH_FAIL":
      return { ...state, loading: false, error: true, fail: action.data };

    case "LOG_OUT":
      localStorage.clear();
      return {
        ...state,
        authData: null,
        loading: false,
        error: false,
      };

    default:
      return state;
  }
};

export default authReducer;
