import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: `https://bid-sphere-server.vercel.app`,
    withCredentials: true,
})



const useAxiosSecure = () => {
    const {logOut} = useAuth();
    const navigate = useNavigate();
    //Interceptor
    //Server to Client
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        async error => {
            console.error(error.response);
            if (error.response.status === 401 || error.response.status === 403) {
                await logOut();
                navigate("/login");

            }
            return Promise.reject(error);
        }
    )


    //Client to Server
    //axios.interceptors.request
    return axiosSecure;
};

export default useAxiosSecure;