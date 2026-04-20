# Kanban Board Modular

Este projeto reorganiza o antigo `index.html` monolitico em uma estrutura mais profissional para evolucao incremental.

## Estrutura

`index.html`
Ponto de entrada da aplicacao e shell da interface.

`assets/css/main.css`
Estilos centralizados da aplicacao.

`src/main.js`
Bootstrap da aplicacao e injecao simples das dependencias.

`src/models`
Entidades e regras basicas de validacao do dominio.

`src/services`
Regras de negocio, persistencia, importacao/exportacao e notificacoes.

`src/controllers`
Coordenacao entre interface, services e fluxo de usuario.

`src/views`
Renderizacao de colunas, cards e modal.

`src/routes`
Centralizacao dos eventos da interface, substituindo handlers inline no HTML.

`src/utils`
Funcoes utilitarias de data e manipulacao de formulario/HTML.

## Beneficios da refatoracao

- Remove acoplamento entre HTML e JavaScript inline.
- Separa estado, regras de negocio e renderizacao.
- Facilita testes unitarios em services e models.
- Permite crescimento por modulo sem transformar o projeto em outro arquivo gigante.

## Proximos passos sugeridos

- Adicionar build com Vite para ambiente de desenvolvimento mais robusto.
- Criar testes para `BoardService` e `Card`.
- Extrair componentes visuais reutilizaveis conforme a aplicacao crescer.
