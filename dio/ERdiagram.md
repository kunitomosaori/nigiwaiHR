```mermaid
erDiagram
    users {
        int id PK
        string name
        string email
        int user_position_id FK
        int user_grade_id FK
        int user_department_id FK
        int supervisor_id FK
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

    sheet_permissions {
        int id PK
        string name
    }

    user_permissions {
        int id PK
        string name
    }

    %% 組み合わせのユニークさの担保にIDが必要？いらないのであればIDはいらない。
    user_position_permissions {
        int id PK
        int user_position_id FK
        int user_permission_id FK
        int sheet_permission_id FK
    }

    sheets {
        int id PK
        int user_id FK
        int sheet_status_id FK
        string title
        date created_at
        string created_by
    }

    sheet_statuses {
        int id PK
        string status
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
        string self_comment
        string supervisor_comment
        string second_comment
        string third_comment
        int self_evaluation
        int supervisor_evaluation
        int second_evaluation
        int third_evaluation
        int final_evaluation
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
    user_positions ||--o{ user_position_permissions: "has"
    sheet_permissions ||--o{ user_position_permissions: "includes"
    user_permissions ||--o{ user_position_permissions: "includes"
    sheet_statuses ||--o{ sheets: "has"

