import axios from "axios";
import { useEffect, useState } from "react";
import CourseCard from "../../../components/CourseCard/CourseCard";
import { motion } from "framer-motion";

const PopularCourses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios('course.json')
            .then(res => setCourses(res.data))
            .catch(err => console.error(err));
    }, []);

    // Animation Variants for the Container
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Each card will pop up with 0.1s delay
            }
        }
    };

    return (
        <div className="py-16 max-w-7xl mx-auto px-4 overflow-hidden">
            {/* Heading Animation */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6 }}
                className="mb-12 text-left border-l-4 border-[#e96223] pl-5"
            >
                <h1 className="text-3xl lg:text-4xl font-bold text-base-content">Popular Courses</h1>
                <p className="text-sm text-base-content/60 mt-1 font-medium">Handpicked courses for your career growth.</p>
            </motion.div>

            {/* Grid with Framer Motion */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                {courses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </motion.div>
        </div>
    );
};

export default PopularCourses;