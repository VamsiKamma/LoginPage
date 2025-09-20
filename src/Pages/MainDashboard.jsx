// import React from "react";
// import { Button, Typography, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// function MainDashboard() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     window.dispatchEvent(new Event("storage"));
//     navigate("/login");
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column", 
//         justifyContent: "center",
//         alignItems: "center",
//         background:
//           "linear-gradient(to right, #a1c4fd, #c2e9fb, #fbc2eb, #fdd3e0)",
//         textAlign: "center",
//       }}
//     >
//       <Typography variant="h4" gutterBottom>
//         Welcome, {user?.name || "User"}!
//       </Typography>
//       <Button
//         variant="contained"
//         color="secondary"
//         onClick={handleLogout}
//         sx={{ mt: 2 }}
//       >
//         Logout
//       </Button>
//     </Box>
//   );
// }

// export default MainDashboard;




//Testing 1



import React, { useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MainDashboard() {
  const navigate = useNavigate();

  const rawUser = localStorage.getItem("user");
  let user = {};
  if (rawUser && rawUser !== "undefined") {
    try {
      user = JSON.parse(rawUser);
    } catch {
      user = {};
    }
  }

  // Redirect to login if no token
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to right, #a1c4fd, #c2e9fb, #fbc2eb, #fdd3e0)",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome, {user?.name || "User"}!
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{ mt: 2 }}
      >
        Logout
      </Button>
    </Box>
  );
}

export default MainDashboard;

