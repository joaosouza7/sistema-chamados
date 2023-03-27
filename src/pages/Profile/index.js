import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { FiSettings, FiUpload } from "react-icons/fi";

import "./styles.css";

import Header from "../../components/Header";
import Title from "../../components/Title";

import { AuthContext } from "../../contexts/auth";
import avatarImg from "../../assets/avatar.jpg";

import { db, storage } from "../../services/firebaseConnection";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Profile() {

    const { user, setUser, storageUser, logout } = useContext(AuthContext);

    const [avatarUrl, setAvatarUrl] = useState(user && user?.avatarUrl);
    const [imageAvatar, setImageAvatar] = useState(null);

    const [name, setName] = useState(user && user?.name);
    const [email, setEmail] = useState(user && user?.email);

    function handleFile(e) {
        if(e.target.files[0]) {
            const image = e.target.files[0];

            if(image.type === "image/jpeg" || image.type === "image/jpg" || image.type === "image/png") {
                setImageAvatar(image);
                setAvatarUrl(URL.createObjectURL(image));
            } else {
                toast.warning("Envie uma imagem do tipo JPEG, JPG ou PNG!");
                setImageAvatar(null);
                return;
            }
        }
    }

    async function handleUpload() {
        const currentUid = user?.uid;

        const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`);

        const uploadTask = uploadBytes(uploadRef, imageAvatar)
            .then( (snapshot) => {
                getDownloadURL(snapshot.ref).then( async (downloadURL) => {
                    let urlFoto = downloadURL;

                    const docRef = doc(db, "users", user?.uid);

                    await updateDoc(docRef, {
                        avatarUrl: urlFoto,
                        name: name,
                    })
                    .then( () => {
                        let data = {
                            ...user,
                            name: name,
                            avatarUrl: urlFoto,
                        };

                        setUser(data);
                        storageUser(data);
                        toast.info("Perfil atualizado com sucesso!");
                    })
                })
            })
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if(imageAvatar === null && name !== "") {
            // Atualizar apenas o nome
            const docRef = doc(db, "users", user?.uid);

            await updateDoc(docRef, {
                name: name,
            })
            .then( () => {
                let data = {
                    ...user,
                    name: name,
                };

                setUser(data);
                storageUser(data);
                toast.info("Perfil atualizado com sucesso!");
            })
            .catch( (error) => {
                toast.error("Ops, houve algum erro!");
            })
        } else if(name !== "" && imageAvatar !== null) {
            // Atualizar tanto nome, quanto foto
            handleUpload();
        }
    }

    return (
        <div>
            <Header />

            <div className="content">
                <Title name="Minha conta">
                    <FiSettings size={20} color="#f8f8f8" />
                </Title>

                <div className="container-profile">

                    <form className="form-profile" onSubmit={handleSubmit}>
                        <label className="label-avatar">
                            <span>
                                <FiUpload size={25} color="#FFF" />
                            </span>

                            <input type="file" accept="image/*" onChange={handleFile} /> <br />
                            {avatarUrl === null ? (
                                <img src={avatarImg} alt="Foto de perfil" width={200} height={200} />
                            ) : (
                                <img src={avatarUrl} alt="Foto do usuário" width={200} height={200} />
                            )}
                        </label>

                        <label>Nome</label>
                        <input type="text" value={name} onChange={ (e) => setName(e.target.value) } />

                        <label>E-mail</label>
                        <input type="email" disabled value={email} />

                        <button type="submit">Salvar</button>
                    </form>

                </div>

                <div className="container-profile">
                    <button onClick={ () => logout() } className="logout-btn">Sair</button>
                </div>

            </div>
        </div>
    );
}

export default Profile;