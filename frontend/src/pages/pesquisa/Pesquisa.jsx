import Filtro from "../../layouts/filtro/Filtro";
import Produto from "../../layouts/produto/Produto";
import { useEffect, useState, useRef } from "react";
import { getPesquisa } from "../../context/api";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Pesquisa() {
    const [params, setParams] = useSearchParams({});
    const redirect = useNavigate();
    const [produtos, setProduto] = useState([]);
    const prods = useRef([]);

    useEffect(() => {
        if (params.get("pesquisa"))
            getPesquisa(params.get("pesquisa"))
                .then((value) => {
                    document.title = `FakeReserva | Resultados: ${params
                        .get("pesquisa")
                        .slice(0, 20)}`;
                    setProduto(value.data);
                    prods.current = value.data;
                })
                .catch((err) => console.log("erro"));
        else redirect("/");
        window.scroll({ top: 10, behavior: "smooth" });
    }, [params]);

    useEffect(() => {
        let lista = [...prods.current];
        if (params.size) {
            //Filtrando Preços
            if (params.get("to")) {
                lista = lista?.filter((v) => v.preco >= params.get("from"));
                lista = lista?.filter((v) => v.preco <= params.get("to"));
            }

            if (params.get("categoria"))
                lista = lista.filter((v) =>
                    v?.categorias.includes(params.get("categoria"))
                );

            //Filtrando Cores
            if (params.get("cor"))
                [...lista].forEach((v) => {
                    let remove = true;
                    for (let value of params.getAll("cor")) {
                        if (v?.cores.find((va) => va.cor === value)) {
                            remove = false;
                            break;
                        }
                    }
                    if (remove) lista.splice(lista.indexOf(v), 1);
                });

            //Filtrando Tamanho
            if (params.get("tamanho"))
                [...lista].forEach((v) => {
                    let remove = true;
                    for (let value of params.getAll("tamanho")) {
                        if (v?.tamanhos.find((va) => va === value)) {
                            remove = false;
                            break;
                        }
                    }
                    if (remove) lista.splice(lista.indexOf(v), 1);
                });

            //Filtrando Ordem
            if (params.get("order")) {
                const select = document.querySelector("select");

                switch (params.get("order")) {
                    case "maior-preco":
                        setProduto(lista.sort((b, a) => a.preco - b.preco));
                        select.value = "maior-preco";
                        break;
                    case "menor-preco":
                        setProduto(lista.sort((a, b) => a.preco - b.preco));
                        select.value = "menor-preco";
                        break;
                    default:
                        select.value = "relevancia";
                    // setProduto(lista.sort((b, a) => a.preco - b.preco));
                }
            }
        }
        setProduto(lista);
    }, [params, prods.current]);

    return (
        <main className="padding-b">
            <div className="loja">
                <div className="loja__container">
                    <Filtro
                        setParams={setParams}
                        params={params}
                        prods={produtos}
                        setProdutos={setProduto}
                    />

                    <div className="produtos">
                        <div className="produtos__cabecalho">
                            <div className="produtos__filtro">
                                <div className="produtos__titulo">
                                    <div className="produtos__imagem">
                                        <img
                                            src="/arrows-vertical-svgrepo-com.svg"
                                            alt="Icone Setas"
                                        />
                                    </div>
                                    <p className="produtos__p">Ordernar por:</p>
                                </div>
                                <div className="produtos__div-mobile">
                                    <button
                                        className="produtos__botao"
                                        onClick={() =>
                                            document.body.classList.add(
                                                "filtro-aberto"
                                            )
                                        }
                                    >
                                        Filtrar
                                    </button>

                                    <select
                                        className="produtos__select"
                                        onChange={(e) => {
                                            switch (e.currentTarget.value) {
                                                case "maior-preco":
                                                    params.delete("order");
                                                    params.append(
                                                        "order",
                                                        e.currentTarget.value
                                                    );
                                                    setParams(params);
                                                    break;
                                                case "menor-preco":
                                                    params.delete("order");
                                                    params.append(
                                                        "order",
                                                        e.currentTarget.value
                                                    );
                                                    setParams(params);
                                                    break;
                                                default:
                                                    params.delete("order");
                                                    params.append(
                                                        "order",
                                                        e.currentTarget.value
                                                    );
                                                    setParams(params);
                                            }
                                        }}
                                    >
                                        <option value="relevancia">
                                            Relevância
                                        </option>
                                        <option value="maior-preco">
                                            Maior Preço
                                        </option>
                                        <option value="menor-preco">
                                            Menor Preço
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <p className="produtos__subtitulo">
                                Mostrando <span>{produtos.length}</span> itens
                            </p>
                        </div>
                        {produtos.length > 0 ? (
                            <div className="produtos__grade">
                                {produtos.map((obj, i) => {
                                    return (
                                        <Produto
                                            {...obj}
                                            key={`${i}-${obj.id}`}
                                        />
                                    );
                                })}
                            </div>
                        ) : (
                            <h2>Nenhum Produto encontrado</h2>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Pesquisa;
