# Project-Sentinel

# Sentinel

## What is Sentinel?

Sentinel is a **passive OSINT (Open-Source Intelligence) dashboard** that collects publicly available information about a domain or organization and presents it in one place as structured, searchable, and visual intelligence.

The project is being built as an **AI-assisted software engineering experiment**, using multiple AI agents alongside human developers to design, build, test, and improve the application.

## Who is it for?

Sentinel is designed for:

* Students learning cybersecurity, software development, and OSINT
* Security researchers working with publicly available information
* Developers who want to understand how modern AI-assisted development workflows operate
* Anyone who wants to explore relationships between domains, infrastructure, technologies, and other public information

Sentinel is primarily an **educational and research project**, not an offensive security platform.

## What does it do?

A user provides a target domain, such as:

```text
example.com
```

Sentinel gathers relevant passive/public information and organizes it into an intelligence dashboard.

The dashboard is intended to provide:

* Domain information
* DNS records
* IP and hosting information
* TLS/SSL certificate information
* Detected technologies
* Related infrastructure
* Relationships between discovered entities
* A visual intelligence graph
* A consolidated investigation report

The core idea is:

```text
Public Information
        ↓
   Data Collection
        ↓
  Data Normalization
        ↓
     Sentinel
        ↓
 Visual Intelligence
```

## What does v1 include?

### Core

* [ ] Web-based dashboard
* [ ] Target/domain input
* [ ] Backend API
* [ ] Frontend ↔ backend integration
* [ ] Basic error handling
* [ ] Loading and empty states

### Intelligence

* [ ] Domain metadata
* [ ] DNS records
* [ ] IP/host information
* [ ] TLS/SSL certificate information
* [ ] Basic technology detection
* [ ] Infrastructure relationships

### Visualization

* [ ] Target overview
* [ ] Intelligence cards
* [ ] Structured data tables
* [ ] Interactive relationship graph
* [ ] Clickable entities and details

### Engineering

* [ ] Git-based version control
* [ ] Defined API contract
* [ ] Modular backend architecture
* [ ] Basic automated tests
* [ ] AI-assisted code review
* [ ] QA/testing workflow
* [ ] Documentation

### Reporting

* [ ] Investigation summary
* [ ] Scan timestamp
* [ ] Exportable report

## What does v1 NOT include?

Sentinel v1 will **not** include functionality intended to gain unauthorized access to systems.

Specifically, v1 excludes:

* ❌ Exploitation of vulnerabilities
* ❌ Credential harvesting
* ❌ Password cracking
* ❌ Brute-force attacks
* ❌ Malware
* ❌ Phishing
* ❌ Privilege escalation
* ❌ Unauthorized active scanning
* ❌ Stealth or evasion mechanisms
* ❌ Collection of private or restricted information

Sentinel focuses on **passive intelligence gathering from publicly available sources**.

---

## Project Philosophy

Sentinel is intentionally being built as a small but real software product rather than a collection of disconnected scripts.

The development process will use multiple AI agents for different engineering roles:

```text
                 HUMAN DEVELOPERS
                       │
                 Product decisions
                       │
                       ▼
                  AI ARCHITECT
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
    BACKEND AGENT             FRONTEND AGENT
          │                         │
          └────────────┬────────────┘
                       ▼
                    GITHUB
                       │
                       ▼
                   QA AGENT
                       │
                       ▼
                  TEST / REVIEW
                       │
                       ▼
                    RELEASE
```


