import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchAppBar from "./Header";
import Cookies from "js-cookie";
import { makeStyles } from "@mui/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import CartItem from "./CartItem";
import image from "./../../images/gatsby-404.jpg";
import {Fade,Zoom} from 'react-awesome-reveal'

const useStyles = makeStyles(()=>({

img:{
    height: "100%",
    width: "40rem",
 "&:hover":{
   transform:'scaleX(-1)'
 },
}

}))

function Cart() {
  const [fav, setFav] = useState([]);
  const classes= useStyles()
  useEffect(() => {
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
        setFav(data);
      });
  }, []);
  console.log(fav);

  const refreshCart = () => {
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
        setFav(data);
      });
  };
  if (fav.length == 0) {
    return (
      <>
      <SearchAppBar />
        <div style={{ display: "flex", alignItems: "center",gap:'3rem' }}>
          <div>
            <Zoom>
            <img
              src={image}
              className={classes.img}
              alt="empty"
            />
            </Zoom>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection:'column',
              padding:'30px 5%',
              width:'25rem',
              boxShadow: "4.5px 9.0px 9.0px hsl(0deg 0% 0% / 0.36)",
              background:
                "linear-gradient(to bottom, #D5DEE7 0%, #E8EBF2 50%, #E2E7ED 100%), linear-gradient(to bottom, rgba(0,0,0,0.02) 50%, rgba(255,255,255,0.02) 61%, rgba(0,0,0,0.02) 73%), linear-gradient(33deg, rgba(255,255,255,0.20) 0%, rgba(0,0,0,0.20) 100%)",
              backgroundBlendMode: "normal,color-burn",
            }}
          >
           <Fade delay={1000}>
           <h2>Oops ! <b>&#128533;</b></h2>
           </Fade>
            <br />
           <Fade delay={2000}>
           <h3>Empty <s>CART</s>&nbsp;	&#128529;</h3>
           </Fade>
            <br />
            <br />
           <Link to='/'>
           <Fade delay={3000}>
           <button style={{padding:"10px 10px", borderRadius:"10px", background:'#263137', color:'#fff'}}>Add Course &nbsp; &#128526;</button> 
           </Fade>
           </Link>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <SearchAppBar />
        <div
          style={{
            background: "#95D6F9",
            height: "100%",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {fav.map((item) => {
            return (
              <CartItem cod={item} key={item.id} refreshCart={refreshCart} />
            );
          })}
        </div>
      </>
    );
  }
}

export default Cart;
