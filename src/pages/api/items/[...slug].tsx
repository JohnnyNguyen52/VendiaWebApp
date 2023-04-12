import { NextApiRequest, NextApiResponse } from "next";

const storage = require('node-persist');
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    //you must first call storage.init
    await storage.init( /* options ... */);
    
    // The query is an array of parameters, indices being from /api/items/0/1/2/3/4...
    const { query, method } = req;
    
    switch (method) {
        case 'GET':
            res.status(200).json(await storage.getItem(query.slug![0]));
            break
        case 'PUT':
            await storage.setItem(query.slug![0], parseInt(query.slug![1]));
            res.status(200).json(await storage.getItem(query.slug![0]));
            break
    }

}