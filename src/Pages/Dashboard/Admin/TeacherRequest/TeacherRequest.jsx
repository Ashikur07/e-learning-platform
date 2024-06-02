import { useQuery } from "@tanstack/react-query";
import Heading from "../../../../components/Heading/Heading";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const TeacherRequest = () => {

    const axiosSecure = useAxiosSecure();
    const { data: applyers = [] } = useQuery({
        queryKey: ['applyers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/applyforTeaching')
            return res.data;
        }
    })

    console.log(applyers);

    return (
        <div>
            <Heading title="Teacher Request"></Heading>

            <div className="overflow-x-auto max-w-6xl mx-auto border-2 shadow-2xl mt-10">
                <table className="table">
                    {/* head */}
                    <thead className="bg-[#FB923C] text-xl text-black">
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Experience</th>
                            <th>Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            applyers.map(applyer =>

                                <tr key={applyer._id} className="text-base">
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-20 h-20">
                                                <img src={applyer.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{applyer.name}</td>
                                    <td>{applyer.title}</td>
                                    <td>{applyer.category}</td>
                                    <td>{applyer.experience}</td>
                                    <td>Pending</td>
                                    <td><button className="p-3 rounded-lg bg-green-600 font-semibold text-white">approves</button></td>
                                    <td><button className="p-3 px-5 text-white font-semibold bg-orange-500 rounded-lg">reject</button></td>
                                </tr>

                            )
                        }


                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default TeacherRequest;