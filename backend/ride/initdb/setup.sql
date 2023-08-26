
do
$$
begin
  if not exists (select * from pg_user where usename = 'ride_app') then 
    CREATE USER ride_app WITH PASSWORD 'psd-ride-db';
    end if;
  end
$$
;

SELECT 'CREATE DATABASE rides' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'rides');

GRANT ALL PRIVILEGES ON DATABASE rides TO ride_app;
