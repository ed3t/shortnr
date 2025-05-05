# **Shortnr - API and Web Interface Documentation**

## **Overview**

This project provides both a **web interface** and an **API** for shortening URLs. It allows users and API consumers to interact with the service seamlessly:

* Submit long URLs to generate short URLs.
* View statistics for short URLs.
* List all the shortened URLs.
* Programmatically integrate with the URL shortener service.

---

## **Table of Contents**

1. [Running the Application](#running-the-application)

   * [Backend - Node.js with TypeScript](#backend---nodejs-with-typescript)
   * [Frontend - React with Vite](#frontend---react-with-vite)
2. [API Endpoints](#api-endpoints)

   * [POST /api/encode](#post-apiencode)
   * [GET /api/decode/\:shortUrl](#get-apidecodeshorturl)
   * [GET /api/statistic/{shortUrl}](#get-apistatisticshorturl)
   * [GET /api/list](#get-apilist)
   * [GET /{shortUrl}](#get-shorturl)
3. [Example API Integrations](#example-api-integrations)
4. [Running Tests](#running-tests)

---

## **Running the Application**

### 1. **Running the Backend (Node.js with TypeScript)**

#### **Prerequisites**:

* **Node.js** (version 20.x or higher)
* **Yarn** (package manager)

#### **Steps to run**:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ed3t/shortnr.git
   cd shortnr/backend
   ```

2. **Install dependencies**:

   Use **Yarn** to install dependencies:

   ```bash
   yarn install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory, and set up the following variables:

   ```env
   VITE_BACKEND_URL=http://localhost:5000
   FRONTEND_URL=http://localhost:5173
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

   Or start the server normally:

   ```bash
   yarn start
   ```

   The server should now be running at `http://localhost:5000`.

---

### 2. **Running the Frontend (React with Vite)**

#### **Prerequisites**:

* **Node.js** (version 14.x or higher)
* **Yarn** (package manager)

#### **Steps to run**:

1. **Navigate to the frontend directory**:

   ```bash
   cd frontend
   ```

2. **Install dependencies**:

   Use **Yarn** to install dependencies:

   ```bash
   yarn install
   ```

3. **Start the development server**:

   To start the frontend development server with **Vite**:

   ```bash
   yarn dev
   ```

   The frontend should now be running at `http://localhost:5173`.

---

## **Backend - Node.js with TypeScript**

### **Project Structure**

The backend is written in **TypeScript** and follows a modular structure. Below are the key parts of the backend:

* **`src/controllers/`**: Contains controller functions for URL encoding and decoding.
* **`src/models/`**: Includes the database models and data interactions for storing and retrieving URLs.
* **`src/routes/`**: Contains the API routes and Express middleware.
* **`src/utils/`**: Utility functions such as URL validation and error handling.
* **`src/index.ts`**: The entry point for the Node.js application.

The backend uses **Express.js** for routing and API handling, **TypeORM** or **Mongoose** (depending on your choice) for the database, and **TypeScript** for type safety.

---

## **Frontend - React with Vite**

### **Project Structure**

The frontend is built using **React** and **Vite** for fast development and bundling. Here's the directory structure:

* **`src/`**: Contains all the React components and assets.

  * **`src/api/`**: Contains the API client to interact with the backend (`api.js`).
  * **`src/components/`**: Contains reusable components like `UrlForm`, `List`, `DataTable`, etc.
  * **`src/pages/`**: Contains the page-level components like `Home`, `RedirectToLongUrl`, etc.

**Vite** is used as the development server and build tool, providing a fast development experience with hot reloading.

---

## **API Endpoints**

The backend exposes the following API endpoints:

### **POST** `/api/encode`

#### **Description**:

Encodes a long URL into a short URL.

#### **Request Body**:

```json
{
  "longUrl": "https://example.com"
}
```

#### **Response Body**:

```json
{
  "longUrl": "https://example.com",
  "shortUrl": "http://localhost:5000/abc123"
}
```

#### **Example cURL**:

```bash
curl -X POST http://localhost:5000/api/encode \
  -H "Content-Type: application/json" \
  -d '{"longUrl": "https://example.com"}'
```

---

### **GET** `/api/decode/:shortUrl`

#### **Description**:

Decodes a short URL into the original long URL.

#### **Response Body**:

```json
{
  "longUrl": "https://example.com"
}
```

#### **Example cURL**:

```bash
curl http://localhost:5000/api/decode/abc123
```

---

### **GET** `/api/statistic/{shortUrl}`

#### **Description**:

Returns statistics for a shortened URL.

#### **Response Body**:

```json
{
  "shortUrl": "http://localhost:5000/abc123",
  "longUrl": "https://example.com",
  "visits": 123,
  "createdAt": "2025-05-01T00:00:00.000Z",
  "lastAccessed": "2025-05-05T10:30:00.000Z"
}
```

#### **Example cURL**:

```bash
curl http://localhost:5000/api/statistic/abc123
```

---

### **GET** `/api/list`

#### **Description**:

Lists all created URLs.

#### **Response Body**:

```json
[
  {
    "shortUrl": "http://localhost:5000/abc123",
    "longUrl": "https://example.com",
    "visits": 123,
    "createdAt": "2025-05-01T00:00:00.000Z"
  },
  {
    "shortUrl": "http://localhost:5000/xyz456",
    "longUrl": "https://anotherexample.com",
    "visits": 50,
    "createdAt": "2025-04-28T00:00:00.000Z"
  }
]
```

#### **Example cURL**:

```bash
curl http://localhost:5000/api/list
```

---

### **GET** `/{shortUrl}`

#### **Description**:

Redirects the user to the original long URL for a given short URL.

#### **Example**:

If the short URL is `http://localhost:5000/abc123`, a GET request will redirect to `https://example.com`.

---

## **Example API Integrations**

### **Using the API in a React Application**

To use the API in your React application, you can interact with the backend using `fetch` or any HTTP client (like `axios`). Here is an example of integrating the `encode` API in React:

```jsx
import React, { useState } from "react";

const UrlForm = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/encode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ longUrl }),
    });

    const data = await response.json();
    setShortUrl(data.shortUrl);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Enter a long URL"
        />
        <button type="submit">Shorten</button>
      </form>
      {shortUrl && <p>Short URL: {shortUrl}</p>}
    </div>
  );
};

export default UrlForm;
```

---

## **Running Tests**

### **Backend Tests (Jest)**

#### **Prerequisites**:

* **Node.js** (version 20.x or higher)
* **Yarn** (package manager)
* **Jest** for running tests

#### **Steps to run tests**:

1. **Install dependencies**:

   Navigate to the root directory and install the dependencies using Yarn:

   ```bash
   yarn install
   ```

2. **Run the backend tests**:

   Use the following command to run the backend tests using Jest:

   ```bash
   yarn test
   ```

   This will run the tests in your `__tests__/` directory.

3. **View test results**:

   * The test results will be printed in the terminal.
   * Additionally, a **test report** will be generated in the `test-report.html` file.

4. **Testing Specific Test Files**:

   To run a specific test file (for example, `encode.test.ts`), use the following command:

   ```bash
   yarn test __tests__/unit/routes/encode.test.ts
   ```
