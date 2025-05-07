# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Internship and Externship Management System

This is a full-stack web application designed to manage internships and externships for students and organizations. The system streamlines the coordination between students, departments, advisers,facality and admin.

## 🛠️ Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js with Express
- **Database:** MongoDB


## 🚀 Features

### 👨‍🎓 Student Features
- Register and log in to the system
- Apply for internships and externships
- Track the status of applications
- Receive feedback and notifications
### 🏢 Department Features
- View and manage student applications
- Assign advisers to students
- Monitor internship/externship progress

### 👨‍🏫 Adviser Features (Under Departments)
- Supervise and guide assigned students
- Provide progress evaluations
- Approve student reports and activity logs

### 🏫 Faculty/Organization Features (Externship Hosts)
- Accept or reject student placement requests
- Provide feedback and completion reports

### 🛡️ Admin Features
- Manage user roles (students, departments, advisers, faculty)
- Maintain master data and system configurations
- Oversee all modules and operations

## 📁 Project Structure

```bash
/internship-externship-system
├── client/          # React frontend
├── server/          # Node.js backend
└── README.md
