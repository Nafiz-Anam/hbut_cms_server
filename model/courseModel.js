require("dotenv").config();
const env = process.env.ENVIRONMENT;
const config = require("../config/config.json")[env];
const pool = require("../config/database");
const helpers = require("../utilities/helper/general_helper");
const dbtable = config.table_prefix + "courses";

var dbModel = {
    add: async (data) => {
        let qb = await pool.get_connection();
        let response = await qb.returning("id").insert(dbtable, data);
        qb.release();
        return response;
    },

    select_list: async (filter_condition) => {
        let qb = await pool.get_connection();
        let final_cond = " where ";

        if (Object.keys(filter_condition).length) {
            if (final_cond == " where ") {
                let filter_str = await helpers.get_and_conditional_string(filter_condition);
                final_cond = final_cond + filter_str;
            }
        }

        if (final_cond == " where ") {
            final_cond = "";
        }

        let query =
            "select * from " + dbtable + final_cond + " ORDER BY id DESC";

        console.log("query => ", query);
        let response = await qb.query(query);
        qb.release();
        return response;
    },

    delete: async (condition) => {
        let qb = await pool.get_connection();
        let response = await qb.where(condition).delete(dbtable);
        qb.release();
        console.log(qb.last_query());
        return response;
    },

    select: async (condition) => {
        let qb = await pool.get_connection();
        let response = await qb.select("*").where(condition).get(dbtable);
        qb.release();
        return response;
    },

    update: async (condition, data) => {
        let qb = await pool.get_connection();
        let response = await qb.set(data).where(condition).update(dbtable);
        qb.release();
        return response;
    },

    // select_limit: async (condition, limit) => {
    //     let qb = await pool.get_connection();
    //     let response = await qb
    //         .select("*")
    //         .where(condition)
    //         .order_by("designation", "asc")
    //         .limit(limit.perpage, limit.start)
    //         .get(dbtable);
    //     qb.release();
    //     return response;
    // },

    // get_count: async (date_condition) => {
    //     let qb = await pool.get_connection();
    //     let final_cond = " where ";

    //     if (Object.keys(date_condition).length) {
    //         let date_condition_str = await helpers.get_date_between_condition(
    //             date_condition.from_date,
    //             date_condition.to_date,
    //             "created_at"
    //         );
    //         if (final_cond == " where ") {
    //             final_cond = final_cond + date_condition_str;
    //         } else {
    //             final_cond = final_cond + " and " + date_condition_str;
    //         }
    //     }

    //     if (final_cond == " where ") {
    //         final_cond = "";
    //     }

    //     let query = "select count(*) as total from " + dbtable + final_cond;

    //     console.log("query => ", query);
    //     let response = await qb.query(query);
    //     qb.release();
    //     return response[0]?.total;
    // },

    // selectSpecific: async (selection, condition) => {
    //     let qb = await pool.get_connection();
    //     let response = await qb.select(selection).where(condition).get(dbtable);
    //     qb.release();
    //     return response;
    // },
    // selectOne: async (selection, condition) => {
    //     let qb = await pool.get_connection();
    //     let response = await qb.select(selection).where(condition).get(dbtable);
    //     qb.release();
    //     return response[0];
    // },
    // selectUserDetails: async (condition) => {
    //     let qb = await pool.get_connection();
    //     let response = await qb.select(selection).where(condition).get(dbtable);
    //     qb.release();
    //     return response[0];
    // },
};

module.exports = dbModel;
