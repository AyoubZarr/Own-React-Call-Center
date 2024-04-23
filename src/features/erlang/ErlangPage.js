import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Stack from "react-bootstrap/Stack";
import Badge from "react-bootstrap/Badge";
import * as AiIcons from "react-icons/ai";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingPage from "../../utils/LoadingPage";
import ConfirmationModal from "../../utils/ConfirmationModal";
import ExportExel from "../../utils/ExportExel";
import { CommonFunctions } from "../../utils/CommonFunctions";

const WoPage = () => {
  const [action, setAction] = useState(null);
  const [period, setPeriod] = useState(30);
  const [nbCall, setNbCall] = useState(100);
  const [aht, setAht] = useState(180);
  const [service, setService] = useState(80);
  const [delay, setDelay] = useState(20);
  const [occup, setOccup] = useState(85);
  const [shrink, setShrink] = useState(30);
  const [loading, setLoading] = useState(false);
  const periodRef = useRef("");
  const nbCallRef = useRef("");
  const ahtRef = useRef("");
  const serviceRef = useRef("");
  const delayRef = useRef("");
  const occupRef = useRef("");
  const shrinkRef = useRef("");

  useEffect(() => {
    //getData(1);
  }, []);

  const onClose = () => {
    setAction("");
  };

  /*const onSubmit = async (item, action) => {
    setLoading(true);
    var form = {
      action: action,
      item: JSON.stringify(item),
    };
    const response = await axios.post(
      "https://hr-onboarding.otalgerie.com/vasReportingApi/wos/request.php",
      form
    );
    //console.log(response);
    if (response.data.ErrCode == 200) {
      setAction("");
      setSelectedWo(null);
      getData(selectedPage);
      //show success message
    } else if (response.data.ErrCode == 401) {
      //show error message
      console.log("401...");
    } else {
      console.log("error..." + response.data.ErrMessage);
    }
    setLoading(false);
  };*/

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
    console.log("A : " + a);
    console.log("N : " + n);
    let erlangs = CommonFunctions.erlangs(a, n, aht, sl, del, occ, 30);
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
                <h5 className="me-auto">ERLANGS C CALCULATOR</h5>
              </Stack>
              <p className="form-title text-secondary blockquote-footer m-1">
                <strong>Remplissez les données d'échantillonage </strong>
              </p>
            </div>
          </div>
          <div id="collapseSrs" className="">
            <div className="container mx-2">
              <div className="row">
                <div className="col-9">
                  <Form>
                    <Form.Group
                      as={Row}
                      className="mb-1"
                      controlId="formPeriod"
                    >
                      <Form.Label className="form-title text-end" column sm="5">
                        Période d'échantillonage ( En minutes)
                      </Form.Label>
                      <Col className="my-auto" sm="2">
                        <Form.Control
                          ref={periodRef}
                          size="sm"
                          autoFocus
                          defaultValue={period == null ? "" : period}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-1"
                      controlId="formNbCall"
                    >
                      <Form.Label className="form-title text-end" column sm="5">
                        Nombre d'appels
                      </Form.Label>
                      <Col className="my-auto" sm="2">
                        <Form.Control
                          ref={nbCallRef}
                          size="sm"
                          defaultValue={nbCall == null ? "" : nbCall}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="formAHT">
                      <Form.Label className="form-title text-end" column sm="5">
                        Durée moyenne d'un appel ( En seconds)
                      </Form.Label>
                      <Col className="my-auto" sm="2">
                        <Form.Control
                          ref={ahtRef}
                          size="sm"
                          defaultValue={aht == null ? "" : aht}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-1"
                      controlId="formService"
                    >
                      <Form.Label className="form-title text-end" column sm="5">
                        Niveau de service requis
                      </Form.Label>
                      <Col className="my-auto" sm="2">
                        <Form.Control
                          ref={serviceRef}
                          size="sm"
                          defaultValue={service == null ? "" : service}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="formDelay">
                      <Form.Label className="form-title text-end" column sm="5">
                        Delai de reponse ( En seconds)
                      </Form.Label>
                      <Col className="my-auto" sm="2">
                        <Form.Control
                          ref={delayRef}
                          size="sm"
                          defaultValue={delay == null ? "" : delay}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1" controlId="formOccup">
                      <Form.Label className="form-title text-end" column sm="5">
                        Occupation maximale d'agents
                      </Form.Label>
                      <Col className="my-auto" sm="2">
                        <Form.Control
                          ref={occupRef}
                          size="sm"
                          defaultValue={occup == null ? "" : occup}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-1"
                      controlId="formShrink"
                    >
                      <Form.Label className="form-title text-end" column sm="5">
                        La démarque inconnue
                      </Form.Label>
                      <Col className="my-auto" sm="2">
                        <Form.Control
                          ref={shrinkRef}
                          size="sm"
                          defaultValue={shrink == null ? "" : shrink}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group
                      as={Row}
                      className="mb-1"
                      controlId="formAction"
                    >
                      <Form.Label
                        className="form-title text-secondary blockquote-footer text-end"
                        column
                        sm="5"
                      >
                        Executer le process
                      </Form.Label>
                      <Col className="my-auto text-start" sm="7">
                        <Button
                          className="btn-sm"
                          variant="outline-success"
                          onClick={() => {
                            calculate();
                          }}
                        >
                          Calculate...
                        </Button>
                      </Col>
                    </Form.Group>
                  </Form>
                </div>
                <div className="col-3"></div>
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
      <ConfirmationModal
        title="Confirmation"
        text="Do you want to delete this WO ?"
        show={action == "delete"}
        onClose={() => onClose()}
        onResponse={(resp) => {}}
      />
      <LoadingPage show={loading} />
    </div>
  );
};

export default WoPage;
