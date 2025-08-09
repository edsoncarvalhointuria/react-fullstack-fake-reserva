import { Link } from "react-router-dom";

function MeusPedidosItem({
    data,
    total,
    order_id,
    img,
    produto,
    tamanho,
    cor,
}) {
    return (
        <div className="meus-pedidos__container">
            <div className="meus-pedidos__cabecalho">
                <div>
                    <p>
                        <b>Data do pedido</b>
                    </p>
                    <p>{data}</p>
                </div>

                <div>
                    <p>
                        <b>Total</b>
                    </p>
                    <p>
                        {total.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </p>
                </div>

                <div>
                    <p>
                        <b>Número do pedido</b>
                    </p>
                    <p>7325454-{order_id}</p>
                </div>
            </div>

            <div className="meus-pedidos__corpo">
                <div className="meus-pedidos__corpo-pedido">
                    <div className="carrinho__prod-div">
                        <div className="carrinho__prod-imagem">
                            <img
                                loading="lazy"
                                src={img}
                                alt="Registro Compra Imagem"
                            />
                        </div>

                        <div className="carrinho__prod-infos">
                            <div className="carrinho__prod-nome">
                                {produto}...+
                            </div>

                            <div className="carrinho__prod-grade">
                                <div className="carrinho__prod-tamanho">
                                    TAMANHO:
                                    <span>{tamanho}</span>
                                </div>

                                <div className="carrinho__prod-cor">
                                    COR:
                                    <span>{cor}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link
                        className="meus-pedidos__ver-detalhes"
                        to={`/meus-pedidos/${order_id}`}
                    >
                        Ver Detalhes
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MeusPedidosItem;
