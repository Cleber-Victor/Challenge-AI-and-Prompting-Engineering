import studentService from "./readStudant.js";

const promptService = {
  async buildPrompt(studentId, topic, type) {
    const student = await studentService.getById(studentId);

    const persona =
      "Você é um professor experiente em Pedagogia, focado em educação personalizada e inclusiva.";

    const context = `O aluno se chama ${student.nome}, tem ${student.idade} anos, nível ${student.nivel} e estilo de aprendizado ${student.estilo_aprendizado}.`;

    const taskTemplates = {
      conceitual: `Explique o conceito de "${topic}" usando a técnica Chain-of-Thought (pense passo a passo). Garanta que a linguagem seja adequada para a idade de ${student.idade} anos.`,
      pratico: `Forneça 3 exemplos práticos de "${topic}" contextualizados para a realidade de um aluno de nível ${student.nivel}.`,
      reflexao: `Crie 3 perguntas de reflexão que estimulem o pensamento crítico sobre "${topic}".`,
      visual: `Crie um resumo visual de "${topic}" usando apenas arte ASCII ou uma descrição estruturada de mapa mental.`,
    };

    const format = "Responda em formato Markdown, sendo direto e encorajador.";

    return `${persona}\n\nCONTEXTO: ${context}\n\nTAREFA: ${taskTemplates[type]}\n\nREQUISITO: ${format}`;
  },
};

export default promptService;
