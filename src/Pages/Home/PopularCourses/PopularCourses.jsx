import axios from "axios";
import { useEffect, useState } from "react";
import CourseCard from "../../../components/CourseCard/CourseCard";

const PopularCourses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios('course.json')
            .then(res => setCourses(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="py-16 max-w-7xl mx-auto px-4">
            {/* Simple Heading */}
            <div className="mb-12 text-left border-l-4 border-[#e96223] pl-5">
                <h1 className="text-3xl lg:text-4xl font-bold text-base-content">Popular Courses</h1>
                <p className="text-sm text-base-content/60 mt-1 font-medium">Handpicked courses for your career growth.</p>
            </div>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {courses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
        </div>
    );
};

export default PopularCourses;