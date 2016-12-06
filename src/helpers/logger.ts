export class Log {
    static write(message: string) {
        console.log(message);
    }

    static error(message: any) {
        console.log(message);
    }
}