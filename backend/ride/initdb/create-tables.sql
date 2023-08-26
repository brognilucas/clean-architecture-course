CREATE TABLE if not exists rides ( 
    id UUID PRIMARY KEY,
    from_lat DOUBLE PRECISION NOT NULL,
    from_lng DOUBLE PRECISION NOT NULL,
    to_lat DOUBLE PRECISION NOT NULL,
    to_lng DOUBLE PRECISION NOT NULL,
    passenger_id UUID NOT NULL,
    driver_id UUID,
    status VARCHAR(255) NOT NULL,
    requested_at TIMESTAMPTZ NOT NULL,
    accepted_at TIMESTAMPTZ,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ
);

CREATE TABLE if not exists segments ( 
    id UUID PRIMARY KEY,
    ride_id UUID,
    from_lat DOUBLE PRECISION NOT NULL,
    from_lng DOUBLE PRECISION NOT NULL,
    to_lat DOUBLE PRECISION NOT NULL,
    to_lng DOUBLE PRECISION NOT NULL,
    date TIMESTAMPTZ
);

ALTER TABLE segments ADD CONSTRAINT fk_ride_segment FOREIGN KEY (ride_id) REFERENCES rides (id);

