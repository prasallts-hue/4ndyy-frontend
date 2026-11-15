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
O botão **Explore Demo** abre a área interna sem criar conta ou chamar o backend. A sessão local de demonstração usa o perfil `Kandi Guest`, saldos fictícios de KANBUX/KIX e itens de catálogo de exemplo. É apenas uma prévia visual; nenhum dado é enviado ou salvo no servidor. O botão Log Out encerra a prévia e retorna à tela inicial.

Por padrão, `API_BASE` fica vazio em `js/config.js`. Nesse modo, cadastro/login também são simulados localmente e não criam contas reais.

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
