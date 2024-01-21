CREATE DATABASE dindin;

CREATE TABLE usuarios(
	id serial primary key,
  nome text not null,
  email text not null unique,
  senha text not null
);

CREATE TABLE categorias(
	id serial primary key,
  descricao text not null
);

CREATE TABLE transacoes(
	id serial primary key,
  descricao text not null,
  valor integer not null,
  data date,
  categoria_id integer references categorias(id),
  usuarios_id integer references usuarios(id),
  tipo text not null
);

INSERT INTO categorias
(descricao)
values
('alimentação'),
('Assinaturas e Serviços'),
('Casa'),
('Mercado'),
('Cuidados Pessoais'),
('Educação'),
('Família'),
('Lazer'),
('Pets'),
('Presentes'),
('Roupas'),
('Saude'),
('Transporte'),
('Salário'),
('Salário'),
('Outras receitas'),
('Outras despesas');
