import  "./post.css"
import React from 'react'
import { Link } from "react-router-dom"
import { Context } from "../context/Context";
import { useContext } from "react";
function Post({post}) {
  const PF="http://localhost:3001/images/";
  const { user } = useContext(Context);
  return (
    <div className="post">
    {post.photo &&(
    <img
      className="postImg"
        src={PF+post.photo}
        alt=""
    />
    )}
     <div className="postInfo">
         <div className="postCats">
            {post.categories.map((c)=>(
              <span className="postCat">{c.name}</span>
            ))}
           
           </div>
           {user &&(
           <Link to={`/post/${post._id}`} className="link">
          
          <span className="postTitle">{post.title}</span>
        </Link>
           )}
             <hr/>
             <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
         </div>
        <p className="postDesc">
       {post.desc}
        </p>
    </div>
  )
}

export default Post