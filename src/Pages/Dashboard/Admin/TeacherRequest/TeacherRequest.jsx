import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Heading from "../../../../components/Heading/Heading";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const TeacherRequest = () => {

    useEffect(() => {
        document.title = 'Dashboard | Teacher Request';
    }, []);


    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data: applyers = [], refetch } = useQuery({
        queryKey: ['applyers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/applyforTeaching');
            return res.data;
        }
    });

    const total = applyers.length;
    const totalPages = Math.ceil(total / limit);

    const handleMakeTeacher = (id, _id) => {
        axiosSecure.patch(`/users/teacher/${id}`, { role: 'teacher' })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Success!",
                        text: "Request successfully accepted..!",
                        icon: "success"
                    });
                }
            });

        axiosSecure.patch(`/applyforTeaching/teacher/${_id}`, { status: 'accepted' })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                }
            });
    }

    const handleRejected = id => {
        axiosSecure.patch(`/applyforTeaching/teacher/${id}`, { status: 'rejected' })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Rejected!",
                        text: "Request successfully rejected..!",
                        icon: "error"
                    });
                }
            });
    }

    const currentData = applyers.slice((page - 1) * limit, page * limit);

    return (
        <div className="mb-24">
            <Heading title="Teacher Request"></Heading>

            <div className="overflow-x-auto max-w-6xl mx-auto border-2 shadow-2xl mt-10">
                <table className="table">
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
                        {currentData.map(applyer => (
                            <tr key={applyer._id} className="text-base">
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-20 h-20">
                                            <img src={applyer.image} alt="Avatar" />
                                        </div>
                                    </div>
                                </td>
                                <td>{applyer.name}</td>
                                <td>{applyer.title}</td>
                                <td>{applyer.category}</td>
                                <td>{applyer.experience}</td>
                                <td className="font-bold">{applyer.status}</td>
                                <td>
                                    {applyer.status === "rejected" ? (
                                        <button className="p-3 rounded-lg bg-[#b9adad] font-semibold text-white" disabled>
                                            Approve
                                        </button>
                                    ) : (
                                        <button onClick={() => handleMakeTeacher(applyer.userId, applyer._id)} className="p-3 rounded-lg bg-green-600 font-semibold text-white">
                                            Approve
                                        </button>
                                    )}
                                </td>
                                <td>
                                    {applyer.status === "accepted" ? (
                                        <button className="p-3 px-5 text-white font-semibold bg-[#b9adad] rounded-lg" disabled>
                                            Reject
                                        </button>
                                    ) : (
                                        <button onClick={() => handleRejected(applyer._id)} className="p-3 px-5 text-white font-semibold bg-orange-500 rounded-lg">
                                            Reject
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-5">
                <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    className="mx-1 px-3 py-1 rounded bg-gray-200"
                    disabled={page === 1}
                >
                    &lt; Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                    <button
                        key={pageNumber}
                        onClick={() => setPage(pageNumber)}
                        className={`mx-1 px-3 py-1 rounded ${pageNumber === page ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                    >
                        {pageNumber}
                    </button>
                ))}
                <button
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    className="mx-1 px-3 py-1 rounded bg-gray-200"
                    disabled={page === totalPages}
                >
                    Next &gt;
                </button>
            </div>
        </div>
    );
};

export default TeacherRequest;
