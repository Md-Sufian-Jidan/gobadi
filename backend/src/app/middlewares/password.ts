import bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (
  candidatePassword: string,
  storedPassword?: string
): Promise<boolean> => {
  if (!storedPassword) return false;
  return bcrypt.compare(candidatePassword, storedPassword);
};
