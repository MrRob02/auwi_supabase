export type Nullable<T> = T | null;

export function genericDomain(
    { name, identity }: { name: string; identity: number },
): string {
    return `${name}.${identity}@auwi.mx`;
}
