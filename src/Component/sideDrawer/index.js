import React from "react";
import './styles.scss'
import Header from "../header";

const SideDrawer = () => {
    
      

    return(
        <div className="LeftSideBar__LeftSection">

        
      
       
       
     
            <ul className="LeftSideBar__LeftSection__menuWrapper">
        <li>
          <a
            href="#"
          >
            Manage Users
          </a>
        </li>
        <li>
          <a
            href="#"
          >
           Manage Listing
          </a>
        </li>
        <li>
         <a
            href="#"
          >
            Roles
          </a>
        </li>
      </ul>
        </div>
    )
}

export default SideDrawer;