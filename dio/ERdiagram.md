```mermaid
erDiagram
    users {
        int id PK
        string name
        string email
        int user_position_id FK
        int user_grade_id FK
        int user_department_id FK
    }

    user_positions {
        int id PK
        string name
    }

    user_grades {
        int id PK
        string name
    }

    user_departments {
        int id PK
        string name
    }

    sheets {
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
        int sheet_id FK
        string goal
    }

    PerformanceItem {
        int id PK
        int sheet_id FK
        string schedule
        string comment
        int self_evaluation
        int supervisor_evaluation
        int weight
    }

    CompetencyItem {
        int id PK
        int sheet_id FK
        string competency_type
        int self_evaluation
        int supervisor_evaluation
        int weight
    }

    users ||--o{ user_positions: "has"
    users ||--o{ user_grades: "has"
    users ||--o{ user_departments: "belongs to"
    sheets ||--o{ users: "evaluates"
    sheets ||--o{ CompanyGoal: "includes"
    sheets ||--o{ PersonalGoal: "includes"
    sheets ||--o{ PerformanceItem: "includes"
    sheets ||--o{ CompetencyItem: "includes"
