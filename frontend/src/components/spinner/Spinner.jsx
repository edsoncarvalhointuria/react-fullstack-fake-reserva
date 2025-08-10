import { useEffect, useState } from "react";
import "./spinner.scss";

const MENSAGENS_DE_CARREGAMENTO = [
    "Carregando.",
    "Carregando..",
    "Carregando...",
    "Ligando o servidor backend 🐦",
    "Ligando o servidor backend 🐦🐦",
    "Ligando o servidor backend 🐦🐦🐦",
    "Isso pode levar até um minuto...",
    "O servidor é gratuito, tenha paciência rsrs",
];

function Spinner() {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const id = setTimeout(
            () =>
                setCurrentIndex(
                    (v) => (v + 1) % MENSAGENS_DE_CARREGAMENTO.length
                ),
            2500
        );

        return () => clearTimeout(id);
    }, [currentIndex]);

    return (
        <div className="spinner-div">
            <div className="spinner"></div>
            <div>{MENSAGENS_DE_CARREGAMENTO[currentIndex]}</div>
        </div>
    );
}

export default Spinner;
