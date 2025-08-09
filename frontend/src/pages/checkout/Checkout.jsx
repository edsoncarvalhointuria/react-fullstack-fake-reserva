import { useEffect, useState } from "react";
import { finalizarCompra, getInfos } from "../../context/api";
import { Navigate, Link, useNavigate } from "react-router-dom";
import {
    useCarrinhoContext,
    totalCarrinho,
    qtdCarrinho,
} from "../../context/CarrinhoContext";
import { getSession } from "../../context/session";
import { useLoginContext } from "../../context/LoginContext";
import "./_checkout.scss";

function Checkout() {
    const [infos, setDatas] = useState({ email: "", enderecos: [] });
    const [total, setTotal] = useState(0);
    const { cart, setCarrinho } = useCarrinhoContext();
    const { isLogin } = useLoginContext();
    const qtd = qtdCarrinho(cart);
    const redirect = useNavigate();

    useEffect(() => {
        (async () => {
            setTotal(await totalCarrinho(cart));
            const session = getSession();
            const { data } = await getInfos(session.session);

            if (data.length > 0) {
                const infos = {
                    ...data[0],
                    enderecos: data[0].enderecos,
                };
                setDatas(infos);
            }
        })();
        setDatas(getSession());
    }, []);

    return (
        <>
            {qtd > 0 ? (
                <main className="padding-b">
                    <div className="checkout">
                        <Link
                            to="/carrinho"
                            className="checkout__btn-voltar"
                            type="submit"
                        >
                            Voltar ao carrinho
                        </Link>

                        <div className="checkout__finalizar">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const form = Object.fromEntries(
                                        new FormData(e.target).entries()
                                    );
                                    (async () => {
                                        const { data } = await finalizarCompra({
                                            form,
                                            cart,
                                            session: JSON.parse(
                                                localStorage.getItem("session")
                                            ),
                                        });
                                        if (data) {
                                            setCarrinho({});
                                            redirect("/");
                                        }
                                    })();
                                }}
                            >
                                <div
                                    className={`checkout__email-endereco ${
                                        isLogin
                                            ? "checkout__email-endereco--logado"
                                            : ""
                                    }`}
                                >
                                    <div className="checkout__email-div">
                                        <h2 className="checkout__finalizar-h2">
                                            Identifique-se
                                        </h2>
                                        <div className="checkout__email">
                                            <input
                                                name="email"
                                                type="email"
                                                defaultValue={infos.email}
                                                required
                                            />
                                            <label htmlFor="email">Email</label>
                                        </div>
                                    </div>

                                    <div className="checkout__endereco-div">
                                        <h2 className="checkout__finalizar-h2">
                                            Endereço de entrega
                                        </h2>
                                        <div className="checkout__endereco">
                                            <div className="checkout__endereco-inputs">
                                                <div>
                                                    <input
                                                        name="cep"
                                                        id="cep"
                                                        type="number"
                                                        required
                                                    />
                                                    <label htmlFor="cep">
                                                        CEP
                                                    </label>
                                                </div>

                                                <div>
                                                    <input
                                                        name="endereco"
                                                        id="endereco"
                                                        type="text"
                                                        required
                                                    />
                                                    <label htmlFor="endereco">
                                                        Endereço
                                                    </label>
                                                </div>

                                                <div>
                                                    <input
                                                        name="numero"
                                                        id="numero"
                                                        type="number"
                                                        required
                                                    />
                                                    <label htmlFor="numero">
                                                        Número
                                                    </label>
                                                </div>

                                                <div>
                                                    <input
                                                        name="complemento"
                                                        id="complemento"
                                                        type="text"
                                                    />
                                                    <label htmlFor="complemento">
                                                        Complemento
                                                    </label>
                                                </div>

                                                <div>
                                                    <input
                                                        name="cidade"
                                                        id="cidade"
                                                        type="text"
                                                        required
                                                    />
                                                    <label htmlFor="cidade">
                                                        Cidade
                                                    </label>
                                                </div>

                                                <div>
                                                    <input
                                                        name="uf"
                                                        id="uf"
                                                        type="text"
                                                        required
                                                    />
                                                    <label htmlFor="uf">
                                                        UF
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="checkout__endereco-cadastrado">
                                        {infos.enderecos.map((v, i) => (
                                            <div key={i}>
                                                <input
                                                    type="radio"
                                                    name="enderecoAll"
                                                    value={`endereco-${i}`}
                                                    onChange={() => {
                                                        Object.keys(v).forEach(
                                                            (key) => {
                                                                if (key != "id")
                                                                    document.getElementById(
                                                                        key
                                                                    ).value =
                                                                        v[key];
                                                            }
                                                        );
                                                    }}
                                                />
                                                <label
                                                    htmlFor={`endereco-${i}`}
                                                >
                                                    {Object.keys(v).map(
                                                        (key, ind, array) =>
                                                            `${
                                                                key === "id"
                                                                    ? ""
                                                                    : v[key]
                                                            }
                                                            ${
                                                                key === "id" ||
                                                                ind ===
                                                                    array.length -
                                                                        1 ||
                                                                v[key] === ""
                                                                    ? ""
                                                                    : "-"
                                                            }
                                                            `
                                                    )}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="checkout__pgm-infos">
                                    <div className="checkout__pagamento">
                                        <h2 className="checkout__finalizar-h2">
                                            Formas de pagamento
                                        </h2>

                                        <div>
                                            <input
                                                type="radio"
                                                name="forma_pagamento"
                                                id="cartao_credito"
                                                value="cartao_credito"
                                                required
                                            />
                                            <label htmlFor="cartao_credito">
                                                {" "}
                                                Cartão de Crédito
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                type="radio"
                                                name="forma_pagamento"
                                                value="boleto"
                                                id="boleto"
                                                required
                                            />
                                            <label htmlFor="boleto">
                                                {" "}
                                                Boleto
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                type="radio"
                                                name="forma_pagamento"
                                                value="pix"
                                                id="pix"
                                                required
                                            />
                                            <label htmlFor="pix"> PIX</label>
                                        </div>

                                        <input
                                            type="hidden"
                                            name="total"
                                            value={total}
                                        />
                                    </div>

                                    <div className="checkout__infos">
                                        <h2 className="checkout__finalizar-h2">
                                            Resumo
                                        </h2>

                                        <div className="checkout__finalizar-quantidade">
                                            <p>Quantidade</p>

                                            <p>{qtd}</p>
                                        </div>

                                        <div className="checkout__finalizar-total">
                                            <p>Total</p>

                                            <p>
                                                R${" "}
                                                {total.toLocaleString("pt-BR")}
                                            </p>
                                        </div>

                                        <div className="checkout__finalizar-btn">
                                            <button type="submit">
                                                Finalizar Pedido
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            ) : (
                <Navigate to={"/"} />
            )}
        </>
    );
}

export default Checkout;
