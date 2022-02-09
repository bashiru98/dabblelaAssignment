import { CountryStatistic } from "../../../models/countryStat";
import mongoose from "mongoose";

const validId = (id: string) => {
    return mongoose.Types.ObjectId.isValid(id);
}

export const CountrySTSMSQ = {
    Query: {
        fetchCountryStat: (async (_, { id }) => {
            try {
                if (!validId(id)) return new Error("Invalid id")
                const countryStat = await CountryStatistic.findById(id).sort({ _id: -1 })

                if (!countryStat) {
                    return new Error(`CountryStat not found`)
                }

                return countryStat

            } catch (error) {
                throw new Error(`Server error`)
            }
        }),

        fetchCountryStats: (async () => {
            try {

                return await CountryStatistic.find({}).sort({ _id: -1 })

            } catch (error) {

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

                throw error;
            }
        },
        updateCountryStat: (async (_, { id, updateFields }) => {
            try {

                if (!validId(id)) return new Error("Invalid id")

                const updatedCountryStat = await CountryStatistic.findByIdAndUpdate(id, { ...updateFields }, { new: true });

                if (!updatedCountryStat) return new Error(`error updating countryStat`);

                return updatedCountryStat;

            } catch (error) {

                throw new Error(`Server error`);
            }
        }),
        deleteCountryStat: (async (_, { id }) => {
            try {
                const deletedCountryStat = await CountryStatistic.findByIdAndDelete(id);

                if (!deletedCountryStat) return new Error(`error deleting countryStat`);

                return deletedCountryStat;

            } catch (error) {

                throw new Error(`Server error`)
            }
        })
    },
}
