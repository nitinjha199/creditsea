// models/reportModel.js
const mongoose = require('mongoose');

// THIS IS THE CORRECTED PART: 'address' is now inside each account
const creditAccountSchema = new mongoose.Schema({
  bank: String,
  accountNumber: String,
  amountOverdue: Number,
  currentBalance: Number,
  accountType: String,
  address: String, // Address field is added here
});

const reportSchema = new mongoose.Schema({
  basicDetails: {
    name: String,
    mobilePhone: String,
    pan: String,
    creditScore: Number,
  },
  reportSummary: {
    totalAccounts: Number,
    activeAccounts: Number,
    closedAccounts: Number,
    currentBalance: Number,
    securedAccountsAmount: Number,
    unsecuredAccountsAmount: Number,
    creditEnquiriesLast7Days: Number,
  },
  creditAccounts: [creditAccountSchema],
  // The separate 'addresses' array has been removed from here
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Report', reportSchema);