# 🎼 SKRID (frontend)

SKRID Platform is a web-based interface for querying and exploring musical patterns stored in a graph database. This repository contains only the **frontend** of the platform.

The **backend** (query compilation, result processing, etc.) is maintained in a separate repository:
➡️ [SKRID Backend Repository](https://gitlab.inria.fr/skrid/backend)

---

## ✨ Features

- Interface for melodic and rhythmic search via interactive piano interface input
- Flexible contour search
- Display of musical score collection
- Communication with a Python backend via REST endpoints

---

## 📁 Code Structure
```text
.
├── assets/
│   ├ acoustic_grand_piano/     # Sounds for piano keys
│   ├ data/                      # Musical data used by the app
│   ├ public/                    # Images and static assets
│   ├ scripts/                   # Client-side JS
│   └ styles/                    # CSS files
├── docs/                            # Documentation (when generated)
├── config/                          # Neo4j configuration (legacy)
├── views/                           # HTML files
├── index.js                         # Main entry point (Node.js server)
├── jsdoc.json                       # JSDoc config
├── package.json                     # npm dependencies
├── loadAllDB.sh                     # Load data into Neo4j
├── post_a_query.sh                  # Send Cypher query via curl
├── README.md
└── TODO.md
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://gitlab.inria.fr/skrid/frontend.git
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the frontend server
```bash
node index.js
```

Then visit `http://localhost:3000` in your browser.

---

## 🐞 Backend Dependency
This frontend communicates with the backend via REST API calls. The backend must be installed and running separately.

By default, the frontend expects the backend to be available at `http://localhost:5000`.

> Endpoint URLs and port can be configured in `index.js`

---

## 📄 Documentation
Generate developer documentation with:
```bash
npm run generate-docs
```
Open `docs/index.html` in your browser.

---

## 💡 Development Notes
- If you modify `index.js`, restart the server to apply changes.

For database setup and ingestion scripts, see the backend project.

- cors package was install for develloppement, don't need in production. need cors to allow vue dev server to connect to frontend server

---

## 🖊️ Roadmap, Known Bugs & Tasks
See [TODO.md](TODO.md) for planned features and known issues.

---

## License

This project is distributed under the MIT License.  
See [LICENSE](./LICENSE) for details.  
(Copyright © 2023–2025 IRISA)