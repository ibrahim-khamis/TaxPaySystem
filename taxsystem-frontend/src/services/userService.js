import BASE_URL from "./api";

const getToken = () => {

    return localStorage.getItem("token");

};

// =========================
// GET ALL USERS
// =========================

export const getUsers = async () => {

    const response = await fetch(`${BASE_URL}/users`, {

        method: "GET",

        headers: {

            "Content-Type": "application/json",

            Authorization: `Bearer ${getToken()}`

        }

    });

    if (!response.ok) {

        throw new Error("Failed to fetch users");

    }

    return await response.json();

};

// =========================
// CREATE USER
// =========================

export const createUser = async (user) => {

    const response = await fetch(`${BASE_URL}/users`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json",

            Authorization: `Bearer ${getToken()}`

        },

        body: JSON.stringify(user)

    });

    if (!response.ok) {

        throw new Error("Failed to create user");

    }

    return await response.json();

};

// =========================
// UPDATE USER
// =========================

export const updateUser = async (id, user) => {

    const response = await fetch(`${BASE_URL}/users/${id}`, {

        method: "PUT",

        headers: {

            "Content-Type": "application/json",

            Authorization: `Bearer ${getToken()}`

        },

        body: JSON.stringify(user)

    });

    if (!response.ok) {

        throw new Error("Failed to update user");

    }

    return await response.json();

};

// =========================
// DELETE USER
// =========================

export const deleteUser = async (id) => {

    const response = await fetch(`${BASE_URL}/users/${id}`, {

        method: "DELETE",

        headers: {

            Authorization: `Bearer ${getToken()}`

        }

    });

    if (!response.ok) {

        throw new Error("Failed to delete user");

    }

    return await response.text();

};