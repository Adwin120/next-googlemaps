export const promiseGuard =
    <T extends U, U = T>(condition: (x: U) => boolean, errorMessage: (x: U) => string = String) =>
    (x: T) =>
        condition(x) ? Promise.resolve(x) : Promise.reject(errorMessage(x));
