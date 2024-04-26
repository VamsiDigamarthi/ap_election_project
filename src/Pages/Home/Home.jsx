import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../Header/Header";
import { APIS, headers } from "../../data/header";
import { FaCameraRetro } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import Chart from "react-apexcharts";
import { MdArrowCircleUp } from "react-icons/md";

import { useSelector } from "react-redux";

const Home = () => {
  const UUU = useSelector((state) => state.authReducer.authData);

  // THIS TWO STATES ARE STORING CHART VALUES AND TEXT
  // console.log(UUU);
  const options = {
    labels: ["Assign", "Not Assign"],
    colors: ["green", "#ff6f00"],
  };
  const [update, setUpdate] = useState([60, 40]);

  //  APPLY BTN CLICK FETCH COORESPONDING DISTRICT COORDINATOR STORE STATE
  const [
    correspondingDistrictCoordinator,
    setCorrespondingDistrictCoordinator,
  ] = useState(null);

  // THIS BOTH STATES ARE STORING PS DETAILS
  const [initialMainPsData, setInitialMainPsData] = useState([]);
  const [mainCamDataFromApp, setMainCamDataFromApp] = useState([]);

  // THIS ALL STATES ARE STORING COUNT AND PERCENTAGE VALUES
  const [assignPsCount, setAssignPsCount] = useState(0);
  const [notAssignPsCount, setNotAssignPsCount] = useState(0);
  const [assignPsPercentage, setAssignPsPercentage] = useState(0);
  const [notAssignPsPercentage, setNotAssignPsPercentage] = useState(0);

  // ALL DISTRICT NAMES STORES
  const [disticts, setDisticts] = useState(null);

  // ALL DISTRICT COORDINATOR

  const [allDistrictCoor, setAllDistrictCoor] = useState([]);

  // INITIALLY ALL STATE CAMS DETAILS FETCHING FROM DATA BASE
  const onGetAllPsDetails = () => {
    APIS.get(`/state/all-ps-details-fetch-super-admin/${UUU?.state}`, {
      headers: headers,
    })
      .then((res) => {
        // console.log(res.data);
        setInitialMainPsData(res.data);
        setMainCamDataFromApp(res.data);
      })
      .catch((e) => {
        console.log(e?.response?.data?.msg);
      });
  };

  // GET ALL DISTRICT COORDINATOR IN SPECIFIC STATE

  const allDistrictCoorInSpecificField = () => {
    APIS.get(`/state/all/district/coordinator/${UUU?.state}`, {
      headers: headers,
    })
      .then((res) => {
        // console.log(res.data);
        setAllDistrictCoor(res.data);
      })
      .catch((e) => {
        console.log(e?.response?.data?.msg);
      });
  };

  useEffect(() => {
    onGetAllPsDetails();
    allDistrictCoorInSpecificField();
  }, []);

  // AFTER DATA FETCHING CALCULATED THE COUNT AND PERCENTAGE OF PS DETAILS
  useEffect(() => {
    let notAssignPs = mainCamDataFromApp.filter(
      (each) => each.eassign === "yes"
    );
    console.log(notAssignPs.length);
    let assignPs = mainCamDataFromApp.length - notAssignPs.length;
    setNotAssignPsCount(assignPs);
    setAssignPsCount(notAssignPs.length);
    let assignPsPerce = (assignPs / mainCamDataFromApp.length) * 100;
    let notAssignPsPerce =
      (notAssignPs.length / mainCamDataFromApp.length) * 100;
    setAssignPsPercentage(notAssignPsPerce);
    setNotAssignPsPercentage(assignPsPerce);

    const uniqueDistrict = [
      ...new Set(mainCamDataFromApp.map((item) => item.District)),
    ];
    setDisticts(uniqueDistrict);
  }, [mainCamDataFromApp]);

  // AFTER CALCULATION COMPLETED UPDATED THE CHART
  useEffect(() => {
    setUpdate([assignPsPercentage, notAssignPsPercentage]);
  }, [notAssignPsPercentage, assignPsPercentage]);

  // HEADER APPLY BTN CLICK CALL THIS FUNCTION
  const onApplyBtnClickToFetchData = (data) => {
    let { selectedState, selectedDist } = data;
    // console.log(data);
    if (selectedState !== null && selectedDist !== null) {
      // FETCH THE PS DATILS AND SHOW THERE CHART
      APIS.post(
        "/state/header-apply-btn-click-psc-data",
        { selectedState, selectedDist },
        {
          headers: headers,
        }
      )
        .then((res) => {
          // console.log(res.data);

          setMainCamDataFromApp(res.data);
        })
        .catch((e) => console.log(e));

      // FETCH THE DISTRICT COORDINATOR DETAILS FROM DATA BASE
      APIS.get(
        `/state/fetch-district-coordinator/${selectedDist}/state/${selectedState}`,

        {
          headers: headers,
        }
      )
        .then((res) => {
          console.log(res.data);
          setCorrespondingDistrictCoordinator(res.data);
        })
        .catch((e) => console.log(e));
    }
  };

  // console.log(mainCamDataFromApp);
  // console.log(disticts);

  //

  const onCalculatedTotalCames = (district) => {
    // console.log(district);
    let singleDistrictPsCount = mainCamDataFromApp.filter(
      (each) => each.District === district
    );
    return singleDistrictPsCount.length;
  };

  const totalUniqueLocationsDistrictWise = (district) => {
    let singleDistrictPsCount = mainCamDataFromApp.filter(
      (each) => each.District === district
    );
    const key = "Location";
    const arrayUniqueByKey = [
      ...new Map(
        singleDistrictPsCount.map((item) => [item[key], item])
      ).values(),
    ];

    return arrayUniqueByKey.length;
  };

  const assignUniqueLocations = (disticts) => {
    let singleDistrictPsCount = mainCamDataFromApp.filter(
      (each) => each.District === disticts
    );
    const assignTask = singleDistrictPsCount.filter(
      (each) => each.eassign === "yes"
    );

    return assignTask.length;
  };

  const assignPsPercentageValue = (disticts) => {
    let singleDistrictPsCount = mainCamDataFromApp.filter(
      (each) => each.District === disticts
    );

    const assignTask = singleDistrictPsCount.filter(
      (each) => each.eassign === "yes"
    );
    let per = (assignTask.length / singleDistrictPsCount.length) * 100;
    return per;
  };

  const notAssignUniqueLocations = (disticts) => {
    let singleDistrictPsCount = mainCamDataFromApp.filter(
      (each) => each.District === disticts
    );

    const assignTask = singleDistrictPsCount.filter(
      (each) => each.eassign === "yes"
    );

    return singleDistrictPsCount.length - assignTask.length;
  };

  const notAssignPsPercentageValue = (disticts) => {
    let singleDistrictPsCount = mainCamDataFromApp.filter(
      (each) => each.District === disticts
    );

    const assignTask = singleDistrictPsCount.filter(
      (each) => each.eassign !== "yes"
    );

    let per = (assignTask.length / singleDistrictPsCount.length) * 100;

    return per;
  };

  // console.log(allDistrictCoor);

  const districtCoorName = (name) => {
    // console.log("xcvbnm,.");
    const districtCorr = allDistrictCoor?.filter(
      (each) => each.district === name
    );
    // console.log(districtCorr);
    return districtCorr[0]?.name;
  };

  const districtCoorPhone = (name) => {
    const districtCorr = allDistrictCoor?.filter(
      (each) => each.district === name
    );
    // console.log(districtCorr);
    return districtCorr[0]?.phone;
  };

  return (
    <div className="super__admin__main">
      <span className="all__pages__over__view new__over__view">Over View</span>
      <div className="super__admin__second__main">
        <Header
          mainCamDataFromApp={initialMainPsData}
          onApplyBtnClickToFetchData={onApplyBtnClickToFetchData}
        />
        <div className="super__admin__main__cats__card">
          <div className="chats_first_card">
            <h2>
              Hi,{" "}
              <span
                style={{
                  color: "#ff6f00",
                }}
              >
                {UUU?.name}
              </span>
            </h2>
            <span>In this report you will find yor cams updated</span>
            <div className="all__cam__card">
              <div className="super_admin_car_number_card">
                <div>
                  <div
                    className="icond__back__change"
                    style={{
                      background: "rgb(132, 232, 245)",
                    }}
                  >
                    <FaCameraRetro />
                  </div>
                  <BsThreeDots size={22} />
                </div>
                <div
                  style={{
                    fontFamily: "Courier New, Courier, monospace",
                  }}
                >
                  <h3 style={{ marginLeft: "0px", marginBottom: "10px" }}>
                    {/* {secondMainFromMainCam.length} */}
                    Total Cams
                  </h3>
                  <span>{mainCamDataFromApp.length}</span>
                </div>
                <div
                  className="cam_percentage_card"
                  style={{
                    color: "rgb(132, 232, 245)",
                  }}
                >
                  <MdArrowCircleUp size={20} />
                  <span>100%</span>
                </div>
              </div>
              {/* second */}
              <div className="super_admin_car_number_card">
                <div>
                  <div
                    className="icond__back__change"
                    style={{
                      background: "green",
                    }}
                  >
                    <FaCameraRetro />
                  </div>
                  <BsThreeDots size={22} />
                </div>
                <div
                  style={{
                    fontFamily: "Courier New, Courier, monospace",
                  }}
                >
                  <h3 style={{ marginLeft: "0px", marginBottom: "10px" }}>
                    {/* {onLineStatusNumberState.length} */} Assign PS
                  </h3>
                  <span>{assignPsCount}</span>
                </div>
                <div
                  className="cam_percentage_card"
                  style={{
                    color: "green",
                  }}
                >
                  <MdArrowCircleUp size={20} />
                  {/* {onLineStatusPercentageState.toFixed()} */}
                  <span>{assignPsPercentage?.toFixed(1)}%</span>
                </div>
              </div>
              {/* third */}
              <div className="super_admin_car_number_card">
                <div>
                  <div
                    className="icond__back__change"
                    style={{
                      background: "#ff6f00",
                    }}
                  >
                    <FaCameraRetro />
                  </div>
                  <BsThreeDots size={22} />
                </div>
                <div
                  style={{
                    fontFamily: "Courier New, Courier, monospace",
                  }}
                >
                  <h3 style={{ marginLeft: "0px", marginBottom: "10px" }}>
                    {/* {offLineStatusNumberState} */}Not Assign Ps
                  </h3>
                  <span>{notAssignPsCount}</span>
                </div>
                <div
                  className="cam_percentage_card"
                  style={{
                    color: "#ff6f00",
                  }}
                >
                  <MdArrowCircleUp size={20} />
                  {/* {offLineStatusPercentageState.toFixed()} */}
                  <span>{notAssignPsPercentage?.toFixed(1)}%</span>
                </div>
              </div>
              {/* third end */}
            </div>
          </div>
          <div className="chats_second_card">
            <div className="chart__card">
              <h4>Status of Cameras</h4>
              <Chart
                options={options}
                series={update}
                type="donut"
                width="100%"
              />
            </div>
          </div>
        </div>
        {/* coresponding district coordinator */}

        {/* */}
        {/*  */}
        {disticts?.map((each, key) => (
          <div key={key} className="coresponding__district__main">
            <h3>{each}</h3>
            {/* <spv>{onFilterMutlipleDistrict(each)}</spv> */}
            <div className="each-district-values-singless">
              <div className="all__cam__card">
                <div className="super_admin_car_number_carddd">
                  <div>
                    <div
                      className="icond__back__change"
                      style={{
                        background: "rgb(132, 232, 245)",
                      }}
                    >
                      <FaCameraRetro />
                    </div>
                    <BsThreeDots size={22} />
                  </div>
                  <div
                    style={{
                      fontFamily: "Courier New, Courier, monospace",
                    }}
                  >
                    <h3 style={{ marginLeft: "0px", marginBottom: "10px" }}>
                      {/* {secondMainFromMainCam.length} */}
                      Total Cams
                    </h3>
                    <span>{onCalculatedTotalCames(each)}</span>
                  </div>
                  <div
                    className="cam_percentage_card"
                    style={{
                      color: "rgb(132, 232, 245)",
                    }}
                  >
                    <MdArrowCircleUp size={20} />
                    <span>100%</span>
                  </div>
                </div>
                {/* second */}
                {/* <div className="super_admin_car_number_carddd">
                  <div>
                    <div
                      className="icond__back__change"
                      style={{
                        background: "green",
                      }}
                    >
                      <FaCameraRetro />
                    </div>
                    <BsThreeDots size={22} />
                  </div>
                  <div
                    style={{
                      fontFamily: "Courier New, Courier, monospace",
                    }}
                  >
                    <h3 style={{ marginLeft: "0px", marginBottom: "10px" }}>
                      Total Locations
                    </h3>
                    <span>{totalUniqueLocationsDistrictWise(each)}</span>
                  </div>
                  <div
                    className="cam_percentage_card"
                    style={{
                      color: "green",
                    }}
                  >
                    <MdArrowCircleUp size={20} />
                    <span>100 %</span>
                  </div>
                </div> */}
                {/* third */}
                <div className="super_admin_car_number_carddd">
                  <div>
                    <div
                      className="icond__back__change"
                      style={{
                        background: "#ff6f00",
                      }}
                    >
                      <FaCameraRetro />
                    </div>
                    <BsThreeDots size={22} />
                  </div>
                  <div
                    style={{
                      fontFamily: "Courier New, Courier, monospace",
                    }}
                  >
                    <h3 style={{ marginLeft: "0px", marginBottom: "10px" }}>
                      {/* {offLineStatusNumberState} */} Assign Ps
                    </h3>
                    <span>{assignUniqueLocations(each)}</span>
                  </div>
                  <div
                    className="cam_percentage_card"
                    style={{
                      color: "#ff6f00",
                    }}
                  >
                    <MdArrowCircleUp size={20} />
                    {/* {offLineStatusPercentageState.toFixed()} */}
                    <span>{assignPsPercentageValue(each)?.toFixed(1)}%</span>
                  </div>
                </div>
                {/* fouths */}
                <div className="super_admin_car_number_carddd">
                  <div>
                    <div
                      className="icond__back__change"
                      style={{
                        background: "green",
                      }}
                    >
                      <FaCameraRetro />
                    </div>
                    <BsThreeDots size={22} />
                  </div>
                  <div
                    style={{
                      fontFamily: "Courier New, Courier, monospace",
                    }}
                  >
                    <h3 style={{ marginLeft: "0px", marginBottom: "10px" }}>
                      {/* {onLineStatusNumberState.length} */}Not Assign Ps
                    </h3>
                    <span>{notAssignUniqueLocations(each)}</span>
                  </div>
                  <div
                    className="cam_percentage_card"
                    style={{
                      color: "green",
                    }}
                  >
                    <MdArrowCircleUp size={20} />
                    {/* {onLineStatusPercentageState.toFixed()} */}
                    <span>{notAssignPsPercentageValue(each)?.toFixed(1)}%</span>
                  </div>
                </div>
                {/* third end */}
              </div>
            </div>

            <div className="coresponding__district__main">
              <div className="district__cor__name__card">
                <span>District Coordinator</span>
                <span>{districtCoorName(each)}</span>
              </div>
              <div className="district__cor__name__card">
                <span>Mobile Number</span>
                <span>{districtCoorPhone(each)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
