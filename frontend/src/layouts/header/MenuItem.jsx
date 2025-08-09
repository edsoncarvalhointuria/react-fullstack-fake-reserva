import { Link } from "react-router-dom";
import header from "./header.module.scss";
import MenuSubItem from "./MenuSubItem";

function MenuItem({ nomeItem, linkItem, img, categorias, linkImg, alt }) {
    return (
        <li
            className={header["nav__item"]}
            onClick={(e) => {
                e.currentTarget.classList.toggle(header["nav__item--abrir"]);
            }}
        >
            <Link className={header["nav__link"]} to={linkItem}>
                {nomeItem}
            </Link>
            <div className={header["nav__opcoes"]}>
                <div className={header["nav__opcoes-img"]}>
                    <Link to={linkImg}>
                        <img loading="lazy" src={img} alt={alt} />
                    </Link>
                </div>

                <div className={header["nav__container-lista"]}>
                    {categorias.map((value, i) => (
                        <MenuSubItem
                            name={value.categoria}
                            link={`${linkItem}/${value.categoria_slug}`}
                            opcoes={value.opcoes}
                            key={i}
                        />
                    ))}
                </div>
            </div>
        </li>
    );
}

export default MenuItem;
