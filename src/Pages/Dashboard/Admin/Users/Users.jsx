import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Heading from "../../../../components/Heading/Heading";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Users = () => {

    useEffect(() => {
        document.title = 'Dashboard | Users';
    }, []);


    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const normalUser = users.filter(usr => usr?.role !== "admin");
    const total = normalUser.length;
    const totalPages = Math.ceil(total / limit);

    const handleMakeAdmin = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "Admin this user..!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/teacher/${id}`, { role: 'admin' })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Good job!",
                                text: "This user is now admin..!",
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    const currentData = normalUser.slice((page - 1) * limit, page * limit);

    return (
        <div className="mb-24">
            <Heading title="Users"></Heading>

            <div className="overflow-x-auto max-w-5xl mx-auto border-2 shadow-2xl mt-10">
                <table className="table">
                    <thead className="bg-[#FB923C] text-xl text-black">
                        <tr>
                            <th className="hidden lg:block"></th>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map(user => (
                            <tr key={user._id} className="text-base">
                                <td className="hidden lg:block"></td>
                                <td></td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-20 h-20">
                                            <img src={user.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button onClick={() => handleMakeAdmin(user._id)} className="p-2 rounded-lg bg-green-600 font-semibold text-white">
                                        Make Admin
                                    </button>
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

export default Users;
