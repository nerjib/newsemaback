const covid19ImpactEstimator = (data) => {
    let currentInfected;
    let expectedCases;
    let severeInfected;
    let expectedSevereCases;
    let severeCaseEstimate;
    let hospitalBedByTime;
    let severeCasesByTime;
    let severeHospitalBed;
    let icuRequire;
    let ventRequire;
    let severeICURequire;
    let severeVentRequire;
    let dollarloss;
    let severeDollarloss;
  
  
    switch (data.periodType) {
      case 'days':
        currentInfected = data.reportedCases * 10;
        expectedCases = (currentInfected * (2 ** Math.trunc(data.timeToElapse / 3)));
        severeCaseEstimate = Math.trunc((15 / 100) * expectedCases);
        hospitalBedByTime = Math.ceil((35 / 100) * data.totalHospitalBeds) - severeCaseEstimate;
        icuRequire = Math.trunc((5 / 100) * expectedCases);
        ventRequire = Math.trunc((2 / 100) * expectedCases);
        dollarloss = (expectedCases * data.region.avgDailyIncomeInUSD
        * data.region.avgDailyIncomePopulation) / data.timeToElapse;
        severeInfected = data.reportedCases * 50;
        expectedSevereCases = (severeInfected * (2 ** Math.trunc(data.timeToElapse / 3)));
        severeCasesByTime = Math.trunc((15 / 100) * expectedSevereCases);
        severeHospitalBed = Math.ceil((35 / 100) * data.totalHospitalBeds) - severeCasesByTime;
        severeICURequire = Math.trunc((5 / 100) * expectedSevereCases);
        severeVentRequire = Math.trunc((2 / 100) * expectedSevereCases);
        severeDollarloss = (expectedSevereCases * data.region.avgDailyIncomeInUSD
        * data.region.avgDailyIncomePopulation) / data.timeToElapse;
        break;
      case 'weeks':
        currentInfected = data.reportedCases * 10;
        expectedCases = (currentInfected * (2 ** Math.trunc((7 * data.timeToElapse) / 3)));
        severeCaseEstimate = Math.trunc((15 / 100) * expectedCases);
        hospitalBedByTime = Math.ceil((35 / 100) * data.totalHospitalBeds) - severeCaseEstimate;
        icuRequire = Math.trunc((5 / 100) * expectedCases);
        ventRequire = Math.trunc((2 / 100) * expectedCases);
        dollarloss = (expectedCases * data.region.avgDailyIncomeInUSD
        * data.region.avgDailyIncomePopulation) / (data.timeToElapse * 7);
        severeInfected = data.reportedCases * 50;
        expectedSevereCases = (severeInfected * (2 ** Math.trunc((7 * data.timeToElapse) / 3)));
        severeCasesByTime = Math.trunc((15 / 100) * expectedSevereCases);
        severeHospitalBed = Math.ceil((35 / 100) * data.totalHospitalBeds) - severeCasesByTime;
        severeICURequire = Math.trunc((5 / 100) * expectedSevereCases);
        severeVentRequire = Math.trunc((2 / 100) * expectedSevereCases);
        severeDollarloss = (expectedSevereCases * data.region.avgDailyIncomeInUSD
        * data.region.avgDailyIncomePopulation) / (data.timeToElapse * 7);
        break;
      case 'months':
        currentInfected = data.reportedCases * 10;
        expectedCases = (currentInfected * (2 ** Math.trunc((30 * data.timeToElapse) / 3)));
        severeCaseEstimate = Math.trunc((15 / 100) * expectedCases);
        hospitalBedByTime = Math.ceil((35 / 100) * data.totalHospitalBeds) - severeCaseEstimate;
        icuRequire = Math.trunc((5 / 100) * expectedCases);
        ventRequire = Math.trunc((2 / 100) * expectedCases);
        dollarloss = (expectedCases * data.region.avgDailyIncomeInUSD
        * data.region.avgDailyIncomePopulation) / (data.timeToElapse * 30);
        severeInfected = data.reportedCases * 50;
        expectedSevereCases = Math.trunc(severeInfected * (2 ** ((30 * data.timeToElapse) / 3)));
        severeCasesByTime = Math.trunc((15 / 100) * expectedSevereCases);
        severeHospitalBed = Math.ceil((35 / 100) * data.totalHospitalBeds) - severeCasesByTime;
        severeICURequire = Math.trunc((5 / 100) * expectedSevereCases);
        severeVentRequire = Math.trunc((2 / 100) * expectedSevereCases);
        severeDollarloss = (expectedSevereCases * data.region.avgDailyIncomeInUSD
        * data.region.avgDailyIncomePopulation) / (data.timeToElapse * 30);
        break;
      default:
        currentInfected = 0;
  //      expectedCases = 0;
    }
    return {
      data,
      impact: {
        currentlyInfected: currentInfected,
        infectionsByRequestedTime: expectedCases,
        severeCasesByRequestedTime: severeCaseEstimate,
        hospitalBedsByRequestedTime: hospitalBedByTime,
        casesForICUByRequestedTime: icuRequire,
        casesForVentilatorsByRequestedTime: ventRequire,
        dollarsInFlight: Math.trunc(dollarloss)
      },
      severeImpact: {
        currentlyInfected: severeInfected,
        infectionsByRequestedTime: expectedSevereCases,
        severeCasesByRequestedTime: severeCasesByTime,
        hospitalBedsByRequestedTime: severeHospitalBed,
        casesForICUByRequestedTime: severeICURequire,
        casesForVentilatorsByRequestedTime: severeVentRequire,
        dollarsInFlight: Math.trunc(severeDollarloss)
      }
    };
  };
  
  module.exports ={
       covid19ImpactEstimator
  }