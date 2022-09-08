import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

// export const Welcome = (props) => {    
//     // console.log(props.match.path)
//     console.log(props.match)

//     // const {confirmationCode} = props.match.params
//     // console.log(confirmationCode)

//     const verifyUser = async (code) => {
//         const response = await axios.get(`http://localhost:3001/api/users/ath/confirm/${code}`);
//         return response.data;
//       };
        
  
//     // if (props.match.path === "/confirm/:confirmationCode") {
//     //     verifyUser(props.match.params.confirmationCode);
//     //     // verifyUser(props.match.params.confirmationCode);
//     //   }
    
//       return (
//         <div className="container">
//           <header className="jumbotron">
//             <h3>
//               <strong>Account confirmed!</strong>
//             </h3>
//           </header>
//           <Link to={"/login"}>
//             Please Login
//           </Link>
//         </div>
//       )
// }
// export default Welcome;

const Welcome = () => {   
  const path = window.location.pathname
  console.log(window.location.pathname)
  const {confirmationCode} = useParams()
      
    const verifyUser = async (code) => {
        const response = await axios.get(`http://localhost:3001/api/users/auth/confirm/${code}`);
        return response.data;
      };
    
    
    if (path === `/confirm/${confirmationCode}`) {
      verifyUser(confirmationCode);
    }
    
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>Account confirmed!</strong>
          </h3>
        </header>
        <Link to={"/login"}>
          Please Login
        </Link>
      </div>
    );
  };
  
  export default Welcome;


  