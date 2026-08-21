# Sentinel — System Architecture

## 1. Overview

Sentinel is a web-based passive OSINT dashboard.

The system accepts a public domain as a target, collects publicly available technical information, normalizes the collected data, stores the investigation, and presents the results through a visual web interface.

The v1 architecture is intentionally designed as a modular monolith so that the project remains simple to develop, test, and maintain.

---

## 2. Architecture Goals

The architecture should:

- Keep frontend and backend responsibilities clearly separated.
- Allow frontend and backend development to happen independently.
- Provide a stable API contract between frontend and backend.
- Make intelligence collectors modular and replaceable.
- Handle missing or unavailable information gracefully.
- Keep the application easy to run locally.
- Allow future expansion without unnecessary complexity.
- Support development using multiple AI coding agents.

---

## 3. High-Level Architecture

```text
                         USER
                          |
                          v
                  +---------------+
                  |    Browser    |
                  +-------+-------+
                          |
                          v
                  +---------------+
                  |   Frontend    |
                  | React + Vite  |
                  +-------+-------+
                          |
                     REST / JSON
                          |
                          v
                  +---------------+
                  |    Backend    |
                  |    FastAPI    |
                  +-------+-------+
                          |
              +-----------+-----------+
              |           |           |
              v           v           v
            DNS         TLS       Technology
          Collector    Collector   Collector
              |           |           |
              +-----------+-----------+
                          |
                          v
                  Data Normalization
                          |
                          v
                  Investigation Model
                          |
                          v
                       SQLite