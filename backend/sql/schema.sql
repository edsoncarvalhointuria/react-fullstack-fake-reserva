CREATE TABLE IF NOT EXISTS usuarios(
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  senha TEXT NOT NULL,
  nome TEXT NOT NULL,
  sobrenome TEXT,
  cpf TEXT UNIQUE NOT NULL,
  genero TEXT NOT NULL,
  data_nascimento DATE NOT NULL,
  telefone TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tamanhos(
  id SERIAL PRIMARY KEY,
  nome TEXT UNIQUE NOT NULL,
  img TEXT DEFAULT(null),
  ativo INTEGER DEFAULT(0)
);

CREATE TABLE IF NOT EXISTS sessions(
  id TEXT UNIQUE,
  email TEXT
);

CREATE TABLE IF NOT EXISTS orders(
  id SERIAL PRIMARY KEY,
  data TIMESTAMP WITH TIME ZONE DEFAULT(NOW()),
  total REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS opcoes(
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  ativo INTEGER DEFAULT(0)
);

CREATE TABLE IF NOT EXISTS enderecos(
  id SERIAL PRIMARY KEY,
  cep TEXT NOT NULL,
  endereco TEXT NOT NULL,
  numero TEXT NOT NULL,
  complemento TEXT,
  cidade TEXT NOT NULL,
  uf TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cupons(
  id SERIAL PRIMARY KEY,
  cupom TEXT NOT NULL UNIQUE,
  desconto REAL DEFAULT(0), 
  ativo INTEGER DEFAULT(0)
);

CREATE TABLE IF NOT EXISTS cores(
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  cor_hex TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS banners(
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  img TEXT NOT NULL,
  tipo TEXT NOT NULL,
  ativo INTEGER DEFAULT(0),
  fk_colecao_categoria INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS colecoes(
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  fk_banner INTEGER REFERENCES banners(id),
  ativo INTEGER DEFAULT(0)
);

CREATE TABLE IF NOT EXISTS produtos(
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  img TEXT NOT NULL,
  hover_img TEXT NOT NULL,
  estoque INTEGER NOT NULL,
  preco REAL NOT NULL,
  preco_antigo REAL NOT NULL,
  sem_juros INTEGER DEFAULT(1),
  cashback INTEGER NOT NULL,
  ativo INTEGER DEFAULT(0),
  fk_colecao INTEGER REFERENCES colecoes(id) NOT NULL
);

CREATE TABLE IF NOT EXISTS imagens(
  id SERIAL PRIMARY KEY,
  img TEXT NOT NULL,
  fk_cor INTEGER REFERENCES cores(id) NOT NULL,
  fk_produto INTEGER REFERENCES produtos(id) NOT NULL
);


CREATE TABLE IF NOT EXISTS categorias(
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  ativo INTEGER DEFAULT(0)
);


CREATE TABLE IF NOT EXISTS banners_destaque(
  id SERIAL PRIMARY KEY,
  desc1 TEXT,
  desc2 TEXT,
  titulo TEXT NOT NULL,
  btn TEXT NOT NULL,
  img TEXT NOT NULL,
  tipo TEXT NOT NULL,
  ativo INTEGER DEFAULT(0),
  fk_colecao_categoria INTEGER,
  fk_produto INTEGER REFERENCES produtos(id)
);

CREATE TABLE IF NOT EXISTS tamanho_colecao(
  id SERIAL PRIMARY KEY,
  fk_colecao INTEGER REFERENCES colecoes(id) NOT NULL,
  fk_tamanho INTEGER REFERENCES tamanhos(id) NOT NULL
);

CREATE TABLE IF NOT EXISTS session_endereco(
  id SERIAL PRIMARY KEY,
  fk_session TEXT REFERENCES sessions(id) NOT NULL,
  fk_endereco INTEGER REFERENCES enderecos(id) NOT NULL
);

CREATE TABLE IF NOT EXISTS produto_tamanho(
  id SERIAL PRIMARY KEY,
  fk_produto INTEGER REFERENCES produtos(id) NOT NULL,
  fk_tamanho INTEGER REFERENCES tamanhos(id) NOT NULL
);

CREATE TABLE IF NOT EXISTS produto_categoria(
  id SERIAL PRIMARY KEY,
  fk_produto INTEGER REFERENCES produtos(id) NOT NULL,
  fk_categoria INTEGER REFERENCES categorias(id) NOT NULL
);

CREATE TABLE IF NOT EXISTS cor_produto(
  id SERIAL PRIMARY KEY,
  fk_cor INTEGER REFERENCES cores(id) NOT NULL,
  fk_produto INTEGER REFERENCES produtos(id) NOT NULL
);

CREATE TABLE IF NOT EXISTS colecao_categoria(
  id SERIAL PRIMARY KEY,
  fk_colecao INTEGER REFERENCES colecoes(id) NOT NULL,
  fk_categoria INTEGER REFERENCES categorias(id) NOT NULL
);

CREATE TABLE IF NOT EXISTS categoria_opcao(
  id SERIAL PRIMARY KEY,
  fk_categoria INTEGER REFERENCES categorias(id) NOT NULL,
  fk_opcao INTEGER REFERENCES opcoes(id) NOT NULL
);

CREATE TABLE IF NOT EXISTS compras (
  id SERIAL PRIMARY KEY,
  fk_session TEXT REFERENCES sessions(id) NOT NULL,
  fk_endereco INTEGER REFERENCES enderecos(id) NOT NULL,
  fk_produto INTEGER REFERENCES produtos(id) NOT NULL,
  fk_tamanho INTEGER REFERENCES tamanhos(id) NOT NULL,
  qtd INTEGER NOT NULL,
  data TIMESTAMP WITH TIME ZONE DEFAULT(NOW()),
  finalizado INTEGER DEFAULT(0),
  fk_order INTEGER REFERENCES orders(id) NOT NULL,
  fk_usuario INTEGER REFERENCES usuarios(id) NOT NULL
);

ALTER TABLE banners
ADD CONSTRAINT banners_fk_colecao_categoria FOREIGN KEY(fk_colecao_categoria) REFERENCES colecao_categoria(id);

ALTER TABLE banners_destaque
ADD CONSTRAINT banners_destaque_fk_colecao_categoria FOREIGN KEY(fk_colecao_categoria) REFERENCES colecao_categoria(id);