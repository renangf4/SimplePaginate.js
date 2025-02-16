# SimplePaginate.js

Um simples script de paginação usando jQuery.

## 🚀 Como Usar

Inclua o `pagination.js` no seu projeto:

```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="pagination.js"></script>
```

### 📌 Exemplo de Uso  

Chame a função no seu código:

```javascript
generatePagination('.js-pagination', '.js-pagination-item', 12, 'Prev', 'Next');
```

### 📖 Parâmetros:
**`.js-pagination`** → Seletor do contêiner da paginação.
**`.js-pagination-item`** → Seletor dos itens que serão paginados.
**`12`** → Número de itens por página.
**`'Prev'` / `'Next'`** → Texto dos botões de navegação.

## 📄 Licença  

Este projeto está licenciado sob a licença **MIT**.