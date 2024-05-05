import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

type ValidationError = {
  field: string | number;
  error: string;
};

export class Validator {
  public schema: ObjectSchema;
  public isValid = true;
  public errorMessages?: ValidationError[];

  public constructor(schema: ObjectSchema) {
    this.schema = schema.options({abortEarly : false});
  }

  public validate(fieldsToValidate: any): void {
    const validation = this.schema.validate(fieldsToValidate);

    if (!validation.error) {
      this.isValid = true;
    } else {
      this.errorMessages = validation.error.details.map(error => {
        return { field: error.path[0], error: error.type };
      })

      this.isValid = false;
    }
  }
}

export const ValidateRequest = (validationRules: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const validator = new Validator(validationRules)

    if (req.query) {
      validator.validate(req.query);
    } else {
      validator.validate(req.body);
    }

    if (validator.isValid) {
      next();
      return;
    }

    return res.status(422).send(validator.errorMessages);
  }
}
