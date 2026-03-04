import express from "express";
import promptService from "./services/promptService.js";
import aiService from "./services/aiService.js";
import storageService from "./services/storageService.js";
import studentService from "./services/readStudant.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3005;

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

app.get("/students", async (req, res) => {
  try {
    const students = await studentService.getAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar alunos" });
  }
});

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
      resposta: salvamentos[0].data.conteudo,
    });
  } catch (error) {
    console.error("Erro:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Rodando em http://localhost:${PORT}`);
});
