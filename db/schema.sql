DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

\c employee_db;

CREATE TABLE department(
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
    id INTEGER SERIAL PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL, -- we may wan't to leave this NULL while onboarding new employees, or they are on extended leave
    department INTEGER(10) NOT NULL,
    FOREIGN KEY(department) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee(
    id INTEGER SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR (30),
    role_id INTEGER NOT NULL,
    manager_id INTEGER, -- managers don't neccessarily have managers so we can allow this to be NULL in this setup
    FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE SET NULL,
    FOREIGN KEY(manager_id) REFERENCES employee(id) ON DELETE SET NULL
);