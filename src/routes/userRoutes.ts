import { Request, Response, Router, NextFunction } from "express";
import User from "../models/User";
class UserRoutes {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }
  public async getUsers(req: Request, res: Response): Promise<void> {
    const users = await User.find();
    res.status(200).json(users);
  }
  public async getUser(req: Request, res: Response): Promise<void> {
    const user = await User.findOne({ email: req.params.email });
    res.status(302).json(user);
  }
  public async createUser(req: Request, res: Response): Promise<void> {
    const { name, email, password, username } = req.body;
    const newUser = new User({ name, email, password, username });
    await newUser.save();
    res.status(201).json({ data: newUser });
  }
  public async updateUser(req: Request, res: Response): Promise<void> {
    const { email } = req.params;
    const updatedUser = await User.findOneAndUpdate({ email }, req.body, {
      new: true
    });
    res.status(202).json(updatedUser);
  }
  public async deleteUser(req: Request, res: Response): Promise<void> {
    const { email } = req.params;
    await User.findOneAndDelete({ email });
    res.status(202).json({ Response: "Deleted" });
  }
  routes() {
    this.router.get("/", this.getUsers);
    this.router.get("/:email", this.getUser);
    this.router.post("/", this.createUser);
    this.router.put("/:email", this.updateUser);
    this.router.delete("/:email", this.deleteUser);
  }
}
const userRoutes = new UserRoutes();

export default userRoutes.router;
