import axios from "axios";
import { useEffect, useState } from "react";
import CourseCard from "../../../components/CourseCard/CourseCard";

const PopularCourses = () => {

    const [courses, setCourses] = useState([]);
    useEffect(() => {
        axios('course.json')
            .then(res => {
                setCourses(res.data);
            })
    }, [])

    return (
        <div className="my-20 max-w-7xl mx-auto">
            <h1 className="text-5xl text-[#e96223] font-bold text-center">Popular Courses</h1>

            <div className="flex justify-around mt-10">
                {
                    courses.map(course => <CourseCard 
                    key={course.id}
                    course={course}></CourseCard>)
                }
            </div>
        </div>
    );
};

export default PopularCourses;