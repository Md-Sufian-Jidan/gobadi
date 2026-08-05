import { UserRole } from "../module/user/user.interface";

interface IRequestUser {
    userId: string;
    email: string;
    role: UserRole;
}

export default IRequestUser;