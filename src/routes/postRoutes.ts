import { Request, Response, Router, NextFunction } from "express";
import Post from "../models/Post";
class PostRoutes {
  router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }
  public async getPosts(req: Request, res: Response): Promise<void> {
    const posts = await Post.find();
    res.status(200).json(posts);
  }
  public async getPost(req: Request, res: Response): Promise<void> {
    const post = await Post.findOne({ url: req.params.url });
    res.status(302).json(post);
  }
  public async createPost(req: Request, res: Response): Promise<void> {
    const { title, url, content, img } = req.body;
    const newPost = new Post({ title, url, content, img });
    await newPost.save();
    res.status(201).json({ data: newPost });
  }
  public async updatePost(req: Request, res: Response): Promise<void> {
    const { url } = req.params;
    const updatedPost = await Post.findOneAndUpdate({ url }, req.body, {
      new: true
    });
    res.status(202).json(updatedPost);
  }
  public async deletePost(req: Request, res: Response): Promise<void> {
    const { url } = req.params;
    await Post.findOneAndDelete({ url });
    res.status(202).json({ Response: "Deleted" });
  }
  routes() {
    this.router.get("/", this.getPosts);
    this.router.get("/:url", this.getPost);
    this.router.post("/", this.createPost);
    this.router.put("/:url", this.updatePost);
    this.router.delete("/:url", this.deletePost);
  }
}
const postRoutes = new PostRoutes();

export default postRoutes.router;
