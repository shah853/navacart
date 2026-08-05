import {useContext} from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext.jsx";
 
 function AdminRoute({ children }) {
    const { user } = useContext(AuthContext);


    if(!user){
        return <Navigate to="/login" replace />;
    }


     if(user && user.role === "admin"){
        return children;
     }
    }
    export default AdminRoute;