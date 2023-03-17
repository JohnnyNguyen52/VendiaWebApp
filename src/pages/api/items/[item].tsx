
const storage = require('node-persist');
export default async function handler(req, res) {

    //you must first call storage.init
    await storage.init( /* options ... */);

    res.status(200).json(await storage.getItem(req.query.item));
}