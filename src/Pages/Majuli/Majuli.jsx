import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Majuli.css";
import { SpinnerDotted } from "spinners-react";
import { APIS } from "../../data/header";
const Majuli = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const dist = location.state;
  // console.log(dist);

  useEffect(() => {
    setLoading(true);
    APIS.get(`/own/donload/majuli/district/${dist}`)
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  const printerDownload = () => {
    window.print();
  };
  return (
    <div className="main-majuli">
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
          <div className="user-pdf-button-with-dist">
            <button onClick={printerDownload}>Download</button>
            <h2>{dist ? dist : ""}</h2>
          </div>
          <div className="second-majuli-card">
            {data.map((each, key) => (
              <div key={key} className="single-majuli-card">
                <img src={each.profilePic} alt="" />
                <h3>{each.name}</h3>
                {/* <h3>{each.phone}</h3> */}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Majuli;
