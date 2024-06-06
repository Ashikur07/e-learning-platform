import { useLoaderData } from "react-router-dom";
import Heading from "../../../../components/Heading/Heading";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaPlus } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";

const EnrollClassDetails = () => {

    const { user } = useAuth();
    const clas = useLoaderData();
    const axiosPublic = useAxiosPublic();
    console.log(clas);

    // Fetch assignment data
    const { data: assignments = [], refetch } = useQuery({
        queryKey: ['assignments'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/assignments?classId=${clas.courseId}`);
            return res.data;
        }
    });
    console.log(assignments);


    const handleAddAssignment = deadline => {
        const targetDate = new Date(deadline);
        const currentDate = new Date(Date.now());
        targetDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        if (currentDate.getTime() > targetDate.getTime()) {
            Swal.fire({
                title: "Deadline is Over..!",
                icon: "error",
                timer: 2000,
            });
        } else {
            document.getElementById('my_modal_1').showModal();
        }

    }

    const handleSubmit = e => {
        e.preventDefault();
        const submitLink = e.target.link.value;
        const courseId = clas.courseId;
        console.log(submitLink, courseId);
        e.target.reset();

        const submitAssignment = { submitLink, courseId };

        axiosPublic.post('submitAssignments', submitAssignment)
            .then(res => {
                console.log(res.data);
                axiosPublic.patch(`/classes/${clas.courseId}`, {
                    status: 'accepted', enrolment: clas.enrolment
                    , assignmentSubmited: "1"
                })
                    .then(res => {
                        //test role
                        if (res.data.modifiedCount > 0) {
                            alert('Assignment submit successfull..!')
                        }
                    })
            })
    }

    const handleAddFeeback = () => {
        document.getElementById('my_modal_2').showModal();
    }

    const handleSubmitFeedback = e => {
        e.preventDefault();
        const description = e.target.description.value;
        const ratings = e.target.ratings.value;
        const email = user?.email;
        const name = user?.displayName;

        console.log(description, ratings, email, name);
        const feedback = {description, ratings, email, name};
        axiosPublic.post('/feedback', feedback)
        .then(res =>{
            console.log(res.data);
            alert('Feedback added to the database collection..!');
            e.target.reset();
        })
    }


    return (
        <div>
            <Heading title='Class Details'></Heading>

            <div className="text-center  my-7 ">
                <h1 className="ml-72 inline text-4xl font-semibold text-center">Posted Assignment</h1>
                <button onClick={handleAddFeeback} className="ml-60 btn btn-primary text-white rounded-3xl"><FaPlus className="inline"></FaPlus> Create</button>
            </div>

            <div className="mb-20 overflow-x-auto max-w-6xl mx-auto border-2 shadow-2xl">
                <table className="table">
                    {/* head */}
                    <thead className="bg-[#FB923C] text-xl text-black">
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Title</th>
                            <th></th>
                            <th>Description</th>
                            <th>Deadline</th>
                            <th></th>

                        </tr>

                    </thead>

                    <tbody>
                        {
                            assignments.map(assignment =>

                                <tr key={assignment._id} className="text-base">
                                    <td></td>
                                    <td></td>
                                    <td>{assignment.title}</td>
                                    <td></td>
                                    <td className="max-w-56">{assignment.description}</td>
                                    <td>{assignment.deadline}</td>
                                    <td><button onClick={() => handleAddAssignment(assignment.deadline)} className="btn btn-success text-white">Submit</button></td>
                                </tr>
                            )
                        }

                    </tbody>

                </table>
            </div>

            {/* modal-1 for assignment submit  */}
            <dialog id="my_modal_1" className="modal z-10">
                <div className="modal-box bg-slate-200">
                    <h3 className="text-center font-bold text-3xl">Submit Assignment</h3>

                    <form onSubmit={handleSubmit} className="lg:ml-16 my-8 max-w-xs ">
                        <p className="text-xl font-bold">Assignment Drive Link : </p>
                        <p className="text-sm pb-4">(Upload assignment google drive and give link)</p>
                        <input type="url" name='link' placeholder="Give link here" className="input input-bordered input-accent w-full max-w-xs mb-4" required />

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



            {/* modal-2 for feedback submit submit  */}
            <dialog id="my_modal_2" className="modal z-10">
                <div className="modal-box bg-slate-200">
                    <h3 className="text-center font-bold text-3xl">Give Your Feedback</h3>

                    <form onSubmit={handleSubmitFeedback} className="lg:ml-16 my-8 max-w-xs ">
                        <p className="text-xl font-bold pb-1 ">Description</p>
                        <textarea placeholder="Write here" name="description" className="textarea textarea-bordered textarea-md w-full max-w-xs" ></textarea>

                        <p className="text-xl pb-1 font-bold">Ratings</p>
                        <select name="ratings" className="select select-bordered w-full max-w-xs" required>
                            <option disabled selected>Select one</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>

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

export default EnrollClassDetails;