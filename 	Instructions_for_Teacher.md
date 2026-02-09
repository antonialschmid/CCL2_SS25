## Instructions for teacher 

Setup Instructions (

How to clone your repository:

git clone: https://git.nwt.fhstp.ac.at/ccl_cc241073/ss2025_ccl_cc241073.git


### 📦 Global Prerequisites

Make sure the following tools are installed before proceeding:

```bash
# Required:
Node.js (v18 or newer)
NPM (comes with Node)

# Optional (if hosting a local DB):
MySQL Server

# Optional (for managing environment variables easily):
npm install -g dotenv-cli
```

---

## 📁 Backend Setup

### 1. Navigate to the backend folder:

```bash
cd backend
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Dependencies being installed:

```bash
express
mysql2
dotenv
cors
cookie-parser
jsonwebtoken
bcryptjs
```

You can also install them manually:

```bash
npm install express mysql2 dotenv cors cookie-parser jsonwebtoken bcryptjs
```

### 4. Create a `.env` file:

Create a file called `.env` inside the backend directory:

```env
DB_HOST=your-db-host
DB_USER=your-db-username
DB_PASSWORD=your-db-password
DB_NAME=your-database-name
JWT_SECRET=your-secret-key
```

### 5. Start the backend:

```bash
npm start
# or
node app.js
```

---

## 📁 Frontend Setup

### 1. Navigate to the frontend folder:

```bash
cd ../frontend
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Dependencies being installed:

```bash
react
react-dom
react-router-dom
axios
```

You can also install them manually:

```bash
npm install react react-dom react-router-dom axios
```

### 4. Start the frontend (development):

```bash
npm run dev
```

### Or build it for production:

```bash
npm run build
```

---

## 🌐 Hosting on Campus Cloud (Frontend + Backend in one instance)

In `backend/app.js`, make sure the following is added **after** all routes:

```js
const path = require("path");
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});
```

Then build the frontend and copy the `dist/` folder into `frontend/` before deploying your app.

---

## ✅ Final Setup Recap

```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd ../frontend
npm install
npm run dev   # or npm run build
```

Make sure `.env` is properly configured for DB access.




Environment setup (required)

Create a file called .env in /backend and add the following:
DB_HOST=atp.fhstp.ac.at
DB_USERNAME=cc241073
DB_PASSWORD=Pk2-Dv6-Mt2!
DB_NAME=cc241073
DB_PORT=8007



⸻

🔑 2. Credentials

Database Access (if applicable):

Host: atp.fhstp.ac.at
User: cc241073
Password: Pk2-Dv6-Mt2!
Database Name: cc241073

The link to my instance:

https://cc241073-10803.node.fhstp.cc

Admin Login:

Email: antonia@dearbody.com
Password: 12345

Normal User without login: 

User  Email: test@dearbody.com
User  Password: test

or you can just create ur own acc 



⸻

     3. User Flow 
1.	Go to: https://cc241073-10803.node.fhstp.cc
2.	Click on “Letters” to browse anonymously – this is public.
3.	Click on a letter to view the detail page.
4.	Click on “Login”, use test@dearbody.com or own acc to log in.
5.	Now try writing a letter (“Write” in nav) and post it.
6.	Go to your profile – you can view and delete your own letters.
7.	Logout.
8.	Login with antonia@dearbody.com to test the Admin Panel.
9.	You can now see and delete all letters and users.

⸻

Additional notes:
•	Design is responsive but works best on desktop.
•	You don’t need to be logged in to view letters, only to write one.
•	Posting a letter is anonymous.
•	Admin panel is accessible only by the one hardcoded admin login.
•	The search function works for filtering letters by body part on the Letters page.

