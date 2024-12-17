INSERT INTO department (department_name)
VALUES ('Management'), ('Team Leads'), ('Runners'), ('Kitchen Staff');

INSERT INTO role (title, salary, department_id)
VALUES ('Manager', 80000, 1), ('Shift Leader', 45000, 2), ('Server/Busser', 35000, 3), ('Cook', 40000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Brendon', 'Farth', 1, NULL), ('Lee', 'Jones', 2, 1), ('Keith', 'Brawnson', 3, 2), ('Kevin', 'Black', 4, 2), ('Diana', 'Bobana', 4, 2);