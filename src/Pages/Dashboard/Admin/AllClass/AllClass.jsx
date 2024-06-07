import { useQuery } from "@tanstack/react-query";
import Heading from "../../../../components/Heading/Heading";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllClass = () => {

    const axiosSecure = useAxiosSecure();
    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosSecure.get('/classes');
            return res.data;
        }
    })
    console.log(classes);

    const handleApproves = id => {
        axiosSecure.patch(`/classes/${id}`, { status: 'accepted' , enrolment:0 , assignmentSubmited:0})
            .then(res => {
                //test role
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Successfully approved..!",
                        icon: "success"
                    });
                }
            })
    }

    const handleRejected = id => {
        axiosSecure.patch(`/classes/${id}`, { status: 'rejected' , enrolment:0 , assignmentSubmited:0})
            .then(res => {
                //test role
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Request rejected..!",
                        icon: "error"
                    });
                }
            })
    }


    return (
        <div className="mb-20">
            <Heading title="All Classes"></Heading>

            <div className="mb-20 overflow-x-auto max-w-6xl mx-auto border-2 shadow-2xl mt-10">
                <table className="table">
                    {/* head */}
                    <thead className="bg-[#FB923C] text-xl text-black">
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Email</th>
                            <th></th>

                        </tr>
                    </thead>

                    <tbody>
                        {
                            classes.map(clas =>

                                <tr key={clas._id} className="text-base">
                                    <td></td>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-20 h-20">
                                                <img src={clas.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{clas.title}</td>
                                    <td className="max-w-56">{clas.description}</td>
                                    <td>{clas.email}</td>

                                    <td>
                                        <div className="space-x-2">
                                            {
                                                clas?.status === 'accepted' &&
                                                <button className="p-2 rounded-md bg-slate-300 font-semibold text-white" disabled>already approves</button>
                                                ||
                                                clas?.status === 'rejected' &&
                                                <button className="p-2 rounded-md bg-slate-300 font-semibold text-white" disabled>approves</button>
                                                ||
                                                <button onClick={() => handleApproves(clas._id)} className="p-2 rounded-md bg-green-600 font-semibold text-white">approves</button>

                                            }

                                            {
                                                clas?.status === 'accepted' &&
                                                <button className="p-2 px-5 text-white font-semibold bg-slate-300 rounded-md" disabled>reject</button>
                                                ||
                                                clas?.status === 'rejected' &&
                                                <button className="p-2 px-5 text-white font-semibold bg-slate-300 rounded-md" disabled>already reject</button>
                                                ||
                                                <button onClick={() => handleRejected(clas._id)} className="p-2 px-5 text-white font-semibold bg-orange-500 rounded-md">reject</button>

                                            }

                                            <button className="p-2 px-5 text-white font-semibold bg-orange-500 rounded-md">See Progress</button>
                                        </div>
                                    </td>

                                </tr>
                            )
                        }



                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AllClass;