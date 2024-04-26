import * as CamApi from "../api/CamRequest";

export const allCamsData = () => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    const { data } = await CamApi.camsD();
    dispatch({ type: "UPLOAD_SUCCESS", data: data });
  } catch (e) {
    console.log(e.response?.data);

    dispatch({ type: "UPLOAD_FAIL", data: e });
  }
};
