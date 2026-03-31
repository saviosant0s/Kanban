\# 🗺️ Plano de Implementação: Kanban Board



> Documento vivo detalhando a evolução do projeto Kanban Board, desde o MVP estático de interface até uma aplicação Full-Stack completa.



\## 🚀 Fase 1: MVP Frontend (Fundação)

\*Status: `\[✓] Concluído`\*



Foco em estabelecer a interface de usuário, a lógica de estado no navegador e uma usabilidade limpa, aplicando boas práticas de design visual.



\### Interface e UX

\- \[x] \*\*Estrutura e Semântica:\*\* HTML5 bem estruturado.

\- \[x] \*\*Estilização Avançada:\*\* Dark Mode, tipografia moderna (Syne/DM Sans) e uso de variáveis CSS para facilitar manutenção e temas.

\- \[x] \*\*Layout Responsivo:\*\* Utilização robusta de CSS Grid e Flexbox.



\### Gestão de Estado (Vanilla JS)

\- \[x] \*\*CRUD em Memória:\*\* Lógica para Criar, Ler, Atualizar e Deletar tarefas dinamicamente.

\- \[x] \*\*Persistência Local:\*\* Salvamento de dados no navegador utilizando `localStorage`.



\### Funcionalidades Core

\- \[x] \*\*Sistema de Colunas:\*\* A Fazer, Em Progresso, Concluído.

\- \[x] \*\*Formulário Modal:\*\* Inserção e edição com Título, Descrição, Prioridade, Data e Coluna.

\- \[x] \*\*Drag and Drop:\*\* Movimentação fluida de cards utilizando a API nativa do HTML5.

\- \[x] \*\*Filtros e Ordenação:\*\* Ordenação Padrão, por Prioridade e por Data Mais Próxima.

\- \[x] \*\*Alertas Visuais:\*\* Identificadores visuais de prazo (tags de data vencida ou próxima).



\---



\## 🛠️ Fase 2: Refatoração e Micro-Interações

\*Status: `\[Em Andamento]`\*



Aprimoramento da arquitetura do código e da experiência do usuário antes de conectar ao servidor.



\### Arquitetura de Código

\- \[ ] \*\*Modularização:\*\* Separar o projeto da Fase 1 em arquivos distintos (`index.html`, `style.css` e `script.js`) para um código mais limpo.



\### Usabilidade

\- \[ ] \*\*Suporte Mobile (Touch):\*\* Adaptar o Drag \& Drop para telas sensíveis ao toque (via Touch Events ou bibliotecas leves como \*SortableJS\*).

\- \[ ] \*\*Feedback Visual (Toasts):\*\* Adicionar notificações na tela ao salvar, editar ou excluir cards.

\- \[ ] \*\*Validação de Formulários:\*\* Impedir datas de entrega retroativas na criação de novas tarefas.



\---



\## ⚙️ Fase 3: Integração Backend e Persistência Real

\*Status: `\[Planejado]`\*



Transformação do projeto em uma aplicação Full-Stack com banco de dados relacional.



\### Modelagem de Dados

\- \[ ] \*\*Banco de Dados:\*\* Criação do esquema relacional (MySQL via XAMPP ou PostgreSQL).

\- \[ ] \*\*Tabela `users`:\*\* `id`, `nome`, `email`, `senha`.

\- \[ ] \*\*Tabela `tasks`:\*\* `id`, `user\_id`, `titulo`, `descricao`, `prioridade`, `data\_entrega`, `status\_coluna`.



\### Desenvolvimento da API (PHP / Python)

\- \[ ] \*\*Configuração do Servidor:\*\* Estruturação do ambiente local de desenvolvimento.

\- \[ ] \*\*Endpoints RESTful:\*\* Criação das rotas e controladores de GET, POST, PUT e DELETE para gerenciar as tarefas de forma segura (aplicando conceitos de PDO e queries preparadas).

\- \[ ] \*\*Integração Front-Back:\*\* Conectar o front-end à API via `fetch()` assíncrono, removendo a dependência do `localStorage`.



\### Segurança e Autenticação

\- \[ ] \*\*Sistema de Login:\*\* Construção de telas e lógica de Autenticação e Cadastro.

\- \[ ] \*\*Proteção de Rotas:\*\* Implementação de tokens (JWT) ou controle nativo de sessão para isolar as tarefas de cada usuário.



\---



\## 🔮 Fase 4: Recursos Avançados (Visão de Futuro)

\*Status: `\[Backlog]`\*



Expansão do escopo para transformar o Kanban em uma ferramenta mais robusta de produtividade ou em um módulo de sistemas maiores.



\- \[ ] \*\*Múltiplos Quadros (Boards):\*\* Suporte a diferentes projetos simultâneos.

\- \[ ] \*\*Subtarefas (Checklists):\*\* Listas de verificação dentro de cada card individual.

\- \[ ] \*\*Tags Personalizadas:\*\* Etiquetas coloridas customizáveis além da prioridade base (ex: "Bug", "Design", "Marketing").

\- \[ ] \*\*Dashboard Estatístico:\*\* Tela de resumo com métricas de produtividade, como tarefas concluídas na semana.

