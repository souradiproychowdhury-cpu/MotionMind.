# MotionMind AI - Spatial Gesture Engine & 3D Holographic AI Matrix

A cutting-edge 3D AI-powered interactive system combining real-time hand gesture tracking, spatial telemetry, and voice interaction with **Google Gemini** and **OpenAI GPT** APIs.

## 🚀 Features

- **Dual AI Providers**: Choose between Google Gemini or OpenAI GPT for live voice/text intelligence
- **3D Spatial Gesture Engine**: MediaPipe hand tracking for steering yaw, depth, scaling, and pinches
- **Interactive 3D Hologram Models**:
  - 🏎️ **3D Cyber-Car**: Procedural wireframe supercar with illuminated headlights, rotating turbine wheels, and aerodynamic chassis
  - 🏍️ **3D Cyber-Bike**: Exposed trellis space frame, rotating sport wheels, and exhaust spark particles
  - 🧬 **Neural Human**: 2D holographic biological AI matrix with glowing synaptic core and axon network
- **Dynamic Cyber Tunnel Background**:
  - High-speed futuristic neon data highway video background active for 3D Cyber-Car and 3D Cyber-Bike
  - Gesture-synchronized playback speed (throttle response via hand grip force) and lateral steering parallax
  - Clean neural void background automatically preserved for the Neural Human model
  - 240 extracted frames generated for frame-by-frame matrix synchronization
- **Voice Recognition & Speech Synthesis**: Ask questions out loud and get spoken responses from the AI
- **Neon Cyberpunk HUD**: Real-time telemetry, radar calibration, and spatial coordinate matrix

## 📋 Prerequisites

- Node.js (v18+)
- npm or yarn
- Google Gemini API key (optional)
- OpenAI API key (optional)
- Modern web browser with WebGL & Webcam support

## 🔑 Getting API Keys

### Google Gemini API
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

### OpenAI GPT API
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy your API key

## ⚙️ Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   - Edit the `.env` file:
     ```env
     GEMINI_API_KEY=your_gemini_key_here
     OPENAI_API_KEY=your_openai_key_here
     ```

3. **Start the Server**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`

4. **Open in Browser**
   - Navigate to `http://localhost:3000`
   - Select your preferred AI provider (Gemini or GPT)
   - Click "Get Started" to calibrate and enter the 3D matrix

## 🎮 Gesture Controls & Calibration

1. **Move Hand Left & Right**: Steer and rotate the 3D model with subtle background parallax
2. **Push Hand Closer / Pull Farther**: Adjust 3D camera depth
3. **Make a Tight Fist**: Dynamically scale the model and accelerate tunnel playback speed
4. **Pinch Thumb + Index Finger**: Toggle headlights and auxiliary subsystems
5. **Voice / Text Query**: Speak or type questions to the AI cradle matrix

## 📦 Dependencies

- **express**: Web server framework
- **cors**: Cross-origin resource sharing
- **@google/generative-ai**: Google Gemini API client
- **openai**: OpenAI API client
- **dotenv**: Environment variable management
- **three.js**: 3D WebGL graphics and controls
- **@mediapipe/hands**: Hand landmark recognition

## 📄 License

MIT License
