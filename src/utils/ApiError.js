//created a classs with enherating the methods of Error class and now we will over write some of the methods
class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        //message ko overwrite kar diye
        super(message)
        // status code ko apne status code se replace kar diya
        this.statusCode = statusCode
        //phale ka sara data null kar diye
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        //this stack wil store the things like at which file or where the error occyrs
        if(stack){
            this.stack = stack;
        }
        else{
            Error.captureStackTrace(this, this.constructor)
        }

    }

}

export {ApiError}