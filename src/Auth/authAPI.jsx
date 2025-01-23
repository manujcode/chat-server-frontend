// import { useDispatch } from "react-redux";
// import { loginUserAsyc } from "./authSlice";

export function createUser(userData) {
    return new Promise(async (resolve) => {
      const response = await fetch("https://chat-server-backend-1.onrender.com/signup", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      });
      const {email,password} = userData;
      const data = await response.json();
    //   console.log(data,"xxx",email,password)
    //   if(data.message=='User created successfully')
    //     console.log("vbsdjkbvksjdbv")
    // const dispatch = useDispatch();

    //   dispatch(loginUserAsyc (userData))
      
      resolve({ data });
    });
  }
  export function loginUser(loggedData) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("https://chat-server-backend-1.onrender.com/login", {
          method: "POST",
          body: JSON.stringify(loggedData),
          headers: { "content-type": "application/json" },
        });
  
        if (response.ok) { 
            const data = await response.json();
            console.log(data,"qqqq")
            localStorage.setItem("token",data.token)
          resolve({ data });
        } else {
          const data = await response.text();
          reject({ data });
        }
      } catch (err) {
        reject({ err });
      }
    });
  }