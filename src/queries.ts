import { pool, connectToDb } from './connection.js';

await connectToDb();

// reference these functions to see what is being returned when using the queries to viewDepartment, viewRoles, and viewEmployees
// return res.rows; is returning the values AS DISPLAYED IN THE TABLES so when mapping the values in index.ts, we need to reference the keys as they are declared here
export async function viewDepartments() {
	// instead of select * we can select each and add a proper looking alias to the columns for display
	const query = 'SELECT department.id as department_id, department.department_name FROM department';
	try {
		const res = await pool.query(query);
		return res.rows;
	} catch (err) {
		console.error('Error for viewDepartments(): ', err);
		throw err;
	}
}

export async function viewRoles() {
	// to list the department name instead of the department id, we need to select department.department_name and join the department table on role.department_id
	const query = 'SELECT role.id as role_id, role.title as role_title, role.salary, department.department_name FROM role JOIN department ON role.department_id = department.id';
	try {
		const res = await pool.query(query);
		return res.rows;
	} catch (err) {
		console.error('Error for viewRoles(): ', err);
		throw err;
	}
}

export async function viewEmployees() {
	const query = `SELECT employee.id as employee_id, employee.first_name, employee.last_name, role.title as role_title, department.department_name, role.salary,  
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM employee 
    JOIN role ON employee.role_id = role.id 
    JOIN department ON role.department_id = department.id
	LEFT JOIN employee AS manager ON employee.manager_id = manager.id
	ORDER BY employee_id`; // LEFT JOIN is used to include employees with no manager (NULL value), otherwise they would not be included in the result. We also will always order by employee_id to keep the list consistent even if we edit things
	try {
		const res = await pool.query(query);
		return res.rows;
	} catch (err) {
		console.error('Error for viewEmployees(): ', err);
		throw err;
	}
}

export async function addDepartment(name: string) {
	const query = 'INSERT INTO department (department_name) VALUES ($1)';
	try {
		const res = await pool.query(query, [name]);
		console.log(`\nAdded department: ${name}\nSuccess!\n\n`);
	} catch (err) {
		console.error('Error adding department: ', err);
		throw err;
	}
}

export async function addRole(title: string, salary: number, department_id: number) {
	const query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)';
	try {
		await pool.query(query, [title, salary, department_id])
		console.log(`\nAdded role: ${title}\nSalary: ${salary}\nDepartment ID: ${department_id}\nSuccess!\n\n`);
	} catch (err) {
		console.error('Error adding role:', err);
		throw err;
	}
}

export async function addEmployee(first_name: string, last_name: string, role_id: number, manager_id: number) {
	const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
	try {
		await pool.query(query, [first_name, last_name, role_id, manager_id]);
		console.log(`\nNew Employee: ${first_name} ${last_name}\nRole ID: ${role_id}\nManager ID: ${manager_id}\nSuccess!\n\n`);
	}
	catch (err) {
		console.error('Error adding employee:', err);
		throw err;
	};
}

export async function updateEmployeeRole(employee_id: number, role_id: number) {
	const query = 'UPDATE employee SET role_id = $1 WHERE id = $2';
	try {
		pool.query(query, [role_id, employee_id]);
		console.log(`\nChanged employee ${employee_id} role to ${role_id}\nSuccess!\n\n`);
	} catch (err) {
		console.error(`Error updating employee role:`, err);
		throw err;
	}
}