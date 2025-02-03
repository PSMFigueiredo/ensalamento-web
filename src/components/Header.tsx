import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logoImg from "../assets/logo.png";

const Header: React.FC = () => {
    const location = useLocation();
    const [loginText, setLoginText] = useState("Login");
    const { isAuthenticated } = useAuth();
    const [isLoginPage, setIsLoginPage] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // Controle de abertura do menu

    useEffect(() => {
        if (location.pathname === "/login") {
            setIsLoginPage(true);
            setLoginText("Login");
        } else if (location.pathname === "/register") {
            setIsLoginPage(true);
            setLoginText("Cadastrar");
        } else {
            setIsLoginPage(false);
            setLoginText("Sair");
        }
    }, [location.pathname]);

    const headerStyle = isLoginPage || location.pathname === "/register"
        ? "fixed" // Usar fixed nas páginas de login e cadastro
        : "sticky";

    const navigate = useNavigate();

    const handleHamburgerClick = () => {
        setMenuOpen(!menuOpen); // Alternar entre aberto e fechado
    };

    const handleNavigate = (path: string) => {
        navigate(path);
        setMenuOpen(false); // Fechar o menu após a navegação
    };

    return (
        <>
            <HeaderContainer headerStyle={headerStyle}>
                <Logo to="/">
                    <img src={logoImg} alt="Logo" />
                </Logo>
                {isLoginPage ? (
                    <>
                        <LoginLink href="/login">{loginText}</LoginLink>
                        <RightLinks>
                            <ForgotPassword href="/forgot-password">Esqueci a senha</ForgotPassword>
                            <Register onClick={() => handleNavigate("/register")}>|&nbsp;&nbsp;&nbsp;&nbsp;Cadastrar Usuário</Register>
                        </RightLinks>
                    </>
                ) : (
                    <>
                        <HamburgerMenu onClick={handleHamburgerClick}>
                            <div className="bar"></div>
                            <div className="bar"></div>
                            <div className="bar"></div>
                        </HamburgerMenu>
                        {menuOpen && (
                            <HamburgerMenuOptions>
                                <HamburgerMenuOption onClick={() => handleNavigate("/")}>Dashboard</HamburgerMenuOption>
                                <HamburgerMenuOption onClick={() => handleNavigate("/register")}>Cadastrar Professor</HamburgerMenuOption>
                                <HamburgerMenuOption onClick={() => handleNavigate("/classroom-register")}>Cadastrar Turma</HamburgerMenuOption>
                                <HamburgerMenuOption onClick={() => handleNavigate("/grid-register")}>Cadastrar Grade</HamburgerMenuOption>
                                <HamburgerMenuOption onClick={() => handleNavigate("/login")}>Sair</HamburgerMenuOption>
                            </HamburgerMenuOptions>
                        )}
                    </>
                )}
                {!isAuthenticated && (
                    <RightLinks>
                        <ForgotPassword href="/forgot-password">Esqueci a senha</ForgotPassword>
                        <Register href="#" onClick={() => navigate("/register")}>|&nbsp;&nbsp;&nbsp;&nbsp;Cadastrar Usuário</Register>
                    </RightLinks>
                )}
                <Register href="#" onClick={() => navigate("/register")} style={{ position: 'absolute', bottom: '30px', right: '80px' }}>
                    Cadastrar Usuário
                </Register>

            </HeaderContainer>
        </>
    );
};

const HeaderContainer = styled.header<{ headerStyle: string }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #00509E;
    position: ${({ headerStyle }) => (headerStyle === "fixed" ? "fixed" : "sticky")}; /* Condição para fixed ou sticky */
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

const HamburgerMenuOptions = styled.div`
    position: absolute;
    top: 80px;
    right: 40px;
    background-color: #00509E;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    z-index: 999;
`;

const HamburgerMenuOption = styled.a`
    font-size: 16px;
    color: #fff;
    text-decoration: none;
    display: block;
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;

    &:last-child {
        margin-bottom: 0;
    }

    &:hover {
        background-color: #8F9BB3; /* Cor de fundo ao passar o mouse */
    }
`;

export default Header;
