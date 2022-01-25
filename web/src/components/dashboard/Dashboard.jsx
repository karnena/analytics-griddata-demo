import React, { useEffect, useState } from "react";
import SearchAppBar from "./Header";
import { Card, CardContent, CardMedia, Grid } from "@mui/material";
import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";
import IconButton from "@mui/material/IconButton";
import CardActionArea from "@mui/material/CardActionArea";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import ReactCardFlip from 'react-card-flip';
import AllCourses from "./AllCourses";



function Dashboard() {

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <SearchAppBar />
      <div
        style={{
          background: "#111933",
          marginTop: "-21px",
          paddingTop: "20px",

        }}
      >
        {/* <div>
          <h1 style={{ textAlign: "center", fontWeight: "700",color:'#fff' }}>
            REACT-FAST_API&nbsp;/&nbsp;COURSES-DASHBOARD
          </h1>
        </div> */}
        
           <AllCourses />
           </div>
        
    
    </>
  );
}

export default Dashboard;
