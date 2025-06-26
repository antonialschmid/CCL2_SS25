## Instructions for teacher 

Setup Instructions (

How to clone your repository:

git clone: https://git.nwt.fhstp.ac.at/ccl_cc241073/ss2025_ccl_cc241073.git


Backend setup

cd backend
npm install
node app.js

 Frontend setup (if running locally only)

cd ../frontend
npm install
npm run dev


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

