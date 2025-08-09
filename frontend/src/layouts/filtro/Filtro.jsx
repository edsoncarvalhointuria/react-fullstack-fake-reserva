import { useEffect, useState } from "react";
import Slider from "../../components/slider/Slider.jsx";
import FiltroItem from "./FiltroItem.jsx";
import "./_filtro.scss";

function filtrar(all = false) {
    const from = document.getElementById("fromInput");
    const to = document.getElementById("toInput");
    const $filtros = document.querySelector(".filtro__tipos");
    const search = $filtros.querySelectorAll("input:checked");
    const params = {};
    if (all) {
        (params["from"] = from.value), (params["to"] = to.value);
    }

    search.forEach((v) => {
        const name = v.parentElement.parentElement.id;
        if (params[name]) {
            Array.isArray(params[name])
                ? params[name].push(v.value)
                : (params[name] = [params[name], v.value]);
        } else {
            params[name] = [v.value];
        }
    });

    return params;
}

function Filtro({ setParams, params, prods }) {
    const categorias = [
        ...new Set(
            prods.reduce((acc, currentValue) => {
                acc = acc.concat(currentValue.categorias);
                return acc;
            }, [])
        ),
    ];

    const tamanhos = prods.reduce((acc, currentValue) => {
        currentValue.tamanhos.map((v) =>
            !acc.includes(v) ? acc.push(v) : acc
        );
        return acc;
    }, []);

    const cores = prods.reduce((acc, currentValue) => {
        currentValue?.cores.map((v) =>
            !acc.find((value) => value.cor === v.cor) ? acc.push(v) : acc
        );
        return acc;
    }, []);

    const precos = prods?.reduce((acc, current) => {
        if (current?.preco) acc.push(current.preco);
        return acc;
    }, []);

    return (
        <div className="filtro">
            <div className="filtro__container">
                <div className="filtro__titulo-container">
                    <div className="filtro__titulo">
                        <div className="filtro__img">
                            <img
                                src="./filters-2-svgrepo-com.svg"
                                alt="Imagem Filtro"
                            />
                        </div>
                        <p>Filtrar</p>
                    </div>
                    <div
                        className="filtro__titulo-fechar"
                        onClick={() =>
                            document.body.classList.remove("filtro-aberto")
                        }
                    ></div>
                </div>
                <p className="filtro__p">Faixas de preço</p>
                {prods.length > 0 ? (
                    <Slider prods={prods} preco={Math.max(...precos)}>
                        <button
                            type="submit"
                            className="form__botao"
                            onClick={() => {
                                setParams(filtrar(true));
                                document.body.classList.remove("filtro-aberto");
                            }}
                        >
                            FILTRAR
                        </button>
                    </Slider>
                ) : (
                    <div></div>
                )}

                <div className="filtro__tipos">
                    <FiltroItem titulo={"Cor"}>
                        <ul
                            className="filtro__lista filtro__lista--cor"
                            id="cor"
                        >
                            {cores.map((v, i) => (
                                <li key={i}>
                                    <input
                                        type="checkbox"
                                        name={v.cor}
                                        value={v.cor}
                                        id={v.cor}
                                        checked={
                                            params.get("cor")
                                                ? params
                                                      .getAll("cor")
                                                      .includes(v.cor)
                                                : false
                                        }
                                        onChange={() => setParams(filtrar())}
                                    />
                                    <div
                                        className={`filtro__lista-cor`}
                                        style={{ backgroundColor: v.hex }}
                                    ></div>
                                    {v?.cor?.toUpperCase()}
                                </li>
                            ))}
                        </ul>
                    </FiltroItem>

                    <FiltroItem titulo={"Tamanho"}>
                        <ul
                            className="filtro__lista filtro__lista--tamanho"
                            id="tamanho"
                        >
                            {tamanhos.map((v, i) => (
                                <li className="filtro__lista-tamanho" key={i}>
                                    <input
                                        type="checkbox"
                                        name={v}
                                        value={v}
                                        id={v}
                                        checked={
                                            params.get("tamanho")
                                                ? params
                                                      .getAll("tamanho")
                                                      .includes(v)
                                                : false
                                        }
                                        onChange={() => setParams(filtrar())}
                                    />
                                    <div>{v}</div>
                                </li>
                            ))}
                        </ul>
                    </FiltroItem>

                    <FiltroItem titulo={"Categoria"}>
                        <ul
                            className="filtro__lista filtro__lista--categoria"
                            id="categoria"
                        >
                            {categorias.map((v, i) => (
                                <li className="filtro__lista-categoria" key={i}>
                                    <input
                                        type="checkbox"
                                        name={v}
                                        value={v}
                                        id={v}
                                        checked={
                                            params.get("categoria")
                                                ? params
                                                      .getAll("categoria")
                                                      .includes(v)
                                                : false
                                        }
                                        onChange={() => setParams(filtrar())}
                                    />
                                    <div></div>
                                    {v}
                                </li>
                            ))}
                        </ul>
                    </FiltroItem>
                </div>
            </div>
        </div>
    );
}

export default Filtro;
