import { Link } from "react-router-dom";
import home from "./home.module.scss";

function ItemTamanho({ img, tamanho, tamanho_slug, colecao, colecao_slug }) {
    return (
        <div className={home["por-tamanho__carrossel-opcoes-container"]}>
            <div className={home["por-tamanho__carrossel-opcao"]}>
                <Link
                    className={home["por-tamanho__link"]}
                    to={`loja/${colecao_slug}?tamanho=${tamanho}`}
                >
                    <img
                        loading="lazy"
                        src={img}
                        alt={`${colecao} tamanho ${tamanho}`}
                    />
                </Link>
            </div>
            <p>{colecao}</p>
        </div>
    );
}

export default ItemTamanho;
