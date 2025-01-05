import { useEffect } from "react";
import axios from 'axios';
// const [loggedOut, setLoggedOut] = userState(false)
import { useNavigate } from "react-router-dom";
export default function Logout(){ 
    const navigate = useNavigate();
    useEffect(() => {
        const logoutUser = async () => {
            try {
                const response = await axios.post('http://localhost:8080/cube-manage/logout');
                if (response.status === 200) {
                    navigate("/login");
                } else {
                    alert("Logout failed");
                }
            } catch (error) {
                alert("Logout failed");
                navigate("/");
                console.error('Error while Logout', error);
            }
        };
        logoutUser(); 
    }, [navigate]);
    return <div>Logging out...</div>;
}
