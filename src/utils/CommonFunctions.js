export class CommonFunctions {
  static response = {};

  static truncateString = (text, max) => {
    const s = text.length;
    let trunc = "";
    if (s > max) {
      trunc = text.substring(0, max) + "...";
    } else {
      trunc = text.substring(0, max);
    }
    return trunc;
  };

  static specialCharEncodeDecode = (text, action) => {
    //accepted : / =
    // behavior : +: space, $: truncate param, ;:truncate query
    const chars = ["&", "#", "*", "$", "+", ";", "'"];
    const subs = [
      "|andChar|",
      "|sharpChar|",
      "|starChar|",
      "|dolarChar|",
      "|plusChar|",
      "|semiChar|",
      "|apostChar|",
    ];
    let finalText = "";
    for (let i = 0; i < chars.length; i++) {
      finalText = text.replaceAll(
        action === "encode" ? chars[i] : subs[i],
        action === "encode" ? subs[i] : chars[i]
      );
      text = finalText;
    }
    return finalText;
  };

  static erlangs = (a, n, aht, sl, delay, maxOcc, shrink) => {
    let AR = n;
    let pw = this.pw(a, AR);
    //console.log("PW : " + pw * 100);
    let service = this.serviceLevel(a, AR, pw, delay, aht);
    //console.log("SL : " + service);
    if (service < sl) {
      //console.log("More...");

      return this.erlangs(a, AR + 1, aht, sl, delay, maxOcc, shrink);
    } else {
      //console.log("AR : " + AR);
      let ASA = this.averageSpeedAnswer(a, AR, pw, aht);
      //console.log("ASA : " + ASA);
      let CAI = this.callAnsweredImmediately(pw);
      //console.log("CAI : " + CAI);
      let MO = this.maxOccupancy(a, AR);
      //console.log("MO : " + MO);
      //Check this with target occupancy
      //if smaller -> OK
      //else AR = a / MO * 100
      if (MO > maxOcc) {
        //console.log("The occupancy is greater than target...");
        AR = (a / MO) * 100;
        //console.log("New AR : " + AR);
      }
      //apply shrinking factor
      let finalAR = Math.ceil(AR / (1 - shrink / 100));
      //console.log("Final AR : " + finalAR);
      return {
        nb_agents: finalAR,
        service_level: service,
        occupancy: MO,
        asa: ASA,
        answer_immediate: CAI,
      };
      //this.summary(finalAR, MO, service, CAI, ASA);
    }
  };

  cellPerHour = (nc, p) => {
    return (60 * nc) / p;
  };

  static traficIntensityA = (nc, p, aht) => {
    return Math.ceil((((60 * nc) / p) * aht) / 3600);
  };

  static estimateN = (a) => {
    return a + 1;
  };

  static p1 = (a, n) => {
    let exp = Math.pow(a, n);
    let fact = this.factorialize(n);
    let p = (exp * n) / (fact * (n - a));
    return p;
  };

  static p2 = (a, n) => {
    let sum = 0;
    for (let index = 0; index < n; index++) {
      let exp = Math.pow(a, index);
      let fact = this.factorialize(index);
      sum += exp / fact;
    }
    return sum;
  };

  static pw = (a, n) => {
    let res1 = this.p1(a, n);
    let res2 = this.p2(a, n);
    //If below the target ex 80% so we need to increase the number of agents
    return res1 / (res2 + res1);
  };

  static serviceLevel = (a, n, pw, tt, aht) => {
    let v1 = Math.exp(-(n - a) * (tt / aht));
    return (1 - pw * v1) * 100;
  };

  static averageSpeedAnswer = (a, n, pw, aht) => {
    //unit : seconds
    return (pw * aht) / (n - a);
  };

  static callAnsweredImmediately = (pw) => {
    // percentage
    return (1 - pw) * 100;
  };

  //TO reuse
  static maxOccupancy = (a, n) => {
    //If is less than ex 85% so we can keep it at this.
    //If this is more than 85% the number of Raw Agents is Traffic Intensity/ (Occupancy %/100)
    return (a / n) * 100;
  };

  static factorShrinkageNbAgentsRequired = (n, shrinkage) => {
    // Shrinkage is a factor that is widely used in the industry to include holidays, sickness, training and meetings etc.  The industry average is around 30 - 35%
    return n / (1 - shrinkage / 100);
  };

  static summary = (n, maxOccup, sl, CAI, asa) => {
    let ret = {
      nb_agents: n,
      service_level: sl,
      occupancy: maxOccup,
      asa: asa,
      answer_immediate: CAI,
    };
    //console.log(ret);
    return ret;
  };

  static factorialize = (num) => {
    if (num < 0) return -1;
    else if (num == 0) return 1;
    else {
      return num * this.factorialize(num - 1);
    }
  };
}
