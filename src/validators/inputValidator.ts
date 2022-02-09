import { body,} from 'express-validator';

export class CountryStat {
    static validateInput = [
        body('Country').trim()
            .notEmpty()
            .withMessage("Country is required"),
        body('Area')
            .trim()
            .notEmpty()
            .withMessage("Area is required"),
        body('Year')
            .trim()
            .notEmpty()
            .withMessage("Area is required"),
        body('Total_population')
            .trim()
            .notEmpty()
            .withMessage("Total_population is required"),
    ]

}