import { Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";


const Main = () => {
    
      
    return (
        <div  >
            <Navbar></Navbar>
            <div className="min-h-dvh ">
            <Outlet></Outlet>
            </div>
           
           <div>
           <Footer></Footer>
           </div>
        </div>
    );
};

export default Main;