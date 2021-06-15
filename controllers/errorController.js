const sendErrorDev = (err, req, res) => {

        return res.status(err.statusCode).json({
            status: err.status, 
            err, 
            message: err.message, 
            stack: err.stack
        
    })
}

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500; 
    err.status =  err.status || "error"; 

    if(process.env.NODE_ENV === "development"){
        console.log("IMadaad");
        
        sendErrorDev(err,req, res)
    }
}