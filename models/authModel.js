import connection from "../config/db.js";

const login = async(data) => {
    const db = await connection();
    const [result] = await db.query('SELECT * FROM user WHERE email = ?', [data.email]);

    return result
}

const signUp = async(data) => {
    const db = await connection();
    await db.query(`INSERT INTO user(username, email, password) VALUES('${data.username}', '${data.email}', '${data.password}')`);

    return true;
}

export { login, signUp };