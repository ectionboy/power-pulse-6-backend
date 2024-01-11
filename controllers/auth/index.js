const { ctrlWrapper } = require("../../helpers");

const register = require("./register/register");
const login = require("./login/login");
const logout = require("./logout/logout");
const getCurrent = require("./getCurrent/getCurrent");

module.exports = {
	register: ctrlWrapper(register),
	login: ctrlWrapper(login),
	getCurrent: ctrlWrapper(getCurrent),
	logout: ctrlWrapper(logout),
};