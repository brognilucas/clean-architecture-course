CREATE USER if not exists ride_app WITH PASSWORD 'psd-ride-db';


CREATE DATABASE if not exists rides;

GRANT ALL PRIVILEGES ON DATABASE rides TO ride_app;
