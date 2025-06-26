# isi-dev-1-product-api
Desafio fiepe

## Como rodar o projeto

- Criar um arquivo .env (.env.example pode ser copiado)

- Levantar a instância do Postgres no docker compose :
 `docker compose up`

- Instalar o npm
 `npm install`

- Rodar as migrations no banco
 `npx prisma migrate dev`

- Levantar a aplicação
`npm run dev`

## Estrutura do projeto
 
 O projeto foi feito em monolito com três camadas principais no back-end: controller, use case e repository. Onde o controller é resonsável pelas requisições e respostas HTTP, o use case com a lógica de negócios, repository com o acesso aos dados e uma pasta utils com algumas funções.

## Tecnologias Utilizadas
 
 Escrito em Typescript, framework web Fastify, Prisma como ORM, Database Postgresql rodando no docker, Zod como biblioteca de validação e outra bibliotecas como diacritics que substitui diacriticos para normalizar uma string. 

## Rotas

- Products

`GET /products` 
`GET /products/{id}` 
`POST /products`  
`PATCH /products/{id}`  
`DELETE /products/{id}`   
`POST /products/{id}/restore` 
`POST /products/{id}/discount/percent` 
`POST /products/{id}/discount/coupon`  
`DELETE /products/{id}/discount`

- Coupons
`GET /coupons`
`POST /coupons`
`GET /coupons/{code}`
`PATCH /coupons/{code}`
`DELETE /coupons/{code}`
