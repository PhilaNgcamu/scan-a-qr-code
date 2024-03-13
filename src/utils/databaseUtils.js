import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("contacts.db");
export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, profilePic TEXT, status TEXT, github TEXT, linkedin TEXT, twitter TEXT, personalWebsite TEXT, company TEXT, companyURL TEXT);",
          [],
          () => {
            resolve();
          },
          (error) => {
            reject({ message: "Table creation error", details: error });
          }
        );
      },
      (error) => {
        reject({ message: "Transaction error", details: error });
      },
      () => {
        resolve();
      }
    );
  });
};
export const addContact = (contactData) => {
  const {
    name,
    email,
    profilePic,
    status,
    github,
    linkedin,
    twitter,
    personalWebsite,
    company,
    companyURL,
  } = contactData;

  const queryCheckExisting = "SELECT * FROM contacts WHERE email = ?;";
  const valuesCheckExisting = [email];

  const queryInsert = `
    INSERT INTO contacts (name, email, profilePic, status, github, linkedin, twitter, personalWebsite, company, companyURL)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const valuesInsert = [
    name,
    email,
    profilePic,
    status,
    github,
    linkedin,
    twitter,
    personalWebsite,
    company,
    companyURL,
  ];

  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          queryCheckExisting,
          valuesCheckExisting,
          (_, result) => {
            if (result.rows.length > 0) {
              resolve();
            } else {
              tx.executeSql(
                queryInsert,
                valuesInsert,
                (_, insertResult) => {
                  resolve(insertResult);
                },
                (_, insertError) => {
                  reject({
                    message: "Error adding contact",
                    details: insertError,
                  });
                }
              );
            }
          },
          (_, error) => {
            reject({
              message: "Error checking existing contact",
              details: error,
            });
          }
        );
      },
      (error) => {
        reject({ message: "Transaction error", details: error });
      }
    );
  });
};

export const getAllContacts = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "SELECT * FROM contacts;",
          [],
          (_, result) => resolve(result.rows._array),
          (_) => reject()
        );
      },
      (transactionError) => {
        reject({ message: "Transaction error", details: transactionError });
      },
      null
    );
  });
};
