import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Stack from "react-bootstrap/Stack";
import * as AiIcons from "react-icons/ai";
import Form from "react-bootstrap/Form";
import LoadingPage from "../../utils/LoadingPage";
import ConfirmationModal from "../../utils/ConfirmationModal";
import { CommonFunctions } from "../../utils/CommonFunctions";
import { Chart, ReactGoogleChartEvent } from "react-google-charts";
import Pagination from "react-bootstrap/Pagination";
import CalculatorModal from "./CalculatorModal";

const ErlangMultiPage = () => {
  const [woList, setWoList] = useState([]);
  const [action, setAction] = useState(null);
  const [picks, setPicks] = useState([]);
  const [currentPicks, setCurrentPicks] = useState([]);
  const [chartLines, setChartLines] = useState([]);
  const [currentChartLines, setCurrentChartLines] = useState([]);
  const [point, setPoint] = useState(null);
  const [dataPage, setDataPage] = useState(1);
  const [nbPage, setNbPage] = useState(9);
  const [dataLength, setDataLength] = useState(51);
  const [day, setDay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  const periodRef = useRef("");
  const nbCallRef = useRef("");
  const ahtRef = useRef("");
  const serviceRef = useRef("");
  const delayRef = useRef("");
  const occupRef = useRef("");
  const shrinkRef = useRef("");
  const fileRef = useRef("");

  useEffect(() => {
    initStates();
    if (picks.length > 0) {
      selectPage(1);
    }
  }, [picks]);

  const initStates = () => {
    //setAction("pickPoint");
  };

  const onClose = () => {
    setPoint(null);
  };

  const handleInputChange = (event) => {
    setSelectedFile(event.target.files);
  };

  const onUpload = async () => {
    if (selectedFile.length == 0) {
      alert("Please select a file!");
      return false;
    }
    const data = new FormData();

    for (let i = 0; i < selectedFile.length; i++) {
      data.append("file[]", selectedFile[i]);
    }
  };

  const calculate = () => {
    let p = periodRef.current.value;
    let nb = nbCallRef.current.value;
    let aht = ahtRef.current.value;
    let sl = serviceRef.current.value;
    let del = delayRef.current.value;
    let occ = occupRef.current.value;
    //let shr = shrinkRef.current.value;
    let a = CommonFunctions.traficIntensityA(nb, p, aht);
    let n = CommonFunctions.estimateN(a);
    /*console.log("A : " + a);
    console.log("N : " + n);*/
    let erlangs = CommonFunctions.erlangs(a, n, aht, sl, del, occ, 30);
  };

  /*
EXCEL FUNCTIONS
*/
  const importExcelFileSessions = (page) => {
    //console.log(this.ExcelDateToJSDate(38599));
    //this.file = this.$refs.file.files[0];
    var rABS = false; //Read the file as a binary string
    var f = selectedFile[0];

    var reader = new FileReader();
    //if (!FileReader.prototype.readAsBinaryString) {
    FileReader.prototype.readAsBinaryString = (f) => {
      var binary = "";
      var wb; //Read completed data
      var outdata;
      var reader = new FileReader();
      reader.onload = (e) => {
        var bytes = new Uint8Array(reader.result);
        var length = bytes.byteLength;
        for (var i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        //If not introduced in main.js, you need to introduce it here to parse excel
        var XLSX = require("xlsx");
        wb = XLSX.read(binary, {
          type: "binary",
        });
        setPicks([]);
        let arr = [];
        let linesCh = [];
        //linesCh.push(["Time", "Calls", "Answered", "Abandoned"]);
        let sheets = 39;
        let min = 0; //(page - 1) * 96;
        //console.log(page);
        let max = 823; //min + dataLength;
        for (var j = 0; j < sheets; j++) {
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[j]]);
          //console.log(outdata[0]["Avg Call Time"]);
          for (var i = min; i <= max; i++) {
            //console.log(outdata[i]["Offered"]);
            let obj = {};
            if (j == 0) {
              obj.id = i + 1;
              obj.day = outdata[i]["Date"];
              let t = outdata[i]["Time"] * 24;
              let hours = ("0" + Math.floor(t)).slice(-2);
              let minutes = ("0" + 60 * (t - Math.floor(t))).slice(-2);
              obj.time = hours + ":" + minutes;
              obj.nbCall = outdata[i]["Offered"];
              obj.answered = outdata[i]["Answered"];
              obj.delay = outdata[i]["Ans Delay"] * 3600 * 24;
              obj.delayAvg = outdata[i]["Avg Ans Delay"] * 3600 * 24;
              obj.abond = outdata[i]["Abandoned"];
              //Avg Call time gravity
              obj.avgCallTime =
                obj.answered * outdata[0]["Avg Call Time"] * 3600 * 24;
              arr.push(obj);
            } else {
              if (j == sheets - 1) {
                arr[i].nbCall = arr[i].nbCall + outdata[i]["Offered"];
                arr[i].answered = arr[i].answered + outdata[i]["Answered"];
                arr[i].delay = Math.ceil(
                  arr[i].delay + outdata[i]["Ans Delay"] * 3600 * 24
                );
                arr[i].delayAvg = Math.ceil(arr[i].delay / arr[i].nbCall);
                arr[i].delay = Math.ceil(arr[i].delay);
                arr[i].abond = arr[i].abond + outdata[i]["Abandoned"];
                //Avg Call time gravity
                arr[i].avgCallTime = Math.ceil(
                  (arr[i].avgCallTime +
                    outdata[i]["Answered"] *
                      outdata[0]["Avg Call Time"] *
                      3600 *
                      24) /
                    arr[i].answered
                );
                let line = [
                  arr[i].time,
                  arr[i].nbCall,
                  arr[i].answered,
                  arr[i].abond,
                ];
                linesCh.push(line);
              } else {
                arr[i].nbCall = arr[i].nbCall + outdata[i]["Offered"];
                arr[i].answered = arr[i].answered + outdata[i]["Answered"];
                arr[i].delay =
                  arr[i].delay + outdata[i]["Ans Delay"] * 3600 * 24;
                /*arr[i].delayAvg =
                  arr[i].delayAvg + outdata[i]["Avg Ans Delay"] * 3600 * 24;*/
                arr[i].abond = arr[i].abond + outdata[i]["Abandoned"];
                //Avg Call time gravity
                arr[i].avgCallTime =
                  arr[i].avgCallTime +
                  outdata[i]["Answered"] *
                    outdata[0]["Avg Call Time"] *
                    3600 *
                    24;
              }
            }
          }
        }

        setPicks(arr);
        setChartLines(linesCh);

        return arr;
      };
      reader.readAsArrayBuffer(f);
    };
    if (rABS) {
      reader.readAsArrayBuffer(f);
    } else {
      reader.readAsBinaryString(f);
    }
  };

  const options = {
    chart: {
      title: "Flux des appels durant la journée",
      subtitle: "Par 15min",
    },
  };

  const selectPage = (page) => {
    setDataPage(page);
    setCurrentPicks(picks.slice((page - 1) * 96, (page - 1) * 96 + dataLength));
    setCurrentChartLines([
      ["Time", "Calls", "Answered", "Abandoned"],
      ...chartLines.slice((page - 1) * 96, (page - 1) * 96 + dataLength),
    ]);
  };

  const handleChartEvent = (event) => {
    //console.log("Called...");
    const chartWrapper = event.chartWrapper;
    const selection = chartWrapper.getChart().getSelection();
    if (selection.length > 0) {
      // Handle the selected data points here
      const selectedDataPoint = currentChartLines[selection[0].row + 1];
      //console.log("Selected Data Point:", selectedDataPoint);
      const p = currentPicks.filter(
        (pick) =>
          pick.time == selectedDataPoint[0] &&
          pick.nbCall == selectedDataPoint[1] &&
          pick.answered == selectedDataPoint[2]
      );
      //console.log("Selected..:", p[0]);
      setPoint(p[0]);
    }
  };

  return (
    <div className="full-width">
      <div className="container">
        <div className="first-item-top border rounded">
          <div
            className="included-component rounded text-primary"
            data-toggle="collapse"
            href="#collapseSrs"
            role="button"
            aria-expanded="false"
            aria-controls="collapseSrs"
          >
            <div>
              <Stack direction="horizontal" gap={2}>
                <h5 className="me-auto">ERLANGS CALCULATOR</h5>
              </Stack>
            </div>
          </div>
          <div id="collapseSrs" className="">
            {picks.length == 0 ? (
              <div className="container mx-2">
                <p className="form-title text-secondary text-start blockquote-footer m-1">
                  <strong>Importez les données d'échantillonage </strong>
                </p>
                <div className="row">
                  <div className="col-9">
                    <Form>
                      <Stack direction="horizontal" gap={2} className="m-3">
                        <Form.Group
                          controlId="formFileMultiple"
                          className="mb-auto"
                        >
                          <Form.Control
                            type="file"
                            size="sm"
                            name="file"
                            ref={fileRef}
                            multiple
                            onChange={(e) => handleInputChange(e)}
                          />
                        </Form.Group>
                        <Button
                          className="btn-sm"
                          variant="outline-success"
                          onClick={() => importExcelFileSessions(1)}
                        >
                          Extraire
                        </Button>
                      </Stack>
                    </Form>
                  </div>
                  <div className="col-3"></div>
                </div>
              </div>
            ) : (
              <></>
            )}
            <br />
            {/* Pagination part */}
            {picks.length == 0 ? (
              <></>
            ) : (
              <div className="container m-2">
                <Pagination size="sm">
                  <strong className="text-secondary blockquote-footer m-1">
                    Jour par jour
                  </strong>
                  <Pagination.First
                    disabled={dataPage == 1}
                    onClick={() => selectPage(1)}
                  />
                  <Pagination.Prev
                    disabled={dataPage == 1}
                    onClick={() => selectPage(dataPage - 1)}
                  />
                  {dataPage > 3 ? <Pagination.Ellipsis /> : <></>}
                  {dataPage - 2 > 0 ? (
                    <Pagination.Item onClick={() => selectPage(dataPage - 2)}>
                      {dataPage - 2}
                    </Pagination.Item>
                  ) : (
                    <></>
                  )}
                  {dataPage - 1 > 0 ? (
                    <Pagination.Item onClick={() => selectPage(dataPage - 1)}>
                      {dataPage - 1}
                    </Pagination.Item>
                  ) : (
                    <></>
                  )}
                  <Pagination.Item active>{dataPage}</Pagination.Item>
                  {dataPage + 1 <= nbPage ? (
                    <Pagination.Item onClick={() => selectPage(dataPage + 1)}>
                      {dataPage + 1}
                    </Pagination.Item>
                  ) : (
                    <></>
                  )}
                  {dataPage + 2 <= nbPage ? (
                    <Pagination.Item onClick={() => selectPage(dataPage + 2)}>
                      {dataPage + 2}
                    </Pagination.Item>
                  ) : (
                    <></>
                  )}
                  {dataPage <= nbPage - 3 ? <Pagination.Ellipsis /> : <></>}
                  <Pagination.Next
                    disabled={dataPage == nbPage}
                    onClick={() => selectPage(dataPage + 1)}
                  />
                  <Pagination.Last
                    disabled={dataPage == nbPage}
                    onClick={() => selectPage(nbPage)}
                  />
                </Pagination>
              </div>
            )}
            {/*Charts Part*/}
            {currentChartLines.length == 0 ? (
              <></>
            ) : (
              <div className="container m-2">
                <div>
                  <h2>{currentPicks[0].day}</h2>
                </div>
                <Chart
                  chartType="Line"
                  width="100%"
                  height="400px"
                  data={currentChartLines}
                  options={options}
                  chartEvents={[
                    {
                      eventName: "select",
                      callback: handleChartEvent,
                    },
                  ]}
                />
              </div>
            )}
            {/*Table Part*/}
            {currentPicks.length == 0 ? (
              <></>
            ) : (
              <div className="container m-2">
                <Table striped bordered hover>
                  <thead className="form-title">
                    <tr className="text-start">
                      <th scope="col">ID</th>
                      <th scope="col">Time</th>
                      <th scope="col">Nb Appels</th>
                      <th scope="col">Repondus</th>
                      <th scope="col">Durée Moy</th>
                      <th scope="col">Total Attente</th>
                      <th scope="col">Moy Attente</th>
                      <th scope="col">Abondonnés</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentPicks.map((pick, index) => (
                      <tr key={pick.id}>
                        <td className="text-end">{pick.id}</td>
                        <td className="text-end">{pick.time}</td>
                        <td className="text-end">{pick.nbCall}</td>
                        <td className="text-end">{pick.answered}</td>
                        <td className="text-end">{pick.avgCallTime}</td>
                        <td className="text-end">{pick.delay}</td>
                        <td className="text-end">{pick.delayAvg}</td>
                        <td className="text-end">{pick.abond}</td>
                        <td>
                          <AiIcons.AiFillEdit
                            className="m-1 clickable"
                            onClick={() => {
                              //setAction("update");
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
      <CalculatorModal
        title="Calculateur"
        point={point != null ? point : null}
        show={point != null}
        onHide={() => onClose()}
      ></CalculatorModal>
      <ConfirmationModal
        title="Calculateur"
        show={action == "delete"}
        onHide={() => onClose()}
        onResponse={(resp) => {}}
      />
      <LoadingPage show={loading} />
    </div>
  );
};

export default ErlangMultiPage;
