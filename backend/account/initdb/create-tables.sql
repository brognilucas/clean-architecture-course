CREATE TABLE if not exists passengers ( 
    id UUID PRIMARY KEY,
    document VARCHAR(11) not null, 
    email TEXT not null,
    name TEXT not null
);

CREATE TABLE if not exists drivers ( 
    id UUID PRIMARY KEY,
    document VARCHAR(11) not null, 
    email TEXT not null,
    name TEXT not null,
    carPlate TEXT not null
);



