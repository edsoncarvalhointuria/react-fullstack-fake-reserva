import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function NotFound() {
    const [count, setCount] = useState(5);
    useEffect(() => {
        setTimeout(() => setCount(count - 1), 1000);
    }, [count]);

    return (
        <>
            {count > 0 ? (
                <div className="carrinho__vazio">
                    <h1 className="carrinho__vazio-h1">404 Not Found</h1>

                    <p className="carrinho__vazio-info">
                        você será redirecionado para HomePage em {count}...
                    </p>
                </div>
            ) : (
                <Navigate to={"/"} />
            )}
        </>
    );
}

export default NotFound;
