import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Heading from "../../../../components/Heading/Heading";
import useAuth from "../../../../hooks/useAuth";
import EnrollClassCard from "./EnrollClassCard";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const EnrollClass = () => {

    useEffect(() => {
        document.title = 'Dashboard | My Enroll Class';
    }, []);


    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/payments?studentEmail=${user.email}`);
            return res.data;
        }
    });

    const total = classes.length;
    const totalPages = Math.ceil(total / limit);

    const currentData = classes.slice((page - 1) * limit, page * limit);

    return (
        <div className="mb-24">
            <Heading title="My Enroll Classes" />
            <div className="pb-5 px-10 grid grid-cols-3 max-w-6xl mx-auto gap-5 mt-10">
                {currentData.map(clas => (
                    <EnrollClassCard key={clas._id} clas={clas} />
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

export default EnrollClass;
