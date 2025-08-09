import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MeusPedidosDetalhesItem from "./MeusPedidosDetalhesItem";
import { pedido } from "../../context/api";

function MeusPedidosDetalhes() {
    const { order } = useParams();
    const [endereco, setEndereco] = useState({});
    const [itens, setItens] = useState([]);

    useEffect(() => {
        pedido(order)
            .then(({ data }) => {
                setEndereco(data.endereco[0]);
                setItens(data.itens);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <main>
            <div className="meus-pedidos">
                <div className="conta__container">
                    <h1 className="conta-h1">
                        Detalhes Pedido: 7325454-{itens[0]?.order_id}
                    </h1>

                    <div className="conta__endereco">
                        {Object.keys(endereco).map((v, i) => (
                            <p key={i}>
                                <b>{v}:</b> {endereco[v]}
                            </p>
                        ))}
                    </div>

                    <div className="meus-pedidos__container">
                        <div className="meus-pedidos__cabecalho">
                            <div>
                                <p>
                                    <b>Data do pedido</b>
                                </p>
                                <p>{itens[0]?.data}</p>
                            </div>

                            <div>
                                <p>
                                    <b>Total</b>
                                </p>
                                <p>
                                    {itens[0]?.total?.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                    })}
                                </p>
                            </div>

                            <div>
                                <p>
                                    <b>Número do pedido</b>
                                </p>
                                <p>7325454-{itens[0]?.order_id}</p>
                            </div>
                        </div>

                        <div className="meus-pedidos__corpo">
                            <div className="meus-pedidos__corpo-pedido meus-pedidos__corpo-pedido--order">
                                {itens?.map((v, i) => (
                                    <MeusPedidosDetalhesItem {...v} key={i} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default MeusPedidosDetalhes;
