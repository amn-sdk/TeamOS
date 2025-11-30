# TeamOS - Kubernetes & CI/CD Setup

## 📦 What's Included

### Dockerfiles
- **`infra/docker/Dockerfile.api`**: Production-ready NestJS API image
- **`infra/docker/Dockerfile.web`**: Production-ready Next.js web image

### Kubernetes Manifests (`infra/k8s/`)
- **postgres.yaml**: PostgreSQL 16 with PersistentVolumeClaim (5Gi)
- **redis.yaml**: Redis 7 for caching and job queues
- **api.yaml**: NestJS API (2 replicas, health checks, auto-scaling ready)
- **web.yaml**: Next.js web (2 replicas, LoadBalancer service)

### GitHub Actions Workflows (`.github/workflows/`)
- **ci-tests.yml**: Runs tests on push/PR (API + Web)
- **build-push.yml**: Builds and pushes Docker images to GHCR
- **deploy-k8s.yml**: Deploys to Kubernetes after successful build

## 🚀 Quick Start

### 1. Local Development (Docker Compose)
```bash
docker-compose -f infra/docker/docker-compose.dev.yml up -d
```

### 2. Deploy to Minikube
```bash
# Start Minikube
minikube start

# Apply manifests
kubectl apply -f infra/k8s/postgres.yaml
kubectl apply -f infra/k8s/redis.yaml
kubectl apply -f infra/k8s/api.yaml
kubectl apply -f infra/k8s/web.yaml

# Check status
kubectl get pods
kubectl get services

# Access the web app
minikube service web-service
```

### 3. CI/CD Pipeline

The GitHub Actions pipeline automatically:

1. **On Push/PR**: Runs tests (CI)
2. **On Push to `main`**: Builds and pushes Docker images to GHCR
3. **After Build**: Deploys to Kubernetes cluster

#### Required GitHub Secrets

For CD to work, set the following secret in your GitHub repository:

- **`KUBE_CONFIG`**: Base64-encoded kubeconfig file

```bash
# Generate secret value
cat ~/.kube/config | base64 | pbcopy
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     LoadBalancer                         │
│                    (web-service)                         │
└─────────────────┬───────────────────────────────────────┘
                  │
         ┌────────┴────────┐
         │                 │
    ┌────▼────┐      ┌────▼────┐
    │  Web 1  │      │  Web 2  │
    │ Next.js │      │ Next.js │
    └────┬────┘      └────┬────┘
         │                │
         └────────┬────────┘
                  │
         ┌────────▼────────┐
         │   api-service   │
         │   (ClusterIP)   │
         └────────┬────────┘
                  │
         ┌────────┴────────┐
         │                 │
    ┌────▼────┐      ┌────▼────┐
    │  API 1  │      │  API 2  │
    │ NestJS  │      │ NestJS  │
    └────┬────┘      └────┬────┘
         │                │
         └────────┬────────┘
                  │
    ┌─────────────┴─────────────┐
    │                           │
┌───▼──────┐          ┌─────────▼────┐
│ Postgres │          │    Redis     │
│  (PVC)   │          │ (ephemeral)  │
└──────────┘          └──────────────┘
```

## 📊 Monitoring

Check deployment status:
```bash
# Pods
kubectl get pods -w

# Services
kubectl get services

# Logs
kubectl logs -f deployment/api
kubectl logs -f deployment/web

# Rollout status
kubectl rollout status deployment/api
kubectl rollout status deployment/web
```

## 🔄 Rolling Updates

GitHub Actions automatically performs rolling updates. Manual rollback:
```bash
kubectl rollout undo deployment/api
kubectl rollout undo deployment/web
```

## 🔐 Security Notes

- **Secrets**: Currently using basic secrets. For production, use Kubernetes Secrets or external secret managers (Vault, AWS Secrets Manager)
- **JWT_SECRET**: Change the default in `api.yaml` before deploying to production
- **Database Password**: Update in `postgres.yaml` for production

## 📈 Scaling

```bash
# Scale API
kubectl scale deployment/api --replicas=3

# Scale Web
kubectl scale deployment/web --replicas=3

# Enable autoscaling (HPA)
kubectl autoscale deployment/api --cpu-percent=70 --min=2 --max=10
kubectl autoscale deployment/web --cpu-percent=70 --min=2 --max=10
```

## 🐛 Troubleshooting

### Pods not starting
```bash
kubectl describe pod <pod-name>
kubectl logs <pod-name>
```

### Service not accessible
```bash
kubectl get endpoints
kubectl describe service web-service
```

### Image pull errors
Check GHCR authentication and image tags in manifests.

## 📚 Next Steps

1. **Configure Minikube/K8s cluster** (last task in Phase 6)
2. **Test full deployment pipeline**
3. **Continue with Phase 2: Frontend Foundation**
