import "./sidebar.css"
import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
function Sidebar() {
  const [cats,setCats]=useState([]);
  useEffect(()=>{
     const getCats =async()=>{
       const res= await axios.get("/categories");
       setCats(res.data);
     }
     getCats();
  },[]);
  return (
    <div className="sidebar">
    <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT ME</span>
            <img
            className="sidebarImg"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfFeTUHEYnrfmRa6Ud5rA-wzBoXhQhDVoM8g&usqp=CAU"
            
              alt=""
            />
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nisl est, commodo et volutpat sed, pretium eget odio. Aenean ornare interdum orci, non venenatis quam ultrices scelerisque.
            Sed mattis neque a risus lacinia efficitur.  
            </p>
    </div>
    <div className="sidebarItem">
    <span className="sidebarTitle">CATEGORIES</span>
    <ul className="sidebarList">
    {cats.map((c)=>(
      
       <Link to={`/?cat=${c.name}`} className='link' >
       <li className="sidebarListItem">{c.name}</li>
       </Link>
    ))}
        
   </ul>
        
    </div>
    <div className="sidebarItem">
    <span className="sidebarTitle">FOLLOW US </span>
    <div className="sidebarSocial">
      <i class="sidebarSocialIcon fa-brands fa-facebook-square fa-2xl"></i>
      <i class="sidebarSocialIcon fa-brands fa-twitter-square fa-2xl"></i>
      <i class="sidebarSocialIcon fa-brands fa-instagram-square fa-2xl"></i>
      <i class="sidebarSocialIcon fa-brands fa-pinterest-square fa-2xl"></i>
    </div>
    </div>
    </div>
  )
}

export default Sidebar