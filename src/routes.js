const express = require('express');
const router = express.Router();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/ask', async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
    return res.status(400).json({ error: 'Prompt é obrigatório.' });
  }

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    });

    const reply = chatCompletion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error("ERRO AO CHAMAR OPENAI:", err);
    res.status(500).json({ error: "Erro ao se comunicar com a IA." });
  }
});

router.get('/', (req, res) => {
  res.send('🧠 OMNIA backend está no ar!');
});

module.exports = router;
