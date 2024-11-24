export class Secrets {
  static isLocal: boolean;

  static set setLocal(value: boolean) {
    this.isLocal = value;
  }
  static get GetUrl(): string {
    if (this.isLocal === undefined) {
      throw new Error("isLocal is not defined");
    }
    return Deno.env.get(
      this.isLocal ? Deno.env.get("LOCAL_URL")! : Deno.env.get("SUPABASE_URL")!,
    )!;
  }
  static get GetAnonKey(): string {
    if (this.isLocal === undefined) {
      throw new Error("isLocal is not defined");
    }
    return Deno.env.get(
      this.isLocal
        ? Deno.env.get("LOCAL_KEY")!
        : Deno.env.get("SUPABASE_ANON_KEY")!,
    )!;
  }
  static get GetServiceRoleKey(): string {
    if (this.isLocal === undefined) {
      throw new Error("isLocal is not defined");
    }
    return Deno.env.get(
      this.isLocal
        ? Deno.env.get("LOCAL_KEY")!
        : Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    )!;
  }
}
/*

    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,

*/
