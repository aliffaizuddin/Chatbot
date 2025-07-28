# ProjectPro Chatbot

A SaaS chatbot for ProjectPro, a project management platform, built with a React frontend and a Node.js/Express backend. The chatbot integrates with the xAI Grok API to provide conversational responses, with guardrails to ensure conversations remain relevant to ProjectPro features (e.g., tasks, team collaboration, deadlines) and adhere to safety and appropriateness standards.

## Features
- **Interactive Chat Interface**: Built with React and Tailwind CSS for a responsive, user-friendly experience.
- **Grok API Integration**: Uses xAI's Grok API for conversational responses.
- **Guardrails**: Enforces product-specific context and safety through:
  - Input validation (e.g., rejecting empty or invalid messages).
  - Profanity filtering using the `bad-words` library.
  - Topic restriction to ProjectPro features (e.g., tasks, collaboration).
  - Sensitive data detection (e.g., PII like credit card numbers).
  - Prompt engineering to guide Grok responses.
- **Error Handling**: Displays user-friendly error messages for guardrail violations.
- **Scrolling Chat Window**: Automatically scrolls to the latest message.

## Prerequisites
- **Node.js**: Version 16 or higher.
- **xAI Grok API Key**: Obtain from [xAI API Console](https://x.ai/api).
- **Git**: For cloning the repository.
- **NPM**: For installing dependencies.

## Setup Instructions

### Backend
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/projectpro-chatbot.git
   cd projectpro-chatbot/backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the `backend` directory:
   ```env
   GROK_API_KEY=your_grok_api_key
   PORT=5000
   ```

4. **Run the Backend**:
   ```bash
   node server.js
   ```
   The backend will run on `http://localhost:5000`.

### Frontend
1. **Navigate to Frontend Directory**:
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Frontend**:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (or the port specified by Vite).

4. **Access the Chatbot**:
   Open `http://localhost:5173` in your browser to interact with the chatbot.

## Guardrails
The chatbot enforces the following guardrails to ensure conversations are safe and relevant to ProjectPro:
- **Input Validation**: Rejects empty or invalid messages.
- **Profanity Filter**: Blocks inappropriate language using the `bad-words` library.
- **Topic Restriction**: Only allows questions related to ProjectPro features (e.g., "tasks," "team collaboration," "deadlines"). Off-topic queries are redirected with a friendly message.
- **Sensitive Data Protection**: Uses regex to detect and block PII (e.g., credit card numbers, SSNs) in inputs and outputs.
- **Prompt Engineering**: Guides Grok responses with a system prompt to focus on ProjectPro features and maintain a professional tone.

Example guardrail response:
> "Please ask about ProjectPro features, like tasks or collaboration."

## Project Structure
```
projectpro-chatbot/
├── backend/
│   ├── server.js           # Express server with Grok API integration and guardrails
│   ├── .env               # Environment variables (not committed)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── Chatbot.jsx    # React component for chat interface
│   │   ├── Chatbot.css    # Styles for chat interface
│   │   ├── App.jsx        # Main React app component
│   │   └── ...            # Other Vite-generated files
│   └── package.json
└── README.md
```

## Usage
1. Type a message in the input field (e.g., "How do I create a task?").
2. Press "Send" or hit Enter to submit.
3. The chatbot responds with ProjectPro-related answers or a redirect if the query is off-topic.
4. Guardrails ensure all interactions are safe and relevant.

## Example Queries
- **Allowed**: "How do I assign a task in ProjectPro?"
- **Blocked**: "Tell me about cooking." (Redirects to product features)
- **Blocked**: Profanity or sensitive data (e.g., "My credit card is 1234 5678 9012 3456").

## Deployment
- **Frontend**: Deploy using Vercel, Netlify, or similar platforms.
  ```bash
  cd frontend
  npm run build
  ```
- **Backend**: Deploy to Heroku, Render, or AWS. Ensure the `.env` file is configured on the server.
- **CORS**: Update `server.js` to allow CORS for your deployed frontend URL.

## Troubleshooting
- **API Errors**: Verify your Grok API key and check rate limits in the [xAI API Console](https://x.ai/api).
- **Off-Topic Responses**: Adjust the `allowedTopics` array in `server.js` or refine the system prompt.
- **CORS Issues**: Ensure the backend allows requests from the frontend’s URL:
  ```javascript
  const cors = require('cors');
  app.use(cors({ origin: 'http://localhost:5173' }));
  ```

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License
MIT License. See [LICENSE](LICENSE) for details.

## Contact
For questions, contact [your-email@example.com] or open an issue on GitHub.