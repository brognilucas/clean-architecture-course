
do
$$
begin
  if not exists (select * from pg_user where usename = 'payments_app') then 
    CREATE USER payments_app WITH PASSWORD 'psd-payments-db';
    end if;
  end
$$
;

SELECT 'CREATE DATABASE payments' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'payments');

GRANT ALL PRIVILEGES ON DATABASE payments_app TO payments;

