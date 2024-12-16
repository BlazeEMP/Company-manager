import inquirer from 'inquirer';

async function init() {
    // prompts for the user to choose from
    // 1.) View all departments
    // 2.) View all roles
    // 3.) View all employees
    // 4.) Add a department
    // 5.) Add a role
    // 6.) Add an employee
    // 7.) Update an employee role

    inquirer.
        prompt([{
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role'
            ]
        }]).then((answer) => {
            console.log(answer);
            if (answer.action === 'View all departments') {
                viewDepartments();
            } else if (answer.action === 'View all roles') {
                viewRoles();
            } else if (answer.action === 'View all employees') {
                viewEmployees();
            } else if (answer.action === 'Add a department') {
                addDepartment();
            } else if (answer.action === 'Add a role') {
                addRole();
            } else if (answer.action === 'Add an employee') {
                addEmployee();
            } else if (answer.action === 'Update an employee role') {
                updateEmployeeRole();
            }
        });
}