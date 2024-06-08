import axios from "axios";
import { useEffect, useState } from "react";
import Heading from "../../components/Heading/Heading";
import ClassCard from "./ClassCard";

const AllClasses = () => {

    useEffect(() => {
        document.title = 'All Classes';
    }, []);

    const [classes, setClasses] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 10;

    useEffect(() => {
        axios(`${import.meta.env.VITE_API_URL}/classes`)
            .then(res => {
                setClasses(res.data);
            });
    }, []);

    const adminAproveClasses = classes.filter(clas => clas.status === 'accepted');
    const total = adminAproveClasses.length;
    const totalPages = Math.ceil(total / limit);

    const currentData = adminAproveClasses.slice((page - 1) * limit, page * limit);

    return (
        <div className="mb-40">
            <div className="my-10">
                <Heading title='All Class Here' />
                <div className="grid grid-cols-3 gap-5 max-w-6xl mx-auto my-10">
                    {currentData.map(clas => (
                        <ClassCard key={clas._id} clas={clas} />
                    ))}
                </div>
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

export default AllClasses;
