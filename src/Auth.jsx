import axios from "axios";

export const checkAuthentication = async () => {
    try {
        const response = await axios.post(
            "http://localhost:8080/cube-manage/is-autherized"
        );
        return response.status === 200;
    } catch (error) {
        console.error("Error checking authentication:", error);
        return false; // Assume unauthenticated on error
    }
};
