import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Pool } from "pg";
import { CadastrarInterface } from "./types/CadastrarInterface.js";
import { CarrinhoObjectInterface } from "./types/CarrinhoObjectInterface.js";

async function tryExec(res: express.Response, callback: () => Promise<void>) {
    try {
        await callback();
    } catch (err) {
        console.log(err);
        res.status(400).send({ err });
    }
}

const KEY = process.env.KEY as string;
const app = express();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());

app.post("/db/cadastrar", async (req, res) => {
    const {
        email,
        senha,
        nome,
        sobrenome,
        cpf,
        genero,
        data_nascimento,
        telefone,
    } = req.body as CadastrarInterface;
    const hash = await bcrypt.hash(senha, 10);

    tryExec(res, async () => {
        await pool.query(
            `
       INSERT INTO usuarios(email, senha, nome, sobrenome, cpf, genero, data_nascimento, telefone)
        VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8)
        `,
            [
                email,
                hash,
                nome,
                sobrenome,
                cpf,
                genero,
                data_nascimento,
                telefone,
            ]
        );

        res.status(200).send({ message: "Cadastrado!" });
    });
});

app.post("/db/atualizar-dados", async (req, res) => {
    // --- Pegando Token ---
    const token = req?.cookies?.authToken;

    if (token) {
        // --- analisando se o token está ok ---
        const decode = jwt.verify(token, KEY) as jwt.JwtPayload;
        const {
            email,
            nome,
            sobrenome,
            cpf,
            genero,
            data_nascimento,
            telefone,
        } = req.body as CadastrarInterface;

        // --- fazendo atualização ---
        tryExec(res, async () => {
            await pool.query(
                `
            UPDATE usuarios
            SET email = $1, nome = $2, sobrenome = $3, cpf = $4, genero = $5, data_nascimento = $6, telefone = $7
            WHERE email = $8
            `,
                [
                    email,
                    nome,
                    sobrenome,
                    cpf,
                    genero,
                    data_nascimento,
                    telefone,
                    decode.login,
                ]
            );

            // --- Criando novo token ---
            const newToken = jwt.sign(
                { login: email, nome: nome.split(" ")[0] },
                KEY,
                { expiresIn: "24h" }
            );

            // --- enviando novo token logado ---
            res.status(200)
                .cookie("authToken", newToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: 3600000 * 24,
                })
                .send({ message: "Atualizado!" });
        });
    }
});

app.post("/db/login", async (req, res) => {
    const { login, senha } = req.body;

    tryExec(res, async () => {
        const { rows } = await pool.query(
            `
                SELECT 
                    senha,
                    nome
                FROM usuarios
                WHERE email = $1
            `,
            [login]
        );

        if (rows.length) {
            const compare = await bcrypt.compare(senha, rows[0]?.senha);

            if (compare) {
                const newToken = jwt.sign(
                    {
                        login,
                        nome: rows[0]?.nome.split(" ")[0],
                    },
                    KEY,
                    {
                        expiresIn: "24h",
                    }
                );

                res.status(200)
                    .cookie("authToken", newToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                        maxAge: 3600000 * 24,
                    })
                    .send({ message: "Login bem-sucedido!" });
            } else
                res.status(404).send({ message: "Email ou senha invalidos" });
        } else res.status(404).send({ message: "Email ou senha invalidos" });
    });
});

app.post("/db/logout", async (req, res) => {
    const token = req?.cookies?.authToken;

    if (token) {
        res.clearCookie("authToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        }).send({ message: "Logout realizado com sucesso" });
    } else res.status(200).send({ err: "usuário não está logado" });
});

app.get("/db/get-dados", async (req, res) => {
    const token = req?.cookies?.authToken;

    if (token) {
        const decode = jwt.verify(token, KEY) as jwt.JwtPayload;
        tryExec(res, async () => {
            const { rows } = await pool.query(
                `
            SELECT
                email, nome, sobrenome, cpf, genero, data_nascimento, telefone
            FROM
                usuarios
            WHERE email = $1   
            `,
                [decode.login]
            );

            if (rows.length) res.status(200).send(rows);
            else res.status(404).send({ message: "Email ou senha invalidos" });
        });
    } else res.status(400).send({ message: "Token não encontrado" });
});

app.get("/db/verificar-login", (req, res) => {
    const token = req?.cookies?.authToken;

    if (token) {
        try {
            const decode = jwt.verify(token, KEY) as jwt.JwtPayload;
            res.status(200).send({ login: decode.login, nome: decode.nome });
        } catch (err) {
            res.status(200).send({ err: "Login não encontrado" });
        }
    } else res.status(200).send({ err: "Login não encontrado" });
});

app.get("/db/meus-pedidos", async (req, res) => {
    const token = req?.cookies?.authToken;

    if (token) {
        const decode = jwt.verify(token, KEY) as jwt.JwtPayload;

        tryExec(res, async () => {
            const { rows } = await pool.query(
                `
            WITH PedidosEtiquetados AS (SELECT
                c.data,
                c.qtd,
                o.total,
                o.id AS order_id,
                p.img,
                p.nome AS produto,
                cor.nome AS cor,
                t.nome AS tamanho,
                ROW_NUMBER() OVER (PARTITION BY o.id ORDER BY c.id) as rn
            FROM
                compras c
            INNER JOIN orders o
                ON c.fk_order = o.id
            INNER JOIN produtos p
                ON p.id = c.fk_produto
            INNER JOIN usuarios u
                ON u.id = c.fk_usuario
            INNER JOIN cores cor
                ON c.fk_cor = cor.id
            INNER JOIN tamanhos t
                ON t.id = c.fk_tamanho
            WHERE u.email = $1
            GROUP BY o.id, c.data, c.qtd, p.img, p.nome, cor.nome, t.nome, c.id)
            
            SELECT * FROM PedidosEtiquetados
            WHERE rn = 1;
            `,
                [decode.login]
            );

            res.status(200).send(rows);
        });
    } else res.status(400).send({ err: "Usuário deslogado" });
});

app.get("/db/meus-pedidos/:order", async (req, res) => {
    const token = req?.cookies?.authToken;
    const { order } = req.params;

    if (token) {
        const decode = jwt.verify(token, KEY) as jwt.JwtPayload;

        tryExec(res, async () => {
            const { rows } = await pool.query(
                `
                SELECT
                    c.data,
                    c.qtd,
                    o.total,
                    o.id AS order_id,
                    p.img,
                    p.nome AS produto,
                    cor.nome AS cor,
                    t.nome AS tamanho
                FROM
                    compras c
                INNER JOIN orders o
                    ON c.fk_order = o.id
                INNER JOIN produtos p
                    ON p.id = c.fk_produto
                INNER JOIN usuarios u
                    ON u.id = c.fk_usuario
                INNER JOIN cores cor
                    ON c.fk_cor = cor.id
                INNER JOIN tamanhos t
                    ON t.id = c.fk_tamanho
                WHERE u.email = $1 AND c.fk_order = $2
                GROUP BY t.nome, c.data, c.qtd, o.total, o.id, p.img, p.nome, cor.nome
                `,
                [decode.login, order]
            );

            if (rows.length) {
                const row = await pool.query(
                    `
                        SELECT
                            ende.endereco,
                            ende.numero,
                            ende.cep,
                            ende.complemento,
                            ende.cidade,
                            ende.uf
                        FROM
                            compras c
                        INNER JOIN enderecos ende
                            ON ende.id = c.fk_endereco
                        WHERE c.fk_order = $1
                        GROUP BY c.fk_order, ende.endereco, ende.numero, ende.cep, ende.complemento, ende.cidade, ende.uf
                        `,
                    [order]
                );

                res.status(200).send({
                    itens: rows,
                    endereco: row.rows,
                });
            } else res.status(404).send({ message: "Pedido não encontrado" });
        });
    } else res.status(400).send({ err: "Usuário deslogado" });
});

app.get("/db/get-colecoes", async (_, res) => {
    tryExec(res, async () => {
        const { rows } = await pool.query(
            `
            SELECT
            c.titulo,
            c.slug,
            b.nome AS banner,
            b.img AS banner_img
        FROM colecoes c
        INNER JOIN banners b
            ON b.id = c.fk_banner
        WHERE c.ativo = 1
            `
        );

        res.status(200).send(rows);
    });
});

app.get("/db/get-categorias", (_, res) => {
    tryExec(res, async () => {
        const { rows } = await pool.query(
            `SELECT titulo, slug FROM categorias WHERE ativo = 1`
        );
        res.status(200).send(rows);
    });
});

app.get("/db/get-header", (_, res) => {
    tryExec(res, async () => {
        const { rows } = await pool.query(
            `
            SELECT
            cole.titulo AS colecao,
            cole.slug AS colecao_slug,
            banner.nome AS banner,
            banner.img AS img,
           (SELECT
                CONCAT( cole2.slug, '/', cate2.slug)
            FROM
                colecao_categoria cc2
            INNER JOIN categorias cate2
                ON cate2.id = cc2.fk_categoria
            INNER JOIN colecoes cole2
                ON cc2.fk_colecao = cole2.id
            WHERE cc2.id = banner.fk_colecao_categoria
           ) AS banner_link,
            json_agg(
                json_build_object(
                    'categoria', cate.titulo,
                    'categoria_slug', cate.slug,
                    'opcoes', (
                        SELECT json_agg(
                            json_build_object(
                                'opcao', op.titulo,
                                'opcao_slug', op.slug
                            )
                        )
                        FROM opcoes op
                        INNER JOIN categoria_opcao co
                            ON co.fk_opcao = op.id
                        WHERE cate.id = co.fk_categoria
                    )
                )
            ) AS categorias
        FROM
            colecoes cole
        INNER JOIN banners banner
            ON cole.fk_banner = banner.id
        INNER JOIN colecao_categoria cc
            ON cole.id = cc.fk_colecao
                INNER JOIN categorias cate
                    ON cate.id = cc.fk_categoria
        WHERE cole.ativo = 1 AND cate.ativo = 1
        GROUP BY cole.id, banner.id
            `
        );

        res.status(200).send(rows);
    });
});

app.get("/db/get-produtos/:colecao", (req, res) => {
    const { colecao } = req.params;
    tryExec(res, async () => {
        const { rows } = await pool.query(
            `
            SELECT
            p.*,
            json_agg(
                DISTINCT t.nome
            ) AS tamanhos,

            (SELECT json_agg(
                 json_build_object(
                    'cor', cor.nome,
                    'hex', cor.cor_hex
                )
            ) FROM
                    cores cor
                INNER JOIN cor_produto cp
                    ON cp.fk_cor = cor.id
                WHERE cp.fk_produto = p.id
            )AS cores,

            (SELECT json_agg(categorias.titulo) FROM categorias
            INNER JOIN produto_categoria pc
                ON pc.fk_categoria = categorias.id
            WHERE pc.fk_produto = p.id AND categorias.ativo = 1
            ) AS categorias
        FROM
            produtos p
        INNER JOIN colecoes c
            ON p.fk_colecao = c.id
        INNER JOIN produto_tamanho pt
            ON pt.fk_produto = p.id
                INNER JOIN tamanhos t
                    ON t.id = pt.fk_tamanho

        WHERE c.slug = $1
        GROUP BY p.id
            `,
            [colecao]
        );

        res.status(200).send(rows);
    });
});

app.get("/db/get-produtos/:colecao/:categoria/:opcao?", (req, res) => {
    const { colecao, categoria } = req.params;
    tryExec(res, async () => {
        const { rows } = await pool.query(
            ` 
            SELECT
            p.*,
            json_agg(
                DISTINCT t.nome
            ) AS tamanhos,

            (SELECT json_agg(
                 json_build_object(
                    'cor', cor.nome,
                    'hex', cor.cor_hex
                )
            ) FROM
                    cores cor
                INNER JOIN cor_produto cp
                    ON cp.fk_cor = cor.id
                WHERE cp.fk_produto = p.id
            )AS cores,

            (SELECT 
                json_agg(categorias.titulo) 
            FROM categorias
            INNER JOIN produto_categoria pc
                ON pc.fk_categoria = categorias.id
            WHERE pc.fk_produto = p.id AND categorias.ativo = 1
            ) AS categorias
        FROM
            produtos p
        INNER JOIN colecoes c
            ON p.fk_colecao = c.id
        INNER JOIN produto_tamanho pt
            ON pt.fk_produto = p.id
                INNER JOIN tamanhos t
                    ON t.id = pt.fk_tamanho
        INNER JOIN produto_categoria pc1
            ON pc1.fk_produto = p.id
                INNER JOIN categorias categ
                    ON categ.id = pc1.fk_categoria

        WHERE c.slug = $1 AND categ.slug = $2
        GROUP BY p.id
            `,
            [colecao, categoria]
        );

        res.status(200).send(rows);
    });
});

app.get("/db/get-pesquisa/:pesquisa", (req, res) => {
    const { pesquisa } = req.params;

    tryExec(res, async () => {
        const { rows } = await pool.query(
            `
            SELECT
            p.*,
            json_agg(
                DISTINCT t.nome
            ) AS tamanhos,

            (SELECT json_agg(
                 json_build_object(
                    'cor', cor.nome,
                    'hex', cor.cor_hex
                )
            ) FROM
                    cores cor
                INNER JOIN cor_produto cp
                    ON cp.fk_cor = cor.id
                WHERE cp.fk_produto = p.id
            ) AS cores,

            (SELECT json_agg(categorias.titulo)
            FROM categorias
            INNER JOIN produto_categoria pc
                ON pc.fk_categoria = categorias.id
            WHERE pc.fk_produto = p.id AND categorias.ativo = 1
            ) AS categorias
        FROM
            produtos p
        INNER JOIN colecoes c
            ON p.fk_colecao = c.id
        INNER JOIN produto_tamanho pt
            ON pt.fk_produto = p.id
                INNER JOIN tamanhos t
                    ON t.id = pt.fk_tamanho
        INNER JOIN produto_categoria pc1
            ON pc1.fk_produto = p.id
                INNER JOIN categorias categ
                    ON categ.id = pc1.fk_categoria

        WHERE p.nome LIKE '%'||$1||'%'
        GROUP BY p.id
            `,
            [pesquisa.replaceAll(" ", "%")]
        );

        res.status(200).send(rows);
    });
});

app.get("/db/get-item/:id", (req, res) => {
    const { id } = req.params;

    tryExec(res, async () => {
        const { rows } = await pool.query(
            `
        SELECT
            p.*,
            c.titulo AS colecao,
            c.slug AS colecao_slug,
            json_agg(
                t.nome
            ) AS tamanhos,

            (SELECT json_agg(
                json_build_object
                (
                    'cor', cor.nome,
                    'hex', cor.cor_hex,
                    'imgs', (
                                SELECT
                                    json_agg(DISTINCT img.img)
                                FROM imagens img
                                WHERE cor.id = img.fk_cor AND fk_produto = p.id
                            )
                )
            ) FROM
                    cores cor
                INNER JOIN cor_produto cp
                    ON cp.fk_cor = cor.id
                WHERE cp.fk_produto = p.id
            ) AS cores,

            (SELECT json_agg(categorias.titulo)
            FROM categorias
            INNER JOIN produto_categoria pc
                ON pc.fk_categoria = categorias.id
            WHERE pc.fk_produto = p.id AND categorias.ativo = 1
            ) AS categorias
        FROM
            produtos p
        INNER JOIN colecoes c
            ON p.fk_colecao = c.id
        INNER JOIN produto_tamanho pt
            ON pt.fk_produto = p.id
                INNER JOIN tamanhos t
                    ON t.id = pt.fk_tamanho
        WHERE p.id = $1
        GROUP BY p.id, c.titulo, c.slug
        `,
            [id]
        );

        res.status(200).send(rows);
    });
});

app.get("/db/get-itens-semelhantes/:colecao/:id", (req, res) => {
    const { colecao, id } = req.params;

    tryExec(res, async () => {
        const { rows } = await pool.query(
            `
         SELECT
            p.*,
            json_agg(
                DISTINCT t.nome
            ) AS tamanhos,

            (SELECT json_agg(
                json_build_object(
                    'cor', cor.nome,
                    'hex', cor.cor_hex
                )
            ) FROM
                    cores cor
                INNER JOIN cor_produto cp
                    ON cp.fk_cor = cor.id
                WHERE cp.fk_produto = p.id
            ) AS cores
        FROM
            produtos p
        INNER JOIN colecoes c
            ON p.fk_colecao = c.id
        INNER JOIN produto_tamanho pt
            ON pt.fk_produto = p.id
                INNER JOIN tamanhos t
                    ON t.id = pt.fk_tamanho
        INNER JOIN produto_categoria prod_c
            ON prod_c.fk_produto = p.id
                INNER JOIN categorias
                    ON categorias.id = prod_c.fk_categoria
        WHERE c.slug = $1 AND p.id <> $2
        GROUP BY p.id
        ORDER BY RANDOM()
        LIMIT 4   
        `,
            [colecao, id]
        );

        res.status(200).send(rows);
    });
});

app.get("/db/get-price/:id", (req, res) => {
    const { id } = req.params;

    tryExec(res, async () => {
        const { rows } = await pool.query(
            `
            SELECT
                preco
            FROM
                produtos
            WHERE id = $1
            `,
            [id]
        );

        res.status(200).send(rows);
    });
});

app.get("/db/get-cashback/:id/:qtd", (req, res) => {
    const { id, qtd } = req.params;
    tryExec(res, async () => {
        const { rows } = await pool.query(
            `
            SELECT
                (SUM(p.preco) * $2 * ((p.cashback))/100) AS preco
            FROM
                produtos p
            WHERE p.id = $1
            GROUP BY p.cashback
            `,
            [id, qtd]
        );

        res.status(200).send(rows);
    });
});

app.get("/db/get-tamanhos", (_, res) => {
    tryExec(res, async () => {
        const { rows } = await pool.query(
            `
            SELECT
                t.img,
                t.nome AS tamanho,
                t.slug AS tamanho_slug,
                c.titulo AS colecao,
                c.slug AS colecao_slug
            FROM
                tamanhos t
            INNER JOIN tamanho_colecao tc
                ON tc.fk_tamanho = t.id
                    INNER JOIN colecoes c
                        ON tc.fk_colecao = c.id
            WHERE t.ativo = 1
            GROUP BY t.id, c.titulo, c.slug
            `
        );

        res.status(200).send(rows);
    });
});

app.get("/db/get-banners-destaque", (_, res) => {
    tryExec(res, async () => {
        const { rows } = await pool.query(
            `
        SELECT
            bd.*,
            categ.slug AS categoria_slug,
            cole.slug AS colecao_slug
        FROM
            banners_destaque bd
        INNER JOIN colecao_categoria cc
            ON cc.id = bd.fk_colecao_categoria
                INNER JOIN categorias categ
                    ON cc.fk_categoria =  categ.id
            INNER JOIN colecoes cole
                ON cole.id = cc.fk_colecao
            `
        );

        res.status(200).send(rows);
    });
});

app.get("/db/get-banners", (_, res) => {
    tryExec(res, async () => {
        const { rows } = await pool.query(
            `
            SELECT
                b.*,
                cole.slug AS colecao_slug,
                categ.slug AS categoria_slug
            FROM
                banners b
            INNER JOIN colecao_categoria cc
                ON cc.id = b.fk_colecao_categoria
                    INNER JOIN categorias categ
                        ON cc.fk_categoria =  categ.id
                    INNER JOIN colecoes cole
                        ON cole.id = cc.fk_colecao
            WHERE b.tipo = 'home'
            `
        );

        res.status(200).send(rows);
    });
});

app.get("/db/get-hero", (_, res) => {
    tryExec(res, async () => {
        const { rows } = await pool.query(
            `
            SELECT
                b.*,
                cole.slug AS colecao_slug,
                categ.slug AS categoria_slug
            FROM
                banners b
            INNER JOIN colecao_categoria cc
                ON cc.id = b.fk_colecao_categoria
                    INNER JOIN categorias categ
                        ON cc.fk_categoria =  categ.id
                    INNER JOIN colecoes cole
                        ON cole.id = cc.fk_colecao
            WHERE b.tipo = 'hero'
            `
        );

        res.status(200).send(rows);
    });
});

app.get("/db/get-infos/:session", (req, res) => {
    const { session } = req.params;

    tryExec(res, async () => {
        const { rows } = await pool.query(
            `
            SELECT
                s.id AS session,
                s.email,
                json_agg(
                    json_build_object(
                        'id', e.id,
                        'cep', e.cep,
                        'endereco', e.endereco,
                        'numero', e.numero,
                        'complemento', e.complemento,
                        'cidade', e.cidade,
                        'uf', e.uf
                    )
                ) AS enderecos
            FROM
                sessions s
            INNER JOIN session_endereco se
                ON s.id = se.fk_session
                    INNER JOIN enderecos e
                        ON se.fk_endereco = e.id
            WHERE s.id = $1
            GROUP BY s.id, s.email
            `,
            [session]
        );

        res.status(200).send(rows);
    });
});

app.post("/db/set-cart/:id", async (req, res) => {
    const { id } = req.params;
    const { cart } = req.body;

    const promises = (cart as CarrinhoObjectInterface[]).map((v) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { rows } = await pool.query(
                    `
                    SELECT
                        p.*,

                        (SELECT json_agg(
                            json_build_object
                            (
                                'cor', cor.nome,
                                'hex', cor.cor_hex,
                                'imgs', (
                                            SELECT
                                                img.img
                                            FROM imagens img
                                            WHERE cor.id = img.fk_cor AND fk_produto = p.id
                                            LIMIT 1
                                        )
                            )
                        ) FROM
                                cores cor
                            INNER JOIN cor_produto cp
                                ON cp.fk_cor = cor.id
                            WHERE cp.fk_produto = p.id AND cor.nome = $1 
                        ) AS cores
                    FROM
                        produtos p
                    WHERE p.id = $2
                    GROUP BY p.id
                    `,
                    [v.cor, id]
                );
                if (rows.length && rows[0].cores.length > 0)
                    resolve({ ...rows[0], qtd: v.qtd, tamanho: v.tamanho });
                else reject(null);
            } catch (err) {
                console.log(err);
                reject(null);
            }
        });
    });

    const results = await Promise.all(promises);
    const prods = results.filter((v) => v !== null);

    res.status(200).send(prods);
});

app.post("/db/get-cupom", (req, res) => {
    const { cupom } = req.body;

    tryExec(res, async () => {
        const { rows } = await pool.query(
            `
            SELECT
                cupom,
                desconto
            FROM
                cupons
            WHERE cupom = $1 AND ativo = 1
            `,
            [cupom.toUpperCase()]
        );

        res.status(200).send(rows[0]);
    });
});

app.post("/db/set-session", (req, res) => {
    const { session } = req.body;

    tryExec(res, async () => {
        await pool.query(
            `
            INSERT INTO sessions(id)
                VALUES
                    ($1);
            `,
            [session]
        );

        res.status(200).send({ status: "ok" });
    });
});

app.post("/db/check-session", (req, res) => {
    const { session } = req.body;

    tryExec(res, async () => {
        const { rows } = await pool.query(
            `
            SELECT
                *
            FROM
                sessions
            WHERE id = $1
            `,
            [session]
        );

        if (rows.length)
            res.status(200).send({ message: "session cadastrado" });
        else {
            await pool.query(
                `
                    INSERT INTO sessions(id)
                        VALUES
                            ($1);
                    `,
                [session]
            );

            res.status(200).send({ status: "ok" });
        }
    });
});

app.post("/db/finalizar-compra", (req, res) => {
    const { form, cart, session } = req.body;
    const token = req?.cookies?.authToken;
    const { cep, endereco, numero, complemento, cidade, uf, total } = form;
    let { email } = form;
    if (token) {
        const decode = jwt.verify(token, KEY) as jwt.JwtPayload;
        email = decode.login;
    }

    tryExec(res, async () => {
        // --- vendo se endereço está cadastrado ---
        const { rows } = await pool.query(
            `
        SELECT
            e.id
         FROM
            session_endereco se
        INNER JOIN enderecos e
            ON e.id = se.fk_endereco
        INNER JOIN sessions s
            ON s.id = se.fk_session
        WHERE e.cep = $1 AND e.endereco = $2 AND e.numero = $3 AND e.complemento = $4 AND e.cidade = $5 AND e.uf = $6
        `,
            [cep, endereco, numero, complemento, cidade, uf]
        );

        if (rows.length) {
            // --- relacionando email com a seção ---
            await pool.query(
                `
                UPDATE sessions
                SET email = $1
                WHERE id = $2
                `,
                [email, session.session]
            );

            // --- Salvando compra ---
            const resultado = await pool.query(
                `
                INSERT INTO orders (data, total)
                VALUES (NOW(), $1)
                RETURNING id;
                `,
                [total]
            );

            // --- pegando id da compra ---
            const idOrder = resultado.rows[0].id;

            // --- salvando compra ---

            for (const v of Object.keys(cart)) {
                if (cart[v].length > 0) {
                    for (const value of cart[v] as CarrinhoObjectInterface[]) {
                        const valores = [
                            session.session,
                            rows[0].id,
                            v,
                            value.tamanho,
                            value.cor,
                            value.qtd,
                            idOrder,
                        ];
                        if (token) valores.push(email);

                        await pool.query(
                            `
                            INSERT INTO compras(fk_session, fk_endereco, fk_produto, fk_tamanho, fk_cor, qtd, fk_order${
                                token ? ",fk_usuario" : ""
                            })
                            VALUES
                                ($1, $2, $3,
                                (SELECT id FROM tamanhos WHERE nome = $4),
                                (SELECT id FROM cores WHERE nome = $5),
                                    $6, $7
                                    ${
                                        token
                                            ? `,(SELECT id FROM usuarios WHERE email=$8)`
                                            : ""
                                    })
                            `,
                            valores
                        );
                    }
                }
            }

            res.status(200).send({ order: idOrder });
        } else {
            // --- Cadastrando novo endereço ---
            const resultadoEndereco = await pool.query(
                `
                INSERT INTO enderecos(cep, endereco, numero, complemento, cidade, uf)
                VALUES($1, $2, $3, $4, $5, $6)
                RETURNING id;
                `,
                [cep, endereco, numero, complemento, cidade, uf]
            );
            // --- Pegando id endereco ---
            const lastID = resultadoEndereco.rows[0].id;

            // --- Vinculando endereço com a seção ---
            await pool.query(
                `INSERT INTO session_endereco (fk_session, fk_endereco)
                VALUES($1, $2)`,
                [session.session, lastID]
            );

            // --- Vinculando email com a seção ---
            await pool.query(
                `UPDATE sessions
                SET email = $1
                WHERE id = $2`,
                [email, session.session]
            );

            // --- criando uma nova compra ---
            const resultaOrder = await pool.query(
                `
                INSERT INTO orders (data, total)
                VALUES (NOW(), $1)
                `,
                [total]
            );

            // --- pegando id compra ---
            const idOrder = resultaOrder.rows[0].id;
            for (const v of Object.keys(cart)) {
                if (cart[v].length > 0) {
                    for (const value of cart[v] as CarrinhoObjectInterface[]) {
                        const valores = [
                            session.session,
                            lastID,
                            v,
                            value.tamanho,
                            value.cor,
                            value.qtd,
                            idOrder,
                        ];

                        if (token) valores.push(email);

                        // --- salvando a compra ---
                        await pool.query(
                            `
                            INSERT INTO compras(fk_session, fk_endereco, fk_produto, fk_tamanho, fk_cor, qtd, fk_order${
                                token ? ",fk_usuario" : ""
                            })
                            VALUES
                                ($1, $2, $3,
                                (SELECT id FROM tamanhos WHERE nome = $4),
                                (SELECT id FROM cores WHERE nome = $5),
                                    $6, $7
                                    ${
                                        token
                                            ? `,(SELECT id FROM usuarios WHERE email=$8)`
                                            : ""
                                    })
                            `,
                            valores
                        );
                    }
                }
            }

            res.status(200).send({ order: idOrder });
        }
    });
});

app.listen(3000, () => console.log("No Ar!"));
