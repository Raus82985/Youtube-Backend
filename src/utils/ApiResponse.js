class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data;
        this.message = message
        //generally 400 ke upeer hoga means wo client ya server error hoga so wo ApiError se jayega
        this.success = statusCode < 400
    }
}