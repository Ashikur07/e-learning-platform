import Banner from "../Banner/Banner";
import Partners from "../Partners/Partners";
import PopularCourses from "../PopularCourses/PopularCourses";
import StartTeaching from "../StartTeaching/StartTeaching";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Partners></Partners>
            <PopularCourses></PopularCourses>
            <StartTeaching></StartTeaching>
        </div>
    );
};

export default Home;