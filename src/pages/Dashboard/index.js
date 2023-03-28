import { FiPlus, FiMessageCircle, FiSearch, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";

import "./styles.css";

import Header from "../../components/Header";
import Title from "../../components/Title";

function Dashboard() {

    return (
        <div>
            <Header />
            
            <div className="content">
                <Title name="Atendimentos">
                    <FiMessageCircle size={22} color="#f8f8f8" />
                </Title>

                <>
                    <Link to="/new" className="new">
                        <FiPlus color="#FFF" size={23} />
                        Novo chamado
                    </Link>

                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Cliente</th>
                                <th scope="col">Assunto</th>
                                <th scope="col">Status</th>
                                <th scope="col">Cadastrado em</th>
                                <th scope="col">#</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td data-label="Cliente">Mercado Esquina</td>
                                <td data-label="Assunto">Suporte</td>
                                <td data-label="Status">
                                    <span className="badge" style={{ backgroundColor: "#999" }}>Em aberto</span>
                                </td>
                                <td data-label="Cadastrado">12/05/2023</td>
                                <td data-label="#">
                                    <button className="action" style={{ backgroundColor: "#3583f6" }}>
                                        <FiSearch size={15} color="#FFF" />
                                    </button>
                                    <button className="action" style={{ backgroundColor: "#fad815" }}>
                                        <FiEdit2 size={15} color="#FFF" />
                                    </button>
                                </td>
                            </tr>

                            <tr>
                                <td data-label="Cliente">Informatica TECH</td>
                                <td data-label="Assunto">Suporte</td>
                                <td data-label="Status">
                                    <span className="badge" style={{ backgroundColor: "#999" }}>Em aberto</span>
                                </td>
                                <td data-label="Cadastrado">12/05/2023</td>
                                <td data-label="#">
                                    <button className="action" style={{ backgroundColor: "#3583f6" }}>
                                        <FiSearch size={15} color="#FFF" />
                                    </button>
                                    <button className="action" style={{ backgroundColor: "#fad815" }}>
                                        <FiEdit2 size={15} color="#FFF" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>


            </div> 
        </div>
    );
}

export default Dashboard;