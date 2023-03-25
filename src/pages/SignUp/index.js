import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo-maior.png";

function SignUp() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="container-center">
            <div className="login">

                <div className="logo-area">
                    <img src={logo} alt="Logo do sistema de chamados" />
                </div>

                <form>
                    <h2>Nova conta</h2>
                    <input type="text" placeholder="Nome" value={name} onChange={ (e) => setName(e.target.value) } />
                    <input type="email" placeholder="E-mail" value={email} onChange={ (e) => setEmail(e.target.value) } />
                    <input type="password" placeholder="Senha" value={password} onChange={ (e) => setPassword(e.target.value) } />

                    <button type="submit">Registrar</button>
                </form>

                <Link to="/">Já possui uma conta? Faça login!</Link>

            </div>
        </div>
    );
}

export default SignUp;