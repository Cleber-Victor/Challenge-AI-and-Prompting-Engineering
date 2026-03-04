import fs from "fs/promises";
import path from "path";

const SAMPLES_DIR = "./samples";

const storageService = {
  async cleanAiResponse(rawResponse) {
    try {
      let text = rawResponse;
      const jsonStr = text.match(/\{[\s\S]*\}/);
      if (jsonStr) {
        text = jsonStr[0];
      }

      const cleanText = text.replace(/```json|```/g, "").trim();

      return JSON.parse(cleanText);
    } catch (error) {
      console.warn(
        "[Storage] Falha ao parsear conteúdo como JSON. Salvando texto bruto."
      );
      return rawResponse;
    }
  },

  async saveOutput(
    studentId,
    topic,
    contentType,
    rawAiResponse,
    promptVersion = "1.0",
  ) {
    const cleanContent = await this.cleanAiResponse(rawAiResponse);

    const safeTopic = topic.toLowerCase().replace(/[^a-z0-9]/g, "_");
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = `${studentId}_${safeTopic}_${contentType}_${timestamp}.json`;
    const filePath = path.join(SAMPLES_DIR, fileName);

    const dataToPersist = {
      aluno_id: studentId,
      topico: topic,
      categoria: contentType,
      versao_prompt: promptVersion,
      data_geracao: new Date().toISOString(),
      conteudo: cleanContent,
    };

    try {
      await fs.mkdir(SAMPLES_DIR, { recursive: true });

      await fs.writeFile(
        filePath,
        JSON.stringify(dataToPersist, null, 2),
        "utf-8",
      );

      console.log(`[Storage] JSON estruturado salvo em: ${fileName}`);
      return { success: true, filePath, data: dataToPersist };
    } catch (error) {
      console.error("[Storage] Erro ao salvar arquivo:", error.message);
      throw new Error(`Erro na persistência de dados: ${error.message}`);
    }
  },
};

export default storageService;
