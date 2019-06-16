-- Deploy fresh database tables --
-- \i is used to execute sql commands in file in psql  --

\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/login.sql'
