// errorHelpers.js
export const setFormErrors = (serverErrors, setError) => {
    if (!serverErrors || !Array.isArray(serverErrors)) return;
    const uniqueErrors = {};
    serverErrors.forEach((errorItem) => {
        const { path, msg } = errorItem;
        if (!uniqueErrors[path]) {
            uniqueErrors[path] = msg;
        }
    });
    Object.entries(uniqueErrors).forEach(([path, msg]) => {
        setError(path, {
            type: 'manual',
            message: msg,
        });
    });
};
