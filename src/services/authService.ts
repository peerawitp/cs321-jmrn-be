import userService from "./userService";
import { LoginDTOType } from "../dtos/Auth";

const login = async (inputUser: LoginDTOType) => {
  const user = await userService.findUserFromEmail(inputUser.email);
  if (!user) throw new Error("INVALID_CREDENTIALS");

  const isMatch = await Bun.password.verify(inputUser.password, user.password);

  if (!isMatch) throw new Error("INVALID_PASSWORD");
  return user;
};

export default {
  login,
};
