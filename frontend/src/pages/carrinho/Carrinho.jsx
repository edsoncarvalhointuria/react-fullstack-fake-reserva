import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CarrinhoPacote from "./CarrinhoPacote";
import {
    useCarrinhoContext,
    qtdCarrinho,
    totalCarrinho,
    cashbackCarrinho,
} from "../../context/CarrinhoContext";
import { setNewCupom } from "../../context/api";
import { listaCashback } from "../loja/Loja";
import "./_carrinho.scss";

function Carrinho() {
    let index = -1;
    const { cart } = useCarrinhoContext();
    const [isCupom, setCupom] = useState(null);
    const [valores, setValores] = useState({ total: 0, cashback: 0 });
    const redirect = useNavigate();
    const qtd = qtdCarrinho(cart);

    useEffect(() => {
        (async () => {
            const t = isCupom ? isCupom : 0;

            setValores({
                cashback: await cashbackCarrinho(cart),
                total: (await totalCarrinho(cart)) * (1 - t),
            });
        })();
    }, [cart, isCupom]);

    return (
        <main className="padding-b">
            <div className="carrinho">
                {qtd > 0 ? (
                    <>
                        <div className="carrinho__infos">
                            <div className="carrinho__desc">
                                <h1 className="carrinho__h1">Sacola</h1>

                                <p className="carrinho__info">
                                    Agora produtos em estoque você retira em
                                    loja em até 4 horas e ainda ganha{" "}
                                    <span>10% OFF em uma nova compra</span> no
                                    ato da retirada.
                                </p>

                                <strong className="carrinho__info--bold">
                                    Selecione na etapa de entrega.
                                </strong>
                            </div>

                            <table className="carrinho__table">
                                <thead className="carrinho__thead">
                                    <tr>
                                        <th className="carrinho__table-titulo">
                                            Produtos
                                        </th>

                                        <th className="carrinho__table-titulo">
                                            Entrega
                                        </th>

                                        <th className="carrinho__table-titulo">
                                            Valor
                                        </th>

                                        <th className="carrinho__table-titulo">
                                            Quantidade
                                        </th>
                                        <th className="carrinho__table-titulo">
                                            Total
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="carrinho__table-body">
                                    {Object.keys(cart).map((v) => {
                                        if (cart[v].length > 0) {
                                            index += 1;
                                            return (
                                                <CarrinhoPacote
                                                    id={v}
                                                    ind={index}
                                                    key={index}
                                                />
                                            );
                                        }
                                    })}
                                </tbody>
                            </table>
                        </div>

                        <div className="carrinho__finalizar">
                            <h2 className="carrinho__finalizar-h2">
                                Receba em casa ou <span> retire em loja</span>
                            </h2>
                            <form
                                className="carrinho__finalizar-form"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    const cupom = new FormData(e.target)
                                        .get("cupom")
                                        .trim();

                                    setNewCupom(cupom)
                                        .then((data) => {
                                            if (data.data) {
                                                e.target.classList.remove(
                                                    "carrinho__finalizar-form-cupom-erro"
                                                );
                                                setCupom(data.data.desconto);
                                            } else {
                                                e.target.classList.add(
                                                    "carrinho__finalizar-form-cupom-erro"
                                                );
                                            }
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                            e.target.classList.add(
                                                "carrinho__finalizar-form-cupom-erro"
                                            );
                                        });
                                }}
                            >
                                <input
                                    type="text"
                                    name="cupom"
                                    id="cupom"
                                    placeholder="Insira o cupom"
                                />
                                <button type="submit">VALIDAR</button>
                            </form>

                            <div className="carrinho__finalizar-quantidade">
                                <p>Quantidade</p>

                                <p>{qtd}</p>
                            </div>

                            <div className="carrinho__finalizar-total">
                                <p>Total</p>

                                <p>
                                    {valores.total.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </p>
                            </div>

                            <div className="carrinho__finalizar-cashback">
                                <p>Cashback gerado para a proxima compra</p>

                                <span>
                                    {valores.cashback.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </span>
                            </div>

                            <div className="carrinho__finalizar-btn">
                                <button onClick={() => redirect("/checkout")}>
                                    Finalizar
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="carrinho__vazio">
                        <h1 className="carrinho__vazio-h1">
                            Seu carrinho está vazio
                        </h1>

                        <p className="carrinho__vazio-info">
                            Para continuar comprando, navegue pelas categorias
                            do site ou faça uma busca pelo seu produto.
                        </p>
                        <Link to={"/"} className="carrinho__vazio-btn">
                            Escolher Produtos
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}

export default Carrinho;
