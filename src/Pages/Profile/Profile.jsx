import React, { useEffect, useState } from "react";
import "./Profile.css";
import { APIS, headers } from "../../data/header";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useSelector } from "react-redux";
const Profile = () => {
  const UUU = useSelector((state) => state.authReducer.authData);

  const [user, setUser] = useState([]);

  // FETCH THERE INFORMATION FROM DATA BASE
  const getUserDataGromApis = () => {
    APIS.get(`/user/user-get-profile/${UUU?._id}`, {
      headers: headers,
    })
      .then((res) => {
        // console.log(res);
        setUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // AFTER LOGIN SUCCESS FETCH THERE INFORMATION
  useEffect(() => {
    getUserDataGromApis();
  }, []);

  const downloadPdf = () => {
    const capture = document.querySelector(".profile-second-card");
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("l", "mm", "a4");

      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);

      doc.save(`${user?.name}.pdf`);
    });
  };

  return (
    <div className="profile_main_card">
      {/* <div className="cober-img-card">
        <img src="https://brihaspathi.com/img/logo/logo.png" alt="" />
      </div> */}
      <div className="profile-second-card">
        <div className="profile_info_card">
          <img src={user?.profilePic} alt="" />
          <div className="name_and_designation_profile">
            <h2>{user?.name}</h2>
            <span>{user?.email}</span>
          </div>
        </div>
        <div className="other-details-main-card">
          <div className="remaining-details">
            <div>
              <span>State</span>
              <span>{user.state}</span>
            </div>
            <div>
              <span>District</span>
              <span>{user?.district}</span>
            </div>
            <div>
              <span>Assembly</span>
              <span>{user?.assembly}</span>
            </div>
            <div>
              <span>Mandal</span>
              <span>{user?.mandal}</span>
            </div>
            <div>
              <span>PIN Code</span>
              <span>{user?.pinCode}</span>
            </div>

            <div>
              <span>Phone</span>
              <span>{user?.phone}</span>
            </div>
            <div>
              <span>UPI Number</span>
              <span>{user?.phonepe}</span>
            </div>
            <div>
              <span>Adhar Number</span>
              <span>{user?.adharnumber}</span>
            </div>
            <div>
              <span>Bank Name</span>
              <span>{user?.bankname}</span>
            </div>
            <div>
              <span>Bank Number</span>
              <span>{user?.banknumber}</span>
            </div>
            <div>
              <span>IFSC</span>
              <span>{user?.IFSC}</span>
            </div>
            <div>
              <span>Father Name</span>
              <span>{user?.fatherName}</span>
            </div>
            <div>
              <span>Mother Name</span>
              <span>{user?.motherName}</span>
            </div>
            <div>
              <span>Date of Registrations</span>
              <span>{user?.dateOfRegister}</span>
            </div>
          </div>
          <div className="remainng-details-second-card">
            <img src={user?.voteridurl} alt="" />
            <img src={user?.adharidurl} alt="" />
          </div>
        </div>
      </div>
      <div className="profile-socila-media-btn-card">
        <button onClick={downloadPdf}>Download Pdf</button>
      </div>
    </div>
  );
};

export default Profile;
