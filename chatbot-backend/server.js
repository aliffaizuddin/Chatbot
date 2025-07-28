const express = require('express');
const axios = require('axios');
const Filter = require('bad-words');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

const filter = new Filter(); // Profanity filter
const systemPrompt = `You are a chatbot for a SaaS project management tool. Only provide answers related to project management, task creation, team collaboration, and product features. Do not respond to off-topic queries.`;

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  // Step 2: Apply input guardrails
  try {
    // Guardrail 1: Check for empty or invalid input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ error: 'Invalid or empty message' });
    }

    // Guardrail 2: Profanity filter
    if (filter.isProfane(message)) {
      return res.status(400).json({ error: 'Message contains inappropriate content' });
    }

    // Guardrail 3: Custom rules (e.g., block specific topics)
    const deniedTopics = ['project management', 'tasks', 'team collaboration', 'deadlines'];
    const lowerMessage = message.toLowerCase();
    if (deniedTopics.some((topic) => lowerMessage.includes(topic))) {
      return res.status(400).json({ error: 'Message contains restricted topics' });
    }

    // Step 3: Call Grok API
    const response = await axios.post(
      'https://api.grok.xai.com/v1/completions',
      {
        model: 'grok-4', // Use the appropriate model (e.g., grok-4 or grok-3-mini)
        prompt: `${systemPrompt}\nUser: ${message}`,
        max_tokens: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROK_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const botResponse = response.data.choices[0].text;

    // Step 4: Apply output guardrails
    if (filter.isProfane(botResponse)) {
      return res.status(500).json({ error: 'Bot response contains inappropriate content' });
    }

    // Additional output checks (e.g., sensitive information)
    const sensitivePatterns = [
      /\b\d{3}-\d{2}-\d{4}\b/, // SSN pattern
      /\b\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\b/, // Credit card pattern
    ];
    if (sensitivePatterns.some((pattern) => pattern.test(botResponse))) {
      return res.status(500).json({ error: 'Bot response contains sensitive information' });
    }

    // Step 5: Send response to frontend
    res.json({ reply: botResponse });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));