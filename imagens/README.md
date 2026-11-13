# CANDY — identidade visual e imagens

A identidade visual usa rosa e branco. A slogan oficial exibida no frontend é **Powering Criativity**.

## Onde trocar as imagens
- `logo.svg`: logotipo horizontal.
- `logo-mark.svg`: símbolo compacto.
- `favicon.svg`: ícone da aba do navegador.
- `icons/`: ícones da interface (menu, busca, notificações, mensagens, amigos, configurações, jogos, avatar shop, criação e K4NDY).

Os caminhos ficam centralizados em `assets/js/candy-config.js` e o registro dos ícones fica em `assets/js/candy-assets.js`. Para trocar um ícone, substitua o SVG correspondente mantendo o mesmo nome, ou altere o registro em `candy-assets.js`.

As imagens dinâmicas de usuários, avatares, itens e jogos continuam sendo carregadas pelo backend/serviço de thumbnails; elas não são ícones estáticos e não devem ser substituídas por imagens genéricas.
