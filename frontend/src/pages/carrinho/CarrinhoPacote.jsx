import CarrinhoItem from "./CarrinhoItem";
import { createCart } from "../../context/api";
import { useEffect, useState } from "react";
import { useCarrinhoContext } from "../../context/CarrinhoContext";
import { listaProdutos } from "../loja/Loja";

function CarrinhoPacote({ id, ind }) {
    const { cart } = useCarrinhoContext();
    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        createCart(id, cart[id])
            .then((res) => {
                setProdutos(res.data);
            })
            .catch((err) => console.log(err));
    }, [cart]);
    return (
        <>
            <tr className="carrinho__table-pacote" key={`${id}-itens`}>
                <td colSpan="100">
                    <p className="carrinho__table-id">PACOTE #{ind + 1}</p>

                    <p className="carrinho__table-aviso">
                        Você pode escolher outra opção para receber esse pacote
                        na próxima etapa
                    </p>
                </td>
            </tr>

            {produtos ? (
                produtos.map((value, i) => {
                    return (
                        <CarrinhoItem
                            {...value}
                            key={`${i}-prod-${value.cores[0].cor}`}
                        />
                    );
                })
            ) : (
                <></>
            )}
        </>
    );
}

export default CarrinhoPacote;
