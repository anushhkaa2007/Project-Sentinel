# Sentinel Backend Architecture

## 1. Purpose

The Sentinel backend is responsible for receiving investigation requests, validating targets, collecting passive/public OSINT data, normalizing that data, and providing structured results to the frontend.

The backend should act as the central intelligence and data-processing layer of Sentinel.

The backend does **not** control the frontend UI.

---

## 2. Backend Responsibilities

The backend is responsible for:

1. Receiving investigation requests.
2. Validating user input.
3. Running passive/public information collectors.
4. Normalizing information from different sources into a common structure.
5. Handling errors and unavailable data gracefully.
6. Returning consistent JSON responses to the frontend.
7. Providing investigation results to the frontend.
8. Providing basic health/status information.
9. Providing automated tests for backend functionality.

---

## 3. Backend Does NOT Do

The Sentinel backend will not perform:

- Exploitation
- Credential attacks
- Password cracking
- Brute-force attacks
- Unauthorized active scanning
- Authentication bypass
- Malware deployment
- Vulnerability exploitation
- Collection of private or restricted information

Sentinel v1 focuses on passive and publicly available information.

---

## 4. Initial Technology Stack

### Programming Language

Python

### Web Framework

FastAPI

### ASGI Server

Uvicorn

### Data Validation / Schema

Pydantic

### API Format

REST-style HTTP API

### Data Format

JSON

### Storage

SQLite

Use SQLite for investigation history and persistence. Do not introduce a more complex database architecture unless the project requires it.

### Testing

Python testing framework such as pytest, using FastAPI's TestClient.

---

## 5. High-Level Architecture

```text
                    FRONTEND
                       |
                       | HTTP/JSON
                       |
                       v
                +--------------+
                |   API Layer  |
                +--------------+
                       |
                       v
              +------------------+
              | Investigation    |
              | Service          |
              +------------------+
                       |
          +------------+------------+
          |            |            |
          v            v            v
       DNS Service  TLS Service  IP Service
          |            |            |
          +------------+------------+
                       |
                       v
                Data Normalization
                       |
                       v
                 Structured Data
                       |
                       v
                    JSON API
                       |
                       v
                    FRONTEND

```

---

## 6. Proposed Project Structure

```text
backend/
│
├── app.py
│
├── routes/
│   ├── __init__.py
│   └── investigations.py
│
├── services/
│   ├── __init__.py
│   ├── investigation_service.py
│   ├── dns_service.py
│   ├── certificate_service.py
│   ├── ip_service.py
│   └── technology_service.py
│
├── models/
│   ├── __init__.py
│   └── investigation.py
│
├── utils/
│   ├── __init__.py
│   ├── validators.py
│   └── errors.py
│
├── tests/
│   ├── __init__.py
│   ├── test_health.py
│   ├── test_investigations.py
│   └── test_validators.py
│
├── requirements.txt
└── .env.example

```

The structure may evolve as the project grows, but new code should be placed in the appropriate module rather than creating a large monolithic file.

---

## 7. API Layer

The API layer is responsible for:

- Receiving HTTP requests via FastAPI path operations and routers
- Validating request and response structure with Pydantic models
- Calling the appropriate service
- Returning JSON responses
- Returning appropriate HTTP status codes

The API layer should not contain the actual OSINT collection logic.

For example:

```text
FastAPI router
  ↓
Investigation Service
  ↓
DNS Service

```

Instead of:

```text
FastAPI router
  ↓
Everything

```

---

## 8. Initial API Endpoints

### Health Check

```http
GET /api/health

```

Purpose:

Verify that the backend is running.

Example response:

```json
{
  "status": "ok",
  "service": "sentinel-backend"
}

```

---

### Create Investigation

```http
POST /api/investigations

```

Request:

```json
{
  "target": "example.com"
}

```

The backend validates the target and starts the investigation process.

---

### Get Investigation

```http
GET /api/investigations/{investigation_id}

```

Purpose:

Retrieve the results of an investigation.

---

## 9. Investigation Flow

The intended flow is:

```text
User enters target
        |
        v
POST /api/investigations
        |
        v
Validate target
        |
        v
Create investigation
        |
        v
Run collectors
        |
        +----> DNS
        |
        +----> Certificate
        |
        +----> IP/Infrastructure
        |
        +----> Technology
        |
        v
Normalize results
        |
        v
Create investigation result
        |
        v
Return structured JSON

```

For the first implementation, investigations may run synchronously.

If collection becomes slow later, asynchronous/background processing can be introduced.

Do not introduce background job systems until there is a real need.

---

## 10. Target Validation

The backend must validate the target before attempting collection.

For v1, the primary target type is:

```text
Domain

```

Examples of valid targets:

```text
example.com
google.com
github.com

```

Invalid input should produce a clear error response.

Example:

```json
{
  "error": {
    "code": "INVALID_TARGET",
    "message": "The provided target is not a valid domain."
  }
}

```

Validation should be centralized rather than duplicated across multiple routers. Use Pydantic models for request and response schemas, and keep domain-specific target validation in shared utilities or services.

---

## 11. Intelligence Services

Each type of intelligence should have its own service.

### DNS Service

Responsible for collecting publicly available DNS information.

Initial records may include:

- A
- AAAA
- MX
- NS
- CNAME
- TXT

The service should return structured data rather than raw command output.

---

### Certificate Service

Responsible for retrieving publicly available TLS/certificate information where appropriate.

Potential information:

- Subject
- Issuer
- Valid-from date
- Valid-to date
- Subject alternative names

---

### IP/Infrastructure Service

Responsible for processing publicly available IP/infrastructure information associated with the target.

The service should not perform unauthorized active scanning.

---

### Technology Service

Responsible for identifying technologies from publicly available information where possible.

Examples may include:

- Web server
- Framework
- CDN
- JavaScript libraries
- Hosting-related technologies

Technology detection should be treated as an observation, not guaranteed truth.

---

## 12. Data Normalization

Different external sources may return information in different formats.

The backend should normalize these results into a consistent Sentinel data model, represented with Pydantic models.

Example:

```json
{
  "target": {
    "domain": "example.com"
  },
  "dns": {
    "a": [],
    "aaaa": [],
    "mx": [],
    "ns": [],
    "cname": [],
    "txt": []
  },
  "infrastructure": {
    "ips": [],
    "hosts": []
  },
  "certificates": [],
  "technologies": [],
  "relationships": []
}

```

The frontend should not need to understand how individual external sources work.

---

## 13. Relationships

Sentinel will eventually represent relationships between discovered entities.

Example:

```text
Domain
  |
  +---- IP
  |
  +---- Certificate
  |
  +---- Technology
  |
  +---- DNS Record

```

The backend should provide relationships in a frontend-friendly structure.

Example:

```json
{
  "relationships": [
    {
      "source": "example.com",
      "target": "93.184.216.34",
      "type": "resolves_to"
    }
  ]
}

```

This data will later power the Sentinel relationship graph.

---

## 14. Error Handling

External information sources can fail, timeout, return incomplete information, or become unavailable.

One failed source should not necessarily cause the entire investigation to fail.

For example:

```text
DNS             ✓
Certificates    ✓
IP information  ✓
Technology      ✗

```

The investigation should still return the available information.

The response should make the unavailable source clear.

Example:

```json
{
  "status": "partial",
  "sources": {
    "dns": "success",
    "certificates": "success",
    "ip": "success",
    "technologies": "failed"
  }
}

```

Errors should be logged for debugging without exposing sensitive implementation details to the frontend.

---

## 15. Configuration and Secrets

Secrets and API keys must never be committed to GitHub.

Local secrets should be stored in environment variables.

Example:

```text
.env

```

The repository should contain:

```text
.env.example

```

but not the actual `.env` file.

Example:

```text
API_KEY=your_key_here

```

The actual key must remain local.

---

## 16. Testing Strategy

Every important backend component should have tests.

Initial tests:

```text
Health endpoint
Target validation
Investigation endpoint
Invalid target handling
Empty data handling
Service failure handling
API response structure

```

A collector should ideally be testable independently from the API.

For example:

```text
test_dns_service()
test_certificate_service()
test_validator()

```

External services should be mocked where appropriate so tests do not depend on live external systems.

API tests should use FastAPI's TestClient rather than calling Uvicorn as a live server.

---

## 17. Development Principles

The backend should follow these principles:

### Keep it simple

Use a modular monolith for v1.

Do not introduce microservices, queues, containers, or complex infrastructure without a real requirement.

### Separate responsibilities

FastAPI routers handle HTTP.

Services handle business/data collection logic.

Pydantic models define request, response, and domain data structures.

Utilities handle reusable helpers.

Tests verify behavior.

### Fail gracefully

External data sources are unreliable.

A missing source should not automatically destroy an entire investigation.

### Validate input

Never trust data received from the frontend. Validate it with Pydantic and shared domain validators.

### Don't hard-code secrets

Use environment variables.

### Build incrementally

Implement one collector at a time.

Do not build every OSINT source simultaneously.

---

## 18. Development Order

Backend development should follow this order:

```text
1. Python environment
        ↓
2. FastAPI application (Uvicorn)
        ↓
3. Health endpoint
        ↓
4. Investigation API
        ↓
5. Target validation
        ↓
6. Investigation data model
        ↓
7. Mock investigation service
        ↓
8. DNS service
        ↓
9. Certificate service
        ↓
10. IP/infrastructure service
        ↓
11. Technology service
        ↓
12. Data normalization
        ↓
13. Relationship generation
        ↓
14. Error handling
        ↓
15. Automated tests
        ↓
16. Frontend integration

```

---

## 19. AI Agent Rules

AI coding agents working on the backend must follow these rules:

1. Read the backend architecture before modifying the backend.
2. Do not redesign the architecture without discussion.
3. Do not add unnecessary dependencies.
4. Do not implement features outside the current task.
5. Do not expose secrets.
6. Do not modify frontend code unless explicitly requested.
7. Do not perform unauthorized active scanning or exploitation.
8. Keep services modular and testable.
9. Add or update tests when implementing backend functionality.
10. Explain significant architectural changes before making them.

The human developers remain responsible for reviewing and accepting AI-generated code.

---

## 20. Definition of Done

A backend feature is considered complete when:

- The feature is implemented.
- The code is placed in the appropriate module.
- Input validation exists where required.
- Errors are handled.
- Tests exist for important behavior.
- The API response follows the agreed contract.
- No secrets are committed.
- The feature works with the existing backend.
- The code has been reviewed.
- The changes have been committed to Git.

---

## 21. Current Backend Goal

The immediate goal is **not** to build the complete OSINT engine.

The first milestone is:

```text
POST /api/investigations
        |
        v
Validate domain
        |
        v
Create investigation
        |
        v
Return mock structured data
        |
        v
Frontend can display it

```

Once this foundation works, real passive intelligence collectors can be added one at a time.