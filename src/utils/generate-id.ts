export function generateId(): string {
    return `f${(~~(Math.random()*1e8)).toString(16)}`;
};