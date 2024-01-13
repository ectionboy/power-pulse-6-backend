const register = require("./register/register");
const login = require("./login/login");
const logout = require("./logout/logout");
const current = require("./current/current");
const updateAvatarCloudinary = require("./updateAvatarCloudinary/updateAvatarCloudinary");
const updateUser = require("./updateUser/updateUser");

module.exports = {
  register,
  login,
  current,
  logout,
  updateAvatarCloudinary,
  updateUser,
}; 
