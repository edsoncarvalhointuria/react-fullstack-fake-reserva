function MeusPedidosDetalhesItem({ img, produto, tamanho, cor, qtd }) {
    return (
        <div className="carrinho__prod-div">
            <div className="carrinho__prod-imagem">
                <img loading="lazy" src={img} alt="Imagem Produto Pedido" />
            </div>

            <div className="carrinho__prod-infos">
                <div className="carrinho__prod-nome">{produto}</div>

                <div className="carrinho__prod-grade">
                    <div className="carrinho__prod-tamanho">
                        TAMANHO:
                        <span>{tamanho}</span>
                    </div>

                    <div className="carrinho__prod-cor">
                        COR:
                        <span>{cor}</span>
                    </div>

                    <div className="carrinho__prod-cor">
                        QUANTIDADE:
                        <span>{qtd}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MeusPedidosDetalhesItem;
