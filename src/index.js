// No seu arquivo principal (ex: src/index.js)
import express from "express";
import promptService from "./services/promptService.js";
import aiService from "./services/aiService.js";
// import storageService from "./services/storageService.js";

const app = express();
const PORT = 3005;

// LINHA OBRIGATÓRIA: Permite que o Express entenda o JSON enviado no req.body
app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    const studentId = req.body.studentId;
    const topic = req.body.topic;
    const contentType = req.body.contentType;
    // contentType pode ser: 'conceitual', 'pratico', 'reflexao' ou 'visual' [cite: 11, 12, 13, 15]

    console.log("📥 Recebido:", { studentId, topic, contentType });

    // Passo 1: O Prompt Service busca o aluno no JSON e monta o prompt técnico
    const prompt = await promptService.buildPrompt(
      studentId,
      topic,
      contentType,
    );

    console.log("🚀 Prompt Gerado no Terminal:\n", prompt);

    // Passo 2 e 3 comentados para o teste
    const result = await aiService.sendRequest(prompt);
    // const savedData = await storageService.saveOutput(...)

    // Retornamos o prompt na resposta para facilitar a visualização
    res.json({
      success: true,
      promptGerado: prompt,
      resposta: result,
    });
  } catch (error) {
    console.error("❌ Erro:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Rodando em http://localhost:${PORT}`);
});
