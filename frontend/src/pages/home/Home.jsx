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
    useEffect(() => {
        logar();
    }, []);
    return (
        <main>
            {isLoading ? <Spinner /> : <></>}
            <Hero />

            <PorTamanho setLoading={setLoading} />

            <Destaques />

            <Banners />
        </main>
    );
}

export default Home;
