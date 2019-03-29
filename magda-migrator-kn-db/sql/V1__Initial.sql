CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE public."eventType"
(
    id bigint NOT NULL,
    "eventTYpe" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "eventType_pkey" PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

INSERT INTO public."eventType"(
	id, "eventTYpe")
	VALUES (1, 'view');
INSERT INTO public."eventType"(
	id, "eventTYpe")
	VALUES (2, 'api');
    
CREATE TABLE public.views
(
    id uuid NOT NULL,
    "datasetId" character varying(200) COLLATE pg_catalog."default" NOT NULL,
    "user" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    datetime timestamp without time zone NOT NULL,
    "eventType" bigint,
    CONSTRAINT views_pkey PRIMARY KEY (id),
    CONSTRAINT "eventType" FOREIGN KEY ("eventType")
        REFERENCES public."eventType" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
WITH (
    OIDS = FALSE
)

TABLESPACE pg_default;
 