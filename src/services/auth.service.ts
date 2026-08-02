"use server"
import { LoginRequest, RegisterRequest } from "@/types/auth.type";
import axios from "axios";

const api_url = process.env.NEXT_PUBLIC_API_URL;

if (!api_url) {
    throw new Error("Please set the NEXT_PUBLIC_API_URL environment variable");
};

export const loginUser = async (user: LoginRequest) => {
    try {
        const res = await axios.post(`${api_url}/auth/login`, user);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const registerUser = async (user: RegisterRequest) => {
    try {
        const res = await axios.post(`${api_url}/auth/register`, user);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}