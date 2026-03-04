# Plataforma Educativa com IA (Desafio de Engenharia de Prompt)

Este projeto foi desenvolvido como parte de um Desafio Técnico de Estágio em IA e Engenharia de Prompt. 
A aplicação tem como objetivo gerar conteúdos educativos personalizados para alunos de diferentes níveis, idades e estilos de aprendizado, utilizando inteligência artificial diretamente pela API do Google/Gemini.

## 🎯 Objetivo

Criar um sistema capaz de receber tópicos e o perfil do aluno (idade, nível de conhecimento, estilo de aprendizado) e gerar materiais educativos otimizados por meio de técnicas avançadas de engenharia de prompt, como *Chain-of-Thought*, *Persona Prompting* e formatação de saídas JSON.

## ✨ Funcionalidades

- **Sistema de Perfil de Aluno:** Armazenamento e seleção de perfis diversificados (iniciantes, intermediários, avançados) com diferentes idades e estilos (visual, auditivo, leitura-escrita, cinestésico).
- **Motor de Engenharia de Prompt:** Geração de quatro tipos distintos de materiais educativos a partir de uma mesma entrada:
  - Explicação conceitual de forma gradativa (utilizando *Chain-of-Thought*).
  - Exemplos práticos contextualizados.
  - Perguntas de reflexão para estimular o pensamento crítico.
  - Resumo em formato visual (mapa mental/diagrama ou descrição textual dependente do aprendizado).
- **Interface e API RESTful:** Servidor desenvolvido em Node.js com uma API expostaa (Express) e uma interface web para interação direta do usuário e simulação do resultado.
- **Relatórios Fixos:** Armazenamento dos resultados gerados em arquivos `.json` salvos com timestamps, facilitando debug e comparação.

## 🛠 Tecnologias Utilizadas

- **Linguagens e Ferramentas:** JavaScript (Node.js), HTML, e CSS puro.
- **Backend:** Express
- **Integração IA:** `@google/genai` (SDK Oficial do Gemini) e axios.
- **Outras Dependências:** `dotenv`

## ⚙️ Pré-requisitos e Configuração

Antes de iniciar você vai precisar do [Node.js](https://nodejs.org/) instalado na máquina e de uma chave de API válida do [Google Gemini](https://aistudio.google.com/app/apikey).

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/Cleber-Victor/Challenge-AI-and-Prompting-Engineering.git
   cd Challenge-AI-and-Prompting-Engineering
   ```

2. **Instale as dependências NPM:**
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente:**
   Copie ou modifique o arquivo `.env.example` para `.env` e insira sua chave da API da seguinte forma:
   ```env
   GEMINI_API_KEY=sua_chave_aqui
   ```

4. **Inicie o Servidor Local:**
   ```bash
   npm start
   ```
   *(Ou execute `node src/index.js` caso o script start não tenha sido configurado).* 
   O servidor subirá na porta especificada na variável PORT (`http://localhost:${PORT}`). Acesse a página via navegador para usar a interface.

## 📖 Como Usar as Features

1. Abra a página inicial que foi servida.
2. Selecione o **Perfil do Aluno** e preencha o **Tópico** a ser ensinado (ex: "Sistema Solar", "Física Quântica", "Frações Médias", etc).
3. Selecione o que deseja gerar no formulário e clique no botão de geração.
4. O backend criará prompts distintos estruturados com dados do estudante, chamará a API do modelo e retornará dados contextualizados.
5. Os JSONs de resposta e metadados com amostras serão guardados no diretório `/samples` ou `/src/samples/` para averiguação da exatidão das prompts.

## 🧠 Engenharia de Prompt

As técnicas de prompt estão devidamente documentadas e argumentadas em seu próprio arquivo.
Consulte [`PROMPT_ENGINEERING_NOTES.md`](./PROMPT_ENGINEERING_NOTES.md) para entender detalhadamente o uso e funcionamento interno do motor sob as táticas de:
- Elicitação de Persona (Adotando papel educacional específico).
- Configuração e Preenchimento de Contexto.
- Geração passo a passo (*Chain-of-thought*).
- Parametrizações de Respostas via JSON Strict.

## 📂 Estrutura do Projeto

* `public/` - Scripts, CSS e HTML estáticos providos pelo backend.
* `src/` - Lógica de negócios e código-fonte da aplicação.
  - `data/` - Base de perfis e configurações.
  - `samples/` - Amostras geradas de respostas e logs.
  - `services/` - Sub-serviços para lidar com a interação da API e manipulação dos retornos.
  - `index.js` - Arquivo de entry-point e controladoras express.
* `PROMPT_ENGINEERING_NOTES.md` - Avaliação geral do desafio e das métricas das táticas executadas.

---
*Desenvolvido por Cleber Victor para o Desafio Técnico.*
