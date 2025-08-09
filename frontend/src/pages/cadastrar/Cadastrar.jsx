import { useNavigate } from "react-router-dom";
import { InputMask } from "@react-input/mask";
import { cadastrar } from "../../context/api";
import "./cadastrar.scss";

function Cadastrar() {
    const redirect = useNavigate();
    return (
        <main>
            <section className="conta">
                <div className="conta__container">
                    <h1 className="conta-h1">Cadastrar</h1>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const form = Object.fromEntries(
                                new FormData(e.target).entries()
                            );
                            let enviar = true;

                            const { cpf, telefone } = form;

                            const $telefone =
                                document.getElementById(
                                    "telefone"
                                ).parentElement;
                            const $cpf =
                                document.getElementById("cpf").parentElement;

                            if (cpf.length != "___.___.___-__".length) {
                                enviar = false;
                                if (!$cpf.getElementsByTagName("p").length) {
                                    const el = document.createElement("p");
                                    el.textContent = "CPF Invalido";
                                    el.style =
                                        "color:red; font-size:1.2rem; padding:0 0.5rem;";

                                    $cpf.appendChild(el);
                                }
                            }
                            if (telefone.length != "(__) _ ____-____".length) {
                                enviar = false;
                                if (
                                    !$telefone.getElementsByTagName("p").length
                                ) {
                                    const el = document.createElement("p");
                                    el.textContent = "Telefone Invalido";
                                    el.style =
                                        "color:red; font-size:1.2rem; padding:0 0.5rem;";

                                    $telefone.appendChild(el);
                                }
                            }
                            if (enviar) {
                                const remove1 = $cpf.querySelector("p");
                                const remove2 = $telefone.querySelector("p");
                                if (remove1) remove1.remove();
                                if (remove1) remove2.remove();
                                cadastrar(form)
                                    .then((data) => redirect("/login"))
                                    .catch((err) => {
                                        const el = document.createElement("p");
                                        el.textContent =
                                            "Esse email já está cadastrado.";
                                        el.id = "erro-email";
                                        el.style =
                                            "color:red; font-weight:bold;";

                                        if (
                                            !e.target.querySelector(
                                                "#erro-email"
                                            )
                                        )
                                            e.target.prepend(el);
                                    });
                            }
                        }}
                        className="conta__form"
                    >
                        <div className="conta__inputs">
                            <div className="conta__input">
                                <input
                                    name="email"
                                    type="email"
                                    id="email"
                                    required
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="conta__input">
                                <input
                                    name="senha"
                                    type="password"
                                    id="senha"
                                    required
                                />
                                <label htmlFor="senha">Senha</label>
                            </div>

                            <div className="conta__input">
                                <input
                                    name="nome"
                                    type="text"
                                    id="nome"
                                    min={2}
                                    required
                                />
                                <label htmlFor="nome">Nome</label>
                            </div>

                            <div className="conta__input">
                                <input
                                    name="sobrenome"
                                    type="text"
                                    id="text"
                                    min={2}
                                    required
                                />
                                <label htmlFor="sobrenome">Sobrenome</label>
                            </div>

                            <div className="conta__input">
                                <InputMask
                                    name="cpf"
                                    type="text"
                                    id="cpf"
                                    mask="___.___.___-__"
                                    replacement={{ _: /\d/ }}
                                    required
                                />
                                <label htmlFor="cpf">CPF</label>
                            </div>

                            <div className="conta__input">
                                <input
                                    name="genero"
                                    type="text"
                                    id="genero"
                                    required
                                />
                                <label htmlFor="genero">Gênero</label>
                            </div>

                            <div className="conta__input">
                                <input
                                    name="data_nascimento"
                                    type="date"
                                    id="data_nascimento"
                                    required
                                />
                                <label htmlFor="data_nascimento">
                                    Data de Nascimento
                                </label>
                            </div>

                            <div className="conta__input">
                                <InputMask
                                    name="telefone"
                                    id="telefone"
                                    mask="(__) _ ____-____"
                                    minLength="30"
                                    inputMode="tel"
                                    replacement={{ _: /\d/ }}
                                    type="text"
                                    required
                                />
                                <label htmlFor="telefone">Telefone</label>
                            </div>
                        </div>

                        <div className="checkout__finalizar-btn">
                            <button type="submit">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default Cadastrar;
