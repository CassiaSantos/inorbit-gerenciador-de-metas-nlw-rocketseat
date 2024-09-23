# inOrbit: Gerenciador de Metas - Node.js e JavaScript 👩‍🚀💜

Este projeto é o inOrbit - um **Gerenciador de Metas** desenvolvido com **Node.js** e **JavaScript** durante o evento **Next Level Week (NLW) Pocket** da **Rocketseat**, sob a orientação de **Mayk Brito** (@maykbrito). O aplicativo permite que os usuários cadastrem, listem, concluam, visualizem e deletem metas diretamente no console.

## Funcionalidades 🎯

- **Cadastrar Metas**: Adicione novas metas, definindo o que deseja realizar.
- **Listar Metas**: Visualize todas as metas cadastradas, com a opção de marcar metas como concluídas.
- **Metas Realizadas**: Exiba metas que foram marcadas como concluídas.
- **Metas Abertas**: Exiba metas que ainda não foram concluídas.
- **Deletar Metas**: Permite excluir metas selecionadas.
- **Persistência de Dados**: As metas são salvas em um arquivo `metas.json`, permitindo que os dados sejam persistidos entre as sessões.

## Pré-requisitos 🛠️

- Node.js (versão 14 ou superior)
- NPM (Node Package Manager)

## Como Rodar o Projeto 👩‍💻

1. Clone este repositório:

   ```bash
   git clone https://github.com/CassiaSantos/inorbit-gerenciador-de-metas-nlw-rocketseat.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd inorbit-gerenciador-de-metas-nlw-rocketseat
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o aplicativo:

   ```bash
   node index.js
   ```

## Arquitetura 💻

O projeto utiliza o pacote `@inquirer/prompts` para criar prompts interativos no terminal e o módulo nativo `fs` do Node.js para manipular arquivos JSON. As metas cadastradas são persistidas em um arquivo `metas.json`.

### Estrutura de Arquivos 📂

- `index.js`: Arquivo principal que contém toda a lógica do aplicativo.
- `metas.json`: Arquivo onde as metas são armazenadas em formato JSON.

## Como Funciona ⚙️

### Cadastrar uma Meta 📝

Ao iniciar o aplicativo, o usuário pode escolher a opção **Cadastrar Meta** e inserir uma meta. O texto da meta será salvo na lista de metas e no arquivo `metas.json`.

### Listar e Concluir Metas 🆗

Na opção **Listar Metas**, todas as metas cadastradas serão exibidas. O usuário pode marcar metas como concluídas utilizando as setas do teclado e a barra de espaço.

### Exibir Metas Realizadas ou Abertas 👀

As opções **Metas Realizadas** e **Metas Abertas** permitem filtrar metas concluídas ou não concluídas, exibindo a quantidade de metas em cada estado.

### Deletar Metas 🗑️

A opção **Deletar Metas** permite ao usuário remover metas específicas, garantindo uma interface limpa e organizada.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **JavaScript**: Linguagem de programação usada para a lógica do projeto.
- **@inquirer/prompts**: Biblioteca de prompts interativos no console.
- **fs**: Módulo nativo do Node.js para manipulação de arquivos.

## Créditos

Este projeto foi desenvolvido como parte da **NLW Pocket** oferecida pela **Rocketseat**, com a mentoria de **Mayk Brito** (@maykbrito).😁💜