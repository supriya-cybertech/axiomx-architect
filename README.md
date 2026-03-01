# AXIOM // X: Planetary Defense Command Center

![AXIOM // X Logo](https://raw.githubusercontent.com/supriya-cybertech/axiomx-architect/main/docs/banner.png)

> **"Securing the orbital frontier through advanced intelligence and real-time telemetry."**

AXIOM // X is a sophisticated, high-tech command center interface designed for monitoring Near-Earth Objects (NEOs), solar activity, and satellite conjunctions. It provides planetary defense operatives with the tools necessary to analyze risks, simulate deflection scenarios, and communicate with an advanced AI Intelligence Core.

## 🌌 Features

### 📡 Real-Time Monitoring (Overview)
- **NASA JPL Integration**: Live data feeds for tracking active asteroids.
- **S_RI (Scoring Risk Index)**: Automated risk assessment based on miss distance and velocity.
- **Telemetry Visualizer**: High-frequency sine-wave telemetry monitoring.

### 🛡️ Deflection Simulation
- **Kinetics Analysis**: Calculate impact energy (Megatons), crater size, and Hiroshima equivalents.
- **Defense Postures**: Simulation of Kinetic Impactors and Gravity Tractors with budget management.

### 🤖 Axiom Intelligence Core
- **AI-Driven Intel**: Encrypted communication channel for querying orbital threats.
- **Contextual Awareness**: Real-time analysis of regional impacts and astronomical phenomena.

### 📊 Strategic Analytics
- **Truth Radar**: Ethical and performance metrics for the AI core.
- **Tactical Alerts**: Global threat map and satellite conjunction tracking.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, Lucide React, Recharts.
- **Backend**: FastAPI, Python 3.10+.
- **Data Source**: NASA NeoWs API (Near Earth Object Web Service).
- **Styling**: High-fidelity HUD (Heads-Up Display) aesthetic with custom CSS grids and SVG borders.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- NASA API Key (Get yours at [data.nasa.gov](https://api.nasa.gov/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/supriya-cybertech/axiomx-architect.git
   cd axiomx-architect
   ```

2. **Frontend Setup**
   ```bash
   cd axiom-frontend
   npm install
   # Create .env.local and add your key:
   # NEXT_PUBLIC_NASA_KEY=your_api_key_here
   npm run dev
   ```

3. **Backend Setup** (Optional for local frontend dev)
   ```bash
   cd ../axiom-backend
   pip install -r requirements.txt
   python main.py
   ```

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact
Supriya - [@cybertech](https://github.com/supriya-cybertech)
Project Link: [https://github.com/supriya-cybertech/axiomx-architect](https://github.com/supriya-cybertech/axiomx-architect)
