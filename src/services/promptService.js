import studentService from "./readStudant.js";

const promptService = {
  async buildPromptExplicacaoConceitual(studentId, topic) {
    const student = await studentService.getById(studentId);

    const persona = `Você é um pesquisador e educador renomado na área de ${topic}. Sua missão é transformar conceitos complexos em conhecimento acessível.`;

    const context = `Aluno: ${student.nome}, ${student.idade} anos, nível ${student.nivel}, estilo ${student.estilo_aprendizado}.`;

    const task = `Explique o conceito de ${topic}. 
    Pense passo a passo (Chain-of-Thought):
    1. Analise o nível ${student.nivel} para selecionar termos adequados.
    2. Desenvolva uma analogia para o estilo ${student.estilo_aprendizado} e idade de ${student.idade} anos.
    3. Estruture a explicação de forma lógica e progressiva.`;

    const format = `Retorne EXCLUSIVAMENTE um JSON: 
    { "explicacao": "texto final da explicação" }`;

    return `${persona}\n\nPERFIL: ${context}\n\nTAREFA: ${task}\n\nREQUISITO: ${format}`;
  },

  async buildPromptExemplosPraticos(studentId, topic) {
    const student = await studentService.getById(studentId);

    const persona = `Você é um mentor prático especialista em ${topic}.`;

    const context = `Aluno: ${student.nome}, ${student.idade} anos, nível ${student.nivel}, estilo ${student.estilo_aprendizado}.`;

    const task = `Forneça 3 exemplos práticos de ${topic} vividos por alguém de ${student.idade} anos.
    Pense passo a passo:
    1. Identifique situações do cotidiano (jogos, escola, redes sociais).
    2. Adapte a complexidade para o nível ${student.nivel}.`;

    const format = `Retorne EXCLUSIVAMENTE um JSON:
    { "exemplos": [ { "titulo": "...", "descricao": "..." } ] }`;

    return `${persona}\n\nPERFIL: ${context}\n\nTAREFA: ${task}\n\nREQUISITO: ${format}`;
  },

  async buildPromptPerguntasReflexao(studentId, topic) {
    const student = await studentService.getById(studentId);

    const persona = `Você é um Tutor Socrático especializado em pensamento crítico para alunos de ${student.idade} anos.`;

    const context = `Aluno: ${student.nome}, nível ${student.nivel}, estilo ${student.estilo_aprendizado}.`;

    const task = `Projete 3 perguntas de reflexão sobre ${topic}. 
    Pense passo a passo:
    1. Crie um cenário de falha ("O que acontece se...").
    2. Crie um dilema de escolha para o nível ${student.nivel}.
    3. Provoque o sentido ${student.estilo_aprendizado} do aluno.`;

    const format = `Retorne EXCLUSIVAMENTE um JSON:
    { "perguntas": [ { "id": 1, "pergunta": "..." } ] }`;

    return `${persona}\n\nPERFIL: ${context}\n\nTAREFA: ${task}\n\nREQUISITO: ${format}`;
  },

  async buildPromptResumoVisual(studentId, topic) {
    const student = await studentService.getById(studentId);

    const persona = `Você é um Designer Instrucional veterano especialista em ${topic}.`;

    const context = `Aluno: ${student.nome}, nível ${student.nivel}, estilo ${student.estilo_aprendizado}.`;

    const task = `Crie um mapa mental em ASCII sobre ${topic}.
    Regras de Design: Máximo 15 linhas/40 colunas, use hierarquia visual (+--, |).`;

    const format = `Retorne EXCLUSIVAMENTE um JSON:
    { "diagrama_ascii": "..." }`;

    return `${persona}\n\nPERFIL: ${context}\n\nTAREFA: ${task}\n\nREQUISITO: ${format}`;
  },
};

export default promptService;
