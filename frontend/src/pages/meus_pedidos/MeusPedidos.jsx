import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MeusPedidosItem from "./MeusPedidosItem";
import { meusPedidos } from "../../context/api";
import "./meus_pedidos.scss";

function MeusPedidos() {
    const [itens, setItens] = useState([]);
    useEffect(() => {
        document.title = "FakeReserva | Meus Pedidos";
        meusPedidos()
            .then(({ data }) => {
                setItens(data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <main>
            <div className="meus-pedidos">
                <div className="conta__container">
                    <h1 className="conta-h1">Meus Pedidos</h1>
                    {itens.length > 0 ? (
                        itens.map((v, i) => <MeusPedidosItem {...v} key={i} />)
                    ) : (
                        <div className="carrinho__vazio">
                            <h2 className="carrinho__vazio-h1">
                                Você ainda não tem pedidos
                            </h2>

                            <Link to={"/"} className="carrinho__vazio-btn">
                                Comprar Produtos
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}

export default MeusPedidos;
