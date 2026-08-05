import bcrypt from "bcryptjs";
export const hashPassword = async (password) => {
    return bcrypt.hash(password, 10);
};
export const comparePassword = async (candidatePassword, storedPassword) => {
    if (!storedPassword)
        return false;
    return bcrypt.compare(candidatePassword, storedPassword);
};
