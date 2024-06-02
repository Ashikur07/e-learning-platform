import { useQuery } from "@tanstack/react-query";
import Heading from "../../../../components/Heading/Heading";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const TeacherRequest = () => {

    const axiosSecure = useAxiosSecure();
    const { data: applyers = [], refetch } = useQuery({
        queryKey: ['applyers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/applyforTeaching')
            return res.data;
        }
    })
    console.log(applyers);

    const handleMakeTeacher = (id, _id) => {
        axiosSecure.patch(`/users/teacher/${id}`)
            .then(res => {
                //test role
                if (res.data.modifiedCount > 0) {
                    refetch();
                    alert('success');
                }
            })

        axiosSecure.patch(`/applyforTeaching/teacher/${_id}`, { status: 'accepted' })
        .then(res => {
            //test role
            if (res.data.modifiedCount > 0) {
                refetch();
            }
        })
    }

    const handleRejected = id => {
        axiosSecure.patch(`/applyforTeaching/teacher/${id}`, { status: 'rejected' })
            .then(res => {
                //test role
                if (res.data.modifiedCount > 0) {
                    refetch();
                    alert('rejected');
                }
            })
    }


    return (
        <div>
            <Heading title="Teacher Request"></Heading>

            <div className="overflow-x-auto max-w-6xl mx-auto border-2 shadow-2xl mt-10">
                <table className="table">
                    {/* head */}
                    <thead className="bg-[#FB923C] text-xl text-black">
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Experience</th>
                            <th>Status</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            applyers.map(applyer =>

                                <tr key={applyer._id} className="text-base">
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-20 h-20">
                                                <img src={applyer.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{applyer.name}</td>
                                    <td>{applyer.title}</td>
                                    <td>{applyer.category}</td>
                                    <td >{applyer.experience}</td>
                                    <td className="font-bold">
                                        {applyer.status}
                                    </td>
                                    <td>
                                        {
                                            applyer.status ==="rejected"?
                                            <button className="p-3 rounded-lg bg-[#b9adad] font-semibold text-white" disabled>approves</button> : 
                                            <button onClick={() => handleMakeTeacher(applyer.userId, applyer._id)} className="p-3 rounded-lg bg-green-600 font-semibold text-white">approves</button>
                                        }
                                        
                                    </td>
                                    <td>
                                        {
                                            applyer.status ==="accepted" ?
                                                <button className="p-3 px-5 text-white font-semibold bg-[#b9adad] rounded-lg" disabled>reject</button> :
                                                <button onClick={() => handleRejected(applyer._id)} className="p-3 px-5 text-white font-semibold bg-orange-500 rounded-lg">reject</button>
                                        }

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

export default TeacherRequest;