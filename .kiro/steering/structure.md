# Project Structure

## Current Organization

This is a design-phase project containing specification documents:

```
.
├── .git/                    # Version control
├── .kiro/                   # Kiro IDE configuration
│   └── steering/            # AI assistant guidance documents
├── README.md                # Project overview and introduction
├── requirements.md          # Detailed requirements with acceptance criteria
└── design.md                # System architecture and design specifications
```

## Document Purposes

- **README.md**: High-level project introduction, problem statement, and solution overview
- **requirements.md**: 15 detailed requirements with user stories and acceptance criteria
- **design.md**: Complete system design including architecture, components, data models, and 49 correctness properties

## Design Methodology

This project follows **spec-driven development** with property-based testing:

1. Requirements define what the system should do
2. Design specifies how it will be built
3. Correctness properties formalize expected behavior
4. Property-based tests validate universal guarantees

## Key Design Artifacts

### Architecture Diagrams
- High-level system architecture (Mermaid)
- Component interaction flow

### Component Specifications
- Telephony Gateway (Amazon Connect)
- Speech Recognition Engine (Amazon Transcribe)
- Conversation Manager (Amazon Lex)
- Backend Service (AWS Lambda)
- Speech Synthesis Engine (Amazon Polly)
- Data Store (Amazon S3)

### Data Models
- Session, Scheme, Crop, Weather, Market Price, Pest, Interaction Log

### Correctness Properties
49 properties that must hold across all executions, each linked to specific requirements

## Future Implementation Structure

When implemented, the project would likely have:

```
src/
├── lambda/              # Lambda function handlers
│   ├── intent_handler.py
│   ├── scheme_handler.py
│   ├── weather_handler.py
│   └── ...
├── lex/                 # Lex bot definitions
├── connect/             # Connect contact flows
├── data/                # Sample data for S3
└── tests/               # Unit and property-based tests
```

## Conventions

- All documentation in Markdown
- Mermaid diagrams for architecture visualization
- Python code examples in design document
- JSON for data model specifications
- Hindi text included in examples with English translations
