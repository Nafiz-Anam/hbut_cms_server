const Joi = require("joi");
// const ServerResponse = require("../response/ServerResponse");
// const StatusCode = require("../statuscode/index");
// const checkEmpty = require("./emptyChecker");
// const validate_mobile = require("./validate_mobile");
// const checkwithcolumn = require("./checkerwithcolumn");
// const checkifrecordexist = require("./checkifrecordexist");
// const enc_dec = require("../decryptor/decryptor");
// const multer = require("multer");
// const helpers = require("../helper/general_helper");
// const fs = require("fs");
// const encrypt_decrypt = require("../../utilities/decryptor/encrypt_decrypt");
// const { join } = require("path");
// const invModel = require("../../models/invoiceModel");
const moment = require("moment");
const { check_if_email_exist } = require("../helper/general_helper");

// .pattern(new RegExp(/^[A-Za-z]+[A-Za-z ]*$/))
const authValidation = {
    register: async (req, res, next) => {
        const schema = Joi.object().keys({
            full_name: Joi.string()
                .min(2)
                .max(70)
                .trim()
                .required()
                .pattern(/^[A-Za-z]+(?:[ ]?[A-Za-z]+)*$/)
                .messages({
                    "string.pattern.base":
                        "Full name should only contain alphabets and spaces.",
                    "any.required": "Full name is required.",
                    "string.empty": "Full name should not be empty.",
                }),
            email: Joi.string()
                .email()
                .required()
                .error(() => {
                    return new Error("Email is required.");
                }),
            password: Joi.string().min(6).max(15).required().messages({
                "string.empty": "Password is required.",
                "string.min":
                    "Password must be at least {#limit} characters long.",
                "string.max":
                    "Password cannot be longer than {#limit} characters.",
            }),
        });

        try {
            const result = schema.validate(req.body);
            const isEmailExist = await check_if_email_exist(
                req.bodyString("email"),
                "users"
            );

            if (result.error) {
                res.status(500).json({
                    status: false,
                    error: result.error.message,
                });
            } else if (isEmailExist) {
                res.status(500).json({
                    status: false,
                    error: "Email is already registered.",
                });
            } else {
                next();
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: "Server side error!",
            });
        }
    },

    login: async (req, res, next) => {
        const schema = Joi.object().keys({
            email: Joi.string()
                .email()
                .required()
                .error(() => {
                    return new Error("Email is required.");
                }),
            password: Joi.string()
                .min(6)
                .max(15)
                .error(() => {
                    return new Error(
                        "Valid password required.(Length 6 to 15 characters.)"
                    );
                }),
        });

        try {
            const result = schema.validate(req.body);
            if (result.error) {
                res.status(500).json({
                    status: false,
                    error: result.error.message,
                });
            } else {
                next();
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: "Server side error!",
            });
        }
    },

    admin_register: async (req, res, next) => {
        const schema = Joi.object().keys({
            f_name: Joi.string()
                .min(2)
                .max(20)
                .trim()
                .required()
                .pattern(/^[A-Za-z]+(?:[ ]?[A-Za-z]+)*$/)
                .messages({
                    "string.pattern.base":
                        "First name should only contain alphabets and spaces.",
                    "any.required": "First name is required.",
                    "string.empty": "First name should not be empty.",
                }),
            l_name: Joi.string()
                .min(2)
                .max(20)
                .trim()
                .required()
                .pattern(/^[A-Za-z]+(?:[ ]?[A-Za-z]+)*$/)
                .messages({
                    "string.pattern.base":
                        "Last name should only contain alphabets and spaces.",
                    "any.required": "Last name is required.",
                    "string.empty": "Last name should not be empty.",
                }),
            designation: Joi.string()
                .min(2)
                .max(50)
                .trim()
                .required()
                .messages({
                    "string.base": "Designation should be a string.",
                    "string.empty": "Designation should not be empty.",
                    "string.min":
                        "Designation should have a minimum length of {#limit}.",
                    "string.max":
                        "Designation should have a maximum length of {#limit}.",
                    "any.required": "Designation is required.",
                }),
            email: Joi.string()
                .email()
                .required()
                .error(() => {
                    return new Error("Email is required.");
                }),
            mobile: Joi.string()
                .length(10)
                .trim()
                .pattern(/^[0-9]+$/)
                .required()
                .messages({
                    "string.base": "Mobile number should be a string.",
                    "string.empty": "Mobile number should not be empty.",
                    "string.pattern.base":
                        "Mobile number should contain only digits.",
                    "string.length":
                        "Mobile number should be exactly {#limit} characters long.",
                    "any.required": "Mobile number is required.",
                }),
            password: Joi.string().min(6).max(15).required().messages({
                "string.empty": "Password is required.",
                "string.min":
                    "Password must be at least {#limit} characters long.",
                "string.max":
                    "Password cannot be longer than {#limit} characters.",
            }),
        });

        try {
            const result = schema.validate(req.body);
            const isEmailExist = await check_if_email_exist(
                req.bodyString("email"),
                "adm_users"
            );

            if (result.error) {
                res.status(500).json({
                    status: false,
                    error: result.error.message,
                });
            } else if (isEmailExist) {
                res.status(500).json({
                    status: false,
                    error: "Email is already registered.",
                });
            } else {
                next();
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: "Server side error!",
            });
        }
    },

    admin_login: async (req, res, next) => {
        const schema = Joi.object().keys({
            email: Joi.string()
                .email()
                .required()
                .error(() => {
                    return new Error("Email is required.");
                }),
            password: Joi.string()
                .min(6)
                .max(15)
                .error(() => {
                    return new Error(
                        "Valid password required.(Length 6 to 15 characters)"
                    );
                }),
        });

        try {
            const result = schema.validate(req.body);
            if (result.error) {
                res.status(500).json({
                    status: false,
                    error: result.error.message,
                });
            } else {
                next();
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                error: "Server side error!",
            });
        }
    },

    // add: async (req, res, next) => {
    //     const schema = Joi.object().keys({
    //         name_prefix: Joi.string()
    //             .valid("M/S", "Mr.", "Miss")
    //             .optional()
    //             .allow("")
    //             .error(() => {
    //                 return new Error("Name prefix required.");
    //             }),
    //         name: Joi.string()
    //             .min(1)
    //             .max(50)
    //             .trim()
    //             .required()
    //             .error(() => {
    //                 return new Error("Name required.");
    //             }),
    //         country_code: Joi.number()
    //             .min(1)
    //             .max(999)
    //             .required()
    //             .error(() => {
    //                 return new Error("Country code required");
    //             }),
    //         mobile: Joi.string()
    //             .min(10)
    //             .max(10)
    //             .trim()
    //             .required()
    //             .error(() => {
    //                 return new Error("Mobile number required");
    //             }),
    //         email: Joi.string()
    //             .min(1)
    //             .max(100)
    //             .email()
    //             .trim()
    //             .required()
    //             .error(() => {
    //                 return new Error("Email required");
    //             }),
    //         ship_address: Joi.string()
    //             .min(1)
    //             .max(50)
    //             .trim()
    //             .required()
    //             .error(() => {
    //                 return new Error("Shipping address required.");
    //             }),
    //         ship_country: Joi.string()
    //             .min(1)
    //             .max(50)
    //             .required()
    //             .error(() => {
    //                 return new Error("Ship country required");
    //             }),
    //         ship_state: Joi.string()
    //             .min(1)
    //             .max(50)
    //             .required()
    //             .error(() => {
    //                 return new Error("Ship state required");
    //             }),
    //         ship_city: Joi.string()
    //             .min(1)
    //             .max(50)
    //             .required()
    //             .error(() => {
    //                 return new Error("Ship city required");
    //             }),
    //         ship_zip_code: Joi.string().min(5).max(6).required().messages({
    //             "any.required": "{{#label}} is required",
    //             "string.min": "{{#label}} should be min 5 length",
    //             "string.max": "{{#label}} should be max 6 length",
    //         }),

    //         bill_address: Joi.string()
    //             .min(1)
    //             .max(50)
    //             .trim()
    //             .required()
    //             .error(() => {
    //                 return new Error("Billing address required.");
    //             }),
    //         bill_country: Joi.string()
    //             .min(1)
    //             .max(50)
    //             .required()
    //             .error(() => {
    //                 return new Error("Bill country required");
    //             }),
    //         bill_state: Joi.string()
    //             .min(1)
    //             .max(50)
    //             .required()
    //             .error(() => {
    //                 return new Error("Bill state required");
    //             }),
    //         bill_city: Joi.string()
    //             .min(1)
    //             .max(50)
    //             .required()
    //             .error(() => {
    //                 return new Error("Bill city required");
    //             }),
    //         bill_zip_code: Joi.string().min(5).max(6).required().messages({
    //             "any.required": "{{#label}} is required",
    //             "string.min": "{{#label}} should be min 5 length",
    //             "string.max": "{{#label}} should be max 6 length",
    //         }),
    //         logo: Joi.optional().allow(""),
    //         //  .error(() => {
    //         //      return new Error("logo required");
    //         //  }),
    //     });
    //     try {
    //         const result = schema.validate(req.body);
    //         if (result.error) {
    //             if (req.all_files) {
    //                 if (req.all_files.logo) {
    //                     fs.unlink(
    //                         "public/logo/" + req.all_files.logo,
    //                         function (err) {
    //                             if (err) console.log(err);
    //                         }
    //                     );
    //                 }
    //             }
    //             res.status(StatusCode.badRequest).send(
    //                 ServerResponse.validationResponse(result.error.message)
    //             );
    //         } else {
    //             // let language_exist = await checkifrecordexist({ 'name': req.bodyString('language'), 'deleted': 0 }, 'master_language');
    //             var error = "";
    //             if (req.all_files) {
    //                 if (!req.all_files.logo) {
    //                     error =
    //                         "Please upload valid flag file. Only .jpg,.png file accepted (size: upto 1MB)";
    //                 }
    //             }
    //             //  else if (!req.all_files) {
    //             //      error = "Please upload valid file.(size: upto 1MB)";
    //             //  }

    //             // if (req.bodyString('direction') != 'ltr' && req.bodyString('direction') != 'rtl') {
    //             //    error = 'Please add valid direction ltr or rlt';
    //             // }

    //             if (error == "") {
    //                 next();
    //             } else {
    //                 if (req.all_files) {
    //                     if (req.all_files.logo) {
    //                         fs.unlink(
    //                             "public/logo/" + req.all_files.logo,
    //                             function (err) {
    //                                 if (err) console.log(err);
    //                             }
    //                         );
    //                     }
    //                 }
    //                 res.status(StatusCode.badRequest).send(
    //                     ServerResponse.validationResponse(
    //                         error ? error : "Error in data."
    //                     )
    //                 );
    //             }
    //         }
    //     } catch (error) {
    //         res.status(StatusCode.badRequest).send(
    //             ServerResponse.validationResponse(error.message)
    //         );
    //     }
    // },

    // update: async (req, res, next) => {
    //     const schema = Joi.object().keys({
    //         customer_id: Joi.string()
    //             .min(1)
    //             .max(50)
    //             .trim()
    //             .required()
    //             .error(() => {
    //                 return new Error("Customer id required.");
    //             }),
    //         name_prefix: Joi.string()
    //             .valid("M/S", "Mr.", "Miss")
    //             .optional()
    //             .allow("")
    //             .error(() => {
    //                 return new Error("Name prefix required.");
    //             }),
    //         name: Joi.string()
    //             .min(1)
    //             .max(50)
    //             .trim()
    //             .required()
    //             .error(() => {
    //                 return new Error("Name required.");
    //             }),
    //         country_code: Joi.number()
    //             .min(1)
    //             .max(999)
    //             .required()
    //             .error(() => {
    //                 return new Error("Country code required");
    //             }),
    //         mobile: Joi.string()
    //             .min(10)
    //             .max(10)
    //             .trim()
    //             .required()
    //             .error(() => {
    //                 return new Error("Mobile number required");
    //             }),
    //         email: Joi.string()
    //             .min(1)
    //             .max(100)
    //             .email()
    //             .trim()
    //             .required()
    //             .error(() => {
    //                 return new Error("Email required");
    //             }),

    //         ship_address: Joi.string()
    //             .min(1)
    //             .max(50)
    //             .trim()
    //             .required()
    //             .error(() => {
    //                 return new Error("Ship address required.");
    //             }),
    //         ship_country: Joi.string()
    //             .min(1)
    //             .max(50)
    //             .required()
    //             .error(() => {
    //                 return new Error("Ship country required");
    //             }),
    //         ship_state: Joi.string()
    //             .min(1)
    //             .max(50)
    //             .required()
    //             .error(() => {
    //                 return new Error("Ship state required");
    //             }),
    //         ship_city: Joi.string()
    //             .min(1)
    //             .max(50)
    //             .required()
    //             .error(() => {
    //                 return new Error("Ship city required");
    //             }),
    //         ship_zip_code: Joi.string()
    //             .min(1)
    //             .max(6)
    //             .required()
    //             .error(() => {
    //                 return new Error("Ship zip code required");
    //             }),
    //         bill_address: Joi.string()
    //             .min(1)
    //             .max(50)
    //             .trim()
    //             .required()
    //             .error(() => {
    //                 return new Error("Bill address required.");
    //             }),
    //         bill_country: Joi.string()
    //             .min(1)
    //             .max(50)
    //             .required()
    //             .error(() => {
    //                 return new Error("Bill country required");
    //             }),
    //         bill_state: Joi.string()
    //             .min(1)
    //             .max(50)
    //             .required()
    //             .error(() => {
    //                 return new Error("Bill state required");
    //             }),
    //         bill_city: Joi.string()
    //             .min(1)
    //             .max(50)
    //             .required()
    //             .error(() => {
    //                 return new Error("Bill city required");
    //             }),
    //         bill_zip_code: Joi.string()
    //             .min(1)
    //             .max(6)
    //             .required()
    //             .error(() => {
    //                 return new Error("Bill zip code required");
    //             }),
    //         logo: Joi.optional().allow(""),
    //     });

    //     try {
    //         const result = schema.validate(req.body);
    //         if (result.error) {
    //             if (req.all_files) {
    //                 if (req.all_files.logo) {
    //                     fs.unlink(
    //                         "public/logo/" + req.all_files.logo,
    //                         function (err) {
    //                             if (err) console.log(err);
    //                         }
    //                     );
    //                 }
    //             }
    //             res.status(StatusCode.badRequest).send(
    //                 ServerResponse.validationResponse(result.error.message)
    //             );
    //         } else {
    //             record_id = enc_dec.cjs_decrypt(req.bodyString("customer_id"));
    //             let record_exist = await checkifrecordexist(
    //                 { id: record_id },
    //                 "inv_customer"
    //             );
    //             // let language_exist = await checkifrecordexist({ 'name': req.bodyString('language'), 'id !=': record_id, 'deleted': 0 }, 'master_language');
    //             if (record_exist) {
    //                 next();
    //             } else {
    //                 if (req.all_files) {
    //                     if (req.all_files.logo) {
    //                         fs.unlink(
    //                             "public/logo/" + req.all_files.logo,
    //                             function (err) {
    //                                 if (err) console.log(err);
    //                             }
    //                         );
    //                     }
    //                 }
    //                 res.status(StatusCode.badRequest).send(
    //                     ServerResponse.validationResponse("Record not found.")
    //                 );
    //             }
    //         }
    //     } catch (error) {
    //         res.status(StatusCode.badRequest).send(
    //             ServerResponse.validationResponse(error.message)
    //         );
    //     }
    // },

    // details: async (req, res, next) => {
    //     if (checkEmpty(req.body, ["customer_id"])) {
    //         const schema = Joi.object().keys({
    //             customer_id: Joi.string()
    //                 .min(2)
    //                 .max(200)
    //                 .required()
    //                 .error(() => {
    //                     return new Error("Customer id Required");
    //                 }),
    //         });
    //         try {
    //             const result = schema.validate(req.body);
    //             if (result.error) {
    //                 res.status(StatusCode.badRequest).send(
    //                     ServerResponse.validationResponse(result.error.message)
    //                 );
    //             } else {
    //                 let record_exist = await checkifrecordexist(
    //                     {
    //                         id: enc_dec.cjs_decrypt(
    //                             req.bodyString("customer_id")
    //                         ),
    //                     },
    //                     "inv_customer"
    //                 );
    //                 if (record_exist) {
    //                     next();
    //                 } else {
    //                     res.status(StatusCode.badRequest).send(
    //                         ServerResponse.validationResponse(
    //                             "Record not found."
    //                         )
    //                     );
    //                 }
    //             }
    //         } catch (error) {
    //             res.status(StatusCode.badRequest).send(
    //                 ServerResponse.validationResponse(error)
    //             );
    //         }
    //     } else {
    //         res.status(StatusCode.badRequest).send(ServerResponse.badRequest);
    //     }
    // },

    // deactivate: async (req, res, next) => {
    //     if (checkEmpty(req.body, ["customer_id"])) {
    //         const schema = Joi.object().keys({
    //             customer_id: Joi.string()
    //                 .min(10)
    //                 .required()
    //                 .error(() => {
    //                     return new Error("Customer id required");
    //                 }),
    //         });

    //         try {
    //             const result = schema.validate(req.body);
    //             if (result.error) {
    //                 res.status(StatusCode.badRequest).send(
    //                     ServerResponse.validationResponse(result.error.message)
    //                 );
    //             } else {
    //                 record_id = enc_dec.cjs_decrypt(
    //                     req.bodyString("customer_id")
    //                 );
    //                 let customer_exist = await checkifrecordexist(
    //                     { id: record_id },
    //                     "inv_customer"
    //                 );
    //                 let record_exist = await checkifrecordexist(
    //                     { id: record_id, status: 0 },
    //                     "inv_customer"
    //                 );
    //                 if (customer_exist && record_exist) {
    //                     next();
    //                 } else {
    //                     res.status(StatusCode.badRequest).send(
    //                         ServerResponse.validationResponse(
    //                             !customer_exist
    //                                 ? "Record not found."
    //                                 : !record_exist
    //                                 ? "Record already deactivated."
    //                                 : ""
    //                         )
    //                     );
    //                 }
    //             }
    //         } catch (error) {
    //             res.status(StatusCode.badRequest).send(
    //                 ServerResponse.validationResponse(error)
    //             );
    //         }
    //     } else {
    //         res.status(StatusCode.badRequest).send(ServerResponse.badRequest);
    //     }
    // },

    // activate: async (req, res, next) => {
    //     if (checkEmpty(req.body, ["customer_id"])) {
    //         const schema = Joi.object().keys({
    //             customer_id: Joi.string()
    //                 .min(10)
    //                 .required()
    //                 .error(() => {
    //                     return new Error("Customer id required");
    //                 }),
    //         });

    //         try {
    //             const result = schema.validate(req.body);
    //             if (result.error) {
    //                 res.status(StatusCode.badRequest).send(
    //                     ServerResponse.validationResponse(result.error.message)
    //                 );
    //             } else {
    //                 record_id = enc_dec.cjs_decrypt(
    //                     req.bodyString("customer_id")
    //                 );
    //                 let customer_exist = await checkifrecordexist(
    //                     { id: record_id },
    //                     "inv_customer"
    //                 );
    //                 let record_exist = await checkifrecordexist(
    //                     { id: record_id, status: 1 },
    //                     "inv_customer"
    //                 );
    //                 if (customer_exist && record_exist) {
    //                     next();
    //                 } else {
    //                     res.status(StatusCode.badRequest).send(
    //                         ServerResponse.validationResponse(
    //                             !customer_exist
    //                                 ? "Record not found"
    //                                 : !record_exist
    //                                 ? "Record already activated."
    //                                 : " "
    //                         )
    //                     );
    //                 }
    //             }
    //         } catch (error) {
    //             res.status(StatusCode.badRequest).send(
    //                 ServerResponse.validationResponse(error)
    //             );
    //         }
    //     } else {
    //         res.status(StatusCode.badRequest).send(ServerResponse.badRequest);
    //     }
    // },
};

module.exports = authValidation;
