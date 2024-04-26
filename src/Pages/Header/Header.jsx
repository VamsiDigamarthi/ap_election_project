import React, { useEffect, useState } from "react";
import "./Header.css";

const Header = ({ mainCamDataFromApp, onApplyBtnClickToFetchData }) => {
  // ALL STATE NAMES ARE STORES
  const [state, setState] = useState("");
  // ALL DISTRICT NAMES STORES
  const [disticts, setDisticts] = useState(null);

  // STORE ONE THE STATE VALUE
  const [selectedState, setSelectedState] = useState("");

  // STORE ONE DISTRICT VALUE
  const [selectedDist, setSelectedDist] = useState(null);

  // SELECTED STATE THAT CORRESPONDING DISTRICT COORDINATOR VALUE FILTER FUNCTION
  // AND STORE THE STATE VALUES
  // const selectSate = (e) => {
  //   setDisticts([]);

  //   // filter all district based on state
  //   const allDistrict = mainCamDataFromApp.filter(
  //     (each) => each.State === e.target.value
  //   );

  //   // filter unique district
  //   const uniqueDistrict = [
  //     ...new Set(allDistrict.map((item) => item.District)),
  //   ];
  //   setSelectedState(e.target.value);
  //   setSelectedDist(uniqueDistrict[0]);

  //   setDisticts(uniqueDistrict);
  // };

  // DISTRICT NAME CHANGE CORRESPONDING VALUE STORE  `selectedDist` STATE
  const selectDistName = (e) => {
    setSelectedDist(e.target.value);
  };

  const onApplyBtnClick = () => {
    onApplyBtnClickToFetchData({ state, selectedDist });
  };

  useEffect(() => {
    setDisticts([]);
    // const unique = [...new Set(mainCamDataFromApp?.map((item) => item.State))];
    // console.log(mainCamDataFromApp[0]?.State);
    setState(mainCamDataFromApp[0]?.State);
    const uniqueDistrict = [
      ...new Set(mainCamDataFromApp.map((item) => item.District)),
    ];
    // setSelectedDist(uniqueDistrict[0]);

    setDisticts(uniqueDistrict);
  }, [mainCamDataFromApp]);

  return (
    <div className="header__main">
      <div>
        <div className="store-state-inheader">
          <span>
            Your State <span>{state}</span>
          </span>
        </div>
        {/* <select onChange={selectSate}>
          <option disabled selected hidden>
            select state
          </option>

          {state.map((each, key) => (
            <option key={key}>{each}</option>
          ))}
        </select> */}
        {/* <select value={selectedDist} onChange={selectDistName}>
          <option disabled selected hidden>
            select disct
          </option>
          {disticts?.map((each, key) => (
            <option key={key}>{each}</option>
          ))}
        </select>
        <button onClick={onApplyBtnClick}>Apply</button> */}
      </div>
    </div>
  );
};

export default Header;
