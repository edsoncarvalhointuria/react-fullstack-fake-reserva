function ItemImg({ link }) {
    return (
        <div className="item__img">
            <img loading="lazy" src={link} alt="Imagem Modelo Roupa" />
        </div>
    );
}

export default ItemImg;
