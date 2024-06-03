import { useQuery } from "@tanstack/react-query";
import Heading from "../../../../components/Heading/Heading";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import MyCourseCard from "./MyCourseCard";

const MyClass = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosSecure.get('/classes');
            return res.data;
        }
    })
    const matchClass = classes.filter(clas => clas?.email === user?.email)
    console.log(matchClass);

    return (
        <div>
            <Heading title="My Class"></Heading>
            <div className="max-w-[1100px] mx-auto grid grid-cols-3 gap-5 mt-10 justify-center mb-20">
                {
                    matchClass.map(clas => <MyCourseCard
                    key={clas._id}
                    clas={clas}></MyCourseCard>)
                }
            </div>
        </div>
    );
};

export default MyClass;