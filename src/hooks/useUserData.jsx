import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserData = ({email}) => {

    const axiosSecure = useAxiosSecure();
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${email}`)
            return res.data;
        }
    })

    return users;
};

export default useUserData;