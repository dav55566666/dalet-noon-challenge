import { Roles } from "./utils/types.js";

export const usersData = JSON.parse(localStorage.getItem('usersData')) || [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: Roles.ADMIN },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: Roles.EDITOR },
    { id: 3, name: 'Michael Johnson', email: 'michael.johnson@example.com', role: Roles.VIEWER },
    { id: 4, name: 'Emily Davis', email: 'emily.davis@example.com', role: Roles.ADMIN },
    { id: 5, name: 'Chris Brown', email: 'chris.brown@example.com', role: Roles.EDITOR },
    { id: 6, name: 'Patricia Taylor', email: 'patricia.taylor@example.com', role: Roles.VIEWER },
    { id: 7, name: 'Matthew Anderson', email: 'matthew.anderson@example.com', role: Roles.ADMIN },
    { id: 8, name: 'Sarah Wilson', email: 'sarah.wilson@example.com', role: Roles.EDITOR },
    { id: 9, name: 'Daniel Martinez', email: 'daniel.martinez@example.com', role: Roles.VIEWER },
    { id: 10, name: 'Laura Moore', email: 'laura.moore@example.com', role: Roles.ADMIN },
    { id: 11, name: 'James Thomas', email: 'james.thomas@example.com', role: Roles.EDITOR },
    { id: 12, name: 'Sophia White', email: 'sophia.white@example.com', role: Roles.VIEWER },
    { id: 13, name: 'William Harris', email: 'william.harris@example.com', role: Roles.ADMIN },
    { id: 14, name: 'Olivia Martin', email: 'olivia.martin@example.com', role: Roles.EDITOR },
    { id: 15, name: 'Ethan Jackson', email: 'ethan.jackson@example.com', role: Roles.VIEWER },
    { id: 16, name: 'Ava Thompson', email: 'ava.thompson@example.com', role: Roles.ADMIN },
    { id: 17, name: 'David Garcia', email: 'david.garcia@example.com', role: Roles.EDITOR },
    { id: 18, name: 'Mia Martinez', email: 'mia.martinez@example.com', role: Roles.VIEWER },
    { id: 19, name: 'Benjamin Clark', email: 'benjamin.clark@example.com', role: Roles.ADMIN },
    { id: 20, name: 'Charlotte Rodriguez', email: 'charlotte.rodriguez@example.com', role: Roles.EDITOR },
];
