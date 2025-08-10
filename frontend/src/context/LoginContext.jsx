import { useState } from "react";
import { createContext, useContext } from "react";
import { getCarrinho, verLogin } from "./api";
import { useCarrinhoContext } from "./CarrinhoContext";

const context = createContext(null);

export const useLoginContext = () => useContext(context);

function ContextProviderLogin({ children }) {
    const { setCarrinho } = useCarrinhoContext();
    const [isLogin, setLogin] = useState(false);
    const [user, setUser] = useState("");
    const logar = () => {
        verLogin()
            .then(({ data }) => {
                if (data?.err) {
                    setLogin(false);
                }
                if (data?.login) {
                    setLogin(true);
                    setUser({ nome: data.nome, email: data.email });
                    getCarrinho().then(({ data }) =>
                        setCarrinho((v) => ({ ...data, ...v }))
                    );
                }
            })
            .catch(() => {
                setLogin(false);
            });
    };
    return (
        <context.Provider value={{ isLogin, setLogin, logar, user, setUser }}>
            {children}
        </context.Provider>
    );
}

export default ContextProviderLogin;
