import  './settings.css'
import axios from 'axios';
import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar'
import { useContext,useState } from 'react'
import { Context } from '../../components/context/Context';
function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSucess] = useState("");
  const {user,dispatch} =useContext(Context);
  const PF="http://localhost:3000/images/"
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"});
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data =new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/upload", data);
        //setSucess(true);
      } catch (err) {}
    }
    try {
     const res=await axios.put("/users/"+user._id, updatedUser);
     setSucess(true);
     dispatch({type:"UPDATE_SUCCESS",payload:res.data});
    } catch (err) {
      dispatch({type:"UPDATE_FAILURE"});
    }
  };

  return (
    <div className='settings'>
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          <span className="settingsDeleteTitle">Delete Account</span>

        </div>
        <form  className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className='settingsPP'>
            <img
              src={file ? URL.createObjectURL(file): PF+user.profilePic}
            
              alt=''
            />
            <label htmlFor="fileInput">
              <i class="settingsPPIcon 
              far fa-user-circle"></i>
            </label>
            <input 
            type="file"
            id="fileInput" 
            style={{display:"none"}}
            onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
           <input type="text" placeholder={user.username} onChange={e=>setUsername(e.target.value)}/>
           <input type="emai" placeholder={user.email} onChange={e=>setEmail(e.target.value)}/>
           <input type="password" onChange={e=>setPassword(e.target.value)}/>
           <button className="settingsSubmit" type="submit">Update</button>
           {success && <span style={{color:"green",textAlign:"center",marginTop:"20px"}}> Profile has been updated..</span>}
        </form>
      </div>
      <Sidebar/>
    </div>
  )
}

export default Settings