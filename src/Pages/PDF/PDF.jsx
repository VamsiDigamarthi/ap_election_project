import React, { useEffect, useState } from "react";
import "./PDF.css";
import { APIS, headers } from "../../data/header";
import { SpinnerDotted } from "spinners-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Link } from "react-router-dom";
const PDF = () => {
  const [psData, setPsData] = useState([]);

  const [loading, setPsLoading] = useState(true);

  const [uniqueDistrict, setUniqueDistrict] = useState([]);

  const [uniqueAssembly, setUniqueAssembly] = useState([]);

  const [district, setDistrict] = useState("");
  const [assembly, setAssembly] = useState("");

  const [
    userProfileDownloadDistrictState,
    setUserProfileDownloadDistrictState,
  ] = useState("");

  const [apiFilterData, setApiFilterData] = useState([]);

  const [apiFilterDataLoader, setApiFilterDataLoader] = useState(null);

  useEffect(() => {
    setPsLoading(true);
    APIS.get(
      "own/only/assam/psdata",

      {
        headers: headers,
      }
    )
      .then((res) => {
        setPsLoading(false);
        // console.log(res.data);
        setPsData(res.data);
      })
      .catch((e) => {
        setPsLoading(false);
        console.log(e);
      });
  }, []);

  // after fetching ps date filter unique district

  useEffect(() => {
    const uniqueDis = [...new Set(psData?.map((item) => item.District.trim()))];
    setUniqueDistrict(uniqueDis);
  }, [psData]);

  const onSelecteDistrict = (e) => {
    setDistrict(e.target.value);
  };

  useEffect(() => {
    if (district !== "") {
      const filterAssembly = psData.filter(
        (each) => each.District.trim() === district.trim()
      );
      const uniqueAssembly = [
        ...new Set(filterAssembly?.map((item) => item.AC_Name)),
      ];
      setAssembly(uniqueAssembly[0]);
      setUniqueAssembly(uniqueAssembly);
    }
  }, [district]);
  const onSelecteAssembly = (e) => {
    setAssembly(e.target.value);
  };

  // const onFetchAssemblyWiseData = () => {
  //   setApiFilterDataLoader(true);
  //   APIS.get(
  //     `own/fetch/pdf/data/assembly/${assembly}/district/${district}`,

  //     {
  //       headers: headers,
  //     }
  //   )
  //     .then((res) => {
  //       setApiFilterDataLoader(false);
  //       // console.log(res.data);
  //       setApiFilterData(res.data);
  //     })
  //     .catch((e) => {
  //       setApiFilterDataLoader(false);
  //       console.log(e);
  //     });
  // };

  const download = (key) => {
    const capture = document.getElementById(key?.key);
    // console.log(capture);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");

      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);

      doc.save(`${key?.name}.pdf`);
    });

    APIS.put(`/user/previwe/${key?.id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  };

  const downloadAdhar = (value) => {
    const capture = document.getElementById(value?.id);
    html2canvas(capture, {
      width: capture.offsetWidth,
      height: capture.offsetHeight,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");

      // Scale the image to fit the PDF page
      const scale = Math.min(
        doc.internal.pageSize.getWidth() / canvas.width,
        doc.internal.pageSize.getHeight() / canvas.height
      );
      const scaledWidth = canvas.width * scale;
      const scaledHeight = canvas.height * scale;

      doc.addImage(imgData, "PNG", 0, 0, scaledWidth, scaledHeight);
      doc.save(`${value?.name}adhaar.pdf`);
      // document.body.removeChild(element);
    });
  };

  const userProfileDownloadDistrict = (e) => {
    setUserProfileDownloadDistrictState(e.target.value);
  };

  console.log(userProfileDownloadDistrictState);
  console.log(
    userProfileDownloadDistrictState === "" ? "not-allowed" : "pointer"
  );
  return (
    <div className="download--user--pdfs-main--card">
      {loading ? (
        <div
          style={{
            width: "100%",
            height: "100%",
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
        <>
          <div className="show--case--user--select--card">
            <select onChange={onSelecteDistrict}>
              <option disabled selected hidden>
                SELECT DISTRICT
              </option>
              {uniqueDistrict.map((each, key) => (
                <option key={key}>{each}</option>
              ))}
            </select>
            <select onChange={onSelecteAssembly}>
              <option disabled selected hidden>
                SELECT ASSEMBLY
              </option>
              {uniqueAssembly.map((each, key) => (
                <option key={key}>{each}</option>
              ))}
            </select>
            <button>
              <Link
                style={{
                  textDecoration: "none",
                  color: "#fff",
                }}
                to="/user/all/assembly/pdf"
                state={{ assembly, district }}
              >
                Submit
              </Link>
              {/* {apiFilterDataLoader ? "Loading ..!" : "Submit"} */}
            </button>
          </div>
          <div className="majuli-card-main">
            <h2>User Profile Download</h2>
            <div>
              <select onChange={userProfileDownloadDistrict}>
                <option disabled selected hidden>
                  SELECT DISTRICT
                </option>
                {uniqueDistrict.map((each, key) => (
                  <option key={key}>{each}</option>
                ))}
              </select>
              {/* <button>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                  }}
                  to="/user/all/majuli/pdf"
                  state={{ userProfileDownloadDistrictState }}
                >
                  Download Users pdf
                </Link>
              </button> */}
              {userProfileDownloadDistrictState !== "" ? (
                <Link
                  style={{
                    textDecoration: "none",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                  to="/user/all/majuli/pdf"
                  state={userProfileDownloadDistrictState}
                  // to={{
                  //   pathname: "/user/all/majuli/pdf",
                  //   state: { userProfileDownloadDistrictState },
                  // }}
                >
                  <button
                    style={{
                      width: "200px",
                      padding: "10px",
                      background: "orangered",
                      border: "none",
                      outline: "none",
                      color: "#fff",
                      borderRadius: "9px",
                      height: "40px",
                      cursor: "pointer",
                    }}
                  >
                    Download Users pdf
                  </button>
                </Link>
              ) : (
                <button
                  style={{
                    cursor: "not-allowed",
                  }}
                  disabled
                >
                  Download Users pdf
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PDF;
