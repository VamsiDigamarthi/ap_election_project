import React, { useEffect, useState } from "react";
import "./NewPDF.css";
import { useLocation } from "react-router-dom";
import { APIS, headers } from "../../data/header";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const NewPDF = () => {
  const location = useLocation();
  const data = location.state;

  const [apiFilterData, setApiFilterData] = useState([]);
  const onFetchAssemblyWiseData = () => {
    // setApiFilterDataLoader(true);
    APIS.get(
      `own/fetch/pdf/data/assembly/${
        data?.assembly
      }/district/${data?.district.trim()}`,

      {
        headers: headers,
      }
    )
      .then((res) => {
        setApiFilterData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    onFetchAssemblyWiseData();
  }, []);

  const downloadAdhar = () => {
    const capture = document.querySelector(
      ".user--main--padfs--as--super-adamin"
    );
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
      // doc.save(`${value?.name}adhaar.pdf`);
      doc.save("certificate.pdf");
    });
  };

  const printerDownload = () => {
    window.print();
  };

  console.log(apiFilterData);

  return (
    <>
      <div className="kjhgfd">
        <button onClick={printerDownload}>Download</button>
      </div>
      <div
        style={{
          padding: "40px",
        }}
        className="user--main--padfs--as--super-adamin"
      >
        {apiFilterData?.length > 0 ? (
          <>
            {apiFilterData?.map((each, key) => (
              <div key={key} className="main-p-f-d">
                <div id={key} className="pdf_main_page_card">
                  <h2>DECLARATION BY WEB CASTING AGENTS</h2>
                  <h4>
                    I,{" "}
                    <span style={{ fontWeight: "bold" }}>
                      <span>{each?.name}</span>
                    </span>
                    , do hereby make a solemndeclaration, in connection with the
                    General Election to Lok Sabha 2024, Assam, that:
                  </h4>
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
                            fontWeight: 600,
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
                <div className="page-break"></div>
                <div
                  id={`${key}_${each?.name}`}
                  // style={{ visibility: "hidden" }}
                  className="pdf-adhrr-card"
                >
                  <img src={each?.voteridurl} alt="" />
                  <img src={each?.adharidurl} alt="" />
                </div>
                <div className="page-break"></div>
              </div>
            ))}
          </>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h4>No Data Found</h4>
          </div>
        )}
      </div>
    </>
  );
};

export default NewPDF;
