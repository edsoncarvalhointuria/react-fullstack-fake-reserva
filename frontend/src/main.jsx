import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import ContextProviderCarrinho from "./context/CarrinhoContext.jsx";
import ContextProviderLogin from "./context/LoginContext.jsx";
import "./index.scss";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <HashRouter>
        <ContextProviderCarrinho>
            <ContextProviderLogin>
                <App />
            </ContextProviderLogin>
        </ContextProviderCarrinho>
    </HashRouter>
);
