import Joi from 'joi';


export const authSchema = {
  body: Joi.object({
    code: Joi.string(),
    error: Joi.string(),
    error_reason: Joi.string(),
    error_description: Joi.string()
  }).unknown(true)
};
