const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/ask', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
      return res.status(400).json({ error: 'Prompt é obrigatório.' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    });

    return res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao se comunicar com a IA.' });
  }
});

router.get('/', (req, res) => {
  res.send('🧠 Black Ant está online!');
});

module.exports = router;
