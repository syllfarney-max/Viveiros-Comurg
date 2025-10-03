import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// rota de teste
app.get("/", (req, res) => {
  res.send("API do Viveiro Comurg está rodando 🚀");
});

// rota de envio de email
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const msg = {
      to: process.env.CONTACT_EMAIL,
      from: process.env.CONTACT_EMAIL, // precisa ser remetente verificado no SendGrid
      subject: `Nova mensagem de ${name}`,
      text: `Email: ${email}\nMensagem: ${message}`,
      html: `<strong>Email:</strong> ${email}<br/><p>${message}</p>`
    };

    await sgMail.send(msg);
    res.status(200).json({ success: true, message: "Mensagem enviada com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar email:", error.response?.body || error.message);
    res.status(500).json({ success: false, message: "Erro ao enviar mensagem." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend rodando na porta ${PORT}`);
});
