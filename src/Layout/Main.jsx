import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";

const Main = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Main Content Area */}
            {/* pt-20 ba pt-24 diyechi jate fixed navbar er niche content na jay */}
            <main className="flex-grow pt-20 lg:pt-24 container mx-auto px-4 lg:px-0">
                <div className="min-h-[calc(100vh-400px)]">
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Main;