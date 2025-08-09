import ItemTamanho from "./ItemTamanho";
import { useEffect, useState, useRef } from "react";
import { getTamanhos } from "../../context/api";
import home from "./home.module.scss";

function PorTamanho({ setLoading }) {
    const refCarrossel = useRef(0);
    const deslocamento = useRef(0);
    const [index, setIndex] = useState(0);
    const [bloqueado, setBloqueio] = useState(false);
    const [opcoes, setTamanhos] = useState([]);

    const moverParaFrente = () => {
        if (bloqueado) return;

        setBloqueio(true);

        if (opcoes.length * 2 - 1 === index) {
            setIndex(index + 1);

            setTimeout(() => {
                refCarrossel.current.style.transition = "none";
                setIndex(opcoes.length);
            }, 400);
        } else {
            refCarrossel.current.style.transition = "transform ease-out 0.4s";
            setIndex(index + 1);
        }

        setTimeout(() => setBloqueio(false), 400);
    };

    const moverParaTraz = () => {
        if (bloqueado) return;

        setBloqueio(true);

        if (index < 2) {
            setIndex(index - 1);

            setTimeout(() => {
                refCarrossel.current.style.transition = "none";
                setIndex(opcoes.length);
            }, 400);
        } else {
            refCarrossel.current.style.transition = "transform ease-out 0.4s";
            setIndex(index - 1);
        }

        setTimeout(() => setBloqueio(false), 400);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (opcoes.length * 2 - 1 === index) {
                setIndex(index + 1);

                setTimeout(() => {
                    refCarrossel.current.style.transition = "none";
                    setIndex(opcoes.length);
                }, 400);
            } else {
                refCarrossel.current.style.transition =
                    "transform ease-out 0.4s";
                setIndex(index + 1);
            }
        }, 4000);

        refCarrossel.current.style.transform = `translateX(calc(calc( -${refCarrossel.current.firstElementChild.firstElementChild.offsetHeight}px - 1rem ) * ${index}))`;

        return () => clearTimeout(timeout);
    }, [index]);

    useEffect(() => {
        (async () => {
            const { data } = await getTamanhos();
            setTamanhos(data);
            setIndex(data.length);

            const start = (e) => {
                const touch = e.touches ? e.touches[0] : e;

                const clickInicialCarrossel = touch.clientX;
                const fontSize = Number.parseInt(
                    window
                        .getComputedStyle(document.documentElement)
                        .getPropertyValue("font-size")
                );

                const height =
                    refCarrossel.current.firstElementChild.firstElementChild
                        .offsetHeight;

                let posAtual = clickInicialCarrossel;

                document.addEventListener("mousemove", moveCarrosselMouse);
                document.addEventListener("mouseup", encerrar);
                document.addEventListener("touchmove", moveCarrosselMouse);
                document.addEventListener("touchend", encerrar);

                function moveCarrosselMouse(ev) {
                    const touche = ev.touches ? ev.touches[0] : ev;
                    if (
                        (touche.clientX - clickInicialCarrossel) %
                            (height - fontSize) ===
                            0 &&
                        touche.clientX - posAtual > 0
                    ) {
                        setIndex(index - 1);
                        posAtual = touche.clientX;
                    }
                    if (
                        (touche.clientX - clickInicialCarrossel) %
                            (height - fontSize) ===
                            0 &&
                        touche.clientX - posAtual < 0
                    ) {
                        setIndex(index + 1);
                        posAtual = touche.clientX;
                    }
                    refCarrossel.current.style.transition = "none";

                    refCarrossel.current.style.transform = `translateX(calc(${
                        deslocamento.current +
                        (touche.clientX - clickInicialCarrossel)
                    }px))`;
                }

                function encerrar(ev) {
                    deslocamento.current = Number(
                        refCarrossel.current.style.transform.replace(
                            /[^\d-.]/g,
                            ""
                        )
                    );

                    if (
                        deslocamento.current <=
                            data.length * 2.1 * (height + fontSize) * -1 ||
                        deslocamento.current >= height + fontSize
                    ) {
                        deslocamento.current =
                            data.length * (height + fontSize) * -1;
                        refCarrossel.current.style.transition =
                            "transform ease-out 0.7s";
                        refCarrossel.current.style.transform = `translateX(calc( ${
                            data.length * (height + fontSize) * -1
                        }px))`;
                    }

                    document.removeEventListener(
                        "mousemove",
                        moveCarrosselMouse
                    );
                    document.removeEventListener("mouseup", encerrar);
                    document.removeEventListener(
                        "touchmove",
                        moveCarrosselMouse
                    );
                    document.removeEventListener("touchend", encerrar);
                }
            };

            refCarrossel.current.addEventListener("touchstart", start);
            refCarrossel.current.addEventListener("mousedown", start);
            setLoading(false);
        })();
    }, []);

    return (
        <section className={home["por-tamanho"]}>
            <div className={home["por-tamanho__titulo"]}>
                <h2 className={home["por-tamanho__h2"]}>COMPRE POR TAMANHO</h2>
                <hr />
            </div>

            <div className={home["por-tamanho__carrossel"]}>
                <button
                    className={`${home["seta"]} ${home["seta-esquerda"]}`}
                    onClick={moverParaTraz}
                    disabled={bloqueado}
                >
                    &#8249;
                </button>
                <button
                    className={`${home["seta"]} ${home["seta-direita"]}`}
                    onClick={moverParaFrente}
                    disabled={bloqueado}
                >
                    &#8250;
                </button>

                <div className={home["por-tamanho__carrossel-container"]}>
                    <div
                        className={home["por-tamanho__carrossel-opcoes"]}
                        ref={refCarrossel}
                    >
                        {opcoes.length > 0 ? (
                            <>
                                {opcoes.map((v, i) => (
                                    <ItemTamanho {...v} key={i} />
                                ))}
                                {opcoes.map((v, i) => (
                                    <ItemTamanho {...v} key={i + "ghost-1"} />
                                ))}
                                {opcoes.map((v, i) => (
                                    <ItemTamanho {...v} key={i + "ghost-2"} />
                                ))}
                            </>
                        ) : (
                            <div>
                                <div></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PorTamanho;
