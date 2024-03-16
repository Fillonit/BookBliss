# BookBliss Application Installation Guide

This document provides a step-by-step guide on how to install and run the BookBliss application on your local machine.

## Prerequisites

Before you begin, ensure that you have the following software installed on your machine:

[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/)

If you do not have these installed, please visit their respective websites for download and installation instructions.

> In case you want to deploy the application, you will also need to have an account with a cloud platform such as <br>[![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/) 
[![Netlify](https://img.shields.io/badge/netlify-%2300C7B7.svg?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)


## Installation Steps

1. **Clone the Repository**

    You can clone the repository using HTTPS, SSH, or GitHub CLI. Choose the method that best suits your setup:

    - HTTPS: `git clone https://github.com/Fillonit/BookBliss.git`
    - SSH: `git clone git@github.com:Fillonit/BookBliss.git`
    - GitHub CLI: `gh repo clone Fillonit/BookBliss`

2. **Install Dependencies**

    Navigate to the cloned repository directory and run the following command to install the necessary dependencies:

    `npm install`

3. **Configure Environment Variables**

    Create a `.env` file in the root directory of the project. Copy the contents of the `.env.example` file into the `.env` file and replace the placeholder values with your actual data.

4. **Start the Application**

    Run the following command to start the application:

    `npm start`

    The application will start and by default can be accessed at [http://localhost:3000](http://localhost:3000) or [127.0.0.1:3000](http://127.0.0.1:3000) in your web browser.

5. **Running Tests**

    To ensure that the application is functioning as expected, you can run the unit tests using the following command:

    `npm test`

6. **Building the Application**

    If you wish to create a production-ready build of the application, run the following command:

    `npm run build`

7. **Deploying the Application**

    To deploy the application, run the following command:

    `npm run deploy`

    Once deployed, the application can be accessed at [bookbliss.vercel.app](https://bookbliss.vercel.app/).

## Conclusion

Congratulations! You have successfully installed and run the BookBliss application on your local machine. Enjoy exploring the features and functionality of the application. If you encounter any issues, please refer to the [Troubleshooting Guide](/docs/troubleshooting.md) or contact the support team.