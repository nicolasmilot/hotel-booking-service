CREATE USER ${DB_USER} WITH PASSWORD '${DB_PASSWORD}' CREATEDB;

CREATE DATABASE ${DB_NAME}
    WITH
    OWNER = ${DB_USER}
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

CREATE DATABASE ${TEST_DB_NAME}
    WITH
    OWNER = ${DB_USER}
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;