import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo-maior.png";
import { AuthContext } from "../../contexts/auth";

function SignUp() {

    const { signUp, loadingAuth } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if(name !== "" && email !== "" && password !== "") {
            await signUp(name, email, password);
        }
    }

    return (
        <div className="container-center">
            <div className="login">

                <div className="logo-area">
                    <img src={logo} alt="Logo do sistema de chamados" />
                </div>

                <form onSubmit={handleSubmit}>
                    <h2>Nova conta</h2>
                    <input type="text" placeholder="Nome" value={name} onChange={ (e) => setName(e.target.value) } />
                    <input type="email" placeholder="E-mail" value={email} onChange={ (e) => setEmail(e.target.value) } />
                    <input type="password" placeholder="Senha" value={password} onChange={ (e) => setPassword(e.target.value) } />

                    <button type="submit">
                        {loadingAuth ? "Carregando..." : "Registrar"}
                    </button>
                </form>

                <Link to="/">Já possui uma conta? Faça login!</Link>

            </div>
        </div>
    );
}

export default SignUp;