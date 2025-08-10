import { setSession, check_session } from "./api";

export function createSession() {
    const session = {
        session: crypto.randomUUID(),
    };
    localStorage.setItem("session", JSON.stringify(session));
    setSession(session);
}

export function checkSession() {
    check_session("asda")
        .then(({ data }) => {
            if (data?.session) {
                localStorage.setItem("session", JSON.stringify(data));
            } else if (localStorage.getItem("session")) {
                try {
                    const session = JSON.parse(localStorage.getItem("session"));
                    check_session(session.session);
                } catch {
                    createSession();
                }
            } else {
                createSession();
            }
        })
        .catch((v) => console.log(v));
}

export function getSession() {
    try {
        return JSON.parse(localStorage.getItem("session"));
    } catch {
        createSession();
        return JSON.parse(localStorage.getItem("session"));
    }
}
