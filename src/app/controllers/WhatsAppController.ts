import { Request, Response } from "express";
import WhatsappService from "../../services/WhatsappService";

class WhatsappController {
  async create(req: Request, res: Response) {
    if (!req.body.key) {
      return res
        .status(500)
        .json({ error: "Chave key obrigatória" });
    }

    try {
      const session = await WhatsappService.getSessionByKey(req.body.key);

      if (session) {
        return res.status(400).json({ error: "Usuário já iniciou uma sessão" });
      }

      try {
        const response = await WhatsappService.initInstance(req.body.key);
        const qrcode = response.data.qrcode.url;
        return res.status(200).json({ qrcode });
      } catch (err) {
        return res.status(500).json({ error: "Erro ao iniciar instância" });
      }
    } catch (error) {
      return res.status(500).json({ error: "Erro ao iniciar instância" });
    }
  }

  async show(req: Request, res: Response) {
    if (!req.params.key) {
      return res
        .status(500)
        .json({ error: "Instance key não especificado na requisição" });
    }

    try {
      const session = await WhatsappService.getSessionByKey(req.params.key);
      return res.status(200).json(session);
    } catch (err) {
      return res.status(500).json({ error: "Falha ao obter sessão" });
    }
  }
}

export default new WhatsappController();
