import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getHero } from "../../context/api";
import HeroItem from "./HeroItem";
import home from "./home.module.scss";

// const banners = [
//     {
//         img: "https://lojausereserva.vtexassets.com/assets/vtex.file-manager-graphql/images/230262f3-4558-4f59-9a5c-043bb6d71449___993a4755816523e1d1e30775d07a2d27.jpg",
//         alt: "Imagem Liquidação",
//     },
//     {
//         img: "https://lojausereserva.vtexassets.com/assets/vtex.file-manager-graphql/images/e8aa5103-1bbe-472b-b5fd-95011485a8e1___f96573a041f7a5420f29e9ab2a5896cc.jpg",
//         alt: "Compre duas camisas por 1",
//     },
//     {
//         img: "https://lojausereserva.vtexassets.com/assets/vtex.file-manager-graphql/images/7ab0f33a-a677-48c0-8eb4-e84509e94b76___80aaab34e5aa5e15ea7d548337739f9c.jpg",
//         alt: "Linhas UV",
//     },
// ];

function Hero() {
    const [isNext, setNext] = useState(2);
    const [banners, setBanners] = useState([]);
    const mov = useRef(1);
    const mobCarrossel = useRef();

    useEffect(() => {
        mov.current = isNext;

        const timeout = setTimeout(() => {
            setNext(isNext + 1);
        }, 5000);

        if (isNext === banners.length + 1) {
            setTimeout(() => {
                setTimeout(() => setNext(1), 100);
                mobCarrossel.current.style.transition = "none";
                mobCarrossel.current.style.transform = `translateX(calc(${
                    1 * -100
                }%))`;
            }, 1900);
        } else if (isNext === 0) {
            setTimeout(() => {
                setTimeout(() => setNext(banners.length), 1);
                mobCarrossel.current.style.transition = "none";
                mobCarrossel.current.style.transform = `translateX(calc(${
                    banners.length * -100
                }%))`;
            }, 1900);
        }

        mobCarrossel.current.style.transition = "transform ease-in-out 2s";
        mobCarrossel.current.style.transform = `translateX(calc(${
            isNext * -100
        }%))`;

        return () => clearTimeout(timeout);
    }, [isNext]);

    useEffect(() => {
        (async () => {
            const { data } = await getHero();
            setBanners(data);
            mobCarrossel.current.addEventListener("touchstart", (e) => {
                const touchX = e.touches[0].clientX;

                function start(ev) {
                    const move = ev.touches[0].clientX - touchX;
                    if (move > mobCarrossel.current.clientWidth / 2) {
                        setNext(mov.current - 1);
                        document.removeEventListener("touchmove", start);
                        return;
                    } else if (
                        move <
                        (mobCarrossel.current.clientWidth / 2) * -1
                    ) {
                        setNext(mov.current + 1);
                        document.removeEventListener("touchmove", start);
                        return;
                    }

                    mobCarrossel.current.style.transition = "none";
                    mobCarrossel.current.style.transform = `translateX(calc(${move}px + ${
                        mov.current * -100
                    }%))`;
                }
                function end() {
                    if (mov.current === data.length + 1) {
                        setTimeout(() => {
                            setTimeout(() => setNext(1), 100);
                            mobCarrossel.current.style.transition = "none";
                            mobCarrossel.current.style.transform = `translateX(calc(${
                                1 * -100
                            }%))`;
                        }, 1900);
                    } else if (mov.current === 0) {
                        setTimeout(() => {
                            setTimeout(() => setNext(data.length), 1);
                            mobCarrossel.current.style.transition = "none";
                            mobCarrossel.current.style.transform = `translateX(calc(${
                                data.length * -100
                            }%))`;
                        }, 1900);
                    }

                    document.removeEventListener("touchmove", start);
                    document.removeEventListener("touchend", end);
                }
                document.addEventListener("touchmove", start, {
                    passive: false,
                });
                document.addEventListener("touchend", end);
            });
        })();
    }, []);

    return (
        <>
            <section className={home["hero-mob"]}>
                <div className={home["hero-mob__container"]}>
                    <div className={home["hero-mob__linhas"]}>
                        <div
                            className={`${home["hero-mob__linha"]} ${
                                home["hero-mob__linha--1"]
                            }  ${
                                isNext === 1 || isNext === banners.length + 1
                                    ? home["proximo"]
                                    : ""
                            } `}
                        ></div>
                        <div
                            className={`${home["hero-mob__linha"]} ${
                                home["hero-mob__linha--2"]
                            }  ${isNext === 2 ? home["proximo"] : ""} `}
                        ></div>
                        <div
                            className={`${home["hero-mob__linha"]} ${
                                home["hero-mob__linha--3"]
                            }  ${
                                isNext === 3 || isNext === 0
                                    ? home["proximo"]
                                    : ""
                            } `}
                        ></div>
                    </div>

                    <div
                        className={home["hero-mob__carrossel"]}
                        ref={mobCarrossel}
                    >
                        {banners.length > 0 ? (
                            <>
                                <HeroItem {...banners[banners.length - 1]} />

                                {banners.map((obj, i) => (
                                    <HeroItem {...obj} key={i} />
                                ))}

                                <HeroItem {...banners[0]} />
                                <HeroItem {...banners[1]} />
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </section>

            <section className={home["hero"]}>
                <div className={home["hero__container"]}>
                    <Link to="/loja/ofertas">
                        <video
                            className={home["hero__video"]}
                            autoPlay
                            loop
                            preload="auto"
                            muted
                        >
                            <source
                                title="Hero Video"
                                src="./reserva.mp4"
                                type="video/mp4"
                            />
                        </video>
                    </Link>
                </div>
            </section>
        </>
    );
}

export default Hero;
