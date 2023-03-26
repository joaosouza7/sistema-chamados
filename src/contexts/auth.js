import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth, db } from "../services/firebaseConnection";

export const AuthContext = createContext({});

function AuthProvider({ children }) {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);

    // Fazer login
    async function signIn(email, password) {

        setLoadingAuth(true);

        await signInWithEmailAndPassword(auth, email, password)
        .then( async (value) => {
            let uid = value.user.uid;

            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            let data = {
                uid: uid,
                name: docSnap.data().name,
                email: value.user.email,
                avatarUrl: docSnap.data().avatarUrl,
            };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            navigate("/dashboard");
            toast.success(`Bem-vindo(a) de volta ${data.name}.`);
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
            toast.error("Ops, algo deu errado!");
        })
    }

    // Cadastrar um novo usuário
    async function signUp(name, email, password) {
        setLoadingAuth(true);

        await createUserWithEmailAndPassword(auth, email, password)
            .then( async (value) => {
                let uid = value.user.uid;

                await setDoc(doc(db, "users", uid), {
                    name: name,
                    avatarUrl: null
                })
                .then( () => {
                    let data = {
                        uid: uid,
                        name: name,
                        email: value.user.email,
                        avatarUrl: null
                    };

                    setUser(data);
                    storageUser(data);
                    setLoadingAuth(false);
                    navigate("/dashboard");
                    toast.success(`Olá, seja bem-vindo(a) ao sistema ${data.name}.`)
                })

            })
            .catch((error) => {
                console.log(error);
                setLoadingAuth(false);
                toast.error("Ops, algo deu errado!");
            })

    }

    function storageUser(data) {
        localStorage.setItem("@ticketsPRO", JSON.stringify(data));
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            signIn,
            signUp,
            loadingAuth,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;