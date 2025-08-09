import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCarrinhoContext } from "../../context/CarrinhoContext";
import { getItem, getItensSemelhantes } from "../../context/api";
import { listaProdutos } from "../loja/Loja";
import ItemImg from "./ItemImg";
import "./_item.scss";
import Produto from "../../layouts/produto/Produto";
let prod;
let itensSemlhantes;

function Item() {
    const { id } = useParams();
    const redirect = useNavigate();
    const { addProduto } = useCarrinhoContext();

    const [opcoes, setOpcao] = useState({});

    // const imgs = [
    //     "https://lojausereserva.vtexassets.com/arquivos/ids/7663565-800-auto?v=638199541371400000&width=800&height=auto&aspect=true",
    //     "https://lojausereserva.vtexassets.com/arquivos/ids/7663566-800-auto?v=638199541387030000&width=800&height=auto&aspect=true",
    //     "https://lojausereserva.vtexassets.com/arquivos/ids/7663567-800-auto?v=638199541402370000&width=800&height=auto&aspect=true",
    //     "https://lojausereserva.vtexassets.com/arquivos/ids/7663568-800-auto?v=638199541417270000&width=800&height=auto&aspect=true",
    //     "https://lojausereserva.vtexassets.com/arquivos/ids/7663569-800-auto?v=638199541432000000&width=800&height=auto&aspect=true",
    //     "https://lojausereserva.vtexassets.com/arquivos/ids/7663570-800-auto?v=638199541445900000&width=800&height=auto&aspect=true",
    // ];

    // useEffect(() => {
    //     (async () => {
    //         await getItem(id)
    //             .then((res) => (prod = res.data[0]))
    //             .catch((err) => console.log(err));

    //         getItensSemelhantes((prod.categorias)[0])
    //             .then((res) => (itensSemlhantes = res.data))
    //             .catch((err) => console.log(err));

    //         setOpcao({
    //             cor: (prod.cores)[0].cor,
    //             tamanho: (prod.tamanhos)[0],
    //         });
    //     })();
    // }, []);

    useEffect(() => {
        window.scroll({ top: 0, behavior: "smooth" });
        (async () => {
            await getItem(id)
                .then((res) => (prod = res.data[0]))
                .catch((err) => console.log(err));

            await getItensSemelhantes(prod.colecao_slug, id)
                .then((res) => (itensSemlhantes = res.data))
                .catch((err) => console.log(err));

            setOpcao({
                cor: prod.cores[0].cor,
                tamanho: prod.tamanhos[0],
            });
        })();
    }, [id]);

    return (
        <>
            {prod ? (
                <main className="padding-b gap margin-t">
                    {prod ? (
                        <section className="item">
                            <div className="item__container">
                                <div className="item__imgs">
                                    <div className="item__imgs-trilho">
                                        {prod?.cores
                                            .find((v) => v.cor === opcoes.cor)
                                            ?.imgs?.map((v, i) => (
                                                <ItemImg link={v} key={i} />
                                            ))}
                                    </div>

                                    {prod.cores
                                        .find((v) => v?.cor === opcoes?.cor)
                                        ?.imgs?.map((v, i) => (
                                            <div
                                                className={`item__botao-trilho ${
                                                    i === 0
                                                        ? "item__botao-trilho--selecionado"
                                                        : ""
                                                }`}
                                                key={i}
                                                onClick={(e) => {
                                                    e.currentTarget.parentElement.firstElementChild.style = `transform: translateX(-${
                                                        i * 100
                                                    }%)`;

                                                    const select =
                                                        "item__botao-trilho--selecionado";
                                                    document
                                                        .querySelector(
                                                            "." + select
                                                        )
                                                        .classList.remove(
                                                            select
                                                        );
                                                    e.currentTarget.classList.add(
                                                        select
                                                    );
                                                }}
                                            ></div>
                                        ))}
                                </div>

                                <div className="item__infos">
                                    <p className="item__caminho">
                                        <Link
                                            to="/"
                                            className="item__caminho-link"
                                        >
                                            Home
                                        </Link>
                                        {">"}
                                        <Link
                                            to="/"
                                            className="item__caminho-link"
                                        >
                                            Reversa
                                        </Link>
                                        {">"}
                                        <Link
                                            to={`/loja/${prod?.colecao_slug}`}
                                            className="item__caminho-link"
                                        >
                                            {prod?.colecao}
                                        </Link>
                                        {">"}
                                        <span>{prod.nome}</span>
                                    </p>

                                    <h1 className="item__nome">{prod.nome}</h1>

                                    <div className="item__info-preco">
                                        <button
                                            type="submit"
                                            className="item__botao"
                                        >
                                            <div></div>
                                        </button>

                                        <div className="item__preco">
                                            <p className="item__preco-titulo">
                                                Preço normal
                                            </p>

                                            <div className="item__preco-div">
                                                <p className="item__preco-ant">
                                                    R${" "}
                                                    {
                                                        String(
                                                            prod?.preco_antigo
                                                        ).split(".")[0]
                                                    }
                                                    <span>
                                                        ,
                                                        {
                                                            prod?.preco_antigo
                                                                .toFixed(2)
                                                                .split(".")[1]
                                                        }
                                                    </span>
                                                </p>
                                                <div className="item__preco-barra"></div>
                                                <p className="item__preco-nov">
                                                    R${" "}
                                                    {
                                                        String(
                                                            prod.preco
                                                        ).split(".")[0]
                                                    }
                                                    <span>
                                                        ,{" "}
                                                        {
                                                            prod.preco
                                                                .toFixed(2)
                                                                .split(".")[1]
                                                        }
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="item__cashback">
                                        <span>Ganhe {prod?.cashback}%</span> de
                                        Cashback
                                    </div>

                                    <div className="item__lista">
                                        <p className="item__titulo">
                                            Cor:{" "}
                                            <span className="item__titulo-cor">
                                                {opcoes.cor}
                                            </span>
                                        </p>
                                        <ul className="item__cores">
                                            {prod?.cores.map((v, i) => {
                                                return (
                                                    <li key={i}>
                                                        <input
                                                            type="radio"
                                                            name="cores"
                                                            value={v.cor}
                                                            id={v.cor}
                                                            className="item__input-cor"
                                                            defaultChecked={
                                                                i === 0
                                                            }
                                                            onChange={(e) =>
                                                                setOpcao({
                                                                    ...opcoes,
                                                                    cor: e
                                                                        .currentTarget
                                                                        .value,
                                                                })
                                                            }
                                                        />
                                                        <div
                                                            className={`item__cor`}
                                                            style={{
                                                                backgroundColor:
                                                                    v.hex,
                                                            }}
                                                        ></div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>

                                    <div className="item__lista">
                                        <p className="item__titulo">
                                            Tamanho: {opcoes.tamanho}
                                        </p>
                                        <ul className="item__tamanhos">
                                            {(prod?.tamanhos).map((v, i) => (
                                                <li key={i}>
                                                    <input
                                                        type="radio"
                                                        name="tamanhos"
                                                        value={v}
                                                        id={v}
                                                        className="item__input-tamanho"
                                                        defaultChecked={i === 0}
                                                        onChange={(e) =>
                                                            setOpcao({
                                                                ...opcoes,
                                                                tamanho:
                                                                    e
                                                                        .currentTarget
                                                                        .value,
                                                            })
                                                        }
                                                    />
                                                    <div className="item__tamanho">
                                                        {v}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <button
                                        type="submit"
                                        className="item__add"
                                        onClick={(e) => {
                                            addProduto(
                                                id,
                                                opcoes.tamanho,
                                                opcoes.cor
                                            );
                                            redirect("/carrinho");
                                        }}
                                    >
                                        Adicionar à Sacola
                                    </button>

                                    <p className="item__subtitulo">
                                        Consulte o prazo de entrega ou
                                        <span>
                                            {" "}
                                            retire em loja sem pagar frete{" "}
                                        </span>
                                    </p>

                                    <div className="item__descricao item__descricao--abrir">
                                        <div
                                            className="item__descricao-titulo item__descricao-titulo--topo"
                                            onClick={(e) =>
                                                e.currentTarget.parentElement.classList.toggle(
                                                    "item__descricao--abrir"
                                                )
                                            }
                                        >
                                            Descrição do produto
                                        </div>
                                        <div className="item__descricao-desc">
                                            <p className="item__descricao-info">
                                                O Mini Colete Jeans é uma peça
                                                sofisticada e estruturada, ideal
                                                para mulheres elegantes e
                                                modernas. Feito em jeans, é
                                                confortável e pode ser usado com
                                                blazer sobrepondo camisetas.
                                                Trazendo elegância, conforto e
                                                modernidade. Mini Colete
                                                Feminina Reversa produzido
                                                eticamente no Brasil. Comprando
                                                esta peça, você viabiliza cinco
                                                pratos de comida através do
                                                nosso programa 1P5P. A modelo
                                                mede 1,77 m de altura e 74 cm de
                                                busto.
                                            </p>

                                            <div className="item__descricao-comp">
                                                <p className="item__descricao-titulo">
                                                    Composição
                                                </p>
                                                100% Algodão
                                            </div>
                                            <div>
                                                <p className="item__descricao-titulo">
                                                    CÓDIGO DO PRODUTO
                                                </p>
                                                Ref: 0074390330
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ) : (
                        <></>
                    )}

                    <section className="itens-similares">
                        {itensSemlhantes ? (
                            <div className="itens-similares__container">
                                <h2 className="itens-similares__p">
                                    {itensSemlhantes.length
                                        ? "Gostou desse produto? Veja itens similares"
                                        : ""}
                                </h2>
                                <div className="itens-similares__produtos">
                                    {itensSemlhantes?.map((v) => (
                                        <Produto key={v.id} {...v} />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                    </section>
                </main>
            ) : (
                <div className="carrinho__vazio">
                    <h1 className="carrinho__vazio-h1">Produto Indisponivel</h1>

                    <p className="carrinho__vazio-info">
                        Para continuar comprando, navegue pelas categorias do
                        site ou faça uma busca pelo seu produto.
                    </p>
                    <Link to={"/"} className="carrinho__vazio-btn">
                        Escolher Produtos
                    </Link>
                </div>
            )}
        </>
    );
}

export default Item;
