CREATE TABLE if not exists transactions ( 
    id UUID PRIMARY KEY,
    ride_id UUID,
    amount DOUBLE PRECISION, 
    date TIMESTAMPTZ
);




