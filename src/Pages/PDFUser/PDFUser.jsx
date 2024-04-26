import { APIS, headers } from "../../data/header";
import { ToastContainer } from "react-toastify";
import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { SpinnerDotted } from "spinners-react";

import "./PDFUser.css";
import { useSelector } from "react-redux";
const PDFUser = () => {
  const UUU = useSelector((state) => state.authReducer.authData);
  const [user, setUser] = useState(null);
  // const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(true);
    APIS.get(
      `/user/all/user/pdf/file/state/${UUU?.state}/district/${UUU?.district}/assembly/${UUU?.assembly}`,
      {
        headers: headers,
      }
    )
      .then((res) => {
        setLoader(false);
        // console.log(res.data?.length);
        setUser(res.data);
      })
      .catch((e) => {
        console.log(e);
        setLoader(false);
      });
  }, []);

  const download = (key) => {
    // console.log(key);
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
    // console.log(value);
    // const capture = document.getElementById(value?.id);
    // // console.log(capture);
    // html2canvas(capture).then((canvas) => {
    //   const imgData = canvas.toDataURL("img/png");
    //   const doc = new jsPDF("p", "mm", "a4");

    //   const componentWidth = doc.internal.pageSize.getWidth();
    //   const componentHeight = doc.internal.pageSize.getHeight();
    //   doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);

    //   doc.save(`${value?.name}adhaar.pdf`);
    // });
  };

  return (
    <div className="main-user-pdf">
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
      />

      <div className="main__pdf__file__container">
        {loader ? (
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
            {user?.map((each, key) => (
              <div key={key} className="main-p-f-d">
                <div id={key} className="pdf_main_page_card">
                  <h1>DECLARATION BY WEB CASTING AGENTS</h1>
                  <h3 style={{ paddingLeft: "6%" }}>
                    I,{" "}
                    <span style={{ fontWeight: "bold" }}>
                      <span>{each?.name}</span>
                    </span>
                    , do hereby make a solemndeclaration, in connection with the
                    General Election to Lok Sabha 2024, Assam, that:
                  </h3>
                  <ol type="A" className="pdf_ol_main_card">
                    <li>
                      I am not a close relative of any of the contesting
                      candidate/leading <br /> political functionary of the
                      state/district in the aforesaid election
                    </li>
                    <li>
                      No criminal case is pending against me in any court of
                      law.
                    </li>
                  </ol>
                  <div className="pdf-main-imge-card">
                    <img src={each?.profilePic} alt="" />
                    <div className="pdf_user_detaiisl_main">
                      <span>
                        Name --{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {each?.name}
                        </span>
                      </span>

                      <span>
                        Address --{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {each?.address?.slice(0.25)}
                        </span>
                      </span>
                      <span>
                        Village --{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {each?.mandal}
                        </span>
                      </span>
                      <span>
                        District --{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {each?.district}
                        </span>
                      </span>
                      <span>
                        PIN --{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {each?.pinCode}
                        </span>
                      </span>
                      <span>
                        Mobile No --{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {each?.phone}
                        </span>
                      </span>
                      <span>
                        Adhaar No --{" "}
                        <span
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {each?.adharnumber}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  id={`${key}_${each?.name}`}
                  // style={{ visibility: "hidden" }}
                  className="pdf-adhrr-card"
                >
                  <img src={each?.voteridurl} alt="" />
                  <img src={each?.adharidurl} alt="" />
                </div>
                <div className="downloadpdf-btn-crad">
                  <button
                    onClick={() =>
                      download({ key, name: each?.name, id: each?._id })
                    }
                  >
                    Download {each?.name} Details PDF
                  </button>
                  <button
                    onClick={() =>
                      downloadAdhar({
                        id: `${key}_${each?.name}`,
                        name: each?.name,
                      })
                    }
                  >
                    Download {each?.name} Adhaar PDF
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PDFUser;
