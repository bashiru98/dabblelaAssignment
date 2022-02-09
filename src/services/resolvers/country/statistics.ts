import { CountryStatistic } from "../../../models/countryStat";
import mongoose from "mongoose";

const validId = (id:string)  => {
    return mongoose.Types.ObjectId.isValid(id);
}

export const CountrySTSMSQ = {
    Query: {
        fetchCountryStat: (async (_, { id }) => {
            try {
                if (!validId(id)) return new Error("Invalid id")
                const countryStat = await CountryStatistic.findById(id).sort({ _id: -1 })

                console.log("log", countryStat)

                if (!countryStat) {
                    return new Error(`CountryStat not found`)
                }

                return countryStat

            } catch (error) {
                console.log(error);

                throw new Error(`Server error`)
            }
        }),

        fetchCountryStats: (async () => {
            try {

                return await CountryStatistic.find({}).sort({ _id: -1 })

            } catch (error) {

                console.log(error);

                throw new Error(`Server error`)
            }
        }),
    },
    Mutation: {
        createCountryStat: async (_, { input }) => {
            try {

                const existingCountryStat = await CountryStatistic.findOne({ ...input });

                if (existingCountryStat) {

                    throw new Error("CountryStat  already exist")

                }
                const newCountryStat = new CountryStatistic({ ...input });

                return await newCountryStat.save();

            } catch (error) {

                console.log(error);

                throw error;
            }
        },
        updateCountryStat: (async (_, { id, updateFields }) => {
            try {

                if (!validId(id)) return new Error("Invalid id")

                return await CountryStatistic.findByIdAndUpdate(id, { ...updateFields }, { new: true });

            } catch (error) {

                console.log(error);

                throw new Error(`Server error`);
            }
        }),
        deleteCountryStat: (async (_, { id }) => {
            try {
                return await CountryStatistic.findByIdAndDelete(id);

            } catch (error) {

                console.log(error);

                throw new Error(`Server error`)
            }
        })
    },
}
