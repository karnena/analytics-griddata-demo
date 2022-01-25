import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Grid } from "@mui/material";
import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";
import IconButton from "@mui/material/IconButton";
import CardActionArea from "@mui/material/CardActionArea";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import ReactCardFlip from "react-card-flip";
import Course from "./Course";



function AllCourses() {
  const [course, setCourse] = useState([]);

  const [searchInput, changeSearchInput] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/course")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCourse(data);
      });
  }, []);
  console.log(course);

  const changeValue = (e) => {
    changeSearchInput(e.target.value);
  };

  const filteredCourses = course.filter((cors) =>
    cors.course_name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (<>
    <div style={{ display: "flex", justifyContent: "center", }}>
        <input
          placeholder="Search by Course name..."
          type="search"
          onChange={changeValue}
          style={{width:'25rem', padding:'10px 3%', borderRadius:'20px'}}
        />
      </div>
    <div style={{ display:'flex', flexWrap:'wrap', padding:'20px 13%',gap:"2rem" }}>
        {filteredCourses.map((cod) => {
          console.log(cod);
          return (
              <Course cod={cod} key={cod.id}/>
          )
        })}
    </div>
 </> );
}

export default AllCourses;
