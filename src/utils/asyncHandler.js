// promise method
const asyncHandler = (requestHandler) => {
    (error, req, res, next) => {
        Promise.resolve(requestHandler(error, req, res, next)).catch((err) => next(err))
        // catch me next ko update kar rahe ahi taki aage wala aapna kaam kar sake
    }
}

//higher order function

// //try catch method
// const asyncHandler = (func) => {
//     async (error, req, res, next) => {
//         try {
//             await func(error, req, res, next)
//         } catch (err) {
//             // ye status jaata hai and saath me json v vejte hai so that frontend ala ko eassy ho jaye
//             res.status(err.code || 500).json({
//                 success: false,
//                 message: err.message
//             })
//         }
//     }
// }

export {asyncHandler}