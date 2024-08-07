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

    connections_user_sheet {
        int id PK
        int user_id FK
        int sheetImage_id FK
        string role
        %% 評価者か被評価者かを識別
    }

    sheet_images {
        id id PK
        string title
        date created_at
        int created_by_id
        int period_id FK
    }

    sheets {
        ulid id PK
        int user_id FK
        int sheetImage_id FK
        int sheet_status_id FK
        int sheet_company_goal_id FK
        string personal_goal
        date update_at
        int period_setting_id FK
    }

    sheet_statuses {
        int id PK
        string status
    }

    sheet_company_goals {
        int id PK
        string goal
        int period_id FK
    }

    sheet_personal_goals {
        int id PK
        int sheet_id FK
        string goal
    }

    sheet_performances {
        int id PK
        ulid sheet_id FK
        int detail_type
        string schedule
        string self_comment
        string supervisor_comment
        string second_comment
        string third_comment
        string self_evaluation
        string supervisor_evaluation
        string second_evaluation
        string third_evaluation
        string final_evaluation
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
        string self_evaluation
        string supervisor_evaluation
        int weight
    }

    sheet_period_settings {
        int id PK
        string name
        int start_month
        int end_month
    }

    users ||--o{ user_positions: "has"
    users ||--o{ user_grades: "has"
    users ||--o{ user_departments: "belongs to"
    sheet_company_goals ||--o{ sheet_images: "has"
    sheet_company_goals ||--o{ sheet_period_settings: "refers to"
    sheets ||--o{ sheet_personal_goals: "includes"
    sheets ||--o{ sheet_performances: "includes"
    sheets ||--o{ sheet_competencies: "includes"
    sheet_competency_items ||--o{ sheet_competencies: "has"
    user_positions ||--o{ user_position_permissions: "has"
    sheet_permissions ||--o{ user_position_permissions: "includes"
    user_permissions ||--o{ user_position_permissions: "includes"
    sheet_statuses ||--o{ sheets: "has"
    sheet_period_settings ||--o{ sheet_images: "applies to"
    sheets }o--|| sheet_images: "generates"
    users ||--o{ connections_user_sheet: "connects"
    sheet_images ||--o{ connections_user_sheet: "connects"

```
