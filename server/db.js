import mysql from "mysql";

//definiramo konekciju na bazu, procitati Pool koji je predložio Hrvoje!
export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "blog",
});