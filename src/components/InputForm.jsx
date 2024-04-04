import { useState } from "react";
import "../index.css";
import NumberInput from "./NumberInput";

const currencyFormatter = new Intl.NumberFormat("en-UK", {
  style: "currency",
  currency: "GBP",
});

export function InputForm() {
  const [currentInvestments, setCurrentInvestments] = useState(0);
  const [monthlyInvestment, setMonthlyInvestment] = useState(0);
  const [monthlyInvestmentGrowth, setMonthlyInvestmentGrowth] = useState(0);
  const [currentAge, setCurrentAge] = useState(0);
  const [retirementAge, setRetirementAge] = useState(0);
  const [totalCash, setTotalCash] = useState(0);

  const currentAgeInMonths = currentAge * 12.0;
  const retirementAgeInMonths = retirementAge * 12.0;

  function calculateTotalCash() {
    let currentROI = 5.5 + (retirementAge - currentAge) * 0.1;
    if (currentROI > 10.0) currentROI = 10.0;
    let currentMonthlyInvestment = monthlyInvestment;

    let tempTotalCash = currentInvestments;
    for (let i = currentAgeInMonths; i < retirementAgeInMonths; i++) {
      if (i > 0 && i % 12.0 === 0) {
        if (i / 12.0 > 20) {
          currentROI -= 0.1;
        }

        currentMonthlyInvestment =
          currentMonthlyInvestment * (1 + monthlyInvestmentGrowth / 100.0);
      }

      tempTotalCash =
        tempTotalCash * (1 + currentROI / 100 / 12.0) +
        parseFloat(currentMonthlyInvestment);
    }

    setTotalCash(tempTotalCash);
  }

  function calculateTotalCashAtRetirement(e) {
    e.preventDefault();

    const fd = new FormData(e.target);

    let invalidInput = false;
    fd.forEach((input) => {
      if (isNaN(input)) {
        console.log("not a number");
        invalidInput = true;
        return;
      }
    });

    if (invalidInput) return;

    console.log("made it to the end");
    calculateTotalCash();
  }

  return (
    <form
      onSubmit={calculateTotalCashAtRetirement}
      className="container mt-4 d-flex flex-column align-items-center input-form"
    >
      <NumberInput
        id="current-investments"
        label="Total Cash Currently Invested:"
        stateUpdateFn={setCurrentInvestments}
      />
      <NumberInput
        id="monthly-investment"
        label="Monthy Investment:"
        stateUpdateFn={setMonthlyInvestment}
      />
      <NumberInput
        id="monthly-investment-growth"
        label="Annual growth in monthly investment:"
        stateUpdateFn={setMonthlyInvestmentGrowth}
      />
      <NumberInput
        id="current-age"
        label="Current Age:"
        stateUpdateFn={setCurrentAge}
      />
      <NumberInput
        id="retirement-age"
        label="Retirement Age:"
        stateUpdateFn={setRetirementAge}
      />
      <button type="submit" className="btn btn-primary main-button m-2">
        Calculate
      </button>
      <h3 className="mt-2">
        Total Cash At Retirement: {currencyFormatter.format(totalCash)}
      </h3>
    </form>
  );
}
