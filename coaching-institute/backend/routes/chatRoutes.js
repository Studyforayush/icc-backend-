const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are a helpful assistant for a coaching institute called "Excellence Academy".
You help students with:
- Course information (JEE, NEET, Board exams, Olympiad)
- Fee structure: JEE ₹45,000/year, NEET ₹48,000/year, Board ₹20,000/year
- Class timings: Morning 7AM-10AM, Evening 4PM-7PM, Weekend batches available
- Admission process: Fill form online → Document verification → Fee payment → Classes begin
- Location: 123 Education Street, Delhi
- Contact: +91-9876543210, info@excellenceacademy.com
Be friendly, concise, and always encourage students to enroll.`;

router.post('/', async (req, res) => {
  const { messages } = req.body;
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 500,
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ message: 'AI service error', error: err.message });
  }
});

module.exports = router;
