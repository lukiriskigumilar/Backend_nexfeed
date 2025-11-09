export const bodyValidator = (schema) => {
    return (req, res, next) => {
        const contentType = req.headers['content-type'];
        if (!contentType || !contentType.includes('application/json')) {
            return res.status(415).json({ error: 'Unsupported Media Type. Please use application/json' });
        }

        // Validasi body sekali saja
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                errors: error.details.map(detail => detail.message)
            });
        }

        // Jika validasi lolos
        next();
    }
}
