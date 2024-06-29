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

    sheet_company_goals {
        int id PK
        string goal
    }

    sheet_personal_goals {
        int id PK
        int sheet_id FK
        string goal
    }

    sheet_performances {
        int id PK
        int sheet_id FK
        string goal
        string schedule
        string comment
        int self_evaluation
        int supervisor_evaluation
        int weight
    }

    

    sheet_competency_items {
        int id PK
        string name
    }

    sheet_competencies {
        int id PK
        int sheet_id FK
        int competency_id FK
        int self_evaluation
        int supervisor_evaluation
        int weight
    }

    users ||--o{ user_positions: "has"
    users ||--o{ user_grades: "has"
    users ||--o{ user_departments: "belongs to"
    sheets ||--o{ users: "evaluates"
    sheet_company_goals ||--o{ sheets: "applies to"
    sheets ||--o{ sheet_personal_goals: "includes"
    sheets ||--o{ sheet_performances: "includes"
    sheets ||--o{ sheet_competencies: "includes"
    sheet_competency_items ||--o{ sheet_competencies: "has"
