import { validationResult } from "express-validator";
import { RequestValidationError } from "../utils/common/errors/request-validation-error";

const { skip } = require('graphql-resolvers');

export const validateRequest = (_, __, { req }) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    return skip;

}