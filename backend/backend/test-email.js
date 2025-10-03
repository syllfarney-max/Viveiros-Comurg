import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: process.env.CONTACT_EMAIL,
  from: process.env.CONTACT_EMAIL,
  subject: "Teste de envio - Viveiro Comurg",
  text: "Este é um email de teste enviado via backend/test-email.js"
};

sgMail
  .send(msg)
  .then(() => {
    console.log("Email de teste enviado com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao enviar email:", error.response?.body || error.message);
  });
