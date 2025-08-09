import { Link } from "react-router-dom";
import home from "./home.module.scss";

function BannersItem({ img, nome, colecao_slug, categoria_slug }) {
    return (
        <div className={home["banners__banner"]}>
            <Link to={`/loja/${colecao_slug}/${categoria_slug}`}>
                <img loading="lazy" src={img} alt={"Banner " + nome} />
            </Link>
        </div>
    );
}

export default BannersItem;
