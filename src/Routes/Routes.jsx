import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
     
        children: [
            {
                path:'/login',
                element:<Login></Login>
            }
        
        ]
    },
]);

export default router;