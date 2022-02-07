import * as Joi from '@hapi/joi';

// In ENV variable, if any of the variables are not what we have defined here to be (required and other settings etc)
// we'll get appropriate console error
export const configValidationSchema = Joi.object({
  STAGE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
});
