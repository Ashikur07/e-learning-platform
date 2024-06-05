import { useQuery } from "@tanstack/react-query";
import Heading from "../../../../components/Heading/Heading";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const Users = () => {

    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data;
        }
    })
    const normalUser = users.filter(usr => usr?.role !== "admin");
    console.log(normalUser);

    const handleMakeAdmin = id => {

        Swal.fire({
            title: "Are you sure?",
            text: "Admin this user..!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, make admin",
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.patch(`/users/teacher/${id}`, { role: 'admin' })
                        .then(res => {
                            //test role
                            if (res.data.modifiedCount > 0) {
                                refetch();
                                Swal.fire({
                                    title: "Good job!",
                                    text: "This user is now admin..!",
                                    icon: "success"
                                });
                            }
                        })
                }
            });


    }


    return (
        <div>
            <Heading title="Users"></Heading>

            <div className="overflow-x-auto max-w-5xl mx-auto border-2 shadow-2xl mt-10">
                <table className="table">
                    {/* head */}
                    <thead className="bg-[#FB923C] text-xl text-black">
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            normalUser.map(user =>

                                <tr key={user._id} className="text-base">
                                    <td></td>
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
                                        <button onClick={() => handleMakeAdmin(user._id)} className="p-2 rounded-lg bg-green-600 font-semibold text-white">Make Admin</button>

                                    </td>

                                </tr>

                            )
                        }


                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Users;




