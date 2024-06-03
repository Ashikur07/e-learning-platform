import Heading from "../../../../components/Heading/Heading";
import useAuth from "../../../../hooks/useAuth";

const AddClass = () => {

    const {user} = useAuth();
    const handleSubmit = e => {
        e.preventDefault();
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
                            className="input input-bordered w-full" />
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
                        <textarea placeholder="Write here" className="textarea textarea-bordered textarea-md w-full " ></textarea>
                    </div>

                    <button className="btn uppercase w-full bg-[#23C45E] text-white hover:bg-[#2aac5a]">Add Class</button>
                </form>
            </div>

        </div>
    );
};

export default AddClass;