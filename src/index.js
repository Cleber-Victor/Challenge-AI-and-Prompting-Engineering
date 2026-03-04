import express from "express";
import promptService from "./services/promptService.js";
import aiService from "./services/aiService.js";
import storageService from "./services/storageService.js";
import studentService from "./services/readStudant.js";
import cacheService from "./services/cacheService.js";
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
    const { studentId, topic, type, version } = req.body;
    const promptVersion = version || 'v2';

    console.log("Recebido:", { studentId, topic, type, version: promptVersion });

    let prompt;
    let contentType;

    switch (type) {
      case "conceitual":
        prompt = await promptService.buildPromptExplicacaoConceitual(studentId, topic, promptVersion);
        contentType = "conceitual";
        break;
      case "pratico":
        prompt = await promptService.buildPromptExemplosPraticos(studentId, topic, promptVersion);
        contentType = "pratico";
        break;
      case "reflexao":
        prompt = await promptService.buildPromptPerguntasReflexao(studentId, topic, promptVersion);
        contentType = "reflexao";
        break;
      case "visual":
        prompt = await promptService.buildPromptResumoVisual(studentId, topic, promptVersion);
        contentType = "visual";
        break;
      default:
        // Default to conceitual if missing or invalid type
        prompt = await promptService.buildPromptExplicacaoConceitual(studentId, topic, promptVersion);
        contentType = "conceitual";
        break;
    }

    console.log(`Prompt Gerado (${contentType} - ${promptVersion}) no Terminal:\n`, prompt);
    
    // Passo 2: Enviar o prompt para a IA ou buscar no cache
    let resultado = cacheService.get(prompt);
    
    if (!resultado) {
      console.log("[API] Chamando aiService para gerar conteúdo novo...");
      resultado = await aiService.sendRequest(prompt);
      cacheService.set(prompt, resultado);
    } else {
      console.log("[API] Usando conteúdo recuperado do cache.");
    }
    
    // Convert text output to structured JSON object if v1, because v1 prompts do not return JSON directly
    let parsedResult = resultado;
    if (promptVersion === 'v1') {
      // Simulate mapping back to JSON properties to align with frontend text extraction
      if (type === 'conceitual') parsedResult = { explicacao: resultado };
      else if (type === 'pratico') parsedResult = { exemplos: [{ titulo: "Exemplo", descricao: resultado }] };
      else if (type === 'reflexao') parsedResult = { perguntas: [{ id: 1, pergunta: resultado }] };
      else parsedResult = { diagrama_ascii: resultado };
      
      // Need stringify so the cleanAiResponse inside saveOutput still attempts to parse or falls back gracefully
      parsedResult = JSON.stringify(parsedResult);
    }

    const salvamento = await storageService.saveOutput(studentId, topic, contentType, parsedResult, promptVersion);

    res.json({
      success: true,
      promptGerado: prompt,
      resposta: salvamento.data.conteudo,
    });
  } catch (error) {
    console.error("Erro:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Rodando em http://localhost:${PORT}`);
});
