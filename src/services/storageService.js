import fs from "fs/promises";
import path from "path";

const SAMPLES_DIR = "./samples";

const storageService = {
  /**
   * REQUISITO 48 e 51: Salva o conteúdo gerado em arquivo JSON com timestamp[cite: 48, 51].
   */
  async saveOutput(
    studentId,
    topic,
    contentType,
    rawAiResponse, // Agora tratamos a resposta bruta aqui
    promptVersion = "1.0",
  ) {
    let cleanContent;

    try {
      // 1. Extração da parte textual (Unwrapping da SDK do Gemini)
      // A resposta útil geralmente está em candidates[0].content.parts[0].text
      const textResponse =
        rawAiResponse.candidates?.[0]?.content?.parts?.[0]?.text ||
        rawAiResponse;

      // 2. Limpeza de Markdown (Caso a IA envie ```json ... ```)
      const jsonString =
        typeof textResponse === "string"
          ? textResponse.replace(/```json|```/g, "").trim()
          : textResponse;

      // 3. Parse para objeto real
      cleanContent =
        typeof jsonString === "string" ? JSON.parse(jsonString) : jsonString;
    } catch (e) {
      console.warn(
        "[Storage] Não foi possível parsear como JSON, salvando como texto puro.",
      );
      cleanContent = rawAiResponse;
    }

    const safeTopic = topic.toLowerCase().replace(/[^a-z0-9]/g, "_");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `${studentId}_${safeTopic}_${contentType}_${timestamp}.json`;
    const filePath = path.join(SAMPLES_DIR, fileName);

    // Estrutura enxuta focada nos Requisitos Funcionais [cite: 31, 32, 48]
    const dataToPersist = {
      aluno_id: studentId,
      topico: topic,
      tipo: contentType,
      versao_prompt: promptVersion,
      gerado_em: new Date().toISOString(),
      conteudo: cleanContent, // Aqui entra apenas a explicação/perguntas/resumo [cite: 16]
    };

    try {
      await fs.mkdir(SAMPLES_DIR, { recursive: true });
      await fs.writeFile(
        filePath,
        JSON.stringify(dataToPersist, null, 2),
        "utf-8",
      );

      console.log(`[Storage] Arquivo limpo gerado: ${fileName}`);
      return { success: true, filePath, data: dataToPersist };
    } catch (error) {
      console.error("[Storage] Erro ao persistir dados:", error.message);
      throw new Error(`Falha na persistência: ${error.message}`);
    }
  },
};

export default storageService;
