function FiltroItem({ titulo, children }) {
    return (
        <div className="filtro__tipo">
            <p
                className="filtro__tipo-titulo filtro__tipo-titulo--border-top"
                onClick={(e) =>
                    e.currentTarget.parentElement.classList.toggle("abrir")
                }
            >
                {titulo}
            </p>
            {children}
        </div>
    );
}

export default FiltroItem;
