import * as AuthApi from "../api/AuthRequest";

export const LogIns = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    // console.log(data);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("/", { replace: true });
  } catch (e) {
    // console.log(e?.response?.data?.msg);
    alert(e?.response?.data?.msg);
    dispatch({ type: "AUTH_FAIL", data: e });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};
