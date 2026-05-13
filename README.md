# Healthcare Portal

> **⚠️ SECURITY DISCLAIMER:** This application is **intentionally vulnerable** and is designed exclusively for security scanning demonstrations, DevSecOps training, and testing AI-powered vulnerability orchestration platforms. **Do NOT deploy to production. Do NOT use real credentials.**

A realistic enterprise-grade Node.js healthcare portal API used to demonstrate Trivy security scanning capabilities including CVE detection, secret scanning, Docker vulnerability analysis, and IaC misconfiguration detection.

---

## Project Structure

```
healthcare-portal/
├── src/
│   ├── index.js                  # App entry point
│   ├── config/
│   │   └── config.js             # App config (contains demo secrets)
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── patientController.js
│   │   ├── doctorController.js
│   │   ├── appointmentController.js
│   │   └── recordController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── patients.js
│   │   ├── doctors.js
│   │   ├── appointments.js
│   │   └── records.js
│   └── middleware/
│       └── auth.js
├── k8s/
│   ├── deployment.yaml           # Insecure K8s deployment
│   └── rbac.yaml                 # Overly permissive RBAC
├── terraform/
│   └── main.tf                   # Insecure AWS infrastructure
├── .github/workflows/
│   └── trivy-scan.yml            # Automated Trivy scanning
├── Dockerfile                    # Outdated base image
├── docker-compose.yml            # Insecure compose config
├── package.json                  # Vulnerable dependencies
├── .env.example                  # Exposed demo secrets
└── README.md
```

---

## API Endpoints

| Method | Endpoint                        | Description              |
|--------|---------------------------------|--------------------------|
| POST   | /api/auth/login                 | Authenticate user        |
| POST   | /api/auth/register              | Register new user        |
| GET    | /api/auth/me                    | Get current user         |
| GET    | /api/patients                   | List all patients        |
| GET    | /api/patients/:id               | Get patient by ID        |
| POST   | /api/patients                   | Create patient           |
| GET    | /api/doctors                    | List all doctors         |
| GET    | /api/appointments               | List appointments        |
| POST   | /api/appointments               | Create appointment       |
| GET    | /api/records                    | List medical records     |
| GET    | /api/records/file/:filename     | Download record file     |
| GET    | /health                         | Health check             |

---

## Local Setup

### Prerequisites
- Node.js >= 14
- Docker & Docker Compose

### Run with Node.js

```bash
cd healthcare-portal
cp .env.example .env
npm install
npm start
```

App runs at: `http://localhost:3000`

### Run with Docker Compose

```bash
docker-compose up --build
```

### Test the API

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin@Healthcare2023!"}'

# Use the returned token
curl http://localhost:3000/api/patients \
  -H "Authorization: Bearer <token>"
```

---

## GitHub Actions - Trivy Scanning

The workflow at `.github/workflows/trivy-scan.yml` runs automatically on every push and pull request.

### Jobs

| Job | Scan Type | What It Detects |
|-----|-----------|-----------------|
| `trivy-fs-scan` | Filesystem | Dependency CVEs, hardcoded secrets |
| `trivy-config-scan` | Config/IaC | Dockerfile, K8s, Terraform misconfigs |
| `trivy-image-scan` | Docker Image | OS-level CVEs in container layers |
| `trivy-combined-report` | Merged | Aggregated findings across all scans |

### Artifacts Generated

After each workflow run, the following artifacts are available for download from the **Actions** tab:

| Artifact | Format | Contents |
|----------|--------|----------|
| `trivy-fs-json` | JSON | Filesystem scan results |
| `trivy-fs-sarif` | SARIF | Filesystem scan (SARIF format) |
| `trivy-config-json` | JSON | IaC/config scan results |
| `trivy-config-sarif` | SARIF | IaC/config scan (SARIF format) |
| `trivy-image-json` | JSON | Docker image scan results |
| `trivy-image-sarif` | SARIF | Docker image scan (SARIF format) |
| `trivy-results-combined` | JSON | Merged report from all scans |

---

## Intentional Vulnerabilities (Demo Purposes)

### Vulnerable Dependencies
- `lodash@4.17.15` — Prototype pollution (CVE-2020-8203)
- `axios@0.21.1` — SSRF vulnerability (CVE-2021-3749)
- `express-session@1.17.1` — Session fixation issues
- `minimist@1.2.5` — Prototype pollution (CVE-2021-44906)
- `jsonwebtoken@8.5.1` — Algorithm confusion vulnerabilities
- `marked@1.1.0` — XSS vulnerabilities
- `helmet@3.23.3` — Outdated security headers

### Exposed Secrets
- Fake AWS access key/secret in `.env.example` and `config.js`
- Hardcoded JWT secret
- Hardcoded database credentials
- Fake Twilio, SendGrid, Stripe API keys

### Docker Issues
- Outdated base image: `node:14.17.0`
- Running as root user
- No resource limits

### IaC Misconfigurations
- K8s: privileged containers, root user, wildcard RBAC
- Terraform: public S3 bucket, unencrypted RDS, `0.0.0.0/0` security groups, hardcoded credentials, wildcard IAM policy

---

## ⚠️ Security Disclaimer

This repository is **intentionally insecure** for educational and demonstration purposes only.

- All credentials are **fake and non-functional**
- Do **not** deploy this to any real environment
- Do **not** use this as a template for production applications
- This project exists solely to generate meaningful Trivy scan findings for testing security tooling
