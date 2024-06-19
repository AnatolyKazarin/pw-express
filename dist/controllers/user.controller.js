import User from '../models/user.model.js';
import ApiError from "../utils/error.js";
class UsersController {
    async getUser(req, res, next) {
        try {
            const { userId } = req;
            const user = await User.findById(userId);
            if (!user) {
                return next(ApiError.badRequest("User not found"));
            }
            return res.json({ user });
        }
        catch (e) {
            return next(ApiError.badRequest("Unexpected error"));
        }
    }
    async getUsers(req, res, next) {
        try {
            const { filter } = req.body;
            const users = await User.find({ username: { "$regex": filter, "$options": "i" } });
            if (!users.length) {
                return next(ApiError.badRequest(`Users with name ${filter} not found`));
            }
            return res.json(users);
        }
        catch (e) {
            return next(ApiError.badRequest('Unexpected error'));
        }
    }
}
export default new UsersController();
