const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

// Use OpenAI.Configuration for correct configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/ask', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt é obrigatório.' });
    }
    // Ajuste para usar o método correto da biblioteca openai-node
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    });

    // Verifica se há resposta antes de acessar
    if (
      !completion.choices ||
      !completion.choices[0] ||
      !completion.choices[0].message ||
      !completion.choices[0].message.content
    ) {
      return res.status(500).json({ error: 'Resposta da IA está vazia.' });
    }

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro na IA' });
  }
});

router.get('/', (req, res) => res.send('🧠 Black Ant está online!'));

module.exports = router;
