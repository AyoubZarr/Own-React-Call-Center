import React, { useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CommonFunctions } from "../../utils/CommonFunctions";

const CalculatorModal = (props) => {
  const [action, setAction] = useState(null);
  const [period, setPeriod] = useState(15);
  const [nbCall, setNbCall] = useState(100);
  const [aht, setAht] = useState(180);
  const [service, setService] = useState(80);
  const [delay, setDelay] = useState(20);
  const [occup, setOccup] = useState(85);
  const [shrink, setShrink] = useState(30);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const periodRef = useRef("");
  const nbCallRef = useRef("");
  const ahtRef = useRef("");
  const serviceRef = useRef("");
  const delayRef = useRef("");
  const occupRef = useRef("");
  const shrinkRef = useRef("");

  useEffect(() => {
    initStates();
  }, [props.show]);

  const initStates = () => {
    if (props.point) {
      setPeriod(15);
      setNbCall(props.point.nbCall);
      setAht(props.point.avgCallTime);
      setResponse(null);
    }
  };

  const calculate = async () => {
    let p = periodRef.current.value;
    let nb = nbCallRef.current.value;
    let aht = ahtRef.current.value;
    let sl = serviceRef.current.value;
    let del = delayRef.current.value;
    let occ = occupRef.current.value;
    let shr = shrinkRef.current.value;
    //let shr = shrinkRef.current.value;
    console.log(
      "nb : " +
        nb +
        " p : " +
        p +
        " aht : " +
        aht +
        " sl : " +
        sl +
        " del : " +
        del +
        " occ : " +
        occ +
        " shr : " +
        shr
    );
    let a = CommonFunctions.traficIntensityA(nb, p, aht);
    let n = CommonFunctions.estimateN(a);
    //console.log("A : " + a);
    //console.log("N : " + n);
    let erlangs = await CommonFunctions.erlangs(a, n, aht, sl, del, occ, shr);
    setResponse(erlangs);
    //console.log(erlangs);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      centered
    >
      <Modal.Header className="modal-header" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div>
            <p className="blockquote-footer m-1">
              <strong>Remplissez les données d'échantillonage </strong>
            </p>
          </div>
          <br />
          <div className="row">
            <div className="col-7">
              <Form>
                <Form.Group as={Row} className="mb-1" controlId="formPeriod">
                  <Form.Label className="form-title text-start" column sm="9">
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
                <Form.Group as={Row} className="mb-1" controlId="formNbCall">
                  <Form.Label className="form-title text-start" column sm="9">
                    Nombre d'appels
                  </Form.Label>
                  <Col className="my-auto" sm="2">
                    <Form.Control
                      ref={nbCallRef}
                      size="sm"
                      defaultValue={
                        props.point && props.point.nbCall != null
                          ? props.point.nbCall
                          : nbCall
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-1" controlId="formAHT">
                  <Form.Label className="form-title text-start" column sm="9">
                    Durée moyenne d'un appel ( En seconds)
                  </Form.Label>
                  <Col className="my-auto" sm="2">
                    <Form.Control
                      ref={ahtRef}
                      size="sm"
                      defaultValue={
                        props.point && props.point.avgCallTime != null
                          ? props.point.avgCallTime
                          : aht
                      }
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-1" controlId="formService">
                  <Form.Label className="form-title text-start" column sm="9">
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
                  <Form.Label className="form-title text-start" column sm="9">
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
                  <Form.Label className="form-title text-start" column sm="9">
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
                <Form.Group as={Row} className="mb-1" controlId="formShrink">
                  <Form.Label className="form-title text-start" column sm="9">
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
                <Form.Group as={Row} className="mb-1" controlId="formAction">
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
            <div className="col-5">
              <div className="row mb-3">
                <div className="col col-md-8 text-start">Nombre d'agents</div>
                <div className="col col-md-3 text-success text-end">
                  {response != null ? response.nb_agents : "?"}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col col-md-8 text-start">Niveau de service</div>
                <div className="col col-md-3 text-danger text-end">
                  {response != null
                    ? Math.round(response.service_level * 100) / 100
                    : "?"}
                </div>
                <div className="col col-md-1 text-danger text-start">%</div>
              </div>
              <div className="row mb-3">
                <div className="col col-md-8 text-start">
                  Occupation maximale
                </div>
                <div className="col col-md-3 text-danger text-end">
                  {response != null
                    ? Math.round(response.occupancy * 100) / 100
                    : "?"}
                </div>
                <div className="col col-md-1 text-danger text-start">%</div>
              </div>
              <div className="row mb-3">
                <div className="col col-md-8 text-start">
                  Pourcentage de reponse immediate
                </div>
                <div className="col col-md-3 text-danger text-end">
                  {response != null
                    ? Math.round(response.answer_immediate * 100) / 100
                    : "?"}
                </div>
                <div className="col col-md-1 text-danger text-start">%</div>
              </div>
              <div className="row mb-3">
                <div className="col col-md-8 text-start">
                  Moyenne de la vitesse de réponse
                </div>
                <div className="col col-md-3 text-danger text-end">
                  {response != null
                    ? Math.round(response.asa * 100) / 100
                    : "?"}
                </div>
                <div className="col col-md-1 text-danger text-start">s</div>
              </div>
            </div>
          </div>
          <br />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-sm" variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CalculatorModal;
