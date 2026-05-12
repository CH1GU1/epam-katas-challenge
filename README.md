# EPAM Katas Challenge

> Full-stack application with 3 programming challenges (katas), deployable locally with Docker Compose or in Kubernetes with Helm + ArgoCD.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Docker Compose](#docker-compose)
  - [Backend Only](#backend-only)
  - [Frontend Only](#frontend-only)
- [API](#api)
- [Katas](#katas)
  - [Dictionary](#1-dictionary)
  - [Shopping](#2-shopping)
  - [Nth Letter](#3-nth-letter)
- [Testing](#testing)
- [CI/CD](#cicd)
- [Deployment](#deployment)
  - [Helm Chart](#helm-chart)
  - [ArgoCD (GitOps)](#argocd-gitops)
  - [Ansible](#ansible)
  - [Local Kubernetes Deployment](#local-kubernetes-deployment)
- [License](#license)
- [Author](#author)

---

## 🎯 Overview

EPAM Katas Challenge is an interactive web application that presents **3 programming challenges** (katas) implemented as a modern full-stack architecture. Each kata is a small algorithmic problem with its own interactive frontend UI and API endpoint on the backend.

### Challenges Included

| Kata | Description |
|------|-------------|
| **Dictionary** | Add and look up words with their definitions |
| **Shopping** | Select items from a catalog and calculate the total with tax |
| **Nth Letter** | Enter words to decode a secret word using the nth letter |

---

## 🏗️ Architecture

### Application Architecture

```
┌─────────────────┐      HTTP       ┌──────────────────┐
│   Frontend      │ ◄──────────────► │     Backend      │
│  (React + Vite) │                   │   (FastAPI)      │
│     Port 80     │                   │    Port 8000     │
└─────────────────┘                   └──────────────────┘
         │                                      │
         │         Docker Compose / K8s           │
         └────────────────────────────────────────┘
```

### Data Flow

1. The **frontend** (React + TypeScript) renders 3 interactive cards, one per kata
2. Each component uses **React Query** to communicate with the backend via **Axios**
3. The **backend** (FastAPI) exposes REST endpoints for each kata
4. The **katas** are pure Python modules containing the business logic

---

## 🚀 DevOps Architecture & CI/CD Flow

This project implements a complete GitOps-based deployment pipeline from code to production Kubernetes.

### Architecture Diagram

```
┌──────────────┐     push/PR      ┌──────────────────┐     build & push     ┌─────────────────┐
│  Developer   │ ───────────────► │  GitHub Actions  │ ─────────────────► │  GitHub Container│
│   (code)     │                │  (CI Pipeline)   │                    │  Registry (GHCR) │
└──────────────┘                └──────────────────┘                    └─────────────────┘
                                                                         │
                                                                         │ poll images
                                                                         ▼
                                ┌──────────────────┐     sync           ┌─────────────────┐
                                │   ArgoCD         │ ─────────────────► │  Kubernetes     │
                                │  (GitOps Agent)  │   auto-deploy      │  (Helm Chart)   │
                                │                  │                    │                 │
                                │ watches:         │                    │ • Backend svc   │
                                │ • helm/          │                    │ • Frontend svc  │
                                │ • argocd/        │                    │ • Ingress       │
                                │   application    │                    │ • Namespace     │
                                └──────────────────┘                    └─────────────────┘
```

### CI/CD Pipeline Flow

| Stage | Tool | What happens |
|-------|------|------------|
| **1. Source** | GitHub | Developer pushes code to `main` or opens PR |
| **2. CI — Build & Test** | GitHub Actions | Lint, test, build Docker images for both backend and frontend |
| **3. Registry** | GHCR | Images tagged as `latest` and pushed to `ghcr.io/ch1gu1/epam-katas-challenge-*` |
| **4. GitOps Sync** | ArgoCD | Detects changes in Helm chart or image tags, auto-syncs to cluster |
| **5. Deploy** | Kubernetes (Helm) | Rolling update of backend + frontend pods, traffic via Ingress |

### GitOps Policy (ArgoCD)

- **`prune: true`** — Removes Kubernetes resources deleted from the Helm chart
- **`selfHeal: true`** — Reverts any manual changes made directly in the cluster
- **`CreateNamespace=true`** — Auto-creates the `kata-challenge` namespace
- **`automated sync`** — No manual intervention needed after a push

### Why this stack?

| Layer | Choice | Reason |
|-------|--------|--------|
| CI/CD | GitHub Actions | Native, free for public repos, tight Git integration |
| Registry | GHCR | Free for public repos, no extra auth needed in Actions |
| GitOps | ArgoCD | Declarative, audit trail, rollback via Git history |
| Orchestration | Helm | Templating for environments (dev/staging/prod values) |
| Runtime | Kubernetes | Scalable, industry standard, Ingress for routing |

---

## 🛠️ Tech Stack

### Backend
- **Python 3.11**
- **FastAPI** — Modern, fast web framework
- **Uvicorn** — ASGI server
- **Pydantic** — Data validation
- **Pytest** + **pytest-cov** — Testing and coverage
- **Ruff** — Linter and formatter

### Frontend
- **React 19** + **TypeScript**
- **Vite** — Ultra-fast build tool
- **Tailwind CSS 4** — Utility-first CSS framework
- **shadcn/ui** — Accessible UI components
- **TanStack Query (React Query)** — Server state management
- **Axios** — HTTP client
- **Vitest** + **Testing Library** — Testing
- **MSW** — Mock Service Worker for tests

### Infrastructure & DevOps
- **Docker** + **Docker Compose**
- **Helm** — Kubernetes charts
- **ArgoCD** — Continuous GitOps
- **Ansible** — Deployment automation
- **GitHub Actions** — CI/CD
- **GitHub Container Registry (GHCR)** — Image registry

---

## 📁 Project Structure

```
epam-katas-challenge/
├── .github/
│   └── workflows/
│       └── ci.yml              # CI/CD pipeline
├── argocd/
│   └── application.yaml        # ArgoCD app (GitOps)
├── helm/
│   └── kata-challenge/         # Helm chart for K8s
│       ├── Chart.yaml
│       ├── values.yaml
│       └── templates/
│           ├── backend-deployment.yaml
│           ├── backend-service.yaml
│           ├── frontend-deployment.yaml
│           ├── frontend-service.yaml
│           └── ingress.yaml
├── infra/
│   └── ansible/                # Ansible playbooks
│       ├── ansible.cfg
│       ├── inventory/
│       │   └── hosts.ini
│       ├── playbooks/
│       │   └── site.yml
│       └── roles/
│           └── deploy_argocd/
│               └── tasks/
│                   └── main.yml
├── katas-challenge-backend/    # Python backend (FastAPI)
│   ├── api/
│   │   ├── main.py             # API entry point
│   │   └── routers/
│   │       ├── dictionary_router.py
│   │       ├── nth_letter_router.py
│   │       └── shopping_router.py
│   ├── katas/                  # Kata logic
│   │   ├── dictionary_kata.py
│   │   ├── nth_letter_kata.py
│   │   └── shopping_kata.py
│   ├── tests/                  # Unit tests
│   ├── Dockerfile
│   └── requirements.txt
├── katas-web-app/              # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── challenges/     # Kata components
│   │   │   │   ├── DictionaryChallenge.tsx
│   │   │   │   ├── ShoppingChallenge.tsx
│   │   │   │   └── NthLetterChallenge.tsx
│   │   │   └── ui/             # shadcn/ui components
│   │   ├── hooks/              # Custom hooks (React Query)
│   │   ├── lib/                # Utilities and API client
│   │   ├── types/              # TypeScript types
│   │   └── test/               # Test configuration
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.ts
└── docker-compose.yml           # Local orchestration
```

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) + Docker Compose
- [Node.js 20+](https://nodejs.org/) (for frontend dev only)
- [Python 3.11+](https://www.python.org/) (for backend dev only)

### Docker Compose

The fastest way to spin up the entire application:

```bash
# Clone the repository
git clone https://github.com/CH1GU1/epam-katas-challenge.git
cd epam-katas-challenge

# Start backend + frontend
docker-compose up --build
```

- **Frontend**: http://localhost:80
- **Backend API**: http://localhost:8000
- **Health Check**: http://localhost:8000/health

To stop:

```bash
docker-compose down
```

### Backend Only

```bash
cd katas-challenge-backend

# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Run development server
uvicorn api.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`.

Interactive documentation:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Frontend Only

```bash
cd katas-web-app

# Install dependencies
npm install

# Run development server
npm run dev
```

The frontend will be available at `http://localhost:5173` (default Vite port).

> ⚠️ **Note**: In standalone dev mode, make sure the backend is running at `http://localhost:8000` or configure the `VITE_API_URL` variable.

---

## 📡 API

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Service health check |
| `POST` | `/dictionary/add` | Add a word to the dictionary |
| `POST` | `/dictionary/look` | Look up a word in the dictionary |
| `POST` | `/shopping/total` | Calculate shopping total with tax |
| `POST` | `/nth-letter/decode` | Decode word using nth letters |

### Usage Examples

#### Health Check
```bash
curl http://localhost:8000/health
# {"status": "ok"}
```

#### Dictionary — Add Word
```bash
curl -X POST http://localhost:8000/dictionary/add \
  -H "Content-Type: application/json" \
  -d '{"word": "hello", "definition": "a greeting in English"}'
# {"message": "Entry 'hello' added successfully"}
```

#### Dictionary — Look Up Word
```bash
curl -X POST http://localhost:8000/dictionary/look \
  -H "Content-Type: application/json" \
  -d '{"word": "hello"}'
# {"word": "hello", "definition": "a greeting in English", "found": true}
```

#### Shopping — Calculate Total
```bash
curl -X POST http://localhost:8000/shopping/total \
  -H "Content-Type: application/json" \
  -d '{
    "costs": {"socks": 5, "shoes": 60, "sweater": 30},
    "items": ["socks", "shoes"],
    "tax": 9
  }'
# {"items_found": ["socks", "shoes"], "items_ignored": [], ...}
```

#### Nth Letter — Decode
```bash
curl -X POST http://localhost:8000/nth-letter/decode \
  -H "Content-Type: application/json" \
  -d '{"words": ["yoda", "best", "has"]}'
# {"result": "yes", "breakdown": [...]}
```

---

## 🧩 Katas

### 1. Dictionary

Implements a simple dictionary where you can add words with definitions and look them up later.

**Logic**:
```python
class Dictionary:
    def newentry(self, word: str, definition: str) -> None: ...
    def look(self, word: str) -> str: ...
```

**Frontend**: UI with inputs to add words and a search bar with visual feedback.

### 2. Shopping

Calculates the total of a purchase by adding the costs of selected items and applying tax.

**Logic**:
```python
def get_total(costs: dict[str, float], items: list[str], tax: float) -> float: ...
```

**Frontend**: Catalog with checkboxes, tax slider, and total breakdown.

### 3. Nth Letter

Decodes a secret word by taking the nth letter from each word in a list.

**Logic**:
```python
def nth_letter(words: list[str]) -> str:
    return "".join(word[index] for index, word in enumerate(words))
# "yoda", "best", "has" -> "y"(0) + "e"(1) + "s"(2) = "yes"
```

**Frontend**: Dynamic word list with add/remove buttons, and step-by-step breakdown.

---

## 🧪 Testing

### Backend

```bash
cd katas-challenge-backend
pip install -r requirements.txt
pip install pytest pytest-cov

# Run tests
pytest

# With coverage
pytest --cov=api --cov=katas --cov-report=html
```

### Frontend

```bash
cd katas-web-app
npm install

# Run tests (once)
npm run test

# Watch mode
npm run test:watch

# With coverage
npm run test:coverage
```

---

## 🔄 CI/CD

The GitHub Actions pipeline (`ci.yml`) is the entry point of the DevOps flow described in the [Architecture](#-devops-architecture--cicd-flow) section. It runs on every push or PR to `main`:

### Backend CI Job
1. Checkout code
2. Set up Python 3.11
3. Install dependencies (`pip`)
4. Lint with **Ruff**
5. Run tests with **pytest** + coverage
6. Build Docker image and push to **GHCR** (push events only — skipped on PRs)

### Frontend CI Job
1. Checkout code
2. Set up Node.js 20
3. Install dependencies (`npm ci`)
4. Run tests with **Vitest** + coverage
5. Build Docker image and push to **GHCR** (push events only)

### Generated Images

These are the same images ArgoCD polls and deploys to Kubernetes:

```
ghcr.io/ch1gu1/epam-katas-challenge-backend:latest
ghcr.io/ch1gu1/epam-katas-challenge-frontend:latest
```

> 💡 **Tip**: On PRs, the pipeline still runs lint and tests but skips image builds to save time and registry space.

---

## ☸️ Deployment

This section covers how the Kubernetes infrastructure is provisioned and how ArgoCD keeps it in sync — completing the DevOps loop from the [Architecture](#-devops-architecture--cicd-flow) diagram.

### Helm Chart

The Helm chart (`helm/kata-challenge/`) is the single source of truth for Kubernetes resources. It deploys both services (backend and frontend) along with their deployments, services, and ingress.

```bash
# Install the chart manually (if not using ArgoCD)
helm install kata-challenge ./helm/kata-challenge

# Upgrade
helm upgrade kata-challenge ./helm/kata-challenge

# Uninstall
helm uninstall kata-challenge
```

### Configuration (values.yaml)

```yaml
backend:
  image: ghcr.io/ch1gu1/epam-katas-challenge-backend
  tag: latest
  port: 8000
  replicas: 1

frontend:
  image: ghcr.io/ch1gu1/epam-katas-challenge-frontend
  tag: latest
  port: 80
  replicas: 1
  apiUrl: http://kata-challenge.local/api

ingress:
  host: kata-challenge.local
```

> ℹ️ **Note**: Images use the full registry path (`ghcr.io/...`) directly in `values.yaml`. The Helm templates reference `.Values.backend.image` and `.Values.frontend.image` without a separate `registry` prefix. Both deployments also set `revisionHistoryLimit: 2` to keep only the last two ReplicaSet revisions.

### ArgoCD (GitOps)

ArgoCD (`argocd/application.yaml`) connects the Git repository to the Kubernetes cluster. It watches the `helm/kata-challenge` path and the `argocd/application.yaml` itself, automatically syncing any changes.

```bash
# Install the ArgoCD application
kubectl apply -f argocd/application.yaml
```

**What ArgoCD handles automatically:**
- Detects new commits in `main`
- Reads the Helm chart from `helm/kata-challenge`
- Pulls the `latest` images from GHCR
- Applies rolling updates to the cluster
- Prunes deleted resources and self-heals drift

**Sync Policy:**
- `prune: true` — Removes Kubernetes resources deleted from the Helm chart
- `selfHeal: true` — Reverts any manual changes made directly in the cluster
- `CreateNamespace=true` — Auto-creates the `kata-challenge` namespace

### ArgoCD Image Updater

Image Updater is installed automatically by the [Ansible playbook](#ansible). It works alongside ArgoCD to solve the "`latest` tag doesn't trigger a sync" problem:

- Polls GHCR every few minutes for new images
- Uses **digest strategy** to compare image digests (even when the tag is still `latest`)
- Updates the Helm chart parameters in the ArgoCD Application automatically
- Triggers ArgoCD to sync and redeploy the pods

The `application.yaml` configures Image Updater with:

- `image-list` pointing both services to `:latest` with explicit `digest` strategy
- `pull-secret` references (`ghcr-image-updater` in the `argocd` namespace) so Image Updater can authenticate with GHCR
- Per-service `helm.image-name` and `helm.image-tag` mappings so Image Updater writes back to the correct Helm values

> ℹ️ **Note**: The `write-back-method: argocd` annotation is no longer used. Image Updater updates the ArgoCD Application parameters directly, which ArgoCD then detects and syncs.

### Ansible

For clusters that don't have ArgoCD yet, the Ansible playbook installs both **ArgoCD** and **ArgoCD Image Updater**, and also bootstraps the required Kubernetes resources (namespace and pull secrets).

#### What the playbook does

1. Installs **ArgoCD** in the `argocd` namespace
2. Installs **ArgoCD Image Updater** in the `argocd` namespace
3. Creates the `ghcr-image-updater` secret in `argocd` — used by Image Updater to authenticate with GHCR
4. Creates the `kata-challenge` namespace
5. Creates the `ghcr-secret` pull secret in `kata-challenge` — used by pods to pull images
6. Applies the ArgoCD Application manifest

#### Variables

The playbook loads two variable files:

**`group_vars/all.yml`** (plaintext):
```yaml
ansible_user: "{{ lookup('env', 'USER') }}"
kubeconfig_path: "{{ lookup('env', 'HOME') }}/.kube/config"
ghcr_username: ch1gu1
ghcr_email: kamcak@hotmail.es
```

**`group_vars/vault.yml`** (encrypted with Ansible Vault):
```yaml
ghcr_token: YOUR_GITHUB_PERSONAL_ACCESS_TOKEN
```

> 💡 **Tip**: Generate a GitHub Personal Access Token with `read:packages` scope at [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens).

Before running the playbook, make sure the vault contains your token:

```bash
cd infra/ansible
ansible-vault edit group_vars/vault.yml
```

Then run the playbook:

```bash
ansible-playbook -i inventory/hosts.ini playbooks/site.yml
```

> 🔒 **Security**: `vault.yml` is encrypted with Ansible Vault. The repository includes an encrypted version; you should replace it with your own token using `ansible-vault create` or `ansible-vault edit`.

---

## 🖥️ Local Kubernetes Deployment

This guide walks you through deploying the entire stack on a local Kubernetes cluster using **Minikube**, **Ansible**, and **ArgoCD**. These steps mirror the full DevOps pipeline described in the [Architecture](#-devops-architecture--cicd-flow) section, but running entirely on your machine.

### 1. Start Minikube

Create a 2-node cluster with the Docker driver and enable the Ingress addon:

```bash
minikube start --nodes 2 --driver=docker
minikube addons enable ingress

# Verify
kubectl get nodes
```

### 2. Install ArgoCD via Ansible

Run the Ansible playbook to install **ArgoCD**, **ArgoCD Image Updater**, and the required pull secrets in the cluster:

```bash
cd ~/epam-katas-challenge/infra/ansible
ansible-playbook playbooks/site.yml -i inventory/hosts.ini
```

> This is a one-time setup. The playbook installs:
> - **ArgoCD** — the GitOps controller
> - **ArgoCD Image Updater** — watches GHCR and auto-updates images when new versions are pushed
> - **GHCR secrets** — both for Image Updater (`argocd` namespace) and for pod image pulls (`kata-challenge` namespace)
>
> Once installed, both services manage all future application deployments automatically.

> ⚠️ **Prerequisite**: Before running the playbook, edit `group_vars/all.yml` with your GHCR username/email, and create/edit `group_vars/vault.yml` with your GitHub Personal Access Token (encrypted with Ansible Vault). See the [Ansible](#ansible) section for details.

### 3. Verify Secrets (Optional)

If you want to confirm the playbook created everything correctly:

```bash
# Image Updater pull secret
kubectl get secret ghcr-image-updater -n argocd

# Application namespace and pull secret
kubectl get namespace kata-challenge
kubectl get secret ghcr-secret -n kata-challenge
```

If any are missing, check that `group_vars/vault.yml` contains a valid `ghcr_token`.

### 4. Apply the ArgoCD Application

Connect the Git repository to ArgoCD so it can auto-sync the Helm chart:

```bash
kubectl apply -f argocd/application.yaml
```

ArgoCD will now watch the `helm/kata-challenge` directory and automatically deploy any changes. **Image Updater** (installed by the Ansible playbook) will separately watch GHCR and update image tags when new images are pushed, causing ArgoCD to resync automatically.

### 5. Access the Services (Windows)

Use `kubectl port-forward` to expose the services locally:

```bash
# Terminal 1 — ArgoCD UI
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Terminal 2 — Application via Ingress
kubectl port-forward svc/ingress-nginx-controller 8888:80 -n ingress-nginx
```

| Service | URL |
|---------|-----|
| Application | http://localhost:8888 |
| ArgoCD UI | https://localhost:8080 |

### 6. Get the ArgoCD Admin Password

```bash
kubectl -n argocd get secret argocd-initial-admin-secret \
  -o jsonpath="{.data.password}" | base64 -d && echo
```

Login with:
- **Username**: `admin`
- **Password**: (the output from the command above)

### 7. Verify Everything is Running

```bash
# Check the application namespace
kubectl get all -n kata-challenge

# Check the ArgoCD namespace
kubectl get all -n argocd
```

You should see pods running for both the backend and frontend, along with their services and the ingress controller.

### How Image Updates Work Now

With Image Updater in place, the flow after a code push is:

1. Developer pushes code to `main`
2. GitHub Actions builds and pushes new images to GHCR (tagged `latest`)
3. **Image Updater** detects the new digest in GHCR (within ~2 minutes)
4. Image Updater updates the ArgoCD Application parameters
5. **ArgoCD** sees the parameter change and auto-syncs
6. Kubernetes performs a rolling update of the affected pods

No manual sync, no hard refresh, no `kubectl rollout restart` needed.

### Troubleshooting

| Issue | Fix |
|-------|-----|
| `ImagePullBackOff` | Verify the `ghcr-secret` exists in `kata-challenge` and the token has `read:packages` scope |
| `ErrImagePull` | Check that the image in `helm/kata-challenge/values.yaml` matches what's in GHCR (full path: `ghcr.io/ch1gu1/...`) |
| Ingress not working | Ensure `minikube addons enable ingress` was run |
| ArgoCD not syncing | Check the ArgoCD UI at `https://localhost:8080` for sync errors |
| ArgoCD green but app not updated | ArgoCD only watches Git. Check that **Image Updater** pod is running (`kubectl get pods -n argocd -l app.kubernetes.io/name=argocd-image-updater`). Also verify Image Updater can reach GHCR. |
| Image Updater not detecting new images | Check Image Updater logs: `kubectl logs -n argocd deployment/argocd-image-updater`. Ensure `application.yaml` annotations are correct and the images are accessible from the cluster. |
| Ansible asks for vault password | You need the vault password to decrypt `group_vars/vault.yml`. If you don't have it, recreate the file with your own token: `ansible-vault create infra/ansible/group_vars/vault.yml` |
| Secrets not created by Ansible | Ensure `ghcr_token` inside `vault.yml` is valid and the vault was decrypted correctly during the playbook run |

---

## 👤 Author

**Kevin Mera**

This project was built as part of an EPAM challenge, showcasing a full-stack application with modern DevOps practices.

---

## 📄 License

This project was created as part of an EPAM challenge. Free to use for learning and reference.

---

<div align="center">

**[⬆ Back to top](#epam-katas-challenge)**

</div>
