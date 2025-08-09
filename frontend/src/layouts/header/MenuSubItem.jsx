import { Link } from "react-router-dom";
import header from "./header.module.scss";

function MenuSubItem({ name, link, opcoes }) {
    return (
        <div>
            <Link to={link}>
                <p className={header["nav__lista-titulo"]}>{name}</p>
            </Link>

            <ul className={header["nav__lista"]}>
                {opcoes.map((value, i) => (
                    <Link to={`${link}/${value.opcao_slug}`} key={i}>
                        <li>{value.opcao}</li>
                    </Link>
                ))}
            </ul>
        </div>
    );
}

export default MenuSubItem;
