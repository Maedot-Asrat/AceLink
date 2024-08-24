import React, { useState } from 'react';
import './MyEarnings.css'; // Import the corresponding CSS file

const MyEarnings = () => {
    const [withdrawalHistory, setWithdrawalHistory] = useState([
        { date: '21 Sep, 2021 at 2:14 AM', method: 'Mastercards', amount: 'American Express', status: 'Pending' },
        { date: '21 Sep, 2021 at 2:14 AM', method: 'Visa', amount: 'American Express', status: 'Pending' },
        { date: '21 Sep, 2021 at 2:14 AM', method: 'Visa', amount: 'American Express', status: 'Completed' },
        { date: '21 Sep, 2021 at 2:14 AM', method: 'Mastercards', amount: 'American Express', status: 'Canceled' },
    ]);

    return (
        <div className="my-earnings-container">
            <div className="revenue-summary">
                <div className="revenue-item">Total Revenue<br /> <strong>$13,804.00</strong></div>
                <div className="revenue-item">Current Balance<br /> <strong>$16,593.00</strong></div>
                <div className="revenue-item">Total Withdrawals<br /> <strong>$13,184.00</strong></div>
                <div className="revenue-item">Today Revenue<br /> <strong>$162.00</strong></div>
            </div>
            <div className="statistics-section">
                <div className="statistic-chart">
                    <h3>Statistic</h3>
                    {/* Replace this div with the chart component/library */}
                    <div className="chart-placeholder">[Chart]</div>
                </div>
                <div className="cards-section">
                    <h3>Cards</h3>
                    <div className="card-placeholder">Add new account</div>
                </div>
            </div>
            <div className="withdraw-section">
                <div className="withdraw-money">
                    <h3>Withdraw your money</h3>
                    <div className="payment-method">
                        {/* Payment methods placeholders */}
                        <div className="method">Bank Of Abyssinia - **** 2855</div>
                        <div className="method">**** 2855</div>
                        <div className="method">**** 2855</div>
                    </div>
                    <div className="withdraw-info">
                        <p>Current Balance</p>
                        <h2>$16,593.00</h2>
                        <button>Withdraw Money</button>
                    </div>
                </div>
                <div className="withdraw-history">
                    <h3>Withdraw History</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Method</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {withdrawalHistory.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.date}</td>
                                    <td>{item.method}</td>
                                    <td>{item.amount}</td>
                                    <td><span className={`status ${item.status.toLowerCase()}`}>{item.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyEarnings;
