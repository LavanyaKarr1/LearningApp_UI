import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import commonAxios from "../axios/CommonAxios";
import ApiUrls from "../API-urls/api-urls";
import axios from "axios";

const SessionExpirationHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkTokenExpiration = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const decoded = jwtDecode(token);
                const expirationTime = decoded.exp * 1000;
                const currentTime = Date.now();

                if (expirationTime < currentTime) {
                    try {

                        const refreshResponse= await commonAxios.post(ApiUrls.contextURL+"refresh-token",{},{withCredentials: true});

                         const newAccessToken = refreshResponse.data.accessToken;
                        localStorage.setItem("token", newAccessToken);
                        console.log("token>>",localStorage.getItem("token"));
                        

                    }
                    catch (e) {
                        Swal.fire({
                            text: "Your session has expired! Please log in again.",
                            icon: "error"
                        });
                        localStorage.removeItem("token");
                        navigate("/login");
                    }

                }
            } catch (error) {
                console.error("Invalid token:", error);
            }
        };

        // Run check every 30 seconds
        const interval = setInterval(checkTokenExpiration, 30000);
        return () => clearInterval(interval);
    }, [navigate]);

    return null; // This component doesn't render anything
};

export default SessionExpirationHandler;
