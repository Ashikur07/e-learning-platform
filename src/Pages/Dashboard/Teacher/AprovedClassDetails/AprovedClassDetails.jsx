import { useLoaderData } from "react-router-dom";
import Heading from "../../../../components/Heading/Heading";
import { FaPlus, FaUserCheck, FaUsers } from "react-icons/fa";
import { IoBookmarksSharp } from "react-icons/io5";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AprovedClassDetails = () => {

    const aprovedClass = useLoaderData();
    console.log(aprovedClass);
    const axiosSecure = useAxiosSecure();
   
    const { data: assignment = [], refetch } = useQuery({
        queryKey: ['assignment'],
        queryFn: async () => {
            const res = await axiosSecure.get(`assignments?classId=${aprovedClass._id}`);
            return res.data;
        }
    })
    console.log(assignment);

    // console.log(assignment);


    const handleAddAssignment = () =>{
        document.getElementById('my_modal_1').showModal();
    }

    const handleSubmit = event =>{
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const deadline = form.deadline.value;
        const description = form.description.value;
        const classId = aprovedClass._id;

        console.log(title, deadline, description, classId);
        const assignmentInfo = {title, deadline, description, classId};

        axiosSecure.post('/assignments', assignmentInfo)
        .then(res =>{
            refetch();
            console.log(res.data);
            alert('successfully added to the database');
            form.reset();                                                                                                                                                                                                    
        })
    }


    return (
        <div>
            <Heading title='Course Details'></Heading>

            <div className="my-5 lg:my-10">
                <h1 className="mb-5 text-center text-orange-500 text-4xl font-semibold">Class Progress</h1>

                <div className="relative flex justify-center pt-14 lg:pt-0 pb-10 lg:pb-0 max-w-5xl mx-auto bg-orange-400 lg:h-96">

                    <button onClick={handleAddAssignment} className="top-1 lg:m-3 hover:bg-green-900 text-lg absolute right-0 btn bg-green-700 border-none text-white"><FaPlus className="text-xl"></FaPlus> Create</button>

                    <div className="items-center flex flex-col lg:flex-row justify-center gap-6">
                        <div className="py-6 px-10 bg-white text-center flex flex-col items-center gap-3 rounded-xl">
                            <FaUsers className="text-4xl text-blue-700"></FaUsers>
                            <p className="text-4xl font-bold">{aprovedClass.enrolment}</p>
                            <h1 className="text-3xl">Total <br /> Enrollment</h1>
                        </div>

                        <div className="py-6 px-10 bg-white text-center flex flex-col items-center gap-3 rounded-xl">
                            <IoBookmarksSharp className="text-4xl text-blue-700" />
                            <p className="text-4xl font-bold">{assignment?.length}</p>
                            <h1 className="text-3xl">Total <br /> Assignment</h1>
                        </div>

                        <div className="py-6 px-10 bg-white text-center flex flex-col items-center gap-3 rounded-xl">
                            <FaUserCheck className="text-4xl text-blue-700"></FaUserCheck>
                            <p className="text-4xl font-bold">{aprovedClass?.assignmentSubmited}</p>
                            <h1 className="text-3xl">Today <br /> Submitted</h1>
                        </div>
                    </div>

                </div>

            </div>

             {/* apply now with model  */}
             <dialog id="my_modal_1" className="modal">
                    <div className="modal-box bg-slate-200">
                        <h3 className="text-center font-bold text-3xl">Create a new Assignment</h3>

                        <form onSubmit={handleSubmit} className="lg:ml-16 my-8 max-w-xs ">
                            <p className="text-xl font-bold pb-2">Assignment Title</p>
                            <input type="text" name='title' placeholder="Enter assignment title" className="input input-bordered input-accent w-full max-w-xs mb-4" required />

                            <p className="pt-2 text-xl font-bold pb-2">Assignment Deadline</p>
                            <input type="date" name='deadline' className="input input-bordered input-accent w-full max-w-xs mb-4" required />

                            <p className="pt-2 text-xl font-bold pb-2">Assignment Description</p>
                            <textarea name='description' placeholder="Write here" className="textarea textarea-bordered textarea-md w-full max-w-xs"  required></textarea>


                            <input type='submit' className="mt-3 btn w-full btn-warning font-semibold text-lg" value='Submit' />

                        </form>

                        <div className=" modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-accent px-5 font-bold">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>


        </div>
    );
};

export default AprovedClassDetails;