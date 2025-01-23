import React, { useEffect, useState } from "react";
// import "./Homepage.css"
// import bgVedio from '../assests/back.mp4';
// import Login from "../Auth/components/login";
// import Signup from "../Auth/components/signup";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../Auth/authSlice";
import {  Route } from "react-router-dom";
// import ChatPage from "./chapPage";
// import { Redirect } from "react-router-dom";
import Signup from "../Auth/component/signUp";
import Login from "../Auth/component/login";
import NavBar from "./top";
import ChatApp from "./Chat";


const Homepage = () =>{
  const [section, setSection] = useState(0);
  
    const user  =useSelector(selectLoggedInUser);
    const[mail ,setMail]= useState(null)
       const [token ,setToken] = useState(localStorage.getItem("token")?localStorage.getItem("token"):null)
 
    const updateUser=()=>{
        setTimeout(()=>{
            setToken(localStorage.getItem("token")?localStorage.getItem("token"):null)
        },2500)
    }
    
    if(token){
        const fetchData = async () => {
            try {
              // setLoading(true); // Start the loading state
              const response = await fetch("https://chat-server-backend-1.onrender.com/protected",{
                method: 'GET',
                headers: {
                  'Authorization': `Bearer ${token}`, // Include token here
                  'Content-Type': 'application/json', // Optional: Depending on API
                }});
               if(response.status==400){
                console.log( "i am 4000")
                  localStorage.removeItem("token")
                  setToken(null)
               }
               else{
                 const data = await response.json()
                 setMail(data.message)
                 console.log("mani",data)
               }
            } catch (err) {
                console.log(err)
                localStorage.removeItem("token")
                setToken(null)
            } finally {
              
            }
          };
      
          fetchData();
    }
    // useEffect(() => {
    //     // Define the async function to call the backend API
    //     const fetchData = async () => {
    //       try {
    //         // setLoading(true); // Start the loading state
    //         const response = await fetch("http://localhost:5000/protected",{
                
    //                 method: "GET",
    //                 body: JSON.stringify({"token":token}),
    //                 headers: { "content-type": "application/json" },
                  
    //         });
    //          if(response.status==400){
    //             setToken(null);
    //          }
    //       } catch (err) {
    //         setToken(null);
    //       } finally {
            
    //       }
    //     };
    
    //     fetchData(); // Call the async function
    //   }, []);

     const handleLogout = ()=>{
        localStorage.removeItem("token");
        sessionStorage.clear()
        setToken(null)
     }

    //  const [user,setUser] = useState(null);
  const changeState = (x)=>{
     
    if (x == 0) {
      setSection(1);
    }
    else {
      setSection(0);
    }
  } 
  console.log("hello-->")
  // const user = useSelector()
  return (
    <>
      
       {token?<><NavBar handleLogout={handleLogout} mail ={mail}></NavBar>
  <ChatApp></ChatApp></>:( section === 0 ? (
          <Signup changeState={changeState}></Signup>
        ) : (
          <Login changeState={changeState} updateUser={updateUser}></Login>
        ))}
        
      
    </>
  );
};
export default Homepage;
