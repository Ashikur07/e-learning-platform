import { useQuery } from "@tanstack/react-query";
import Heading from "../../../../components/Heading/Heading";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import EnrollClassCard from "./EnrollClassCard";


const EnrollClass = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?studentEmail=${user.email}`);
            return res.data;
        }
    })
    console.log(classes);


    return (
        <div>
            <Heading title="My Enroll Classes"></Heading>
            <div className="px-10 grid grid-cols-3 max-w-6xl mx-auto gap-5 mt-10">
                {
                    classes.map(clas => <EnrollClassCard
                        key={clas._id}
                        clas={clas}
                    ></EnrollClassCard>)
                }
            </div>

        </div>
    );
};

export default EnrollClass;