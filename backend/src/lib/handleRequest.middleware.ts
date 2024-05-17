import { NextFunction, Request, Response } from "express";

export interface Exception extends Error {
  readonly statusCode: number;
}

export type ExceptionResponse = {
  errorCode: string;
  message: string;
}

const InternalServerErrorResponse = (message: string): ExceptionResponse => {
  return {
    errorCode: "INTERNAL_SERVER_ERROR",
    message
  };
}

export const HandleRequest = (method: (req, res, next) => any) => {
  return (req, res, next) => {
    return method(req, res, next).catch(e => {
      if (e.statusCode) {
        return res.status(e.statusCode).json({
          errorCode: e.name,
          message: e.message
        });
      } else {
        return res.status(500).json(InternalServerErrorResponse(e.message));
      }
    });
  }
}
