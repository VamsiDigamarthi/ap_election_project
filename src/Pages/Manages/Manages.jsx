import React, { useEffect, useState } from "react";
import "./Manages.css";
import { APIS, headers } from "../../data/header";
import { staticTaskAccepted } from "../../util/showmessages";
import { ToastContainer } from "react-toastify";
import { SpinnerDotted } from "spinners-react";
const Manages = () => {
  // ALL PS STORES
  const [allStatesPs, setAllStatesPs] = useState([]);

  const [psLoading, setPsLoading] = useState(true);

  // STORE UNIQUE ALL STATE NAMES
  const [uniqueStateNames, setUniqueStateNames] = useState([]);

  // STORES UNIQUE DISTRICT NAMES
  const [uniqueDistrictNames, setUniqueDistrictNames] = useState([]);

  // STORE STATES AND DISTRICT NAMES
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // STORES STATE AND DISTRICT NAME
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");

  // INTIALLY FETCH ALL PS DETAILS
  const initiallyPsDetails = () => {
    setPsLoading(true);
    APIS.get(
      "own/allstates/ps/details",

      {
        headers: headers,
      }
    )
      .then((res) => {
        setPsLoading(false);
        // console.log(res.data);
        setAllStatesPs(res.data);
      })
      .catch((e) => {
        setPsLoading(false);
        console.log(e);
      });
  };
  useEffect(() => {
    initiallyPsDetails();
  }, []);

  // UNIQUE IDENTIFY STATES

  useEffect(() => {
    const unique = [...new Set(allStatesPs?.map((item) => item.State))];
    // console.log(unique);
    setUniqueStateNames(unique);
  }, [allStatesPs]);

  const selectSate = (e) => {
    setState(e.target.value);
    const filterSpecificState = allStatesPs?.filter(
      (each) => each.State === e.target.value
    );
    // console.log(filterSpecificState);

    const uniqueDis = [
      ...new Set(filterSpecificState?.map((item) => item.District)),
    ];
    // setDistrict("");
    setUniqueDistrictNames(uniqueDis);
    setDistrict(uniqueDis[0]);
  };

  const selectDistName = (e) => {
    setDistrict(e.target.value);
  };

  const onDeleteSpecificPSData = () => {
    // console.log(state, district);

    if (state !== "" && district !== "") {
      setLoading(true);
      setErrorMsg("");
      APIS.delete(`/own/all/delete/state/${state}/district/${district}`)
        .then((res) => {
          console.log(res.data);
          setLoading(false);
          initiallyPsDetails();
          staticTaskAccepted(res?.data?.msg);
        })
        .catch((e) => console.log(e));
    } else {
      setErrorMsg("Please Seleted State And District Names");
    }
  };

  return (
    <div className="all-manages">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="tosted"
      />
      <div className="district-wise-ps-delete-card">
        <h2>Deleted District Wise Ps</h2>
        <span
          style={{
            color: "orange",
          }}
        >
          {errorMsg && errorMsg}
        </span>
        {psLoading ? (
          <div
            style={{
              width: "100%",
              height: "80vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SpinnerDotted
              size={50}
              thickness={100}
              speed={100}
              color="#36ad47"
            />
          </div>
        ) : (
          <div>
            <select onChange={selectSate}>
              <option disabled selected hidden>
                select state
              </option>

              {uniqueStateNames?.map((each, key) => (
                <option value={each} key={key}>
                  {each}
                </option>
              ))}
            </select>
            <select onChange={selectDistName}>
              <option disabled selected hidden>
                select disct
              </option>
              {uniqueDistrictNames?.map((each, key) => (
                <option key={key}>{each}</option>
              ))}
            </select>
            <button onClick={onDeleteSpecificPSData}>
              {loading ? "Loading ..." : "Delete"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Manages;
