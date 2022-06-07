export interface user {
    id: number;
    username: string;
    type: number;
}

export type users = user[]

export const emptyUser: user = { id: -1, username: "", type: -1 }

export function login(username: string, password: string) {
    return fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username: username, password: password }),
        headers: {
            'content-type': 'application/json'
        }
    })
}

export function getUser() {
    return fetch("/api/auth/whoami", { method: "GET" })
}

export function getUserList() {
    return fetch("/api/users", { method: 'GET' })
}

export function deleteGrant(id: number) {
    return fetch("/api/grants/" + id.toString(), {method: 'DELETE'})
}