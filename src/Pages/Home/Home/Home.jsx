import { useEffect } from "react";
import AdditionalInformation from "../AdditionalInformation/AdditionalInformation";
import Banner from "../Banner/Banner";
import Contract from "../Contract/Contract";
import Feedback from "../Feedback/Feedback";
import Partners from "../Partners/Partners";
import PopularCourses from "../PopularCourses/PopularCourses";
import StartTeaching from "../StartTeaching/StartTeaching";
import TeacherTraining from "../TeacherTraining/TeacherTraining";
import Motion from "../Motion/Motion";


const Home = () => {

    useEffect(() => {
        document.title = 'Home';
    }, []);

    return (
        <div>
            <Banner></Banner>
            <Partners></Partners>
            <PopularCourses></PopularCourses>
            <AdditionalInformation></AdditionalInformation>
            <StartTeaching></StartTeaching>
            <TeacherTraining></TeacherTraining>
            <Feedback></Feedback>
            <Contract></Contract>
        </div>
    );
};

export default Home;