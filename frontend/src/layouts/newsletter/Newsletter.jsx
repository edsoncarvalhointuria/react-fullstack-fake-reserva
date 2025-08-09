import "./newsletter.scss";

function Newsletter() {
    return (
        <aside className="newsletter">
            <div className="newsletter__container">
                <div className="newsletter__form">
                    <div className="newsletter__form-titulo-container">
                        <div className="newsletter__form-titulo">
                            <img
                                loading="lazy"
                                src="https://lojausereserva.vtexassets.com/arquivos/new_logo_header.svg"
                                alt="Logo Reserva"
                            />
                            <span>Assine nossa newsletter</span>
                        </div>
                        <p>
                            Cadastre-se e receba promoções exclusivas e saiba
                            tudo antes de todo mundo!
                        </p>
                    </div>

                    <form
                        className="newsletter__form-formulario"
                        action=""
                        method="post"
                    >
                        <input
                            type="email"
                            name="email"
                            placeholder="Digite seu e-mail"
                            required
                            className="newsletter__form-input"
                        />
                        <input
                            type="text"
                            name="name"
                            placeholder="Digite seu nome"
                            required
                            className="newsletter__form-input"
                        />
                        <button
                            className="newsletter__form-botao"
                            type="submit"
                        >
                            CADASTRAR
                        </button>
                    </form>
                </div>

                <div className="newsletter__app">
                    <div className="newsletter__app-titulo">
                        <span> Baixe o app</span>
                        <p>
                            A Reserva todinha na palma da sua mão, baixe agora
                            mesmo na loja do seu smartphone.
                        </p>
                    </div>
                    <div className="newsletter__app-imagens">
                        <a href="#">
                            <img
                                loading="lazy"
                                src="https://lojausereserva.vtexassets.com/arquivos/playstorex2.png"
                                alt="Imagem Google Play"
                            />
                        </a>
                        <a href="#">
                            <img
                                loading="lazy"
                                src="https://lojausereserva.vtexassets.com/arquivos/appstorex2.png"
                                alt="Imagem PlayStore"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Newsletter;
