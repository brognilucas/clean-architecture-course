
do
$$
begin
  if not exists (select * from pg_user where usename = 'account') then 
    CREATE USER account WITH PASSWORD 'psd-account-db';
    end if;
  end
$$
;

SELECT 'CREATE DATABASE account' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'account');

GRANT ALL PRIVILEGES ON DATABASE account TO account;
