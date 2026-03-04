# Notas de Engenharia de Prompt 🧠

Este documento descreve as estratégias e técnicas de Engenharia de Prompt aplicadas na construção da camada de inteligência estruturada (LLM) neste projeto. 

As estratégias foram pensadas e aplicadas nos arquivos em `src/services/promptService.js` com o objetivo de obter respostas mais ricas, guiadas e aderentes ao perfil de cada estudante, minimizando a alucinação e maximizando a objetividade.

---

## 🏗 Estrutura Base de Construção de Prompts

Nosso serviço central gera quatro tipos diferentes de conteúdo educativo usando um **Framework Estruturado de Prompt** que divide as instruções da IA nas seguintes sessões:

1. **Persona (Quem a IA deve ser)**
2. **Context (Conhecimento externo e Alvo/Perfil do Aluno)**
3. **Task & Chain-of-Thought (Instrução Central e Passos Estruturados)**
4. **Requirement & Output Format (Formatação Estrita Restritiva, ex: JSON)**

---

## 🎯 Técnicas Aplicadas por Serviço Otimizado (v2)

### 1. Explicação Conceitual

**Técnicas utilizadas:**
*   **Persona Prompting:** `Você é um pesquisador e educador renomado na área de... Sua missão é transformar conceitos complexos em conhecimento acessível.`
    *   *Objetivo:* Traçar um comportamento didático e de alta precisão ao mesmo tempo.
*   **Context Setting:** É injetado o **Nome, Idade, Nível e Estilo de Aprendizado** do estudante.
    *   *Objetivo:* Guiar a IA para atingir o grau de complexidade adequado ao contexto.
*   **Chain-of-Thought (CoT):** 
    ```text
    Pense passo a passo:
    1. Analise o nível [X] para selecionar termos adequados.
    2. Desenvolva uma analogia para o estilo [Y] e idade de [Z] anos.
    3. Estruture a explicação de forma lógica e progressiva.
    ```
    *   *Objetivo:* Forçar a IA a elencar internamente os pormenores antes de gerar o conteúdo final, baseando a explicação profundamente em *analogias voltadas para a idade e estilo*.

### 2. Exemplos Práticos

**Técnicas utilizadas:**
*   **Persona Específica:** `Você é um mentor prático especialista em...`
*   **Task/CoT Otimizada:** 
    ```text
    Pense passo a passo:
    1. Identifique situações do cotidiano (jogos, escola, redes sociais).
    2. Adapte a complexidade para o nível do aluno.
    ```
    *   *Objetivo:* Fazer a IA fugir de exemplos padrão/clichês de livro didático para recorrer a vivências do cotidiano do aluno (como videogames, redes sociais), principalmente com base na sua tenra ou adulta idade.

### 3. Perguntas de Reflexão (Pensamento Crítico)

**Técnicas utilizadas:**
*   **Persona Prompting:** `Você é um Tutor Socrático especializado em pensamento crítico...`
    *   *Objetivo:* O "Método Socrático" obriga a IA a montar a estrutura na base da dúvida e dialética.
*   **Task/CoT Diretiva:**
    ```text
    1. Crie um cenário de falha ("O que acontece se...").
    2. Crie um dilema de escolha.
    3. Provoque o sentido (Ex: Visão) do aluno.
    ```
    *   *Objetivo:* Em vez de criar perguntas fechadas ("Sim/Não"), a regra de "Cenário de Falha" produz questões mais ricas de análise. Evocando o sentido primário de aprendizagem do aluno na pergunta.

### 4. Resumo em Formato Visual (Mapa Mental)

**Técnicas utilizadas:**
*   **Persona:** `Designer Instrucional veterano...`
*   **Zero-Shot Restritivo com Constraint Design:** 
    ```text
    Máximo 15 linhas/40 colunas, use hierarquia visual (+--, |).
    ```
    *   *Objetivo:* Os LLMs tendem a se perder ao gerar ASCII art ou formatar diagramas textuais. Colocando restrição de linhas/colunas e fornecendo os exatos caracteres que geram a "hierarquia visual", a resposta costuma ser perfeitamente encaixada e bem renderizada na tela depois.

---

## ⚖️ Comparativo de Versionamento (v1 vs v2)

Através do parâmetro `version` nas funções de serviço, o sistema pode alternar da tática avançada descrita acima para o que chamamos de "Zero-shot básico", ou `version='v1'`.

*   **Prompt v1 (Zero-Shot Genérico):** `Explique o conceito de [Tópico] para [Aluno].`
*   **Prompt v2 (Estruturado + CoT + Format):** 

