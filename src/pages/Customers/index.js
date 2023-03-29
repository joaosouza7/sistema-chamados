import { useState } from "react";
import { toast } from "react-toastify";

import { db } from "../../services/firebaseConnection";
import { addDoc, collection } from "firebase/firestore";

import Header from "../../components/Header";
import Title from "../../components/Title";

import { RiUser3Line } from "react-icons/ri";

function Customers() {

    const [name, setName] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [address, setAddress] = useState("");

    async function handleRegister(e) {
        e.preventDefault();

        if(name !== "" && cnpj !== "" && address !== "") {
            await addDoc(collection(db, "customers"), {
                fantasyName: name,
                cnpj: cnpj,
                address: address
            })
            .then( () => {
                setName("");
                setCnpj("");
                setAddress("");
                toast.success("Empresa registrada!");
            })
            .catch( (error) => {
                console.log(error);
                toast.error("Erro ao cadastrar!");
            })

        } else {
            toast.error("Preencha todos os campos!");
        }
    }

    return (
        <div>
            <Header />

            <div className="content">
                <Title name="Novo cliente">
                    <RiUser3Line size={20} />
                </Title>

                <div className="container">
                
                    <form className="form-profile" onSubmit={handleRegister}>
                        <label>Nome fantasia</label>
                        <input type="text" placeholder="Nome da empresa" value={name} onChange={ (e) => setName(e.target.value) } />

                        <label>CNPJ</label>
                        <input type="text" placeholder="Digite o CNPJ" value={cnpj} onChange={ (e) => setCnpj(e.target.value) } />

                        <label>Endereço</label>
                        <input type="text" placeholder="Endereço da empresa" value={address} onChange={ (e) => setAddress(e.target.value) } />

                        <button type="submit">Salvar</button>
                    </form>
                    
                </div>

            </div>
        </div>
    );
}

export default Customers;