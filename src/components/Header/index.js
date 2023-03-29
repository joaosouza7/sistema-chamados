import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

import { GoHome } from "react-icons/go";
import { FiSettings } from "react-icons/fi";
import { RiUser3Line, RiLogoutBoxLine } from "react-icons/ri";
import { VscCircleFilled } from "react-icons/vsc";

import { Link } from "react-router-dom";

import "./styles.css";

import avatarImg from "../../assets/avatar.jpg";

function Header() {

    const { user, logout } = useContext(AuthContext);

    return (
        <aside className="sidebar">
        
            <header className="user-area">
                <img src={user?.avatarUrl === null ? avatarImg : user?.avatarUrl} alt="Foto do usuário" />

                <div className="user-info">
                    <p>{user?.name}</p>
                    <span>
                        <VscCircleFilled size={15} color="#24cf68" />
                        Online
                    </span>
                </div>
            </header>

            <div className="links-area">

                <Link to="/dashboard">
                    <div className="link">
                        <div>
                            <GoHome size={15} color="#FFF" />
                        </div>

                        <span>Chamados</span>
                    </div>
                </Link>

                <Link to="/customers">
                    <div className="link">
                        <div>
                            <RiUser3Line size={15} color="#FFF" />
                        </div>

                        <span>Clientes</span>
                    </div>
                </Link>

                <Link to="/profile">
                    <div className="link">
                        <div>
                            <FiSettings size={15} color="#FFF" />
                        </div>

                        <span>Meu perfil</span>
                    </div>
                </Link>


            </div>

            <div className="end">
                <button onClick={ () => logout() }>
                    <RiLogoutBoxLine size={17} />
                </button>
            </div>
        </aside>
    );
}

export default Header;