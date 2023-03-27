
const storage = require('node-persist');
export default async function handler(req: { query: { item: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; }; }) {
//export default async function handler(req, res) {

    //you must first call storage.init
    await storage.init( /* options ... */);

    res.status(200).json(await storage.getItem(req.query.item));
}