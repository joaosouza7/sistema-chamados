import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

import { FiMessageCircle } from "react-icons/fi";

import Header from "../../components/Header";
import Title from "../../components/Title";

function Dashboard() {

    const { logout } = useContext(AuthContext);

    async function handleLogout() {
        await logout();
    }

    return (
        <div>
            <Header />
            
            <div className="content">
                <Title name="Atendimentos">
                    <FiMessageCircle size={22} color="#f8f8f8" />
                </Title>
            </div> 
        </div>
    );
}

export default Dashboard;