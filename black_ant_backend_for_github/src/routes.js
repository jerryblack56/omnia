const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

router.post('/ask', async (req, res) => {
  try {
    const { prompt } = req.body;
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: "user", content: prompt }]
    });
    res.json({ reply: completion.data.choices[0].message.content.trim() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro na IA' });
  }
});

router.get('/', (req, res) => res.send('🧠 Black Ant está online!'));

module.exports = router;