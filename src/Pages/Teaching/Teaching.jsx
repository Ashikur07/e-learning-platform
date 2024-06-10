import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const Teaching = () => {

    useEffect(() => {
        document.title = 'Teach on LearnQuest';
    }, []);

    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();
    console.log(user);
    const axiosPublic = useAxiosPublic();

    const axiosSecure = useAxiosSecure();
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`)
            return res.data;
        }
    })
    console.log(users[0]?._id);

    // get apply data to match 
    const { data: applyforTeaching = [], refetch } = useQuery({
        queryKey: ['applyforTeaching'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/applyforTeaching?email=${user.email}`)
            return res.data;
        }
    })

    console.log(applyforTeaching.length);


    const onSubmit = async (data) => {
        console.log(data);
      
        const name = data.name;
        const image = data.image ? data.image : user.photoURL;
        const email = user?.email;
        const title = data.title;
        const experience = data.experience;
        const category = data.category;
        const userId = users[0]?._id;
        const status = "pending";

        console.log(name, image, email, title, experience, category);

        const info = { name, image, email, title, experience, category, userId, status };


        if (applyforTeaching.length > 0) {
            Swal.fire({
                title: "Already applied..!",
                icon: "error"
            });
            reset();
            return;
        }
        else if (users[0]?.role === "admin") {
            Swal.fire({
                title: "You are admin ..!",
                text: "So You can not apply for teacher..!",
                icon: "error"
            });
            reset();
            return;
        }
        else if (users[0]?.role === "teacher") {
            Swal.fire({
                title: "Your role is teacher now ..!",
                text: "So you no need to apply again ..!",
                icon: "warning"
            });
            reset();
            return;
        }
        else {
            axiosPublic.post('/applyforTeaching', info)
                .then(res => {
                    refetch();
                    console.log(res.data);
                    Swal.fire({
                        title: "Good job!",
                        text: "Successfully applied for Teacher",
                        icon: "success"
                    });
                    reset();

                })
        }

    }

    return (
        <div>
            <div className="max-w-7xl mx-auto lg:mt-10 mb-20 lg:flex border gap-5">
                <div className="lg:w-[60%]">
                    <img className="h-full brightness-75" src="https://i.ibb.co/NtMMV8D/photo-1515378791036-0648a3ef77b2-q-80-w-2070-auto-format-fit-crop-ixlib-rb-4-0.jpg" alt="" />
                </div>

                {/* form start */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-10 lg:w-[40%]">
                    <h1 className="text-2xl font-medium pb-6">APPLY NOW</h1>

                    <div className="mb-4">
                        <p className="pb-1">Full Name *</p>
                        <input type="text" {...register("name")} placeholder="Enter your name" className="input input-bordered w-full" required />
                    </div>

                    <div className="mb-4">
                        <p className="pb-1">Images (URL)</p>
                        <input type="text" {...register("image")} placeholder={user?.photoURL}
                            className="input input-bordered w-full text-[13px]" />
                    </div>

                    <div className="mb-4">
                        <p className="pb-1">Title</p>
                        <input type="text" {...register("title")} placeholder="Enter title here" className="input input-bordered w-full" required />
                    </div>

                    <div className="flex gap-6">
                        <div className="mb-4 w-full">
                            <p className="pb-1">Experience</p>
                            <select {...register("experience")} className="select select-bordered w-full max-w-xs">
                                <option disabled selected>Select One</option>
                                <option>beginner</option>
                                <option>mid-level</option>
                                <option>experienced</option>
                            </select>
                        </div>

                        <div className="mb-4 w-full">
                            <p className="pb-1">Category</p>
                            <select {...register("category")} className="select select-bordered w-full max-w-xs">
                                <option disabled selected>Select your category</option>
                                <option>Web Development</option>
                                <option>Digital Marketing</option>
                                <option>Cyber Security</option>
                                <option>Machine Learning</option>
                                <option>Data Analysis</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-5">
                        <p className="pb-1">Email</p>
                        <input type="text" name="password" defaultValue={user?.email} className="input input-bordered w-full" disabled />
                    </div>

                    <button className="btn uppercase w-full bg-[#23C45E] text-white hover:bg-[#2aac5a]">Apply</button>
                </form>
            </div>
        </div>
    );
};


export default Teaching;