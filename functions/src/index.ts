// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
import { Request, Response } from 'express';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
import * as cors from 'cors';
const corsHandler = cors({origin: true});

admin.initializeApp();

const getAllUsers = (req: Request, res: Response) => {
  corsHandler(req, res, () => {
    const maxResults = 1000; // optional arg.
    const allUsers: any = [];
    admin.auth().listUsers(maxResults).then(
      (userRecords: { users: any[]; }) => {
        userRecords.users.forEach(userRecord => {
          // For each user
          allUsers.push({'email': userRecord.email, 'uid': userRecord.uid});
        });
        return res.status(200).send(JSON.stringify(allUsers));
      }).catch((error: any) => {
        console.log("Error listing users:", error);
        return res.status(500).send(error);
      });
  })
}

module.exports = {
  api: functions.https.onRequest(getAllUsers),
};