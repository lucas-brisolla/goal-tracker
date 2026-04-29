EXTENSION IF NOT EXISTS "UUID_OSSP";

CREATE TABLE IF NOT EXISTS achievement(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT,
    description TEXT,
    icon TEXT   
);

