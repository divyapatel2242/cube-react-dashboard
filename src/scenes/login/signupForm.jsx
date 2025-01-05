import { React, useState, useContext } from "react";
import {
    BoldLink,
    BoxContainer,
    FormContainer,
    Input,
    LineText,
    SubmitButton,
} from "./common";
import Marginer from "./marginer";
import axios from 'axios';
import AccountContext from './accountContext';
import { Login } from "@mui/icons-material";
import LoginForm from "./loginForm";

export default function SignupForm(props) {

    const { switchToSignin } = useContext(AccountContext);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usertype, setUserType] = useState('');

    const signupUser = async (event) => {
        event.preventDefault();
        const signupData = {
            name:name,
            address:address,
            mobile:mobile,
            email:email,
            username: username,
            password: password,
            usertype:usertype
        }
        try {
            const response = await axios.post('http://localhost:8080/cube-manage/register/user', signupData);
            if (response.status === 200) {
                switchToSignin();
            } else {
                alert("Signup failed!");
            }
        } catch (error) {
            console.error('Error while Signup', error);
        }
    };

    return (
        <BoxContainer>
            <FormContainer>
                <Input type="text" 
                placeholder="Full name" 
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} required/>
                <Input type="text" 
                placeholder="Address" 
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)} required/>
                <Input type="number" 
                placeholder="Mobile" 
                    id="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)} required/>
                <Input type="text" 
                placeholder="Email" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} required/>
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
                <Input type="text" 
                placeholder="Usertype" 
                    id="usertype"
                    value={usertype}
                    onChange={(e) => setUserType(e.target.value)} required/>
            </FormContainer>
            <Marginer direction="vertical" margin={10} />
            <SubmitButton type="submit" onClick={signupUser}>Signup</SubmitButton>
            <Marginer direction="vertical" margin="5px" />
            <LineText>
                Already have an account?{" "}
                <BoldLink onClick={switchToSignin} href="#">
                    Signin
                </BoldLink>
            </LineText>
        </BoxContainer>
    );
}