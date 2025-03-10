import { jwtDecode } from "jwt-decode";

export function tokenDecoder(token) {
  if(token) return jwtDecode(token);
  return null;
} 

