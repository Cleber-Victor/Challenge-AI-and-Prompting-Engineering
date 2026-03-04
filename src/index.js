import express from "express";
import promptService from "./services/promptService.js";
import aiService from "./services/aiService.js";
import storageService from "./services/storageService.js";

const app = express();
const PORT = 3005;

app.use(express.json());

app.post("/generate", async (req, res) => {
  try {
    const studentId = req.body.studentId;
    const topic = req.body.topic;

    console.log("Recebido:", { studentId, topic });

    const [promptConc, promptPrat, promptRefl, promptVis] = await Promise.all([
      promptService.buildPromptExplicacaoConceitual(studentId, topic),
      promptService.buildPromptExemplosPraticos(studentId, topic),
      promptService.buildPromptPerguntasReflexao(studentId, topic),
      promptService.buildPromptResumoVisual(studentId, topic),
    ]);
    console.log("Prompt Gerado no Terminal:\n", promptConc);
    // Passo 2: Enviar cada prompt para a IA (aiService) [cite: 20]
    // Aqui assumimos que seu aiService já lida com a comunicação com a API (Gemini/GPT)
    const resultados = await Promise.all([
      aiService.sendRequest(promptConc),
      //aiService.sendRequest(promptPrat),
      //aiService.sendRequest(promptRefl),
      //aiService.sendRequest(promptVis),
    ]);
    const salvamentos = await Promise.all([
      storageService.saveOutput(studentId, topic, "conceitual", resultados[0]),
    ]);
    res.json({
      success: true,
      promptGerado: promptConc,
      resposta: resultados[0],
    });
  } catch (error) {
    console.error("Erro:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Rodando em http://localhost:${PORT}`);
});
