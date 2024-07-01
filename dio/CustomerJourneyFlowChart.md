```mermaid

flowchart TD
    A[会社にメール配信] --> B[管理者登録]
    B --> C[社員登録#40;名前と仮パスワード#41;]
    C --> D[社員側でメールアドレス登録・写真登録]
    D --> E[アプリ使用開始]
    E --> F[評価シート作成]


    subgraph シート作成からシート終了まで
        F --> G[評価者と被評価者選択]
        G --> H{被評価者か評価者か}
        H --> I[目標設定]
        H --> J[上司承認]
        I --> K[自己評価]
        J --> L[上司評価]

        I -.-> J
        J -.-> K
        K -.-> L

        L --> N[2次評価]
        N --> O[人事部が最終承認]
        O --> P[シート終了]

        subgraph シート作成者
            F
            G
        end

        subgraph 被評価者
            I
            K
        end

        subgraph 評価者
            J
            L
        end

        subgraph 2次評価者
            N
        end
    end

