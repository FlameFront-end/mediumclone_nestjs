import { genSaltSync, hash } from "bcrypt";

export async function encodePassword(rawPassword: string) {
  const SALT = genSaltSync(4);
  return hash(rawPassword, SALT);
}
