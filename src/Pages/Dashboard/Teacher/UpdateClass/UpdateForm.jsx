import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const UpdateForm = () => {

    const axiosSecure = useAxiosSecure();
    const classInfo = useLoaderData();
    const navigate = useNavigate();
    console.log(classInfo);

    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value ? form.title.value : classInfo.title;
        const image = form.image.value ? form.image.value : classInfo.image;
        const price = form.price.value ? form.price.value : classInfo.price;
        const name = form.name.value;
        const email = form.email.value;
        const description = form.description.value ? form.description.value : classInfo.description;
        const status = classInfo.status;

        console.log(title, image, price, name, email, description, status);
        const updateClassInfo = {
            title,
            image,
            price,
            name,
            email,
            description,
            status
        }

        axiosSecure.put(`/classes/${classInfo._id}`, updateClassInfo)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    alert('success');
                    navigate('/dashboard/myClass');
                }

            })


    }

    return (
        <div>
            <div className="max-w-3xl mx-auto mt-10 mb-20 bg-base-300 shadow-2xl gap-5">

                {/* form start */}
                <form onSubmit={handleSubmit} className="p-10">
                    <h1 className="text-3xl font-medium pb-6 text-center">Update Information Now</h1>

                    <div className="mb-4">
                        <p className="pb-1">Class Title</p>
                        <input type="text" name="title" placeholder={classInfo.title} className="input input-bordered w-full" />
                    </div>

                    <div className="mb-4">
                        <p className="pb-1">Images (URL)</p>
                        <input type="text" name="image" placeholder={classInfo.image}
                            className="input input-bordered w-full" />
                    </div>

                    <div className="mb-4">
                        <p className="pb-1">Price</p>
                        <input type="text" name="price" placeholder={classInfo.price} className="input input-bordered w-full" />
                    </div>

                    <div className="flex gap-6">
                        <div className="mb-4 w-full">
                            <p className="pb-1">Name</p>
                            <input defaultValue={classInfo.name} type="text" name="name" className="input input-bordered w-full" disabled />
                        </div>

                        <div className="mb-4 w-full">
                            <p className="pb-1">Email</p>
                            <input defaultValue={classInfo.email} type="text" name="email" className="input input-bordered w-full" disabled />
                        </div>
                    </div>

                    <div className="mb-5">
                        <p className="pb-1">Description</p>
                        <textarea name='description' placeholder={classInfo.description} className="textarea textarea-bordered textarea-md w-full"></textarea>
                    </div>

                    <button className="btn uppercase w-full bg-[#23C45E] text-white hover:bg-[#2aac5a]">Update Now</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateForm;