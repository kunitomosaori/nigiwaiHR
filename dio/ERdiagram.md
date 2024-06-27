```mermaid
erDiagram
    User {
        int id PK
        string name
        string email
        int position_id FK
        int grade_id FK
        int department_id FK
    }

    Position {
        int id PK
        string name
    }

    Grade {
        int id PK
        string name
    }

    Department {
        int id PK
        string name
    }

    EvaluationSheet {
        int id PK
        int user_id FK
        string title
        date created_at
    }

    CompanyGoal {
        int id PK
        string goal
    }

    PersonalGoal {
        int id PK
        int evaluation_sheet_id FK
        string goal
    }

    PerformanceItem {
        int id PK
        int evaluation_sheet_id FK
        string schedule
        string comment
        int self_evaluation
        int supervisor_evaluation
        int weight
    }

    CompetencyItem {
        int id PK
        int evaluation_sheet_id FK
        string competency_type
        int self_evaluation
        int supervisor_evaluation
        int weight
    }

    User ||--o{ Position: "has"
    User ||--o{ Grade: "has"
    User ||--o{ Department: "belongs to"
    EvaluationSheet ||--o{ User: "evaluates"
    EvaluationSheet ||--o{ CompanyGoal: "includes"
    EvaluationSheet ||--o{ PersonalGoal: "includes"
    EvaluationSheet ||--o{ PerformanceItem: "includes"
    EvaluationSheet ||--o{ CompetencyItem: "includes"
