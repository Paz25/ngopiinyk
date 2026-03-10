import Hashids from "hashids";

const hashids = new Hashids(
  process.env.NEXT_PUBLIC_HASHID_SALT ?? "default_salt",
  8,
);

export const encodeId = (id: number): string => hashids.encode(id);
export const decodeId = (hash: string): number | null => {
  const decoded = hashids.decode(hash);
  return decoded.length > 0 ? (decoded[0] as number) : null;
};
