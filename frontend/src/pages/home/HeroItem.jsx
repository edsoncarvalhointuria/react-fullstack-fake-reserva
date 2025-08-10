import { Link } from "react-router-dom";
import home from "./home.module.scss";

function HeroItem({ img, nome, colecao_slug, categoria_slug }) {
    return (
        <Link
            to={`/loja/${colecao_slug}/${categoria_slug}`}
            className={home["hero-mob__imagem"]}
        >
            <img src={img} alt={nome} />
        </Link>
    );
}

export default HeroItem;
