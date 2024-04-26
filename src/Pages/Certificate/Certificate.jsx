import React from "react";
import { useSelector } from "react-redux";
import "./Certificate.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { APIS, headers } from "../../data/header";
import { useNavigate } from "react-router-dom";
const Certificate = () => {
  const UUU = useSelector((state) => state.authReducer.authData);
  const navigate = useNavigate();
  const downloadPdf = () => {
    const capture = document.querySelector(".certificate__card");
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("l", "mm", "a4");

      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);

      doc.save("certificate.pdf");
    });

    APIS.put(
      `/user/download-certificate/${UUU?._id}`,
      { data: "true" },
      {
        headers: headers,
      }
    )
      .then((res) => {
        console.log(res.data);
        navigate(-1);
      })
      .catch((e) => console.log(e));
  };

  console.log(UUU);

  return (
    <div className="certificate__main">
      <div className="certificate__card">
        <img src="Images/1-01.png" alt="" />
        <img className="flower__image" src="images/2-01.png" alt="" />
        <div className="certificate__logo__card">
          <img src="Images/left.png" alt="" />
          <h3>ELECTION COMMISION OF {UUU?.state.toUpperCase()}</h3>
          <img src="Images/logo.png" alt="" />
        </div>
        <div className="certificate__contras">
          <img src="Images/4.png" alt="" />
        </div>
        <div className="certificate__text__card">
          <h1>This Certificate is Proudly Presented to</h1>
        </div>
        <div className="certificate__diamond__card">
          <img src="Images/diamond.png" alt="" />
          <span>{UUU?.name}</span>
          <img src="Images/diamond.png" alt="" />
        </div>
        <div className="certificate__text__card__container">
          <h1>For Successful Participation as Volunteer for</h1>
          <h1>General Election of {UUU?.state} 2024 Webcasting</h1>
        </div>
        <div className="certificate__left__signa">
          <span>Signature of Managing Director</span>
          <h4>Rajasekhar Papolu</h4>
        </div>
        {/* <div className="certificate__right__signa">
          <span>Signature of District Collector</span>
          <h4>Some Name</h4>
        </div> */}
      </div>
      <div className="download__button__card">
        <button onClick={downloadPdf}>Download Certificate</button>
      </div>
    </div>
  );
};

export default Certificate;
