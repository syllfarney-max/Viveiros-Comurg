
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sgMail from '@sendgrid/mail';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Configuração do SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Rota raiz
app.get('/', (req, res) => {
  res.send('API do Viveiro Comurg está rodando!');
});

// Rota de contato
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const msg = {
      to: process.env.CONTACT_EMAIL,
      from: process.env.CONTACT_EMAIL,
      subject: `Nova mensagem de ${name}`,
      text: `Email: ${email}\nMensagem: ${message}`,
    };

    await sgMail.send(msg);
    res.json({ success: true, message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao enviar mensagem.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
