import { FaUserCheck, FaUsers } from "react-icons/fa";
import { IoBookmarksSharp } from "react-icons/io5";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const AdditionalInformation = () => {

    const axiosPublic = useAxiosPublic();

    // for user
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            })
            return res.data;
        }
    })

    // for classes
    const { data: classes = [] } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosPublic.get('/classes')
            return res.data;
        }
    })
    console.log(classes);

    // Calculate the total enrollment with validation
    const totalEnrolment = classes.reduce((total, currentClass) => {
        const enrolment = parseInt(currentClass.enrolment, 10);
        console.log(`Class: ${currentClass.title}, Enrolment: ${currentClass.enrolment}, Parsed Enrolment: ${enrolment}`);
        return total + (isNaN(enrolment) ? 0 : enrolment);
    }, 0);



    return (
        <div className="lg:flex mt-20">

            <div className="flex-1 bg-slate-500">
                <div className="space-y-5 lg:space-y-0 mx-10 lg:mx-0  lg:flex justify-center py-10 lg:py-0 lg:pt-40 gap-6">
                    <div className="p-7 bg-white text-center flex flex-col items-center gap-3 rounded-xl">
                        <FaUsers className="text-4xl text-blue-700"></FaUsers>
                        <p className="text-4xl font-bold">{users.length}</p>
                        <h1 className="text-3xl">Total User</h1>
                    </div>
                    <div className="p-5 bg-white text-center flex flex-col items-center gap-3 rounded-xl">
                        <IoBookmarksSharp className="text-4xl text-blue-700" />
                        <p className="text-4xl font-bold">{classes.length}</p>
                        <h1 className="text-3xl">total classes</h1>
                    </div>
                    <div className="p-6 bg-white text-center flex flex-col items-center gap-3 rounded-xl">
                        <FaUserCheck className="text-4xl text-blue-700"></FaUserCheck>
                        <p className="text-4xl font-bold">{totalEnrolment}</p>
                        <h1 className="text-3xl">Enrollment</h1>
                    </div>
                </div>
            </div>

            <div className="flex-1">
                <img src="https://i.ibb.co/r3dnvDX/photo-1523240795612-9a054b0db644-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-0.jpg" alt="" />
            </div>
        </div>
    );
};

export default AdditionalInformation;