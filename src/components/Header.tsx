import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import logoImg from "../assets/logo.png";

const Header: React.FC = () => {
    const location = useLocation();
    const [loginText, setLoginText] = useState("Login");
    const [isLoginPage, setIsLoginPage] = useState(false);

    useEffect(() => {

        if (location.pathname === "/login") {
            setIsLoginPage(true);
            setLoginText("Login");
        } else {
            setIsLoginPage(false);
            setLoginText("Sair");
        }
    }, [location.pathname]);

    return (
        <HeaderContainer>
            <Logo to="/">
                <img src={logoImg} alt="Logo" />
            </Logo>
            {isLoginPage ? (
                <LoginLink href="/login">{loginText}</LoginLink>
            ) : (
                <HamburgerMenu>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </HamburgerMenu>
            )}
            <RightLinks>
                <ForgotPassword href="/forgot-password">Esqueci a senha</ForgotPassword>
                <Register href="/register">Cadastrar</Register>
            </RightLinks>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #00509E;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;  
    height: 230px;  
    z-index: 1000;
    box-sizing: border-box;  
    padding: 0 20px;  
`;

const Logo = styled(Link)`
    position: absolute;
    top: 30px;
    left: 40px;
    width: 116px;  
    height: auto;
    img {
        width: 100%;  
        height: auto; 
    }
`;


const LoginLink = styled.a`
    font-family: 'Arial Black', sans-serif;
    font-size:40px;
    font-weight: bold;
    color: #fff;
    text-decoration: none;
    position: absolute;
    top: 30px;
    right: 40px;
`;

const RightLinks = styled.div`
    position: absolute;
    bottom: 30px;
    right: 40px;
`;

const ForgotPassword = styled.a`
    font-size: 14px;
    color: #fff;
    text-decoration: none;
    margin-right: 20px;
`;

const Register = styled.a`
    font-size: 14px;
    color: #fff;
    text-decoration: none;
`;

const HamburgerMenu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 30px;
    height: 25px;
    position: absolute;
    top: 30px; 
    right: 80px; 
    cursor: pointer;
    
    .bar {
        width: 30px;
        height: 5px;
        background-color: #fff;
        border-radius: 5px;
    }
`;

export default Header;
