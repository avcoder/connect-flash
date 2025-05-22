export const flashValidationErrors = (err, req, res, next) => {
    console.log('inside flashValidationErrors');
    next()
}