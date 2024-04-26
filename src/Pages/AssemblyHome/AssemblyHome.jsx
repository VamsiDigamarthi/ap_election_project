import React, { useEffect, useState } from "react";
import "./AssemblyHome.css";
import { APIS } from "../../data/header";
import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
const AssemblyHome = () => {
  const UUU = useSelector((state) => state.authReducer.authData);
  const [initiallyAllPs, setInitiallyAllPs] = useState([]);

  // THIS IS PS-NUMBERS PIE-CHART VALUES STORE STATE
  const [psChartNumber, setPsChartNumber] = useState([]);

  // assign ps state

  const [assignPs, setAssignPs] = useState(0);
  const [notAssignPs, setNotAssignPs] = useState(0);

  // const [allInitiallyUsers, setAllInitiallyUsers] = useState([]);

  const options = {
    labels: ["Assign", "Not Assign"],
    colors: ["#b8bbbf", "#ff6f00"],
  };
  const [update, setUpdate] = useState([30, 70]);

  const allPsInitially = () => {
    APIS.get(`/assembly/allps/assemblycoor/${UUU?._id}`)
      .then((res) => {
        console.log(res.data);
        setInitiallyAllPs(res.data);
      })
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    allPsInitially();
    // allUsers();
  }, []);

  // THIS FUNCTION CALCULATED THE PS NUMBER ASSIGN OR NOT AND SHOW CHARTS
  const calPsChart = () => {
    const assignPsChart = initiallyAllPs.filter(
      (each) => each.eassign === "yes"
    );
    setAssignPs(assignPsChart.length);
    const assignPsChartPer =
      (assignPsChart.length / initiallyAllPs.length) * 100;
    const notAssignPsChart = initiallyAllPs.length - assignPsChart.length;
    const notAssignPsChartPer =
      (notAssignPsChart / initiallyAllPs.length) * 100;
    setNotAssignPs(notAssignPsChart);
    setPsChartNumber([assignPsChartPer, notAssignPsChartPer]);
  };
  // AFTER ALL LOCATIONS AND PS-NUMBER CALCULATIONS CALL THIS FUNCTION SHOW CHARTS
  useEffect(() => {
    setUpdate(psChartNumber);
    // setUpdateLocations(locationChartNumber);
  }, [psChartNumber]);

  useEffect(() => {
    calPsChart();
  }, [initiallyAllPs]);

  return (
    <div>
      <div className="district__dashboard__main">
        <div className="district__name__display">
          <h3>
            Hi <span style={{ color: "#ff6f00" }}>{UUU?.name}</span>
          </h3>
          <span>Check Your All Status Of Locations</span>
        </div>
        <div className="ps_location_card">
          <div className="Ps_cards_card">
            <span>{initiallyAllPs?.length}</span>
            <span>No Of PS </span>
          </div>

          <div className="Ps_cards_card">
            <span>{assignPs}</span>
            <span>Assigned Ps</span>
          </div>
          <div className="Ps_cards_card">
            <span>{notAssignPs}</span>
            <span>Not Assigned Ps</span>
          </div>
        </div>
        {/* charts */}
        <div className="charts__admin__display">
          <Chart options={options} series={update} type="pie" width="100%" />
        </div>
      </div>
    </div>
  );
};

export default AssemblyHome;
