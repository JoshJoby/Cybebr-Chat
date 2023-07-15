module.exports = async function (context, req) {
    const table = req.headers['table-name'] || context.bindingData.headers['Table-Name'];
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('cyberChatApp.db'); 

    try {
        const obtainedRows = await new Promise((resolve, reject) => { 
            db.run("CREATE TABLE IF NOT EXISTS USERDETAILS (USERID TEXT NOT NULL UNIQUE, USERNAME TEXT NOT NULL UNIQUE, PASSWORD TEXT NOT NULL, EMAILID TEXT NOT NULL, PRIMARY KEY(USERID));", 
            [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("Table created successfully");
                }
            });
        });

        const obtainedRows2 = await new Promise((resolve, reject) => { 
            db.run("CREATE TABLE IF NOT EXISTS CHATLOGS (CHATID TEXT NOT NULL, SENDER TEXT NOT NULL, RECIEVER TEXT NOT NULL, CHAT_CONTENT TEXT NOT NULL, CHAT_TIMESTAMP TEXT NOT NULL, FOREIGN KEY(SENDER) REFERENCES USERDETAILS(USERID), FOREIGN KEY(RECIEVER) REFERENCES USERDETAILS(USERID));", 
            [], (err, rows) => {
                if (err) {
                    reject(err);
                } else { 
                    resolve("Table created successfully");
                }
            });
        });

        const obtainedRows3 = await new Promise((resolve, reject) => { 
            db.run("PRAGMA foreign_keys = ON;", 
            [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve("Table created successfully");
                }
            });
        });

    } catch (error) {
        console.error(error.message);
        context.res = {
            status: 500,
            body: error.message + `${userid}`
        };
    }

    if(req.method === 'GET'){      
         if(table === "USERDETAILS"){
            if(req.headers['password'] && req.headers['user-name']){ 
                try{
                    const username = req.headers['user-name'] || context.bindingData.headers['User-name'];
                    const password = req.headers['password'] || context.bindingData.headers['Password'];
                    const obtainedRows = await new Promise((resolve, reject) => {
                            db.all(`SELECT * FROM USERDETAILS WHERE USERNAME = ? AND PASSWORD = ?`, [username, password], (err, rows) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(`${JSON.stringify(rows)}`);
                            }
                        });
                    });
                    context.res = {
                        status: 200,
                        body: `${obtainedRows}`
                    };
                } catch (error) {
                    console.error(error.message);
                    context.res = {
                        status: 500,
                        body: `Error retrieving data from database ${error.message}`
                    };
                } finally {
                    db.close();
                    context.done();
                }
            }
            else if(req.headers['user-id']) {
                try {
                    const userid = req.headers['user-id'] || context.bindingData.headers['User-id'];
                    const obtainedRows = await new Promise((resolve, reject) => {
                            db.all(`SELECT * FROM USERDETAILS WHERE USERID = ?`, [userid], (err, rows) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(`${JSON.stringify(rows)}`);
                            }
                        });
                    });
                    context.res = {
                        status: 200,
                        body: `${obtainedRows}`
                    };
                } catch (error) {
                    console.error(error.message);
                    context.res = {
                        status: 500,
                        body: `Error retrieving data from database ${error.message}`
                    };
                } finally {
                    db.close();
                    context.done();
                }
            } 
            else if(req.headers['user-keyword']){
                try {
                    const userkeyword = req.headers['user-keyword'];
                    const obtainedRows = await new Promise((resolve, reject) => {
                        db.all(`SELECT USERNAME, USERID FROM USERDETAILS WHERE USERNAME LIKE ?;`, [userkeyword+'%'], (err, rows) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(`${JSON.stringify(rows)}`);
                            }
                        });
                    });
                    context.res = {
                        status: 200,
                        body: `${obtainedRows}`
                    }; 
                } catch (error) {
                    console.error(error.message);
                    context.res = {
                        status: 500,
                        body: `Error retrieving data from database ${error.message}`
                    };
                } finally {
                    db.close();
                    context.done();
                }                
            }
        }
        else if(table === 'CHATLOGS'){
            try {
                const chatid = req.headers['chat-id'];
                if(req.headers['get-chat-id'] === '0' || !req.headers['get-chat-id']){
                    const obtainedRows = await new Promise((resolve, reject) => {
                        // db.all(`SELECT * FROM CHATLOGS WHERE (SENDER = ? AND RECIEVER LIKE ?) OR (RECIEVER = ? AND SENDER LIKE ?);`, [senderid, recieverid, senderid, recieverid], (err, rows) => {
                        db.all(`SELECT * FROM CHATLOGS WHERE CHATID = ?;`, [chatid], (err, rows) => {

                            if (err) {
                                reject(err);
                            } else {
                                resolve(`${JSON.stringify(rows)}`);
                            }
                        });
                    });
                    context.res = {
                        status: 200,
                        body: `${obtainedRows}`
                    };
                }
                else if(req.headers['get-chat-id'] === '1'){
                    const senderid = req.headers['sender-id'];
                    const obtainedRows = await new Promise((resolve, reject) => {
                        db.all(`SELECT DISTINCT C.CHATID, C.SENDER, C.RECIEVER, U.USERNAME FROM CHATLOGS C, USERDETAILS U WHERE C.RECIEVER = U.USERID AND (SENDER = ? OR RECIEVER = ?);`, [senderid, senderid], (err, rows) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(`${JSON.stringify(rows)}`);
                            }
                        });
                    });
                    context.res = {
                        status: 200,
                        body: `${obtainedRows}`
                    }; 
                }
            } catch (error) {
                console.error(error.message);
                context.res = {
                    status: 500,
                    body: `Error retrieving data from database ${error.message}`
                };
            } finally {
                db.close();
                context.done();
            }
        }          
        else if (table != 'USERDETAILS' && table != "CHATLOGS") {
            context.res = {
                status: 400,
                body: `Invalid table name ${table}`
            };
        }
    }
    else if(req.method === 'POST'){
        if (table != 'USERDETAILS' && table != "CHATLOGS") {
            context.res = {
                status: 400,
                body: `Invalid table name ${table}`
            };
        }
        else if(table === 'USERDETAILS'){
            const userid = req.body.userid;
            const username = req.body.username;
            const password = req.body.password;
            const email = req.body.email;
            try {
                const obtainedRows = await new Promise((resolve, reject) => { 
                    db.run("INSERT INTO USERDETAILS VALUES (?, ?, ?, ?, ?)", [userid, username, password, email, 0], (err, rows) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(`${JSON.stringify(rows)}`);
                        }
                    });
                });
                context.res = {
                    status: 200,
                    body: `Row added successfully`
                };
            } catch (error) {
                console.error(error.message);
                context.res = {
                    status: 500,
                    body: error.message + `${userid}`
                };
            } finally {
                db.close();
                context.done();
            }
        }
        else{
            const chatid = req.body.chatid;
            const messageid = req.body.messageid
            const sender = req.body.sender;
            const reciever = req.body.reciever;
            const chat_content = req.body.chat_content;
            const chat_timestamp = req.body.chat_timestamp;
            const chat_secure = req.body.chat_secure;
           
            try {
                const obtainedRows = await new Promise((resolve, reject) => { 
                    db.run("INSERT INTO CHATLOGS VALUES (?, ?, ?, ?, ?, ?, ?)", [chatid, messageid, sender, reciever, chat_content, chat_timestamp, chat_secure], (err, rows) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(`${JSON.stringify(rows)}`);
                        }
                    });
                });
                context.res = {
                    status: 200,
                    body: `Row added successfully`
                };
            } catch (error) {
                console.error(error.message);
                context.res = {
                    status: 500,
                    body: error.message + `${chatid + messageid + sender + reciever + chat_content + chat_timestamp + chat_secure}`
                };
            } finally {
                db.close();
                context.done();
            }
        }
    }
    else if(req.method === 'PUT'){
        if (table != 'USERDETAILS' && table != "CHATLOGS") {
            context.res = {
            status: 400,
            body: `Invalid table name ${table}`
            };
        }
        else if(table === 'USERDETAILS'){
            if(req.headers["update-user"] === "1"){
                const userid = req.body.userid;
                const username = req.body.username;
                const password = req.body.password;
                const email = req.body.email;
                try {
                    const obtainedRows = await new Promise((resolve, reject) => {
                        db.run("UPDATE USERDETAILS SET USERNAME = ?, PASSWORD = ? WHERE USERID = ?", [username, password, userid], (err, rows) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(`${JSON.stringify(rows)}`);
                        }
                        });
                    });
                    context.res = {
                        status: 200,
                        body: `Row updated successfully`
                    };
                } catch (error) {
                    console.error(error.message);
                    context.res = {
                        status: 500,
                        body: error.message + `${userid}`
                    };
                } finally {
                    db.close();
                    context.done();
                }
        }
        else if(req.headers["update-user-status"] === "1"){
                const userid = req.body.userid;
                const userstatus = req.body.userstatus;
                try {
                        const obtainedRows = await new Promise((resolve, reject) => {
                            db.run("UPDATE USERDETAILS SET USER_STATUS = ? WHERE USERID = ?", [userstatus, userid], (err, rows) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(`${JSON.stringify(rows)}`);
                            }
                            });
                        });
                    context.res = {
                        status: 200,
                        body: `Row updated successfully`
                    };
                } catch (error) {
                    console.error(error.message);
                    context.res = {
                        status: 500,
                        body: error.message + `${userid}`
                    };
                } finally {
                    db.close();
                    context.done();
                }   
            }
        }
        else if(table === 'CHATLOGS'){
            if(req.headers["update-secure-chat"] === "1"){
                    const chatid = req.body.chatid;
                    const messageid = req.body.messageid;
                    try {
                        const obtainedRows = await new Promise((resolve, reject) => {
                            db.run("UPDATE CHATLOGS SET CHAT_SECURE = 0 WHERE CHATID = ? AND MESSAGE_ID = ?", [chatid, messageid], (err, rows) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(`${JSON.stringify(rows)}`);
                            }
                            });
                        });
                        context.res = {
                            status: 200,
                            body: `Row updated sucvcessfully`
                        };
                    } catch (error) {
                        console.error(error.message);
                        context.res = {
                            status: 500,
                            body: error.message + `${userid}`
                        };
                    } finally {
                        db.close();
                        context.done();
                    }
            }
        }
    }
}



