import { useQuery } from "@tanstack/react-query";
import Heading from "../../../../components/Heading/Heading";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import MyCourseCard from "./MyCourseCard";
import Swal from "sweetalert2";

const MyClass = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: classes = [], refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await axiosSecure.get('/classes');
            return res.data;
        }
    })
    const matchClass = classes.filter(clas => clas?.email === user?.email)
    console.log(matchClass);

    // delete class functionality
    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/classes/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Item has been deleted.',
                                'success'
                            )
                        }
                    })   
                  
            }
        })
    }


    return (
        <div>
            <Heading title="My Class"></Heading>
            <div className="max-w-[1100px] mx-auto grid grid-cols-3 gap-5 mt-10 justify-center mb-20">
                {
                    matchClass.map(clas => <MyCourseCard
                        key={clas._id}
                        clas={clas}
                        handleDelete={handleDelete}></MyCourseCard>)
                }
            </div>
        </div>
    );
};

export default MyClass;