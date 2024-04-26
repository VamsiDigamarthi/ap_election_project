import React, { useEffect, useState } from "react";
import "./DistShowUser.css";
import { APIS, headers } from "../../data/header";
import { useSelector } from "react-redux";
import { MdPreview } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { FaArrowCircleDown } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const DistShowUser = () => {
  const UUU = useSelector((state) => state.authReducer.authData);

  const [allUser, setAllUser] = useState([]);

  const [showPreviweModalOpen, setShowPreviweModalOpen] = useState(false);
  const [storePreviewUserDetails, setStorePreviewUserDetails] = useState(null);

  // INITIALLY FETCH ALL SCORE BEAT USER FROM DATABASE
  const scoreUserApi = () => {
    APIS.get(`/district/score-user/${UUU?.district}`, {
      headers: headers,
    })
      .then((res) => {
        setAllUser(res.data);
        // console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    scoreUserApi();
  }, []);

  console.log(allUser);

  const openPreviwModal = (user) => {
    setShowPreviweModalOpen(!showPreviweModalOpen);
    setStorePreviewUserDetails(user);
  };

  const downloadPdf = () => {
    const capture = document.querySelector(".profile-second-card");
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("l", "mm", "a4");

      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);

      doc.save(`${storePreviewUserDetails?.name}.pdf`);
    });

    //

    APIS.put(
      `/user/previwe/${storePreviewUserDetails?._id}`,

      {
        headers: headers,
      }
    )
      .then((res) => {
        // console.log(res.data);
        scoreUserApi();
        setShowPreviweModalOpen(!showPreviweModalOpen);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="main-dist-show-user-pdf-card">
      <div className="profile-tablet-card">
        <div className="profile-table-head">
          <p className="profile-name">Name</p>
          <p>Phone</p>
          <p>Assembly</p>
          <p>Previwe and Download</p>
          {/* <p>Download</p> */}
        </div>
        {allUser.map((each, key) => (
          <div
            style={{
              background: key % 2 !== 0 && "rgba(245, 245, 245, 0.801)",
            }}
            key={key}
            className="profile-body"
          >
            <p>{each?.name}</p>
            <p>{each?.phone}</p>
            <p>{each?.assembly}</p>
            <p>
              <MdPreview onClick={() => openPreviwModal(each)} />
              <span>{each?.downloadPreview} type downloaded</span>
            </p>
            {/* <p>
              <FaArrowCircleDown
                onClick={() => downloadPdfSpecificUser(each)}
              />
            </p> */}
          </div>
        ))}
      </div>
      {showPreviweModalOpen && (
        <div className="show-previw-modal-main">
          <div>
            <span>Show Preview User Details</span>
            <ImCross onClick={openPreviwModal} />
          </div>
          <div>
            <div className="profile_main_card">
              <div className="profile-second-card">
                <div className="profile_info_card">
                  <img src={storePreviewUserDetails?.profilePic} alt="" />
                  <div className="name_and_designation_profile">
                    <h2>{storePreviewUserDetails?.name}</h2>
                    <span>{storePreviewUserDetails?.email}</span>
                  </div>
                </div>
                <div className="other-details-main-card">
                  <div className="remaining-details">
                    <div>
                      <span>State</span>
                      <span>{storePreviewUserDetails.state}</span>
                    </div>
                    <div>
                      <span>District</span>
                      <span>{storePreviewUserDetails?.district}</span>
                    </div>
                    <div>
                      <span>Assembly</span>
                      <span>{storePreviewUserDetails?.assembly}</span>
                    </div>
                    <div>
                      <span>Mandal</span>
                      <span>{storePreviewUserDetails?.mandal}</span>
                    </div>
                    <div>
                      <span>PIN Code</span>
                      <span>{storePreviewUserDetails?.pinCode}</span>
                    </div>

                    <div>
                      <span>Phone</span>
                      <span>{storePreviewUserDetails?.phone}</span>
                    </div>
                    <div>
                      <span>UPI Number</span>
                      <span>{storePreviewUserDetails?.phonepe}</span>
                    </div>
                    <div>
                      <span>Adhar Number</span>
                      <span>{storePreviewUserDetails?.adharnumber}</span>
                    </div>
                    <div>
                      <span>Bank Name</span>
                      <span>{storePreviewUserDetails?.bankname}</span>
                    </div>
                    <div>
                      <span>Bank Number</span>
                      <span>{storePreviewUserDetails?.banknumber}</span>
                    </div>
                    <div>
                      <span>IFSC</span>
                      <span>{storePreviewUserDetails?.IFSC}</span>
                    </div>
                    <div>
                      <span>Father Name</span>
                      <span>{storePreviewUserDetails?.fatherName}</span>
                    </div>
                    <div>
                      <span>Mother Name</span>
                      <span>{storePreviewUserDetails?.motherName}</span>
                    </div>
                    <div>
                      <span>Date of Registrations</span>
                      <span>{storePreviewUserDetails?.dateOfRegister}</span>
                    </div>
                  </div>
                  <div className="remainng-details-second-card">
                    <img src={storePreviewUserDetails?.voteridurl} alt="" />
                    <img src={storePreviewUserDetails?.adharidurl} alt="" />
                  </div>
                </div>
              </div>
              <div className="profile-socila-media-btn-card">
                <button onClick={downloadPdf}>Download Pdf</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DistShowUser;
