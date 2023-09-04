import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { Icon } from "@iconify/react";
import okIcon from "@iconify/icons-flat-color-icons/ok";
import crossMark from "@iconify/icons-openmoji/cross-mark";
import { ToastContainer, toast } from "react-toastify";

import pdf from "../assets/download.svg";
import axios from "axios";
import { saveAs } from "file-saver";
import mainUrl from "../api/configApi";
import Remark from "./RemarkPopup/Remark";

const ScrollSortTable = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [remark, setRemark] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [ccc, setCcc] = useState('');
  const searchHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDownload = async (ccc) => {
    let pdf = {};
    await fetch(`${mainUrl}adminpdf`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cc: ccc,
      }),
    })
      .then((resp) => resp.text())
      .then((result) => {
        console.log(result);
        Object.assign(pdf, JSON.parse(result));
        console.log(pdf);
        const srcpdf = `data:application/pdf;base64,${pdf.data}#toolbar=0&scrollbar=0`;
        saveAs(srcpdf, `form.pdf`);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  // approved click

  const approveClick = async (ccc) => {
    const data = { cc: ccc, action: "approve" };
    const response = await axios.post(`${mainUrl}adminaction`, data);
    toast.success(response.data.message);
    console.log(response.data);
  };

  //  reject Click
  const rejectClick = (cccValue) => {
    setCcc(cccValue);
    setShowModal(true);
  };
  // const rejectClick=async(ccc)=>{

  //   const data = {cc:ccc,action:'reject',remarks:remark}
  //   const response = await axios.post(
  //     `${mainUrl}adminaction`,
  //     data
  //   );
  //   console.log(response.data);

  // }
  const handleReject = async (ccc) => {
    // Handle the reject logic and close the modal
    setShowModal(false);

    // Perform the rejection action here with data, e.g., axios request
    const data = { cc: ccc, action: "reject", remarks: remark };
    const response = await axios.post(`${mainUrl}adminaction`, data);
    console.log(response.data);
    toast.success(response.data.message)
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const filteredData = user.filter((item) => {
    if (searchTerm === "") {
      return item;
    } else if (
      item.Clientcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return item;
    }
  });

  let sortedData = [...filteredData]; // Initialize sortedData with filtered data

  if (sortKey !== null) {
    sortedData = [...filteredData].sort((a, b) => {
      const valueA = a[sortKey] || ""; // Handle possible null or undefined values
      const valueB = b[sortKey] || "";

      if (sortDirection === "asc") {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
  }
  return (
    <div className=" table-container ">
      <ToastContainer />
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        onChange={searchHandler}
        style={{ width: "40%" }}
      />
      <div
        style={{ maxHeight: "400px", width: "100%", overflowX: "auto" }}
        className="mt-4 text-center "
      >
        <div style={{ width: "950px" }}>
          <Table responsive size="xl" style={{ overflowX: "hidden" }}>
            <thead>
              <tr>
                <th onClick={() => handleSort("Clientcode")} align="center">
                  Client Code
                  {sortKey === "Clientcode" &&
                    (sortDirection === "asc" ? (
                      <>
                        {" "}
                        &nbsp;
                        <FaSortUp />{" "}
                      </>
                    ) : (
                      <>
                        &nbsp; <FaSortDown />{" "}
                      </>
                    ))}
                  {sortKey !== "Clientcode" && (
                    <span className="sort-arrow">
                      &nbsp; <FaSortUp />
                    </span>
                  )}
                </th>
                <th onClick={() => handleSort("name")}>
                  Name{" "}
                  {sortKey === "name" &&
                    (sortDirection === "asc" ? (
                      <>
                        {" "}
                        &nbsp;
                        <FaSortUp />{" "}
                      </>
                    ) : (
                      <>
                        &nbsp; <FaSortDown />{" "}
                      </>
                    ))}
                  {sortKey !== "name" && (
                    <span className="sort-arrow">
                      &nbsp;
                      <FaSortUp /> {/* Default to ascending arrow */}
                    </span>
                  )}
                </th>
                <th>boid </th>
                <th>Last Login </th>
                <th>Pay Status</th>
                <th>Pay Time</th>
                <th>Estamp Status</th>
                <th>Estamp Time</th>
                <th>Esign Details</th>
                <th>Approve</th>
                <th>Reject</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((items) => {
                const {
                  Clientcode,
                  uid,
                  payflag,
                  stampnum,
                  name,
                  mobile,
                  email,
                  boid,
                  bankname,
                  bankacno,
                  stampflag,
                  esignflag,
                  printtime,
                  stampedtime,
                  esignedtime,
                  approveflag,
                  approvedtime,
                  payTIME,
                } = items;
                return (
                  <>
                    <tr key={Clientcode}>
                      <td>{Clientcode}</td>
                      <td>{name}</td>
                      <td>{boid}</td>
                      <td>{printtime}</td>
                      <td>{payflag == 0 ? `Incomplete` : "Complete"}</td>
                      <td>{payTIME ? payTIME : `null`}</td>
                      <td>{stampnum ? stampnum : `Incomplete`}</td>
                      <td>{stampedtime ? stampedtime : ``}</td>

                      <td>
                        {esignflag == 0 ? (
                          `Incomplete`
                        ) : (
                          <Button
                            variant="light"
                            style={{ margin: 0 }}
                            onClick={() => handleDownload(Clientcode)}
                          >
                            <img src={pdf} width={12} />
                          </Button>
                        )}
                      </td>
                      <td>
                        {approveflag == 1 ? (
                          <Button
                            style={{ border: "none" }}
                            variant="light"
                            size="sm"
                            disabled
                          >
                            <Icon icon={okIcon} width={20} />
                          </Button>
                        ) : (
                          <Button
                            style={{ border: "none" }}
                            variant="light"
                            size="sm"
                            onClick={() => approveClick(Clientcode)}
                          >
                            <Icon icon={okIcon} width={20} />
                          </Button>
                        )}
                      </td>
                      <td>
                        {approveflag == 1 ? (
                          <Button
                            style={{ border: "none" }}
                            variant="light"
                            size="sm"
                            disabled
                          >
                            <Icon icon={crossMark} width={20} />
                          </Button>
                        ) : (
                          <>
                            <Button
                              style={{ border: "none" }}
                              variant="light"
                              size="sm"
                              onClick={() => rejectClick(Clientcode)}
                            >
                              <Icon icon={crossMark} width={20} />
                            </Button>
                            <Remark
                              showModal={showModal}
                              handleCloseModal={handleCloseModal}
                              handleReject={handleReject}
                              setRemark={setRemark}
                              remark={remark}
                              ccc={ccc}
                            />
                          </>
                        )}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ScrollSortTable;
