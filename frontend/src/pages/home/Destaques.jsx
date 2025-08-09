import { useRef, useEffect, useState } from "react";
import { getBannersDestaque } from "../../context/api";
import DestaquesItem from "./DestaquesItem";
import home from "./home.module.scss";

const destaqueItens = [
    {
        img: "https://lojausereserva.vtexassets.com/assets/vtex.file-manager-graphql/images/495c5670-de2f-4089-951d-6042f0648c72___9de790b9a15b984d4496aca7d2ab318c.jpg",
        desc1: "Atenção senhores passageiros",
        titulo: "Mala de viagem",
        desc2: "Embarque em novas histórias.",
        btn: "Partiu",
        link: "#",
    },
    {
        img: "https://lojausereserva.vtexassets.com/assets/vtex.file-manager-graphql/images/2f1de201-9cb1-4e2b-a590-8ea3868b0fb7___9a5398b4d99a3b8792bb5ba916eb421b.jpg",
        desc1: "Estilo vem de berço",
        titulo: "Tal Pai Tal Filho",
        desc2: "Combine com seu melhor amigo.",
        btn: "Combine o look",
        link: "#",
    },
    {
        img: "https://lojausereserva.vtexassets.com/assets/vtex.file-manager-graphql/images/e8b1dbb3-667f-4a12-91fd-7701a80cb919___40370b584b4e0592fca31de2d87af0c0.jpg",
        desc1: "Diversão sem limites",
        titulo: "Férias Mini",
        desc2: "Pra curtir a melhor época do ano.",
        btn: "Divirta-se",
        link: "#",
    },
    {
        img: "https://lojausereserva.vtexassets.com/assets/vtex.file-manager-graphql/images/3740625a-a35c-43bf-891b-6f65fbea2215___b84ee389818479383ca446fb16d202ee.jpg",
        desc1: "Vestiu, partiu",
        titulo: "Clássicos",
        desc2: "Essenciais em todo closet.",
        btn: "Vista os ícones",
        link: "#",
    },
    {
        img: "https://lojausereserva.vtexassets.com/assets/vtex.file-manager-graphql/images/59a6ca41-fd1f-4113-b9a9-bb5c6b41384a___967b1a73d7dc0c99b49c700b7fa8b76c.jpg",
        desc1: "",
        titulo: "Óculos",
        desc2: "Conheça os novos modelos",
        btn: "Vem Ver",
        link: "#",
    },
];

function Destaques() {
    const carrosselRef = useRef();
    const posAtual = useRef(0);
    const [itens, setItens] = useState([]);

    useEffect(() => {
        (async () => {
            const { data } = await getBannersDestaque();
            setItens(data);

            const start = (e) => {
                const touch = e.touches ? e.touches[0] : e;
                const clickInicial = touch.clientX;

                function move(ev) {
                    const touch = ev.touches ? ev.touches[0] : ev;
                    const click = touch.clientX;
                    const tamanhoItem =
                        carrosselRef.current.firstChild.clientWidth;
                    const gap = Number.parseFloat(
                        window
                            .getComputedStyle(document.documentElement)
                            .getPropertyValue("font-size")
                    );
                    const screen = Number.parseFloat(
                        window
                            .getComputedStyle(
                                carrosselRef.current.parentElement
                            )
                            .getPropertyValue("width")
                    );
                    const tamanhoCarrossel =
                        (tamanhoItem + gap * 2) * data.length;
                    const posicao = Number.parseFloat(
                        carrosselRef.current.style.left
                    );
                    if (posicao > 0) {
                        carrosselRef.current.style.left = `${
                            tamanhoCarrossel * -1 - (click - clickInicial)
                        }px`;
                        posAtual.current =
                            tamanhoCarrossel * -1 - (click - clickInicial);
                    }
                    if (posicao < (tamanhoCarrossel * 3 - screen) * -1) {
                        carrosselRef.current.style.left = `${
                            tamanhoCarrossel * -1 -
                            (click - clickInicial) -
                            (tamanhoCarrossel - screen)
                        }px`;
                        posAtual.current =
                            tamanhoCarrossel * -1 -
                            (click - clickInicial) -
                            (tamanhoCarrossel - screen);
                    }

                    carrosselRef.current.style.left = `${
                        posAtual.current + (click - clickInicial)
                    }px`;
                }

                function end(e) {
                    posAtual.current = Number.parseFloat(
                        carrosselRef.current.style.left
                    );

                    document.removeEventListener("mousemove", move);
                    document.removeEventListener("mouseup", end);
                    document.removeEventListener("touchmove", move);
                    document.removeEventListener("touchend", end);
                }

                document.addEventListener("mousemove", move);
                document.addEventListener("touchmove", move);
                document.addEventListener("mouseup", end);
                document.addEventListener("touchend", end);
            };
            carrosselRef.current.addEventListener("mousedown", start);
            carrosselRef.current.addEventListener("touchstart", start);
        })();
    }, []);

    return (
        <section className={home["destaques"]}>
            <div className={home["destaques__titulo"]}>
                <h2 className={home["destaques__h2"]}>Destaques & Novidades</h2>
                <hr />
            </div>
            <div className={home["destaques__opcoes"]} ref={carrosselRef}>
                {itens.length > 0 ? (
                    <>
                        {itens.map((obj, i) => (
                            <DestaquesItem key={i} {...obj} />
                        ))}

                        {itens.map((obj, i) => (
                            <DestaquesItem key={i + "-ghost-1"} {...obj} />
                        ))}

                        {itens.map((obj, i) => (
                            <DestaquesItem key={i + "-ghost-2"} {...obj} />
                        ))}
                    </>
                ) : (
                    <></>
                )}
            </div>
        </section>
    );
}

export default Destaques;
