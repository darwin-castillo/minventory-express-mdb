

const success = (res, value, message = 'Ok', status = 200) => {
    res.status(status).json({
        status,
        message,
        value
    });
};

const error = (res, message = 'Internal Server Error', status = 500, value = null) => {
    res.status(status).json({
        status,
        message,
        value
    });
};

module.exports = { success, error };