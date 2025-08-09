import Filtro from "../../layouts/filtro/Filtro";
import Produto from "../../layouts/produto/Produto";
import { useEffect, useState, useRef } from "react";
import { getProducts } from "../../context/api";
import { useSearchParams, useParams } from "react-router-dom";
import "./loja.scss";

export const listaProdutos = [
    {
        id: 0,
        nome: "Camiseta Regular Mescla Touch",
        img: "https://lojausereserva.vtexassets.com/arquivos/ids/8762816/0087562002_01.jpg?v=638618566903900000",
        hoverImg:
            "https://lojausereserva.vtexassets.com/arquivos/ids/8762819-2400-auto?v=638618566916770000&width=2400&height=auto&aspect=true",
        tamanhos: ["P", "M", "G", "GG", "GGG"],
        cores: [
            {
                value: "bege",
                cor: "produto__informacoes-cor--bege",
                imgs: [
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8762816-1200-auto?v=638618566903900000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8762817-1200-auto?v=638618566908200000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8762818-1200-auto?v=638618566912100000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8762819-1200-auto?v=638618566916770000&width=1200&height=auto&aspect=true",
                ],
            },
            {
                value: "azul",
                cor: "produto__informacoes-cor--azul",
                imgs: [
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8784468-1200-auto?v=638620914759030000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8784469-1200-auto?v=638620914810000000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8784470-1200-auto?v=638620914824900000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8784471-1200-auto?v=638620914828670000&width=1200&height=auto&aspect=true",
                ],
            },
        ],
        preco: {
            antigo: 269.0,
            novo: 242.1,
            semJuros: 4,
        },
        cashback: "10%",
        categoria: "Camisas",
    },
    {
        id: 1,
        nome: "Camiseta Regular Mescla Touch",
        img: "https://lojausereserva.vtexassets.com/arquivos/ids/8762817-2400-auto?v=638618566908200000&width=2400&height=auto&aspect=true",
        hoverImg:
            "https://lojausereserva.vtexassets.com/arquivos/ids/8762819-2400-auto?v=638618566916770000&width=2400&height=auto&aspect=true",
        tamanhos: ["P", "M", "G", "GG", "GGG"],
        cores: [
            {
                value: "bege",
                cor: "produto__informacoes-cor--bege",
                imgs: [
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8762816-1200-auto?v=638618566903900000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8762817-1200-auto?v=638618566908200000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8762818-1200-auto?v=638618566912100000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8762819-1200-auto?v=638618566916770000&width=1200&height=auto&aspect=true",
                ],
            },
        ],
        preco: {
            antigo: 269.0,
            novo: 242.1,
            semJuros: 4,
        },
        cashback: "10%",
        categoria: "Camisas",
    },
    {
        id: 2,
        nome: "Camiseta Regular Mescla Touch",
        img: "https://lojausereserva.vtexassets.com/arquivos/ids/8762818-2400-auto?v=638618566912100000&width=2400&height=auto&aspect=true",
        hoverImg:
            "https://lojausereserva.vtexassets.com/arquivos/ids/8762819-2400-auto?v=638618566916770000&width=2400&height=auto&aspect=true",
        tamanhos: ["P", "M", "G", "GG", "GGG"],
        cores: [
            {
                value: "bege",
                cor: "produto__informacoes-cor--bege",
                imgs: [
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8762816-1200-auto?v=638618566903900000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8762817-1200-auto?v=638618566908200000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8762818-1200-auto?v=638618566912100000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8762819-1200-auto?v=638618566916770000&width=1200&height=auto&aspect=true",
                ],
            },
        ],
        preco: {
            antigo: 269.0,
            novo: 242.1,
            semJuros: 4,
        },
        cashback: "10%",
        categoria: "Camisas",
    },
    {
        id: 3,
        nome: "POLO PIQUET CLASS RSV",
        img: "https://lojausereserva.vtexassets.com/arquivos/ids/8762870/0087562930_02.jpg?v=638618567341030000",
        hoverImg:
            "https://lojausereserva.vtexassets.com/arquivos/ids/8762872-2400-auto?v=638618567347470000&width=2400&height=auto&aspect=true",
        tamanhos: ["P", "G", "GG", "GGG"],
        cores: [
            {
                value: "salmao",
                cor: "produto__informacoes-cor--salmao",
                imgs: [
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8762869-1200-auto?v=638618567336370000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8762870-1200-auto?v=638618567341030000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8762871-1200-auto?v=638618567344800000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8762872-1200-auto?v=638618567347470000&width=1200&height=auto&aspect=true",
                ],
            },
        ],
        preco: {
            antigo: 349.0,
            novo: 208.9,
            semJuros: 3,
        },
        cashback: "10%",
        categoria: "Camisas",
    },
    {
        id: 4,
        nome: "POLO PIQUET CLASS RSV",
        img: "https://lojausereserva.vtexassets.com/arquivos/ids/8762871-2400-auto?v=638618567344800000&width=2400&height=auto&aspect=true",
        hoverImg:
            "https://lojausereserva.vtexassets.com/arquivos/ids/8762872-2400-auto?v=638618567347470000&width=2400&height=auto&aspect=true",
        tamanhos: ["P", "G", "GG", "GGG"],
        cores: [
            {
                value: "salmao",
                cor: "produto__informacoes-cor--salmao",
                imgs: [
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8762869-1200-auto?v=638618567336370000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8762870-1200-auto?v=638618567341030000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8762871-1200-auto?v=638618567344800000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8762872-1200-auto?v=638618567347470000&width=1200&height=auto&aspect=true",
                ],
            },
        ],
        preco: {
            antigo: 349.0,
            novo: 208.9,
            semJuros: 3,
        },
        cashback: "10%",
        categoria: "Camisas",
    },
    {
        id: 5,
        nome: "POLO PIQUET CLASS RSV",
        img: "https://lojausereserva.vtexassets.com/arquivos/ids/8762869-2400-auto?v=638618567336370000&width=2400&height=auto&aspect=true",
        hoverImg:
            "https://lojausereserva.vtexassets.com/arquivos/ids/8762872-2400-auto?v=638618567347470000&width=2400&height=auto&aspect=true",
        tamanhos: ["P", "G", "GG", "GGG"],
        cores: [
            {
                value: "salmao",
                cor: "produto__informacoes-cor--salmao",
                imgs: [
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8762869-1200-auto?v=638618567336370000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8762870-1200-auto?v=638618567341030000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8762871-1200-auto?v=638618567344800000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8762872-1200-auto?v=638618567347470000&width=1200&height=auto&aspect=true",
                ],
            },
        ],
        preco: {
            antigo: 349.0,
            novo: 208.9,
            semJuros: 3,
        },
        cashback: "10%",
        categoria: "Camisas",
    },
    {
        id: 6,
        nome: "Bermuda Casual Rio",
        img: "https://lojausereserva.vtexassets.com/arquivos/ids/8760410/0087127933_02.jpg?v=638618548854030000",
        hoverImg:
            "https://lojausereserva.vtexassets.com/arquivos/ids/8760412-2400-auto?v=638618548859500000&width=2400&height=auto&aspect=true",
        tamanhos: ["38", "40", "42", "44", "46", "3G"],
        cores: [
            {
                value: "azul",
                cor: "produto__informacoes-cor--azul",
                imgs: [
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8760409-1200-auto?v=638618548849970000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8760410-1200-auto?v=638618548854030000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8760411-1200-auto?v=638618548856700000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8760412-1200-auto?v=638618548859500000&width=1200&height=auto&aspect=true",
                ],
            },
            {
                value: "militar",
                cor: "produto__informacoes-cor--militar",
                imgs: [
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8766249-1200-auto?v=638618594358900000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8766250-1200-auto?v=638618594362800000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8766251-1200-auto?v=638618594366970000&width=1200&height=auto&aspect=true",
                    "https://lojausereserva.vtexassets.com/arquivos/ids/8766252-1200-auto?v=638618594370100000&width=1200&height=auto&aspect=true",
                ],
            },
        ],
        preco: {
            antigo: 349.0,
            novo: 208.9,
            semJuros: 3,
        },
        cashback: "10%",
        categoria: "Bermudas",
    },
];

export const listaCashback = {
    NOVOUSERFAKE: 0.5,
    TESTE777: 0.1,
};

function Loja() {
    const [params, setParams] = useSearchParams({});
    const [produtos, setProduto] = useState([]);
    const { colecao, categoria, opcao } = useParams();
    const prods = useRef([]);

    useEffect(() => {
        document.title = "FakeReserva | Loja";
    }, []);

    useEffect(() => {
        getProducts(colecao, categoria, opcao)
            .then((value) => {
                setProduto(value.data);
                prods.current = value.data;
            })
            .catch((err) => console.log("erro"));

        window.scroll({ top: 10, behavior: "smooth" });
    }, [colecao, categoria, opcao]);

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
                                            src="./arrows-vertical-svgrepo-com.svg"
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

export default Loja;
