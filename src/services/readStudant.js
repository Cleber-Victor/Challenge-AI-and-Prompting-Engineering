import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PATH_ALUNOS = path.join(__dirname, "..", "data", "alunos.json");

const studentService = {
  async getAll() {
    const dadosBrutos = await readFile(PATH_ALUNOS, "utf8");
    return JSON.parse(dadosBrutos);
  },

  async getById(id) {
    const lista = await this.getAll();
    return lista.find((item) => item.id == id);
  },
};

export default studentService;
