import { setSession, check_session } from "./api";

export function createSession() {
    const session = {
        session: crypto.randomUUID(),
    };
    localStorage.setItem("session", JSON.stringify(session));
    setSession(session);
}

export function checkSession() {
    if (localStorage.getItem("session")) {
        try {
            const session = JSON.parse(localStorage.getItem("session"));
            check_session(session);
        } catch {
            createSession();
        }
    } else {
        createSession();
    }
}

export function getSession() {
    try {
        return JSON.parse(localStorage.getItem("session"));
    } catch {
        createSession();
        return JSON.parse(localStorage.getItem("session"));
    }
}
