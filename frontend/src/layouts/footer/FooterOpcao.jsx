function FooterOpcao({ nome, links, ind, menuOpen, toggleOpen }) {
    return (
        <div
            className={`footer__lista-div ${
                menuOpen === ind ? "footer__lista--aberto" : ""
            }`}
            onClick={() => toggleOpen(ind)}
        >
            <h2>{nome}</h2>

            <ul className="footer__lista">
                {Object.keys(links).map((key, i) => (
                    <li className="footer__item" key={i}>
                        <a href={links[key]}>{key}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FooterOpcao;
