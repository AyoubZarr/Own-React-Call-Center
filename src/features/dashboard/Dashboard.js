import React, { useState, useEffect } from "react";
import LoadingPage from "../../utils/LoadingPage";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //getStatsData();
  }, []);

  return (
    <div className="full-width">
      <div className="container">
        <div>
          <div className="container">
            <h1>Call Center Staffing Calculator</h1>
          </div>
          <br />
          <br />
          <br />
          <div className="container">
            <h3 className="text-center m-3">Terminologie</h3>
          </div>
          <div className="container">
            <div className="row form-title m-2">
              <div className="col col-md-4 text-end">
                Temps de traitement moyen (AHT)
              </div>
              <div className="col col-md-8 text-start">
                Le temps de traitement moyen est le temps qu'une personne (un
                agent) prend pour gérer un contact téléphonique. Cela inclut le
                temps de conversation ainsi que tout temps de paperasserie
                (temps de conclusion) avant qu'ils ne puissent répondre au
                prochain appel. Cela devrait être en secondes. <br />
                Le cas de ce simulateur, AHT = Temps de conversation. <br />
                Remarque : Par faute de données exactes (Durées moyennes des
                appels), les résultats sont valides avec une precision de -+3%.
              </div>
            </div>
            <div className="row form-title m-2">
              <div className="col col-md-4 text-end">Occupation maximale</div>
              <div className="col col-md-8 text-start">
                L'occupation maximale est conçue pour améliorer la précision. Si
                vous prenez une occupation supérieure à 85 % - 90 % pendant de
                longues périodes, vous constaterez qu'elle est cachée dans un
                chiffre AHT plus long et que l'agent s'épuise.
              </div>
            </div>
            <div className="row form-title m-2">
              <div className="col col-md-4 text-end">
                Rétrécissement (Shrinkage)
              </div>
              <div className="col col-md-8 text-start">
                La démarque inconnue est un facteur conçu pour prendre en compte
                les vacances, la maladie, etc.
              </div>
            </div>
          </div>
          <LoadingPage show={loading} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
