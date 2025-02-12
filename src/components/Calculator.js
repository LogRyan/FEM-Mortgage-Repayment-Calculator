import './calculator.css'
import React, { useState } from 'react';
import illustration from '../assets/illustration-empty.svg';

const DEFAULT_MORTGAGE_AMOUNT = 300000;
const DEFAULT_MORTGAGE_TERM = 25;
const DEFAULT_INTEREST_RATE = 5.25;
const DEFAULT_MORTGAGE_TYPE = 'repayment';
const DEFAULT_MONTHLY_PAYMENT = 0;
const DEFAULT_TOTAL_PAYMENT = 0;
const DEFAULT_SUBMITTED = false;

function Calculator() {
    const [mortgageAmount, setMortgageAmount] = useState(DEFAULT_MORTGAGE_AMOUNT);
    const [mortgageTerm, setMortgageTerm] = useState(DEFAULT_MORTGAGE_TERM);
    const [interestRate, setInterestRate] = useState(DEFAULT_INTEREST_RATE);
    const [mortgageType, setMortgageType] = useState(DEFAULT_MORTGAGE_TYPE);
    const [monthlyPayment, setMonthlyPayment] = useState(DEFAULT_MONTHLY_PAYMENT);
    const [totalPayment, setTotalPayment] = useState(DEFAULT_TOTAL_PAYMENT);
    const [submitted, setSubmitted] = useState(DEFAULT_SUBMITTED);

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateMortgage();
        setSubmitted(true);
    };

    const handleClear = () => {
        setMortgageAmount(DEFAULT_MORTGAGE_AMOUNT);
        setMortgageTerm(DEFAULT_MORTGAGE_TERM);
        setInterestRate(DEFAULT_INTEREST_RATE);
        setMortgageType(DEFAULT_MORTGAGE_TYPE);
        setMonthlyPayment(DEFAULT_MONTHLY_PAYMENT);
        setTotalPayment(DEFAULT_TOTAL_PAYMENT);
        setSubmitted(DEFAULT_SUBMITTED);
    };

    const calculateMortgage = () => {
        let calculatedMonthlyPayment = 0;
        let calculatedTotalPayment = 0;
        let r = (interestRate / 100) / 12;
        let n = mortgageTerm * 12;

        if (mortgageType === 'repayment') {
            calculatedMonthlyPayment = (mortgageAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            calculatedTotalPayment = calculatedMonthlyPayment * n;
        } else if (mortgageType === 'interest-only') {
            calculatedMonthlyPayment = mortgageAmount * r;
            calculatedTotalPayment = (interestRate / 100) * mortgageAmount * mortgageTerm;
        }

        setMonthlyPayment(calculatedMonthlyPayment.toFixed(2));
        setTotalPayment(calculatedTotalPayment.toFixed(2));
    };

    return (

        <main className="d-flex flex-wrap">

            <div id="calculator-container" className="d-flex flex-column justify-content-around">

                <header className="container-fluid d-flex">

                    <h2>Mortgage Calculator</h2>
                    <button className="btn" onClick={handleClear}>Clear All</button>

                </header>

                <form onSubmit={handleSubmit} id="calculatorInput" className="d-flex flex-column justify-content-center">

                    <div className="d-flex flex-column">

                        <label htmlFor="mortgage-amount">Mortgage Amount:

                            <div className="d-flex justify-content-between this">

                                <span className="logo">$</span>

                                <input 
                                    type="number" 
                                    name="mortgage-amount" 
                                    id="mortgage-amount" 
                                    onChange={(e) => setMortgageAmount(Number(e.target.value))} 
                                    value={mortgageAmount} 
                                />

                            </div>

                        </label>

                    </div>

                    <div className="d-flex justify-content-around">

                        <div className="d-flex flex-column">

                            <label htmlFor="mortgage-term">Mortgage Term</label>

                            <div className="d-flex this">

                                <input 
                                    type="number" 
                                    name="mortgage-term" 
                                    id="mortgage-term" 
                                    onChange={(e) => setMortgageTerm(Number(e.target.value))} 
                                    value={mortgageTerm} 
                                />

                                <span className="logo">years</span>

                            </div>

                        </div>

                        <div className="d-flex flex-column">

                            <label htmlFor="interest-rate">Interest Rate</label>

                            <div className="d-flex this">

                                <input 
                                    type="number" 
                                    name="interest-rate" 
                                    id="interest-rate" 
                                    step="0.01" 
                                    onChange={(e) => setInterestRate(Number(e.target.value))} 
                                    value={interestRate} 
                                />

                                <span className="logo">%</span>

                            </div>

                        </div>

                    </div>

                    <div className="d-flex flex-column">

                        <label className='huh'>

                            <input 
                                type="radio" 
                                name="mortgageType" 
                                value="repayment" 
                                className="hah"
                                checked={mortgageType === "repayment"} 
                                onChange={(e) => setMortgageType(e.target.value)} 
                            />

                            Repayment

                        </label>

                        <label className='huh'>

                            <input 
                                type="radio" 
                                name="mortgageType" 
                                value="interest-only" 
                                className="hah"
                                checked={mortgageType === "interest-only"} 
                                onChange={(e) => setMortgageType(e.target.value)} 
                            />

                            Interest Only

                        </label>

                </div>

                    <button type="submit" className="btn btn-primary w-75" id="form-submit">
                            Calculate Repayments
                        </button>

                </form>

            </div>

            <div id="results-container">

                {submitted ? (

                    <div>

                        <h1>Your Results</h1>
                        <p>Your results are shown below based on the information you provided. To adjust the results, edit the form and click "Calculate Repayments" again.</p>

                        <div id="results-inner-container">

                            <div>

                                <p>Your monthly repayments:</p>
                                <p>${monthlyPayment}</p>

                            </div>

                            <div>

                                <p>Total you'll repay over the term:</p>
                                <p>${totalPayment}</p>

                            </div>

                        </div>

                    </div>

                ) : (

                    <div className='d-flex flex-column text-center p-1'>

                        <img src={illustration} className="w-50 align-self-center" alt="No results yet" />

                        <h2>Results shown here</h2>
                        <p>Complete the form and click "Calculate Repayments" to see what your monthly repayments would be.</p>

                    </div>

                )}

            </div>

        </main>

    );
}

export default Calculator;
