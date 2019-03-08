CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE public.views
(
    id uuid NOT NULL,
    dataset character varying(200) NOT NULL,
    "user" character varying(100) NOT NULL,
    datetime timestamp without time zone NOT NULL
)
WITH (
    OIDS = FALSE
);

TABLESPACE pg_default;
