import React from "react";
import { Card, CardContent, CardMedia, Grid } from "@mui/material";
import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";
import IconButton from "@mui/material/IconButton";
import CardActionArea from "@mui/material/CardActionArea";
import Cookies from "js-cookie";
import { makeStyles } from "@mui/styles";
import Tooltip from "@mui/material/Tooltip";
import { useState,useEffect } from "react";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import {Flash, Fade,Flip,Hinge,JackInTheBox} from "react-awesome-reveal";

const useStyles = makeStyles(() => ({
  grid: {
    padding: "30px 5%",
  },
  card: {
    width: "100%",
    textAlign: "left",
    BorderRadius: 5,
    overflow: "hidden",
    background:
      "linear-gradient(to bottom, #D5DEE7 0%, #E8EBF2 50%, #E2E7ED 100%), linear-gradient(to bottom, rgba(0,0,0,0.02) 50%, rgba(255,255,255,0.02) 61%, rgba(0,0,0,0.02) 73%), linear-gradient(33deg, rgba(255,255,255,0.20) 0%, rgba(0,0,0,0.20) 100%)",
    backgroundBlendMode: "normal,color-burn",
    backgroundClip: "border-box",
    justifyContent: "center",
    transition: "0.4s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      transform: "scale(1.03)",
      boxShadow: "4.0px 8.0px 8.0px hsl(0deg 0% 0% / 0.38)",
    },
  },
  search: {
    height: "40px",
    width: "50%",
    padding: "20px",
    margin: "20px 25px",
    border: "1px solid",
    color: "#000",
    fontSize: "18px",
    fontFamily: "'Courier New', Courier, monospace",
    fontWeight: "normal",
    borderRadius: "20px",
  },
}));


function Course(props) {
    const[cart,setCart]=useState([])
  const classes = useStyles();
  const { cod } = props;
  console.log(props);

  useEffect(()=>{
    const myToken = Cookies.get("jwt_token");
    console.log(myToken)
    const options = {  
        method: "GET",
        headers:{
            "Content-Type":"application/json",
            'Access-Control-Allow-Origin':"*",
            "Authorization": "Bearer " + myToken
        } 
    }
    fetch('http://127.0.0.1:8000/favourite',options)
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        setCart(data);
    });
},[])
const getCart =()=>{
  const myToken = Cookies.get("jwt_token");
  console.log(myToken);
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + myToken,
    },
  };
  fetch("http://127.0.0.1:8000/favourite", options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data,"done")
      setCart(data)
   });
}

  const addToFav = () => {
    const url = `http://127.0.0.1:8000/favourite/${cod.id}`;
    const myToken = Cookies.get("jwt_token");
    // const new_data = {
    //   user_name: "",
    //   course_id:cod.id,
    //   course_name: cod.course_name,
    //   image_url: cod.image_url,
    //   price: cod.price,
    //   rating: cod.rating,
    // };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: "Bearer " + myToken,
      }
      // body: JSON.stringify(new_data),
    };
    // console.log(new_data);
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
       getCart()
      });
  };

  const RemoveItem=()=>{

    const url =`http://127.0.0.1:8000/favourite/delete/${cod.id}`
    const myToken = Cookies.get("jwt_token")
    const new_data = {"course_name": cod.course_name}
    const options = {  
        method: "DELETE",
        headers:{
            "Content-Type":"application/json",
            'Access-Control-Allow-Origin': "*",
            "Authorization": "Bearer " + myToken
        },
        body:JSON.stringify(new_data)
    
        
    }
    console.log(cod, 'dd')

    fetch(url,options).then(response => 
        response.json()
        ).then(data => {
            console.log(data)
            getCart()
        })
}

const clickOnIcon =()=>{
    console.log(cart, "not")
    const cartNameList = cart.map(e=>e.id)
    console.log(cartNameList)
    if(cartNameList.includes(cod.id)){
        RemoveItem()
    }
    else{
      addToFav()
    }

}
let carte 
const cartNameList = cart.map(e=>e.id)
console.log(cartNameList, cod.id, "ok")
if(cartNameList.includes(cod.id)){
    carte = true
}
else{
    carte = false
}

const text = carte? "Already in cart" : "Add to cart"

  return (
    <div>
      <Card
        style={{
          height: "100%",
          width: "13rem",
          borderRadius: "20px",
          marginBottom: "20px",
        }}
        className={classes.card}
      >
        <CardMedia>
          <img
            src={cod.image_url}
            style={{
              height: "5rem",
              width: "11.7rem",
              padding: "10px 10px",
              borderRadius: "20px",
            }}
          />
        </CardMedia>
        <CardContent style={{ marginTop: "-20px" }}>
          <h5 style={{ textAlign: "center", fontSize: "0.7rem" }}>
          <JackInTheBox delay={700}>
          <b>{cod.course_name}</b>
          </JackInTheBox>
          </h5>
          <hr style={{ height: "0.5px", width: "100%" }} />
          <h5>
            <b>Price :</b> $ {cod.price}
          </h5>
          <p style={{ fontSize: "0.8rem" }}>
            <b>Rating :</b> {cod.rating}/5
          </p>
        </CardContent>
        <CardActionArea style={{ padding: "0px 3%" }}>
          <Tooltip title={text} arrow>
            <IconButton onClick={clickOnIcon} style={{ fontSize: "0.6rem" }}>
              {
                carte? <RemoveShoppingCartIcon/> : <AddShoppingCartSharpIcon/>
              }
            </IconButton>
          </Tooltip>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default Course;
