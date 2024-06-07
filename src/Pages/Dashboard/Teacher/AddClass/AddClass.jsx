import Swal from "sweetalert2";
import Heading from "../../../../components/Heading/Heading";
import useAuth from "../../../../hooks/useAuth";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const AddClass = () => {

    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const image = form.image.value;
        const price = form.price.value;
        const name = form.name.value;
        const email = form.email.value;
        const description = form.description.value;
        const status = "pending";
        const enrolment = 0;
        const photoURL = user?.photoURL;
        const assignmentSubmited = 0;
        console.log(title, image, price, name, email, description, status, enrolment , photoURL, assignmentSubmited);

        const classInfo = {
            title, image, price, name, email, description, status, enrolment, photoURL, assignmentSubmited
        }

        axiosPublic.post('/classes', classInfo)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    title: "Good job!",
                    text: "Successfully added new class",
                    icon: "success"
                  });
                  navigate('/dashboard/myClass');

            })
    }


    return (
        <div>
            <Heading title="Add a new Class"></Heading>

            <div className="max-w-3xl mx-auto mt-10 mb-20 bg-base-300 shadow-2xl gap-5">

                {/* form start */}
                <form onSubmit={handleSubmit} className="p-10">
                    <h1 className="text-3xl font-medium pb-6 text-center">Class Information</h1>

                    <div className="mb-4">
                        <p className="pb-1">Class Title</p>
                        <input type="text" name="title" placeholder="Enter Class title" className="input input-bordered w-full" required />
                    </div>

                    <div className="mb-4">
                        <p className="pb-1">Images (URL)</p>
                        <input type="text" name="image" placeholder="Enter Image Url"
                            className="input input-bordered w-full" required />
                    </div>

                    <div className="mb-4">
                        <p className="pb-1">Price</p>
                        <input type="text" name="price" placeholder="Enter title here" className="input input-bordered w-full" required />
                    </div>

                    <div className="flex gap-6">
                        <div className="mb-4 w-full">
                            <p className="pb-1">Name</p>
                            <input type="text" name="name" defaultValue={user.displayName} className="input input-bordered w-full" disabled />
                        </div>

                        <div className="mb-4 w-full">
                            <p className="pb-1">Email</p>
                            <input type="text" name="email" defaultValue={user.email} className="input input-bordered w-full" disabled />
                        </div>
                    </div>

                    <div className="mb-5">
                        <p className="pb-1">Description</p>
                        <textarea name='description' placeholder="Write here" className="textarea textarea-bordered textarea-md w-full" required></textarea>
                    </div>

                    <button className="btn uppercase w-full bg-[#23C45E] text-white hover:bg-[#2aac5a]">Add Class</button>
                </form>
            </div>

        </div>
    );
};

export default AddClass;