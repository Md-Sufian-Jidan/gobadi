"use server";

import { cookies } from "next/headers";

const getApiBaseUrl = () => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    if (!url) {
        throw new Error("NEXT_PUBLIC_API_URL is not defined in environment variables");
    }
    return url;
};

async function getAuthHeaders() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    if (!accessToken) {
        return null;
    }
    return { Authorization: `Bearer ${accessToken}` };
}

export async function getUserProfile() {
    const API_BASE_URL = getApiBaseUrl();
    const headers = await getAuthHeaders();
    if (!headers) {
        return { status: false, message: "Access token not found" };
    }
    const res = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "GET",
        headers,
        credentials: "include",
    });
    const result = await res.json();
    console.log(result);
    if (!res.ok) {
        return { status: false, message: result.message || "Login failed" };
    }

    return { status: true, data: result.data };
}

export async function getAllUsers(page = 1, limit = 10) {
    const API_BASE_URL = getApiBaseUrl();
    const headers = await getAuthHeaders();
    if (!headers) {
        return { status: false, message: "Access token not found" };
    }
    const res = await fetch(`${API_BASE_URL}/users?page=${page}&limit=${limit}`, {
        method: "GET",
        headers,
        credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) {
        return { status: false, message: result.message || "Failed to fetch users" };
    }

    return { status: true, data: result.data };
}

export async function getUserById(id: string) {
    const API_BASE_URL = getApiBaseUrl();
    const headers = await getAuthHeaders();
    if (!headers) {
        return { status: false, message: "Access token not found" };
    }
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "GET",
        headers,
        credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) {
        return { status: false, message: result.message || "Failed to fetch user" };
    }

    return { status: true, data: result.data };
}

export async function updateUser(id: string, payload: FormData | Record<string, any>) {
    const API_BASE_URL = getApiBaseUrl();
    const headers = await getAuthHeaders();
    if (!headers) {
        return { status: false, message: "Access token not found" };
    }

    const requestHeaders: Record<string, string> = { ...headers };
    let body: any;

    const isFormData =
        typeof payload === "object" &&
        payload !== null &&
        (typeof (payload as any).append === "function" || payload instanceof FormData);

    if (isFormData) {
        delete requestHeaders["Content-Type"];
        delete requestHeaders["content-type"];
        body = payload;
    } else {
        requestHeaders["Content-Type"] = "application/json";
        body = JSON.stringify(payload);
    }
    console.log("payload", body);

    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: requestHeaders,
        body,
        credentials: "include",
    });

    const result = await res.json();
    if (!res.ok) {
        return { status: false, message: result.message || "Failed to update user" };
    }

    return { status: true, data: result.data };
}

export async function deleteUser(id: string) {
    const API_BASE_URL = getApiBaseUrl();
    const headers = await getAuthHeaders();
    if (!headers) {
        return { status: false, message: "Access token not found" };
    }
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
        method: "DELETE",
        headers,
        credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) {
        return { status: false, message: result.message || "Failed to delete user" };
    }

    return { status: true, message: result.message };
}
