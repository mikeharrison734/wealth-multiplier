import { useState } from "react";
import '../index.css';

const currencyFormatter = new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
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

                currentMonthlyInvestment = currentMonthlyInvestment * (1 + (monthlyInvestmentGrowth / 100.0));

                console.log(`tempTotalCash: ${tempTotalCash}`);
                console.log(`currentROI: ${currentROI}`);
            }

            tempTotalCash = (tempTotalCash * (1 + (currentROI / 100) / 12.0)) + parseFloat(currentMonthlyInvestment);
        }

        setTotalCash(tempTotalCash);
    }

    return (
        <div className="container mt-4 d-flex flex-column align-items-center">
            <label htmlFor="current-investments">Total Cash Currently Invested:</label>
            <input name="current-investments" type="number" onChange={(e) => setCurrentInvestments(e.target.value)}></input>
            <label htmlFor="monthly-investment">Monthly Investment:</label>
            <input name="monthly-investment" type="number" onChange={(e) => setMonthlyInvestment(e.target.value)}></input>
            <label htmlFor="monthly-investment-growth">Annual growth in monthly investment</label>
            <input type="number" name="monthly-investment-growth" onChange={(e) => setMonthlyInvestmentGrowth(e.target.value)} />
            <label htmlFor="current-age">Current Age:</label>
            <input name="current-age" type="number" onChange={(e) => setCurrentAge(e.target.value)}></input>
            <label htmlFor="retirement-age">Retirement Age:</label>
            <input name="retirement-age" type="number" onChange={(e) => setRetirementAge(e.target.value)}></input>
            <button className="btn btn-primary main-button m-2" onClick={calculateTotalCash}>Calculate</button>
            <h1 className="mt-2">Total Cash At Retirement: {currencyFormatter.format(totalCash)}</h1>
        </div>
    );
}