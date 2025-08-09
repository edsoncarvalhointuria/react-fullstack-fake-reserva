import { Link } from "react-router-dom";
import { useCarrinhoContext } from "../../context/CarrinhoContext";
import "./_produto.scss";

function Produto({
    id,
    nome,
    hover_img,
    img,
    preco,
    preco_antigo,
    sem_juros,
    cashback,
    tamanhos,
    cores,
}) {
    const { addProduto } = useCarrinhoContext();
    return (
        <div className="produto" id={`${id}-prod-item`}>
            <div className="produto__imagem">
                <Link to={`/produtos/item/${id}`}>
                    <img loading="lazy" src={img} alt={nome} />
                    <img loading="lazy" src={hover_img} alt={nome} />
                </Link>
                <div className="produto__compra-rapida">
                    <div className="produto__compra-rapida--label">
                        <span>+</span> Compra Rápida
                    </div>

                    <div className="produto__compra-rapida--infos">
                        <ul className="produto__compra-rapida--lista">
                            {tamanhos.map((v, i) => {
                                return (
                                    <li
                                        className="produto__compra-rapida-tamanho"
                                        key={i}
                                    >
                                        <input
                                            type="checkbox"
                                            name="compra-rapida"
                                            value={v}
                                            id={`${id}-${v}`}
                                            onClick={(e) => {
                                                const $prod =
                                                    document.getElementById(
                                                        `${id}-prod-item`
                                                    );
                                                const cor =
                                                    $prod.querySelector(
                                                        ".produto__informacoes-lista input:checked"
                                                    )?.value ??
                                                    $prod.querySelector(
                                                        ".produto__informacoes-lista input"
                                                    )?.value;
                                                addProduto(id, v, cor);
                                            }}
                                        />
                                        <div>{v.toUpperCase()}</div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="produto__informacoes">
                <ul className="produto__informacoes-lista">
                    {cores.map((obj, i) => {
                        return (
                            <li key={i}>
                                <input
                                    type="radio"
                                    value={obj.cor}
                                    name={`cor-item-${id}`}
                                    id={`${obj.cor}-${id}`}
                                    defaultChecked={i === 0}
                                    className="produto__informacoes-cor produto__informacoes-cor--absolute"
                                />
                                <div
                                    className={"produto__informacoes-cor"}
                                    style={{ backgroundColor: obj.hex }}
                                ></div>
                            </li>
                        );
                    })}
                </ul>

                <Link
                    to={`/produtos/item/${id}`}
                    className="produto__informacoes-titulo"
                >
                    {nome}
                </Link>

                <Link
                    to={`/produtos/item/${id}`}
                    className="produto__informacoes-pgmt"
                >
                    <div className="produto__informacoes-preco">
                        <p className="produto__informacoes-preco--antigo">
                            R$ {String(preco_antigo).split(".")[0]},
                            <span>{preco_antigo.toFixed(2).split(".")[1]}</span>
                        </p>

                        <p className="produto__informacoes-preco--novo">
                            R$ {String(preco).split(".")[0]},
                            <span>{preco.toFixed(2).split(".")[1]}</span>
                        </p>
                    </div>

                    <p className="produto__informacoes-parcela">
                        {sem_juros}x R${" "}
                        {String(preco / sem_juros).split(".")[0]},
                        <span>
                            {(preco / sem_juros).toFixed(2).split(".")[1]}
                        </span>
                    </p>
                </Link>
                <div className="produto__informacoes-cashback">
                    <span className="produto__informacoes-cashback--negrito">
                        Ganhe {cashback}%
                    </span>{" "}
                    de Cashback
                </div>
            </div>
        </div>
    );
}

export default Produto;
