# Project Kandi Frontend

Frontend estático do Project Kandi, inspirado nas interfaces sociais e de jogos de 2012–2018, com identidade rosa própria.

## Estrutura
- `index.html` — cadastro, login, Home e Catálogo.
- `css/style.css` — identidade visual responsiva.
- `js/config.js` — URL da API, autenticação e rotas.
- `js/api.js` — camada de comunicação com o backend e modo demonstração.
- `js/app.js` — navegação, formulários e catálogo.
- `imagens/` — SVGs locais usados no site; troque os arquivos mantendo os nomes para substituir imagens.

## Modo demonstração
Por padrão, `API_BASE` fica vazio em `js/config.js`. Nesse modo, cadastro/login são simulados localmente no navegador e o catálogo aparece vazio. Isso permite testar a interface, mas não cria contas reais.

## Backend
Para conectar a API, defina `API_BASE` e confira se o backend implementa as rotas configuradas:
- POST `/auth/signup`
- POST `/auth/login`
- POST `/auth/logout`
- GET `/me`
- GET `/catalog/items`

O contrato esperado está documentado em `js/config.js` e na camada `js/api.js`. Ajuste CORS no backend para o domínio de hospedagem. Não habilite a conexão de produção antes de confirmar que as rotas e o formato das respostas são compatíveis.

## Publicação
Pode ser servido como site estático por qualquer hospedagem compatível com HTML/CSS/JS. A página de entrada é `index.html`.
