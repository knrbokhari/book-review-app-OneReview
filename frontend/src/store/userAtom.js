import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
export const user = {
  email: "",
  name: "",
  id: "",
  role: "",
};

export const userAtomIt = atomWithStorage("user", user);

export const userAtom = atom(null, (_get, set, _data) => {
  return set(userAtomIt, user);
});
