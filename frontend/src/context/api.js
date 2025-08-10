import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_LINK_API,
});

export const getHeader = () => api.get("/db/get-header");

export const getProducts = (colecao, categoria, opcao) => {
    if (categoria) return api.get(`/db/get-produtos/${colecao}/${categoria}`);

    return api.get(`/db/get-produtos/${colecao}`);
};

export const getPesquisa = (pesquisa) =>
    api.get(`/db/get-pesquisa/${pesquisa}`);

export const getItem = (id) => api.get(`/db/get-item/${id}`);

export const getItensSemelhantes = (categoria, id) =>
    api.get(`/db/get-itens-semelhantes/${categoria}/${id}`);

export const createCart = (id, cart) =>
    api.post(`/db/set-cart/${id}`, {
        cart: cart,
    });

export const getPrice = (id) => api.get(`/db/get-price/${id}`);

export const getCashback = (id, qtd) =>
    api.get(`/db/get-cashback/${id}/${qtd}`);

export const setNewCupom = (cupom) => api.post(`/db/get-cupom`, { cupom });

export const getTamanhos = () => api.get(`/db/get-tamanhos`);

export const getBannersDestaque = () => api.get(`/db/get-banners-destaque`);

export const getBanners = () => api.get(`/db/get-banners`);

export const getHero = () => api.get(`/db/get-hero`);

export const setSession = (session) =>
    api.post(`/db/set-session`, { ...session });

export const check_session = (session) =>
    api.post(`/db/check-session`, { ...session }, { withCredentials: true });

export const finalizarCompra = (object) =>
    api.post(`/db/finalizar-compra`, object, { withCredentials: true });

export const getInfos = (session) => api.get(`/db/get-infos/${session}`);

export const cadastrar = (form) => api.post(`/db/cadastrar`, form);

export const login = (form) =>
    api.post(`/db/login`, { ...form }, { withCredentials: true });

export const logout = () =>
    api.post(`/db/logout`, [], { withCredentials: true });

export const verLogin = () =>
    api.get(`/db/verificar-login`, { withCredentials: true });

export const getDados = () =>
    api.get(`/db/get-dados`, { withCredentials: true });

export const atualizarDados = (form) =>
    api.post(`/db/atualizar-dados`, { ...form }, { withCredentials: true });

export const meusPedidos = () =>
    api.get(`/db/meus-pedidos`, { withCredentials: true });

export const pedido = (order) =>
    api.get(`/db/meus-pedidos/${order}`, { withCredentials: true });

export const getCarrinho = () =>
    api.get(`/db/get-carrinho`, { withCredentials: true });

export const updateCarrinho = (carrinho) =>
    api.post(`/db/set-carrinho`, { carrinho }, { withCredentials: true });
