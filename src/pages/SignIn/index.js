import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import "./styles.css";

import logo from "../../assets/logo-maior.png";
import { AuthContext } from "../../contexts/auth";

function SignIn() {

    const { signIn, loadingAuth } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSignIn(e) {
        e.preventDefault();

        if(email !== "" && password !== "") {
            await signIn(email, password);
        }
    }

    return (
        <div className="container-center">
            <div className="login">

                <div className="logo-area">
                    <img src={logo} alt="Logo do sistema de chamados" />
                </div>

                <form onSubmit={handleSignIn}>
                    <h2>Entrar</h2>
                    <input type="email" placeholder="E-mail" value={email} onChange={ (e) => setEmail(e.target.value) } />
                    <input type="password" placeholder="Senha" value={password} onChange={ (e) => setPassword(e.target.value) } />

                    <button type="submit">
                        {loadingAuth ? "Carregando..." : "Acessar"}
                    </button>
                </form>

                <Link to="/register">Não possui uma conta? Criar conta</Link>

            </div>
        </div>
    );
}

export default SignIn;