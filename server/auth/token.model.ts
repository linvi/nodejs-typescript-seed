export class JWTToken {
    constructor(data?: {
        sessionId?: string,
        accountId?: string
    }) {
        if (data) {
            this.sessionId = data.sessionId;
            this.accountId = data.accountId;
        }
    }

    sessionId: string;
    accountId: string;
}