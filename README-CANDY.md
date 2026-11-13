# CANDY Frontend

Base de identidade CANDY e adaptador para futura API.

## Configurar backend
Edite `assets/js/candy-config.js` e defina `apiBaseUrl` e os caminhos reais em `endpoints`. O cliente fica disponível em `window.CANDY_API`.

Exemplo de configuração (ajuste ao contrato real da API):
```js
window.CANDY_CONFIG={apiBaseUrl:"https://sua-api.exemplo",credentials:"include",endpoints:{login:"/auth/login",register:"/auth/register",logout:"/auth/logout",currentUser:"/auth/me"}};
```

Não coloque segredos no frontend. Configure CORS no backend. A API ainda não está conectada porque nenhum backend ou contrato de endpoints foi fornecido. Os formulários antigos ainda precisam ser integrados e testados. Recursos e scripts remotos herdados foram mantidos para não quebrar funções existentes.


## Identidade visual e ícones
O frontend usa a identidade rosa e branco da CANDY e a slogan **Powering Criativity**. Os logotipos, favicon e ícones editáveis ficam em `/imagens`; os ícones de interface estão em `/imagens/icons`. O registro de caminhos fica em `assets/js/candy-assets.js` e os caminhos principais ficam em `assets/js/candy-config.js`. Para trocar um ícone sem alterar o código, substitua o SVG pelo novo arquivo mantendo o mesmo nome. Para criar ou renomear ícones, atualize o registro em `candy-assets.js`.

As imagens dinâmicas de avatares, usuários, jogos e itens continuam dependendo do serviço de thumbnails/backend e não são substituídas pelos ícones estáticos.
