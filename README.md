# CreditSea - Credit Report Analyzer

A full-stack web application that parses and displays Experian XML credit reports with an intuitive, user-friendly interface. This project was developed as part of the CreditSea Fullstack Engineer Assignment.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [How It Works](#how-it-works)
- [Key Components](#key-components)
- [Database Schema](#database-schema)
- [Error Handling](#error-handling)
<!-- - [Screenshots](#screenshots) -->
<!-- - [Future Enhancements](#future-enhancements) -->

## 🎯 Overview

CreditSea is a comprehensive credit report analysis tool that:
- Accepts Experian XML credit report files via upload
- Parses complex XML structure to extract meaningful credit information
- Stores parsed data in MongoDB for persistence
- Displays formatted credit reports with basic details, summary statistics, and account-level information
- Provides a clean, responsive UI for easy data visualization

## ✨ Features

### Core Functionality
- **XML File Upload**: Secure file upload with validation for XML format
- **Intelligent XML Parsing**: Robust parser that handles Experian credit report structure
- **Data Persistence**: MongoDB storage for all uploaded reports
- **Beautiful UI**: Clean, card-based layout with responsive design
- **Comprehensive Data Display**: 
  - Basic applicant details (Name, Phone, PAN, Credit Score)
  - Report summary (Account counts, balances, recent enquiries)
  - Detailed account information with addresses

<!-- ### Technical Features
- File type validation (XML only)
- Automatic file cleanup after processing
- Error handling with user-friendly messages
- Loading states for better UX
- Currency formatting for Indian Rupee (₹)
- Array safety handling for single/multiple accounts -->

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** (v5.1.0) - Web framework
- **MongoDB** - Database
- **Mongoose** (v8.19.1) - ODM for MongoDB
- **Multer** (v2.0.2) - File upload middleware
- **xml2js** (v0.6.2) - XML parsing
- **cors** (v2.8.5) - Cross-origin resource sharing
- **dotenv** (v17.2.3) - Environment variable management

### Frontend
- **React** (v19.2.0) - UI library
- **Axios** (v1.12.2) - HTTP client
- **Create React App** - Project scaffolding
- **CSS3** - Styling

## 📁 Project Structure

```
creditsea/
├── backend/
│   ├── controllers/
│   │   └── reportController.js      # Request handlers for reports
│   ├── models/
│   │   └── reportModel.js           # MongoDB schema definition
│   ├── routes/
│   │   └── reportRoutes.js          # API route definitions
│   ├── services/
│   │   └── xmlParserService.js      # XML parsing logic
│   ├── uploads/                     # Temporary file storage (gitignored)
│   ├── .env                         # Environment variables (gitignored)
│   ├── .gitignore
│   ├── package.json
│   └── server.js                    # Express server setup
│
└── frontend/
        ├── public/
        │   ├── index.html
        │   └── ...                  # Static assets
        ├── src/
        │   ├── components/
        │   │   ├── FileUpload.js    # File upload component
        │   │   └── ReportDisplay.js # Report display component
        │   ├── services/
        │   │   └── api.js           # API service layer
        │   ├── App.js               # Main application component
        │   ├── App.css              # Application styles
        │   └── index.js             # React entry point
        ├── .gitignore
        ├── package.json
        └── README.md
```

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB** (v4.4 or higher)
  - Local installation OR
  - MongoDB Atlas account (for cloud database)
- **Git** (for cloning the repository)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd creditsea
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
# Copy the example below and update with your values
```

Create a `.env` file in the `backend` directory with the following content:

```env
MONGO_URI=mongodb://localhost:27017/creditsea
PORT=5001
```

**Note**: If using MongoDB Atlas, replace the `MONGO_URI` with your connection string:
```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/creditsea?retryWrites=true&w=majority
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend/frontend

# Install dependencies
npm install
```

## ⚙️ Configuration

### Backend Configuration

The backend uses environment variables for configuration. Key settings:

- **MONGO_URI**: MongoDB connection string
- **PORT**: Server port (default: 5001)

### Frontend Configuration

The frontend API endpoint is configured in `frontend/frontend/src/services/api.js`:

```javascript
const API_URL = 'http://localhost:5001/api/reports';
```

Update this URL if deploying to production or using a different backend port.

## ▶️ Running the Application


### Start Backend Server

```bash
# From the backend directory
cd backend
node server.js

# Expected output:
# Connected to MongoDB
# Server running on port 5001
```

### Start Frontend Development Server

```bash
# From the frontend/frontend directory
cd frontend/frontend
npm start

# The application will open in your browser at http://localhost:3000
```

## 🔌 API Endpoints

### 1. Upload XML Report

**Endpoint**: `POST /api/reports/upload`

**Description**: Upload and process an Experian XML credit report file

**Request**:
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Body**: Form data with file field named `xmlfile`

**Response** (Success - 201):
```json
{
  "message": "File uploaded and processed successfully!",
  "reportId": "507f1f77bcf86cd799439011",
  "data": {
    "basicDetails": {
      "name": "John Doe",
      "mobilePhone": "9876543210",
      "pan": "ABCDE1234F",
      "creditScore": 750
    },
    "reportSummary": {
      "totalAccounts": 10,
      "activeAccounts": 5,
      "closedAccounts": 5,
      "currentBalance": 500000,
      "securedAccountsAmount": 300000,
      "unsecuredAccountsAmount": 200000,
      "creditEnquiriesLast7Days": 2
    },
    "creditAccounts": [
      {
        "bank": "HDFC Bank",
        "accountNumber": "1234567890",
        "amountOverdue": 0,
        "currentBalance": 100000,
        "accountType": "Type 10",
        "address": "123 Main St, Mumbai, 400001"
      }
    ]
  }
}
```

**Response** (Error - 400):
```json
{
  "message": "No file uploaded."
}
```

```json
{
  "message": "Invalid file type. Please upload an XML file."
}
```

**Response** (Error - 500):
```json
{
  "message": "Server error",
  "error": "Error details here"
}
```

### 2. Get Report by ID

**Endpoint**: `GET /api/reports/:id`

**Description**: Retrieve a previously uploaded report by its MongoDB ObjectId

**Request**:
- **Method**: GET
- **URL Parameter**: `id` (MongoDB ObjectId)

**Response** (Success - 200):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "basicDetails": { ... },
  "reportSummary": { ... },
  "creditAccounts": [ ... ],
  "createdAt": "2025-10-17T10:15:30.000Z",
  "__v": 0
}
```

**Response** (Error - 404):
```json
{
  "message": "Report not found"
}
```

## 🔍 How It Works

### Data Flow

1. **User uploads XML file** through the React frontend
2. **Frontend sends file** to backend via Axios POST request
3. **Backend receives file** using Multer middleware
4. **File validation** checks for XML format
5. **XML Parser** extracts relevant data using xml2js
6. **Data normalization** structures the parsed data
7. **MongoDB storage** saves the report with Mongoose
8. **Response sent** back to frontend with parsed data
9. **Frontend displays** formatted credit report
10. **File cleanup** removes temporary uploaded file

### Key Parsing Features

```javascript
// Ensures accounts are always an array (handles single account case)
let accountsArray = get(report, 'CAIS_Account.CAIS_Account_DETAILS', []);
if (!Array.isArray(accountsArray)) {
    accountsArray = [accountsArray];
}

// Safe property access with default values
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
```

## 🧩 Key Components

### Backend Components

#### 1. **reportController.js**
- Handles HTTP requests and responses
- Validates uploaded files
- Orchestrates XML parsing and database operations
- Manages file cleanup

#### 2. **reportModel.js**
- Defines MongoDB schema using Mongoose
- Structures credit report data
- Includes address information within each account (corrected design)

#### 3. **reportRoutes.js**
- Defines API endpoints
- Configures Multer for file uploads
- Maps routes to controller functions

#### 4. **xmlParserService.js**
- Core XML parsing logic
- Extracts applicant details, summary statistics, and account information
- Handles complex nested XML structures
- Provides error handling for malformed XML

#### 5. **server.js**
- Express application setup
- MongoDB connection
- Middleware configuration (CORS, JSON parsing)
- Server initialization

### Frontend Components

#### 1. **App.js**
- Main application container
- Manages application state (reportData, error, loading)
- Orchestrates child components
- Handles data flow between components

#### 2. **FileUpload.js**
- File selection interface
- Form submission handling
- Integrates with API service
- Provides user feedback during upload

#### 3. **ReportDisplay.js**
- Displays formatted credit report
- Three main sections:
  - Basic Details (name, phone, PAN, credit score)
  - Report Summary (account statistics, balances)
  - Credit Accounts (detailed account information)
- Currency formatting for Indian Rupee
- Responsive card-based layout

#### 4. **api.js**
- API service layer
- Axios configuration
- Error handling and message extraction
- Encapsulates backend communication

## 💾 Database Schema

### Report Collection

```javascript
{
  _id: ObjectId,
  basicDetails: {
    name: String,
    mobilePhone: String,
    pan: String,
    creditScore: Number
  },
  reportSummary: {
    totalAccounts: Number,
    activeAccounts: Number,
    closedAccounts: Number,
    currentBalance: Number,
    securedAccountsAmount: Number,
    unsecuredAccountsAmount: Number,
    creditEnquiriesLast7Days: Number
  },
  creditAccounts: [
    {
      bank: String,
      accountNumber: String,
      amountOverdue: Number,
      currentBalance: Number,
      accountType: String,
      address: String
    }
  ],
  createdAt: Date,
  __v: Number
}
```

### Schema Design Decisions

1. **Embedded Documents**: Credit accounts are embedded in the report document for better query performance
2. **Address Placement**: Address is stored within each account (as accounts can have different addresses)
3. **Timestamps**: Automatic createdAt timestamp for tracking report upload time
4. **Type Safety**: Numeric fields are explicitly typed for data integrity

## 🛡️ Error Handling

### Backend Error Handling

1. **File Validation**
   - Checks for file presence
   - Validates MIME type (text/xml or application/xml)
   - Returns 400 status for invalid files

2. **XML Parsing Errors**
   - Catches parsing exceptions
   - Provides meaningful error messages
   - Logs errors to console for debugging

3. **Database Errors**
   - Mongoose validation errors
   - Connection errors
   - Returns 500 status with error details

4. **File Cleanup**
   - Ensures uploaded files are deleted after processing
   - Cleanup occurs even on error conditions

### Frontend Error Handling

1. **Upload Validation**
   - Client-side file selection check
   - Displays error messages to user

2. **API Error Handling**
   - Extracts server error messages
   - Falls back to generic error message
   - Displays errors in dedicated error component

3. **Loading States**
   - Shows loading indicator during processing
   - Disables upload button during processing

## Report Display
Credit reports are displayed in three distinct sections:
1. **Basic Details Card** - Personal information and credit score
2. **Report Summary Card** - Statistics and account summaries
3. **Credit Accounts Card** - Individual account details with addresses

