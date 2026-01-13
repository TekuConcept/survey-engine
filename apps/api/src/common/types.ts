import { Request, Response } from 'express'

export enum Database {
    // Only one database for now
    DATA_TABLES = 'data-tables',
}

export interface HttpContext {
    req: Request
    res: Response
    // account id
}
