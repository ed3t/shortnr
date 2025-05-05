## Backend - Node.js with TypeScript

### Overview

The **backend** of the URL shortener is built using **Node.js** with **TypeScript**. It provides the APIs for encoding and decoding URLs, as well as listing and redirecting short URLs.

### Prerequisites

* **Node.js** (version 20.x or higher)
* **Yarn** (package manager)

### Steps to Run

1. **Clone the Repository**:

   Clone the project repository to your local machine:

   ```bash
   git clone https://github.com/ed3t/shortnr.git
   cd shortnr/backend
   ```

2. **Install Dependencies**:

   Install the necessary dependencies using **Yarn**:

   ```bash
   yarn install
   ```

3. **Set Up Environment Variables**:

   Create a `.env` file in the root directory, and set up the following variables:

   ```env
   VITE_API_URL=http://localhost:5000/api
   FRONTEND_URL=http://localhost:3000
   ```

4. **Build the Backend**:

   To compile the TypeScript code:

   ```bash
   yarn build
   ```

5. **Start the Backend**:

   To run the backend in development mode with **nodemon**:

   ```bash
   yarn dev
   ```

   To run the backend normally:

   ```bash
   yarn start
   ```

   The server should now be running at `http://localhost:5000`.
