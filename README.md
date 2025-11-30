# TeamOS ⚽

**SaaS de gestion de clubs sportifs** - Plateforme moderne pour gérer équipes, entraînements, matchs et administration.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![NestJS](https://img.shields.io/badge/NestJS-10-red?logo=nestjs)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-326CE5?logo=kubernetes)

---

## 🚀 Fonctionnalités

### ✅ Phase 3 Complete: Core Features - Sport

#### 🏃‍♂️ Squad Management
- Gestion complète des joueurs (CRUD)
- Profils sportifs détaillés (poste, pied fort, taille, poids)
- Suivi des licenses et blessures
- Historique des statistiques

#### 📅 Trainings
- Planification des séances d'entraînement
- Gestion des présences (PRESENT, ABSENT, EXCUSE, RETARD)
- RPE (Rating of Perceived Exertion) pour mesurer l'intensité perçue
- Statistiques de présence par joueur

#### 🏆 Matches
- Gestion des matchs (championnat, coupe, amical)
- Compositions d'équipe (titulaires, remplaçants)
- Événements en temps réel (buts, cartons, changements)
- Statistiques automatiques par joueur
- Historique des performances

---

## 🏗️ Architecture

### Monorepo Structure (Turborepo)

```
TeamOS/
├── apps/
│   ├── web/              # Next.js 16 (Frontend)
│   └── api/              # NestJS 10 (Backend)
├── packages/
│   ├── ui/               # Composants UI partagés (shadcn/ui)
│   ├── database/         # Prisma Client & Schema
│   ├── types/            # Types TypeScript partagés
│   └── config/           # Config partagée (ESLint, TS)
├── infra/
│   ├── docker/           # Dockerfiles & docker-compose
│   └── k8s/              # Kubernetes manifests
└── .github/workflows/    # CI/CD GitHub Actions
```

### Tech Stack

**Frontend**:
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide Icons

**Backend**:
- NestJS 10
- TypeScript
- Prisma ORM
- PostgreSQL 16
- JWT Authentication
- Class Validator

**Infrastructure**:
- Docker & Docker Compose
- Kubernetes (Minikube/Cloud)
- GitHub Actions CI/CD
- GHCR (GitHub Container Registry)

---

## 🛠️ Installation & Setup

### Prérequis

- Node.js 20+
- npm/pnpm
- Docker & Docker Compose
- PostgreSQL 16 (ou via Docker)

### 1. Installation

```bash
# Cloner le repository
git clone https://github.com/amn-sdk/TeamOS.git
cd TeamOS

# Installer les dépendances
npm install
```

### 2. Configuration

```bash
# Copier les fichiers .env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# Configurer DATABASE_URL dans apps/api/.env
DATABASE_URL="postgresql://user:password@localhost:5432/teamos"
JWT_SECRET="your-super-secret-jwt-key"

# Configurer NEXT_PUBLIC_API_URL dans apps/web/.env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

### 3. Base de données

```bash
# Lancer PostgreSQL via Docker
cd infra/docker
docker-compose -f docker-compose.dev.yml up -d

# Ou utiliser votre instance PostgreSQL locale
# Créer la base de données 'teamos'

# Générer Prisma Client et pousser le schema
cd ../../packages/database
npm run db:push
```

### 4. Développement

```bash
# Lancer le backend (port 3001)
cd apps/api
npm run dev

# Dans un autre terminal, lancer le frontend (port 3000)
cd apps/web
npm run dev
```

L'application sera accessible sur:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Docs: http://localhost:3001/api (si configuré)

---

## 📋 Scripts Disponibles

### Workspace Root

```bash
npm run build          # Build tous les packages
npm run dev           # Dev mode (tous les packages)
npm run lint          # Lint tous les packages
npm run clean         # Nettoyer node_modules et dist
```

### Backend (apps/api)

```bash
npm run dev           # Mode développement
npm run build         # Build production
npm run start:prod    # Démarrer en production
npm run test          # Tests unitaires
npm run test:e2e      # Tests E2E
```

### Frontend (apps/web)

```bash
npm run dev           # Mode développement
npm run build         # Build production
npm run start         # Démarrer build de production
npm run lint          # ESLint
```

### Database (packages/database)

```bash
npm run db:push       # Push schema vers DB (dev)
npm run db:migrate    # Créer migration
npm run db:studio     # Ouvrir Prisma Studio
```

---

## 🐳 Docker

### Local Development

```bash
# Lancer PostgreSQL + Redis
cd infra/docker
docker-compose -f docker-compose.dev.yml up -d
```

### Production Build

```bash
# Build API
docker build -f infra/docker/Dockerfile.api -t teamos-api .

# Build Web
docker build -f infra/docker/Dockerfile.web -t teamos-web .
```

---

## ☸️ Kubernetes

### Local (Minikube)

```bash
# Démarrer Minikube
minikube start

# Appliquer les manifests
kubectl apply -f infra/k8s/postgres.yaml
kubectl apply -f infra/k8s/redis.yaml
kubectl apply -f infra/k8s/api.yaml
kubectl apply -f infra/k8s/web.yaml

# Vérifier les pods
kubectl get pods

# Accéder au service web
minikube service teamos-web
```

Voir [infra/README.md](infra/README.md) pour plus de détails.

---

## 🔐 API Endpoints

### Authentication

```bash
POST /auth/register    # Créer un compte
POST /auth/login       # Se connecter (retourne JWT)
GET  /auth/profile     # Profil utilisateur (protégé)
```

### Players

```bash
GET    /players?teamId={id}       # Liste joueurs
GET    /players/:id               # Détails joueur
POST   /players                   # Créer joueur
PATCH  /players/:id               # Modifier joueur
DELETE /players/:id               # Supprimer joueur
POST   /players/:id/profile       # Créer profil sportif
PATCH  /players/:id/profile       # Modifier profil sportif
```

### Trainings

```bash
GET    /trainings?teamId&startDate&endDate  # Liste séances
GET    /trainings/:id                       # Détails séance
POST   /trainings                           # Créer séance
PATCH  /trainings/:id                       # Modifier séance
DELETE /trainings/:id                       # Supprimer séance
POST   /trainings/attendance                # Enregistrer présence
GET    /trainings/:id/attendance            # Lister présences
POST   /trainings/rpe                       # Enregistrer RPE
GET    /trainings/:id/rpe                   # Lister RPE
GET    /trainings/player/:playerId/stats    # Stats joueur
```

### Matches

```bash
GET    /matches?teamId&seasonId             # Liste matchs
GET    /matches/:id                         # Détails match
POST   /matches                             # Créer match
PATCH  /matches/:id                         # Modifier match
DELETE /matches/:id                         # Supprimer match
POST   /matches/lineup                      # Ajouter composition
GET    /matches/:id/lineup                  # Composition
POST   /matches/events                      # Ajouter événement
GET    /matches/:id/events                  # Événements
PATCH  /matches/:matchId/stats/:playerId    # Modifier stats
GET    /matches/:id/stats                   # Stats match
GET    /matches/player/:playerId/history    # Historique joueur
```

---

## 🎨 Frontend Routes

```
/                           # Landing page
/auth/login                 # Connexion
/auth/register              # Inscription
/coach                      # Dashboard coach
/coach/players              # Liste joueurs
/coach/players/[id]         # Profil joueur
/coach/trainings            # Calendrier entraînements
/coach/trainings/[id]       # Détails séance
/coach/matches              # Liste matchs
/coach/matches/[id]         # Détails match
```

---

## 🔄 CI/CD

### GitHub Actions Workflows

1. **CI Tests** (`.github/workflows/ci-tests.yml`)
   - Lint & Build sur chaque push/PR
   - Tests API & Web

2. **Build & Push** (`.github/workflows/build-push.yml`)
   - Build Docker images
   - Push vers GHCR

3. **Deploy K8s** (`.github/workflows/deploy-k8s.yml`)
   - Déploiement automatique sur Kubernetes
   - Nécessite `KUBE_CONFIG` secret

---

## 📊 Database Schema

Modèles Prisma principaux:

- `User` - Utilisateurs (coaches, admins)
- `Club` - Clubs sportifs
- `Team` - Équipes
- `Season` - Saisons
- `Player` - Joueurs
- `PlayerProfile` - Profils sportifs
- `Training` - Séances d'entraînement
- `TrainingAttendance` - Présences
- `TrainingRpe` - RPE (intensité perçue)
- `Match` - Matchs
- `MatchLineup` - Compositions
- `MatchEvent` - Événements (buts, cartons)
- `PlayerMatchStats` - Statistiques match
- `License` - Licenses
- `Payment` - Paiements
- `Injury` - Blessures
- `Inventory` - Inventaire

---

## 🚧 Roadmap

### ✅ Completed

- [x] Phase 0: Project Setup
- [x] Phase 1: Database & Backend Core
- [x] Phase 2: Frontend Foundation
- [x] Phase 3: Core Sport Features
- [x] Phase 6: Infrastructure & CI/CD

### 🔜 Next Steps

- [ ] Phase 4: Admin & Logistics
  - [ ] License Management
  - [ ] Payment Tracking
  - [ ] Inventory System
  
- [ ] Phase 5: Dashboards & Analytics
  - [ ] Coach Dashboard (KPIs)
  - [ ] Player Performance Analytics
  - [ ] Team Statistics

---

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 📝 License

Ce projet est sous license MIT. Voir [LICENSE](LICENSE) pour plus de détails.

---

## 👥 Auteurs

**TeamOS Development Team**

- GitHub: [@amn-sdk](https://github.com/amn-sdk)

---

## 📧 Support

Pour toute question ou support:
- Ouvrir une [issue](https://github.com/amn-sdk/TeamOS/issues)
- Email: support@teamos.app

---

**Made with ⚽ by TeamOS**
