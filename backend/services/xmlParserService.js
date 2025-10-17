// backend/services/xmlParserService.js
const xml2js = require('xml2js');

const parseExperianXML = async (xmlData) => {
  try {
    const parser = new xml2js.Parser({ explicitArray: false, trim: true });
    const result = await parser.parseStringPromise(xmlData);

    const report = result.INProfileResponse;

    if (!report) {
        throw new Error("Invalid XML structure: Missing 'INProfileResponse' root element.");
    }

    const get = (obj, path, defaultValue = '') => {
        const keys = Array.isArray(path) ? path : path.split('.');
        let current = obj;
        for (let i = 0; i < keys.length; i++) {
            if (current === null || current === undefined || !current.hasOwnProperty(keys[i])) {
                return defaultValue;
            }
            current = current[keys[i]];
        }
        return current;
    };
    
    const applicantDetails = get(report, 'Current_Application.Current_Application_Details.Current_Applicant_Details', {});
    const scoreDetails = get(report, 'SCORE', {});

    // This is the crucial fix: Ensure that the accounts variable is always an array
    let accountsArray = get(report, 'CAIS_Account.CAIS_Account_DETAILS', []);
    if (!Array.isArray(accountsArray)) {
        accountsArray = [accountsArray];
    }
    
    // Use the first account in the guaranteed array to get the PAN
    const firstAccountHolder = get(accountsArray[0], 'CAIS_Holder_Details', {});

    const extractedData = {
      basicDetails: {
        name: `${get(applicantDetails, 'First_Name', '')} ${get(applicantDetails, 'Last_Name', '')}`.trim(),
        mobilePhone: get(applicantDetails, 'MobilePhoneNumber'),
        pan: get(firstAccountHolder, 'Income_TAX_PAN'),
        creditScore: parseInt(get(scoreDetails, 'BureauScore', 0), 10),
      },

      reportSummary: {
        totalAccounts: parseInt(get(report, 'CAIS_Account.CAIS_Summary.Credit_Account.CreditAccountTotal', 0), 10),
        activeAccounts: parseInt(get(report, 'CAIS_Account.CAIS_Summary.Credit_Account.CreditAccountActive', 0), 10),
        closedAccounts: parseInt(get(report, 'CAIS_Account.CAIS_Summary.Credit_Account.CreditAccountClosed', 0), 10),
        currentBalance: parseFloat(get(report, 'CAIS_Account.CAIS_Summary.Total_Outstanding_Balance.Outstanding_Balance_All', 0)),
        securedAccountsAmount: parseFloat(get(report, 'CAIS_Account.CAIS_Summary.Total_Outstanding_Balance.Outstanding_Balance_Secured', 0)),
        unsecuredAccountsAmount: parseFloat(get(report, 'CAIS_Account.CAIS_Summary.Total_Outstanding_Balance.Outstanding_Balance_UnSecured', 0)),
        creditEnquiriesLast7Days: parseInt(get(report, 'TotalCAPS_Summary.TotalCAPSLast7Days', 0), 10),
      },

      // Now we map over the guaranteed 'accountsArray'
      creditAccounts: accountsArray.map(acc => {
        let fullAddress = 'Not Available';
        const addrBlock = get(acc, 'CAIS_Holder_Address_Details', null);
        console.log('Address Block:', addrBlock);
        if (addrBlock) {
          const addressParts = [
            get(addrBlock, 'First_Line_Of_Address_non_normalized'),
            get(addrBlock, 'Second_Line_Of_Address_non_normalized'),
            get(addrBlock, 'Third_Line_Of_Address_non_normalized'),
            get(addrBlock, 'City_non_normalized'),
            get(addrBlock, 'ZIP_Postal_Code_non_normalized')
          ];

          const validParts = addressParts.filter(part => part);
          if (validParts.length > 0) {
            fullAddress = validParts.join(', ');
          }
        }

        return {
          bank: get(acc, 'Subscriber_Name', 'N/A').trim(),
          accountNumber: get(acc, 'Account_Number'),
          amountOverdue: parseFloat(get(acc, 'Amount_Past_Due', 0)),
          currentBalance: parseFloat(get(acc, 'Current_Balance', 0)),
          accountType: `Type ${get(acc, 'Account_Type', '?')}`,
          address: fullAddress,
        };
      }),
    };

    return extractedData;

  } catch (error) {
    console.error('Error during XML parsing:', error);
    throw new Error('Failed to parse XML file. Please check the file format and structure.');
  }
};

module.exports = { parseExperianXML };