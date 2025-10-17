// src/components/ReportDisplay.js
import React from 'react';

const ReportDisplay = ({ data }) => {
  if (!data) return null;

  const { basicDetails, reportSummary, creditAccounts } = data;

  return (
    <div className="report-container">
      {/* Basic Details Section */}
      <div className="card">
        <h2>👤 Basic Details</h2>
        <table className="info-table">
          <tbody>
            <tr>
              <td>Name</td>
              <td>{basicDetails.name}</td>
            </tr>
            <tr>
              <td>Mobile Phone</td>
              <td>{basicDetails.mobilePhone}</td>
            </tr>
            <tr>
              <td>PAN</td>
              <td>{basicDetails.pan}</td>
            </tr>
            <tr>
              <td>Credit Score</td>
              <td><strong>{basicDetails.creditScore}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Report Summary Section */}
      <div className="card">
        <h2>📊 Report Summary</h2>
        <table className="info-table">
          <tbody>
            <tr>
              <td>Total number of accounts</td>
              <td>{reportSummary.totalAccounts}</td>
            </tr>
            <tr>
              <td>Active accounts</td>
              <td>{reportSummary.activeAccounts}</td>
            </tr>
            <tr>
              <td>Closed accounts</td>
              <td>{reportSummary.closedAccounts}</td>
            </tr>
            <tr>
              <td>Current balance amount</td>
              <td>₹{reportSummary.currentBalance.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td>Secured accounts amount</td>
              <td>₹{reportSummary.securedAccountsAmount.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td>Unsecured accounts amount</td>
              <td>₹{reportSummary.unsecuredAccountsAmount.toLocaleString('en-IN')}</td>
            </tr>
            <tr>
              <td>Last 7 days credit enquiries</td>
              <td>{reportSummary.creditEnquiriesLast7Days}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Credit Accounts Information Section */}
      <div className="card">
        <h2>💳 Credit Accounts Information</h2>
        {creditAccounts.map((account, index) => (
          <div key={index} className="account-item">
            <h3>Account {index + 1}</h3>
            <table className="info-table">
              <tbody>
                <tr>
                  <td>Bank</td>
                  <td>{account.bank}</td>
                </tr>
                <tr>
                  <td>Account Number</td>
                  <td>{account.accountNumber}</td>
                </tr>
                <tr>
                  <td>Current Balance</td>
                  <td>₹{account.currentBalance.toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td>Amount Overdue</td>
                  <td>₹{account.amountOverdue.toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                  <td>Address on File</td>
                  {/* This line will now work correctly because the backend is fixed */}
                  <td>{account.address}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportDisplay;