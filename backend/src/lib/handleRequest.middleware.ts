import { Request, Response } from "express";

export interface Exception extends Error {
  readonly code: number;
}

export const HandleRequest = (method: (req: Request<any, any, any, any>, res: Response) => any) => {
  return (req, res) => {
    try {
      method(req, res);
    } catch (e: any) {
      console.error(e);
      if (e.errorCode) {
        return res.status(e.code).send(e.message);
      } else {
        return res.status(500).send("INTERNAL_SERVER_ERROR");
      }
    }
  }
}