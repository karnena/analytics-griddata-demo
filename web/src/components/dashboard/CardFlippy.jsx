import React from "react";
import { useRef } from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";

function CardFlippy() {
  const ref = useRef();

  return (
    <Flippy
      flipOnHover={false} // default false
      flipOnCli
      ck={true} // default false
      flipDirection="horizontal" // horizontal or vertical
      ref={ref}
      style={{ width: "300px", height: "300px" }} /// these are optional style, it is not necessary
    >
      <FrontSide style={{ backgroundColor: "#41669d" }}>
        RICK <br />
        <button
          onClick={() => {
            ref.current.toggle();
          }}
        >
          {" "}
          Toggle via button
        </button>
      </FrontSide>
      <BackSide style={{ backgroundColor: "#175852" }}>ROCKS</BackSide>
    </Flippy>
  );
}

export default CardFlippy;
