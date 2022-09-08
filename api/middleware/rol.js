const { handleHtppError } = require("../utils/handleError");

const checkRol = (role) => (req, res, next) => {
  try {
    const { user } = req;
    const rolesByUser = user.role;
    console.log(rolesByUser);

    const checkValueRol = role.some((rolSingle) =>
      rolesByUser.includes(rolSingle)
    );

    if (!checkValueRol) {
      handleHtppError(res, "Usser_not_permissions", 403);
      return;
    }
    next();
  } catch (error) {
    console.log(error);
    handleHtppError(res, "Error_permissions", 403);
  }
};

module.exports = { checkRol };
