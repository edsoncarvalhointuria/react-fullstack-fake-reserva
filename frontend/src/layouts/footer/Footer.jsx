import { useState } from "react";
import { useLocation } from "react-router-dom";
import Newsletter from "../newsletter/Newsletter";
import FooterOpcao from "./FooterOpcao";
import "./footer.scss";

const opcoesMenu = [
    {
        "Sobre a Reserva": {
            "1P=5P": "#",
            Cultura: "#",
            Sustentabilidade: "#",
            "Quem Faz": "#",
            "Mapa de Categorias": "#",
        },
    },
    {
        "Vem Pra Reserva": {
            "Seja um Franqueado": "#",
            "Nossas Lojas": "#",
            "Trabalhe Conosco": "#",
        },
    },
    {
        "Minha Conta": {
            Favoritos: "#",
            "Meus Pedidos": "#",
            "Minha Carteira": "#",
            "Meu Cartão Presente": "#",
        },
    },
    {
        Suporte: {
            "Política de Privacidade": "#",
            "Termos de Uso": "#",
            "Dúvidas Frequentes": "#",
            "Compromisso Best Friday": "#",
            "Troca e Devolução": "#",
            "Regulamento Roleta Premiada Esquenta": "#",
            "Regulamento Roleta Premiada Best Friday 2024": "#",
        },
    },
];

function Footer() {
    const [menuOpen, setIndex] = useState(null);
    const local = useLocation();

    function toggleOpen(index) {
        menuOpen === index ? setIndex(null) : setIndex(index);
    }

    return (
        <footer
            className={`footer ${
                local.pathname === "/carrinho" || local.pathname === "/checkout"
                    ? "footer--checkout"
                    : ""
            }`}
        >
            <Newsletter />

            <section className="footer__secao-links">
                <div className="footer__secao-links-container">
                    <div className="footer__container">
                        <div className="footer__lista1">
                            {opcoesMenu.map((obj, i) =>
                                Object.keys(obj).map((key) => (
                                    <FooterOpcao
                                        nome={key}
                                        links={obj[key]}
                                        key={i}
                                        ind={i}
                                        menuOpen={menuOpen}
                                        toggleOpen={toggleOpen}
                                    />
                                ))
                            )}
                        </div>

                        <div className="footer__lista2">
                            <div className="footer__lista2-div">
                                <h2 className="footer__item-h2">Atendimento</h2>

                                <ul className="footer__lista footer__lista--grid">
                                    <li className="footer__item footer__item--a">
                                        <div className="footer__item-atendimento">
                                            <img
                                                loading="lazy"
                                                src="https://lojausereserva.vtexassets.com/assets/vtex.file-manager-graphql/images/9c4ad5b9-1b4d-4f4d-afce-fc05e3ee3b36___aac616c1eff051d87cbbe7d7ea6090db.svg"
                                                alt="Icone Libras"
                                            />
                                            <a> Atendimento em libras </a>
                                        </div>
                                    </li>
                                    <li className="footer__item footer__item--b">
                                        <div className="footer__item-atendimento">
                                            <img
                                                loading="lazy"
                                                src="https://lojausereserva.vtexassets.com/assets/vtex.file-manager-graphql/images/d20346db-d162-4873-8518-b8548620acf6___07a0cb802e61ce015e6477828969ca35.svg"
                                                alt="Icone Whatsapp"
                                            />
                                            <a> WhatsApp Reserva </a>
                                        </div>
                                        <p className="footer__item-atendimento-p">
                                            Segunda a Sexta: 08h às 20h.
                                        </p>
                                        <p>Sábados: 08h às 18h</p>
                                    </li>
                                    <li className="footer__item footer__item--c">
                                        <div className="footer__item-atendimento">
                                            <img
                                                loading="lazy"
                                                src="https://lojausereserva.vtexassets.com/assets/vtex.file-manager-graphql/images/c9f66e16-18fc-47e7-80d2-8285e4945aab___02415dfe7c43260a39980d26a4a3f438.svg"
                                                alt="Icone Carragando"
                                            />
                                            <a> Solicite sua troca aqui </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="footer__redes-sociais">
                                <a href="#">
                                    <img
                                        loading="lazy"
                                        src="https://lojausereserva.vtexassets.com/arquivos/fbx1.png"
                                        alt="Logo Facebook"
                                    />
                                </a>
                                <a href="#">
                                    <img
                                        loading="lazy"
                                        src="https://lojausereserva.vtexassets.com/arquivos/insx1.png"
                                        alt="Logo Instagram"
                                    />
                                </a>
                                <a href="#">
                                    <img
                                        loading="lazy"
                                        src="https://lojausereserva.vtexassets.com/arquivos/ytx1.png"
                                        alt="Logo Youtube"
                                    />
                                </a>
                                <a href="#">
                                    <img
                                        loading="lazy"
                                        src="https://lojausereserva.vtexassets.com/arquivos/twx1.png"
                                        alt="Logo X"
                                    />
                                </a>
                                <a href="#">
                                    <img
                                        loading="lazy"
                                        src="https://lojausereserva.vtexassets.com/arquivos/linx1.png"
                                        alt="Logo Linkedin"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="footer__acoes">
                        <div className="footer__acoes-div">
                            <div>
                                <div className="footer__acoes-img">
                                    <img
                                        loading="lazy"
                                        src="https://lojausereserva.vtexassets.com/arquivos/entr3x.png"
                                        alt="Icone Avião"
                                    />
                                </div>
                                <h3 className="footer__acoes-h3">
                                    Entrega Internacional
                                </h3>
                            </div>
                            <p className="footer__acoes-p">
                                Entrega para mais de 40 países de forma rápida e
                                segura.
                            </p>
                        </div>

                        <div className="footer__acoes-div">
                            <div>
                                <div className="footer__acoes-img">
                                    <img
                                        loading="lazy"
                                        src="https://lojausereserva.vtexassets.com/arquivos/1p5px2.png"
                                        alt="Icone Compra 1P"
                                    />
                                </div>
                                <h3 className="footer__acoes-h3">1P=5P</h3>
                            </div>
                            <p className="footer__acoes-p">
                                A cada peça vendida, 5 pratos de comida são
                                viabilizados para quem tem fome.
                            </p>
                        </div>

                        <div className="footer__acoes-div">
                            <div>
                                <div className="footer__acoes-img">
                                    <img
                                        loading="lazy"
                                        src="https://lojausereserva.vtexassets.com/arquivos/trocax2.png"
                                        alt="Icone Troca"
                                    />
                                </div>
                                <h3 className="footer__acoes-h3">
                                    Troca Facilitada
                                </h3>
                            </div>
                            <p className="footer__acoes-p">
                                Compre no site ou app e troque em uma das lojas
                                em até 7 dias.
                            </p>
                        </div>

                        <div className="footer__acoes-div">
                            <div>
                                <div className="footer__acoes-img">
                                    <img
                                        loading="lazy"
                                        src="https://lojausereserva.vtexassets.com/arquivos/cashback_footer.png"
                                        alt="Icone CashBack"
                                    />
                                </div>
                                <h3 className="footer__acoes-h3">Cashback</h3>
                            </div>
                            <p className="footer__acoes-p">
                                Compre e ganhe cashback para usar no site ou nas
                                lojas.
                            </p>
                        </div>
                    </div>

                    <div className="footer__outros">
                        <div className="footer__outros-div">
                            <h3>Somos com Orgulho</h3>
                            <div className="footer__outros-imgs">
                                <img
                                    loading="lazy"
                                    src="https://lojausereserva.vtexassets.com/arquivos/empb2x.png"
                                    alt="Icone B"
                                />

                                <img
                                    loading="lazy"
                                    src="https://lojausereserva.vtexassets.com/arquivos/capit2x.png"
                                    alt="Icone Captalismo Consciente"
                                />
                            </div>
                        </div>

                        <div className="footer__outros-div">
                            <h3>Navegue por Marcas</h3>
                            <div className="footer__outros-imgs">
                                <a className="footer__outros-link" href="#">
                                    <img
                                        loading="lazy"
                                        src="https://lojausereserva.vtexassets.com/arquivos/rsvx1.png"
                                        alt="logo reserva"
                                    />
                                </a>

                                <a className="footer__outros-link" href="#">
                                    <img
                                        loading="lazy"
                                        src="https://lojausereserva.vtexassets.com/arquivos/rsvminix1.png"
                                        alt="Logo Reserva Mini"
                                    />
                                </a>

                                <a className="footer__outros-link" href="#">
                                    <img
                                        loading="lazy"
                                        src="https://lojausereserva.vtexassets.com/arquivos/rsvgox1.png"
                                        alt="Logo Reserva GO"
                                    />
                                </a>

                                <a className="footer__outros-link" href="#">
                                    <img
                                        loading="lazy"
                                        src="https://lojausereserva.vtexassets.com/arquivos/rvsx1.png"
                                        alt="Logo Reserva"
                                    />
                                </a>
                            </div>
                        </div>

                        <div className="footer__outros-div">
                            <h3>Certificações</h3>
                            <div className="footer__outros-imgs">
                                <img
                                    loading="lazy"
                                    src="https://lojausereserva.vtexassets.com/arquivos/letse2x.png"
                                    alt="Logo Criptografia"
                                />

                                <img
                                    loading="lazy"
                                    src="https://lojausereserva.vtexassets.com/arquivos/ebit2x.png"
                                    alt="Logo Criptografia"
                                />

                                <img
                                    loading="lazy"
                                    src="https://lojausereserva.vtexassets.com/arquivos/recla2x.png"
                                    alt="Logo Reclame Aqui"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    );
}

export default Footer;
