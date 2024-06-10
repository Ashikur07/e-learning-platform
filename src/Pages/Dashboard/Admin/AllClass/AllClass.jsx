import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Heading from "../../../../components/Heading/Heading";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllClass = () => {

    useEffect(() => {
        document.title = 'Dashboard | All Classes';
    }, []);


    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosSecure.get('/classes');
            return res.data;
        }
    });

    const total = classes.length;
    const totalPages = Math.ceil(total / limit);

    const handleApproves = id => {
        axiosSecure.patch(`/classes/${id}`, { status: 'accepted', enrolment: 0, assignmentSubmited: 0 })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Successfully approved..!",
                        icon: "success"
                    });
                }
            });
    };

    const handleRejected = id => {
        axiosSecure.patch(`/classes/${id}`, { status: 'rejected', enrolment: 0, assignmentSubmited: 0 })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Request rejected..!",
                        icon: "error"
                    });
                }
            });
    };

    const currentData = classes.slice((page - 1) * limit, page * limit);

    return (
        <div className="mb-24">
            <Heading title="All Classes"></Heading>

            <div className="mb-8 overflow-x-auto max-w-6xl mx-auto border-2 shadow-2xl mt-10">
                <table className="table">
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
                        {currentData.map(clas => (
                            <tr key={clas._id} className="text-base">
                                <td></td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-20 h-20">
                                            <img src={clas.image} alt="Avatar" />
                                        </div>
                                    </div>
                                </td>
                                <td className="max-w-40">{clas.title}</td>
                                <td className="max-w-56">{clas.description}</td>
                                <td>{clas.email}</td>
                                <td>
                                    <div className="space-x-2">
                                        {clas.status === 'accepted' ? (
                                            <button className="p-2 rounded-md bg-slate-300 font-semibold text-white" disabled>
                                                already approves
                                            </button>
                                        ) : clas.status === 'rejected' ? (
                                            <button className="p-2 rounded-md bg-slate-300 font-semibold text-white" disabled>
                                                approves
                                            </button>
                                        ) : (
                                            <button onClick={() => handleApproves(clas._id)} className="p-2 rounded-md bg-green-600 font-semibold text-white">
                                                approves
                                            </button>
                                        )}

                                        {clas.status === 'accepted' ? (
                                            <button className="p-2 px-5 text-white font-semibold bg-slate-300 rounded-md" disabled>
                                                reject
                                            </button>
                                        ) : clas.status === 'rejected' ? (
                                            <button className="p-2 px-5 text-white font-semibold bg-slate-300 rounded-md" disabled>
                                                already reject
                                            </button>
                                        ) : (
                                            <button onClick={() => handleRejected(clas._id)} className="p-2 px-5 text-white font-semibold bg-orange-500 rounded-md">
                                                reject
                                            </button>
                                        )}

                                        <button className="p-2 px-5 text-white font-semibold bg-orange-500 rounded-md">See Progress</button>
                                    </div>
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

export default AllClass;
