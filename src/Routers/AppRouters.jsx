// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import LoginPage from "../Pages/LoginPage";
// import MainDashboard from "../Pages/MainDashboard";
// import React, { useState, useEffect } from "react";

// function AppRouters() {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     !!localStorage.getItem("token")
//   );

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setIsAuthenticated(!!localStorage.getItem("token"));
//     };
//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route
//           path="/dashboard"
//           element={
//             isAuthenticated ? <MainDashboard /> : <Navigate to="/login" replace />
//           }
//         />
//         <Route path="/" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default AppRouters;




//Testing -1 


import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import MainDashboard from "../Pages/MainDashboard";

function AppRouters() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<MainDashboard />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default AppRouters;












