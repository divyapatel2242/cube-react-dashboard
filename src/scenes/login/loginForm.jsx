import { React, useState, useContext } from "react";
import {
    BoldLink,
    BoxContainer,
    FormContainer,
    Input,
    LineText,
    MutedLink,
    SubmitButton,
} from "./common";
import Marginer from "./marginer";
import AccountContext from "./accountContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function LoginForm(props) {

    const { switchToSignup } = useContext(AccountContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginUser = async (event) => {
        event.preventDefault();
        const loginData = {
            username: username,
            password: password
        }
        try {
            const response = await axios.post('http://localhost:8080/cube-manage/login', loginData, { withCredentials: true });
            if (response.status === 200){
                navigate("/");
            } else {
                alert("Login failed!");
            }
        } catch (error) {
            console.error('Error while login', error);
        }
    };

    return (
        <BoxContainer>
            <FormContainer>
                <Input type="username" 
                placeholder="Username" 
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} required/>
                <Input type="password" 
                placeholder="Password"
                id="password"
                value={password}
                    onChange={(e) => setPassword(e.target.value)} required/>
            </FormContainer>
            <Marginer direction="vertical" margin={10} />
            <MutedLink href="#">Forget your password?</MutedLink>
            <Marginer direction="vertical" margin="1.6em" />
            <SubmitButton type="submit" onClick={loginUser}>Signin</SubmitButton>
            <Marginer direction="vertical" margin="5px" />
            <LineText>
                Don't have an accoun?{" "}
                <BoldLink onClick={switchToSignup} href="#">
                    Signup
                </BoldLink>
            </LineText>
        </BoxContainer>
    );
}