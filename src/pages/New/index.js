import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { FiPlusCircle } from "react-icons/fi";

import Header from "../../components/Header";
import Title from "../../components/Title";

import { AuthContext } from "../../contexts/auth";
import { db } from "../../services/firebaseConnection";
import { collection, getDocs, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";

import "./styles.css";

const listRef = collection(db, "customers");

function New() {

    const { user } = useContext(AuthContext);

    const { id } = useParams();
    const navigate = useNavigate();

    const [customers, setCustomers] = useState([]);
    const [loadCustomer, setLoadCustomer] = useState(true);
    const [customerSelected, setCustomerSelected] = useState(0);

    const [assunto, setAssunto] = useState("Suporte");
    const [status, setStatus] = useState("Aberto");
    const [complemento, setComplemento] = useState("");
    const [idCustomer, setIdCustomer] = useState(false);

    useEffect(() => {
        async function loadCustomers() {
            await getDocs(listRef)
            .then( (snapshot) => {
                let lista = [];

                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        fantasyName: doc.data().fantasyName,
                    });
                });

                if(snapshot.docs.size === 0) {
                    console.log("NENHUMA EMPRESA ENCONTRADA!");
                    setCustomers([ { id: '1', fantasyName: 'FREELA' }]);
                    setLoadCustomer(false);
                    return;
                }

                setCustomers(lista);
                setLoadCustomer(false);

                if(id) {
                    loadId(lista);
                }

            })
            .catch( (error) => {
                console.log("ERRO AO BUSCAR OS CLIENTES " + error);
                setLoadCustomer(false);
                setCustomers([ { id: '1', fantasyName: 'FREELA' }]);
            })
        }

        loadCustomers();
    }, [id]);

    async function loadId(lista) {
        const docRef = doc(db, "chamados", id);
        await getDoc(docRef)
        .then( (snapshot) => {
            setAssunto(snapshot.data().assunto);
            setStatus(snapshot.data().status);
            setComplemento(snapshot.data().complemento);

            let index = lista.findIndex(item => item.id === snapshot.data().clienteId);
            setCustomerSelected(index);
            setIdCustomer(true);
        })
        .catch( (error) => {
            console.log(error);
            setIdCustomer(false);
        });
    }

    function handleOptionChange(e) {
        setStatus(e.target.value);
    }

    function handleChangeSelect(e) {
        setAssunto(e.target.value);
    }

    function handleChangeCustomer(e) {
        setCustomerSelected(e.target.value);
    }

    async function handleRegister(e) {
        e.preventDefault();

        if(idCustomer) {
            // Atualizando chamado

            const docRef = doc(db, "chamados", id);
            await updateDoc(docRef, {
                cliente: customers[customerSelected].fantasyName,
                clienteId: customers[customerSelected].id,
                assunto: assunto,
                status: status,
                complemento: complemento,
                userId: user.uid,
            })
            .then( () => {
                toast.info("Chamado atualizado com sucesso!");
                setCustomerSelected(0);
                setComplemento("");
                navigate("/dashboard");
            })
            .catch( (error) => {
                toast.error("Erro ao atualizar chamado!");
            })

            return;
        }

        // Registrar novo chamado
        await addDoc(collection(db, "chamados"), {
            created: new Date(),
            cliente: customers[customerSelected].fantasyName,
            clienteId: customers[customerSelected].id,
            assunto: assunto,
            status: status,
            complemento: complemento,
            userId: user.uid,
        })
        .then( () => {
            toast.success("Chamado registrado!");
            setComplemento("");
            setCustomerSelected(0);
        })
        .catch( (error) => {
            toast.error("Erro ao registrar chamado!");
            //console.log(error);
        })
    }

    return (
        <div>
            <Header />

            <div className="content">
                <Title name={ id ? "Atualizar chamado" : "Novo chamado" }>
                    <FiPlusCircle color="#FFF" size={20} />
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleRegister}>

                        <label>Cliente</label>
                        {loadCustomer ? (
                            <input type="text" disabled value="Carregando..." />
                        ) : (
                            <select value={customerSelected} onChange={handleChangeCustomer}>
                                {customers.map( (item, index) => {
                                    return (
                                        <option key={index} value={index}>{item.fantasyName}</option>
                                    );
                                })}
                            </select>
                        )}

                        <label>Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect}>
                            <option value="Suporte">Suporte</option>
                            <option value="Visita Tecnica">Visita Tecnica</option>
                            <option value="Financeiro">Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className="status">
                            <input type="radio" name="radio" value="Aberto" onChange={handleOptionChange} 
                            checked={ status === "Aberto" } />
                            <span>Em aberto</span>

                            <input type="radio" name="radio" value="Progresso" onChange={handleOptionChange} 
                            checked={ status === "Progresso" } />
                            <span>Progresso</span>

                            <input type="radio" name="radio" value="Atendido" onChange={handleOptionChange} 
                            checked={ status === "Atendido" } />
                            <span>Atendido</span>
                        </div>

                        <label>Complemento</label>
                        <textarea type="text" placeholder="Descreva seu problema (opcional)." value={complemento} onChange={ (e) => setComplemento(e.target.value) } />

                        <button type="submit">{ id ? "Atualizar" : "Registrar" }</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default New;