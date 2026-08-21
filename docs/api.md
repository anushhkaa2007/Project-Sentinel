# Sentinel — API Contract

## 1. Purpose

This document defines the API contract between the Sentinel frontend and backend.

The frontend must communicate with the backend through these documented endpoints.

The backend implementation may change internally, but the API contract should remain stable unless both frontend and backend developers agree to a change.

---

## 2. Base URL

During local development:

```text
http://localhost:8000