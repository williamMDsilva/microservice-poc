-- DROP TABLE IF EXISTS nf;

CREATE TABLE IF NOT EXISTS nf (
    "id" uuid PRIMARY KEY NOT NULL DEFAULT gen_random_uuid(),
    "name_provider" TEXT NOT NULL,
    "cnpj_provider" TEXT NOT NULL,
    "name_taker" TEXT NOT NULL,
    "cnpj_taker" TEXT NOT NULL,
    "cnae" TEXT NOT NULL,
    "value" FLOAT NOT NULL
)