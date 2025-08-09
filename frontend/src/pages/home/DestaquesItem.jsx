import { Link } from "react-router-dom";
import home from "./home.module.scss";

function DestaquesItem({
    img,
    desc1,
    desc2,
    titulo,
    btn,
    categoria_slug,
    colecao_slug,
}) {
    return (
        <div className={home["destaques__opcao"]}>
            <div className={home["destaques__link"]}>
                <div className={home["destaques__opcao-titulo"]}>
                    <div>
                        <span className={home["destaques__span"]}>{desc1}</span>
                        <h3 className={home["destaques__h3"]}>{titulo}</h3>
                        <p className={home["destaques__p"]}>{desc2}</p>
                    </div>
                    <Link
                        to={`loja/${colecao_slug}/${categoria_slug}`}
                        className={home["destaques__opcao-botao"]}
                    >
                        {btn}
                    </Link>
                </div>

                <div className={home["destaques__imagem"]}>
                    <img loading="lazy" src={img} alt={"Promoção" + titulo} />
                </div>
            </div>
        </div>
    );
}

export default DestaquesItem;
