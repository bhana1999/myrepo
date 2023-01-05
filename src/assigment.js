import { render } from "@testing-library/react";
import React from "react";

let name = "Bhawana";
function App () {
  return(
   <>
   <nav>
    <li>Home</li>
    <li>About</li>
    <li>Contact</li>
    </nav>
    <div className="Kuchbhi">
      <h1> my name is : {name}</h1>

    </div>
   </>
)

}

