import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../../context/api";
import { useLoginContext } from "../../context/LoginContext";

function Login() {
    const redirect = useNavigate();
    return (
        <main>
            <section className="conta">
                <div className="conta__container">
                    <h1 className="conta-h1">Fazer Login</h1>

                    <form
                        className="conta__form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            const form = new FormData(e.target);

                            login(Object.fromEntries(form.entries()))
                                .then(() => {
                                    redirect("/");
                                })
                                .catch((err) => {
                                    console.log(err);
                                    document
                                        .getElementById("erro-conta")
                                        .classList.add("conta__erro--show");
                                });
                        }}
                    >
                        <p className="conta__erro" id="erro-conta">
                            Email ou senha invalidos
                        </p>
                        <div className="conta__inputs">
                            <div className="conta__input">
                                <input
                                    name="login"
                                    type="email"
                                    id="login"
                                    required
                                    onFocus={() =>
                                        document
                                            .getElementById("erro-conta")
                                            .classList.remove(
                                                "conta__erro--show"
                                            )
                                    }
                                />
                                <label htmlFor="login">Email</label>
                            </div>

                            <div className="conta__input">
                                <input
                                    name="senha"
                                    type="password"
                                    id="senha"
                                    required
                                    onFocus={() =>
                                        document
                                            .getElementById("erro-conta")
                                            .classList.remove(
                                                "conta__erro--show"
                                            )
                                    }
                                />
                                <label htmlFor="senha">Senha</label>
                            </div>
                        </div>

                        <div className="checkout__finalizar-btn">
                            <button type="submit">Login</button>
                        </div>

                        <Link className="conta__criar" to="/cadastrar">
                            Não tem conta? Criar conta
                        </Link>
                    </form>
                </div>
            </section>
        </main>
    );
}

export default Login;
