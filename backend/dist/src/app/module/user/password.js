import crypto from "crypto";
const ITERATIONS = 100_000;
const KEY_LENGTH = 64;
const SALT_LENGTH = 16;
const HASH_PREFIX = "pbkdf2_sha256";
export const hashPassword = (password) => {
    const salt = crypto.randomBytes(SALT_LENGTH);
    const derivedKey = crypto.pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, "sha256");
    return `${HASH_PREFIX}$${ITERATIONS}$${salt.toString("hex")}$${derivedKey.toString("hex")}`;
};
export const comparePassword = (candidatePassword, storedPassword) => {
    if (!storedPassword) {
        return false;
    }
    if (!storedPassword.startsWith(`${HASH_PREFIX}$`)) {
        return candidatePassword === storedPassword;
    }
    const [, iterationsText, saltHex, expectedHashHex] = storedPassword.split("$");
    const iterations = Number(iterationsText);
    const salt = Buffer.from(saltHex, "hex");
    const expectedHash = Buffer.from(expectedHashHex, "hex");
    const derivedKey = crypto.pbkdf2Sync(candidatePassword, salt, iterations, expectedHash.length, "sha256");
    if (derivedKey.length !== expectedHash.length) {
        return false;
    }
    try {
        return crypto.timingSafeEqual(derivedKey, expectedHash);
    }
    catch {
        return false;
    }
};
