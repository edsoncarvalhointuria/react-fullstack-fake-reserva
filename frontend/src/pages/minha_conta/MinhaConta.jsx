import { useEffect } from "react";
import { InputMask } from "@react-input/mask";
import { useLoginContext } from "../../context/LoginContext";
import { getDados } from "../../context/api";
import { atualizarDados } from "../../context/api";

function MinhaConta() {
    const { user, setUser } = useLoginContext();
    useEffect(() => {
        (async () => {
            const { data } = await getDados();
            if (data[0]) {
                Object.keys(data[0]).forEach((v) => {
                    if (v === "data_nascimento")
                        document.getElementById(v).value = new Date(data[0][v])
                            .toISOString()
                            .split("T")[0];
                    else document.getElementById(v).value = data[0][v];
                });
            }
        })();
    }, [user]);

    return (
        <main>
            <section className="conta">
                <div className="conta__container">
                    <h1 className="conta-h1">Minha Conta</h1>
                    <div
                        className="conta__atualizacao"
                        id="atualizacao-sucesso"
                    >
                        <h2>Dados Atualizados</h2>
                    </div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            let enviar = true;
                            const form = Object.fromEntries(
                                new FormData(e.target).entries()
                            );

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

                            if (enviar)
                                atualizarDados(form)
                                    .then((data) => {
                                        setUser(data.data);
                                        const el = document.getElementById(
                                            "atualizacao-sucesso"
                                        );
                                        el.style = "display:block";
                                        setTimeout(
                                            () =>
                                                el.classList.add(
                                                    "conta__atualizacao--abrir"
                                                ),
                                            1
                                        );

                                        setTimeout(() => {
                                            el.classList.remove(
                                                "conta__atualizacao--abrir"
                                            );

                                            setTimeout(
                                                () => (el.style = ""),
                                                550
                                            );
                                        }, 3000);
                                    })
                                    .catch((err) => console.log(err));
                        }}
                        className="conta__form"
                    >
                        <div className="conta__inputs">
                            <div className="conta__input conta__input--email">
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
                                    id="sobrenome"
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
                            <button type="submit">Atualizar Dados</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default MinhaConta;
