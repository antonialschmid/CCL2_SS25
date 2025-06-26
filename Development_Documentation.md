## Development Documentation

1. Hosting Setup

My web app is hosted on the FH St. Pölten Campus Cloud, using a Node.js instance. The app is fully functional and accessible online.

Tools/Services used:
•	Node.js backend (Express.js)
•	MySQL database hosted via FHSTP
•	React.js frontend (Vite-based setup)
•	Campus Cloud’s FTP for file transfer (via FileZilla)

Deployment process:
•	Built the frontend using npm run build which created the dist/ folder
•	Created /frontend/ and /backend/ folders in the /node/ directory on Campus Cloud
•	Copied the backend files (excluding node_modules) and frontend/dist/
•	Updated backend app.js to serve static frontend files
•	Adjusted all Axios API requests in the frontend to include /api
•	Final Node startup command: node app.js

---

2.  Source Code Submission
   •	ZIP file of the complete project is submitted on eCampus.
   •	GitLab Repository: 
   •	The GitLab repository includes a README.md explaining:
   •	Project purpose
   •	Setup instructions
   •	Key features

I followed Git best practices as much as possible, though I sometimes forgot to commit in between (see Dev Diary).

---

3. Code Documentation

I structured and commented my code to make it understandable:
•	Clear and consistent variable naming (e.g. resonateCount, isAdmin, fetchLetters())
•	Each file has a focused responsibility:
•	Controllers handle logic
•	Routes handle API endpoints
•	Models handle DB access
•	Frontend is split into pages/ and components/
•	Key functions have inline comments if complex
•	Reused classes and CSS across components (e.g. button-wrap, login-btn, etc.)

---

4. Project Architecture

/node

├── /backend

│   ├── routes/           # Express route definitions (users, letters)

│   ├── controllers/      # Request handlers and business logic

│   ├── models/           # DB queries using mysql2/promise

│   ├── services/         # Auth (JWT middleware), DB connection

│   └── app.js            # Main server file

├── /frontend

│   ├── /assets/          # Logo, flower image

│   ├── /pages/           # Main route-based components (Login, Register, Write, Profile etc.)

│   ├── /components/      # Smaller reusable elements if any

│   ├── /styles/          # CSS (merged into one: style.css)

│   └── index.html        # Root HTML



---

5. User Interaction Overview

App Idea

Dear Body is a poetic, blog web app where users can write anonymous letters to their body or body parts — as a form of reflection, emotional release, and digital intimacy.
The platform creates a soft and personal space, inspired by zines, diaries, and feminist publishing.


First Design / Mockup

The app has a bold pink layout with pixel fonts, scanned textures (like flowers or water), and star icons, combining softness and glitchy rawness.
Navigation is simple and consistent. Main elements:
Hero text
Navigation bar
Login/Write/Read/Profile sections
(All screens are implemented in a first clickable prototype.)

User Flow

Landing page → click “Read Letters” or “Write a Letter”
Reading letters is public – no login required
Writing letters and resonating requires login
Logged-in users can write a letter → stored in DB
All letters are published anonymously (no username is shown)
Logged-in users can view their own letters on their profile page

Database Design

userDearBody:
id
username
email
password_hash

lettersDearBody:
id
user_id
title
body_part
content
created_at
resonate_count

MVP – Minimum Output for 2 Weeks

Frontend (React):
Login/Register flow
Form to write a letter (auth-protected)
Public feed to read all letters
Profile page with user’s own letters
All letters appear anonymous to others

Backend (Node.js + Express):
Auth endpoints (register, login)
CRUD for letters (write, read, resonate)
Middleware to protect writing/resonating routes

Database (MySQL):
2 working tables (users + letters)

Link to prototype:
https://www.figma.com/proto/AsSVg5pDKfGXdIgeZlsy7p/CCL-DearBody?page-id=0%3A1&node-id=7-69&viewport=676%2C-12%2C0.17&t=UythDpMnRZQUcWLb-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=7%3A91&show-proto-sidebar=1

Known Issues/Limitations:
•	No pagination (letters just list infinitely)
•	No edit/delete for user’s own letters
•	No advanced accessibility features yet

words of Honesty: 

tbh I'm actually very satisfied by the website, the thing is im not a hundred percent up to my first design idea, Which for me is fine but I know
it could be better

---

6. Accessibility (Optional)

I did not implement specific WCAG accessibility features, so I will not submit for bonus points here.

