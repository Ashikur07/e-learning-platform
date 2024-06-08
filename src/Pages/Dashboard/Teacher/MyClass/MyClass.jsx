import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Heading from "../../../../components/Heading/Heading";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import MyCourseCard from "./MyCourseCard";
import Swal from "sweetalert2";

const MyClass = () => {
    const { user } = useAuth();
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

    const matchClass = classes.filter(clas => clas?.email === user?.email);
    const total = matchClass.length;
    const totalPages = Math.ceil(total / limit);

    const currentData = matchClass.slice((page - 1) * limit, page * limit);

    // delete class functionality
    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/classes/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Item has been deleted.',
                                'success'
                            )
                        }
                    });
            }
        });
    };

    return (
        <div className="mb-24">
            <Heading title="My Class" />
            <div className="max-w-[1100px] mx-auto grid grid-cols-3 gap-5 mt-10 justify-center mb-20">
                {currentData.map(clas => (
                    <MyCourseCard
                        key={clas._id}
                        clas={clas}
                        handleDelete={handleDelete}
                    />
                ))}
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

export default MyClass;
