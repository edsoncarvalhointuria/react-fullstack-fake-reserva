import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Header from "./layouts/header/Header";
import Footer from "./layouts/footer/Footer";
import Home from "./pages/home/Home";
import Loja from "./pages/loja/Loja";
import Pesquisa from "./pages/pesquisa/Pesquisa";
import Item from "./pages/item/Item";
import Carrinho from "./pages/carrinho/Carrinho";
import Checkout from "./pages/checkout/Checkout";
import Cadastrar from "./pages/cadastrar/Cadastrar";
import Login from "./pages/login/Login";
import MinhaConta from "./pages/minha_conta/MinhaConta";
import MeusPedidos from "./pages/meus_pedidos/MeusPedidos";
import MeusPedidosDetalhes from "./pages/meus_pedidos/MeusPedidosDetalhes";
import NotFound from "./pages/notfound/NotFound";
import { checkSession } from "./context/session";
import { useLoginContext } from "./context/LoginContext";

function App() {
    const location = useLocation();
    const { logar, isLogin } = useLoginContext();

    useEffect(() => {
        checkSession();
        logar();
    }, []);

    useEffect(() => {
        window.scroll({ top: 10, behavior: "smooth" });
    }, [location]);

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/loja">
                    <Route children path="pesquisa" element={<Pesquisa />} />
                    <Route children path=":colecao" element={<Loja />} />
                    <Route
                        children
                        path=":colecao/:categoria"
                        element={<Loja />}
                    />
                    <Route
                        children
                        path=":colecao/:categoria"
                        element={<Loja />}
                    />
                    <Route
                        children
                        path=":colecao/:categoria/:opcao"
                        element={<Loja />}
                    />
                </Route>
                <Route path="/produtos/item/:id" element={<Item />} />
                <Route path="/carrinho" element={<Carrinho />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/cadastrar" element={<Cadastrar />} />
                <Route path="/login" element={<Login />} />
                {isLogin ? (
                    <Route path="/minha-conta" element={<MinhaConta />} />
                ) : (
                    <></>
                )}
                {isLogin ? (
                    <Route path="/meus-pedidos">
                        <Route children path="" element={<MeusPedidos />} />
                        <Route
                            children
                            path=":order"
                            element={<MeusPedidosDetalhes />}
                        />
                    </Route>
                ) : (
                    <></>
                )}
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
