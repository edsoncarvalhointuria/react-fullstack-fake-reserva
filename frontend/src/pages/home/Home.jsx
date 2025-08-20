import Hero from "./Hero";
import PorTamanho from "./PorTamanho";
import Destaques from "./Destaques";
import Banners from "./Banners";
import Spinner from "../../components/spinner/Spinner";
import { useEffect, useState } from "react";
import { useLoginContext } from "../../context/LoginContext";

function Home() {
    const { logar } = useLoginContext();
    const [isLoading, setLoading] = useState(true);
    const [key, setKey] = useState(0);

    useEffect(() => {
        if (!isLoading) setKey((v) => v + 1);
    }, [isLoading]);
    useEffect(() => {
        logar();
        document.title = "FakeReserva - Edson Carvalho Inturia";
    }, []);
    return (
        <main>
            {isLoading ? <Spinner /> : <></>}
            <Hero key={key} />

            <PorTamanho setLoading={setLoading} />

            <Destaques />

            <Banners />
        </main>
    );
}

export default Home;
