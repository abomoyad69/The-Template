import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { RedisClient } from "./redis.client";

@Injectable()
export class RedisMiddleWare implements NestMiddleware {
  // OMG
  constructor() {}
  private redisClient: RedisClient = RedisClient.getInstance();
  use(req: Request, res: Response, next: NextFunction) {
    if (req?.headers?.authorization?.split("Bearer ")?.length <= 1) {
      next();
      return;
    }
    try {
      let token = "";
      token = req.headers.authorization?.split("Bearer ")[1];
      if (token) {
        this.redisClient.receive(
          "hget",
          token,
          "logout",
          (err, result: string) => {
            if (!result || !JSON.parse(result.toLowerCase())) {
              req["token"] = token;
              // fetch permissions and put them in the request body
              this.redisClient.receive(
                "hget",
                token,
                "permissions",
                (error, res) => {
                  if (!result || !JSON.parse(result.toLowerCase())) {
                    req["permissions"] = res;
                    next();
                  } else {
                    res.json({ message: "No Permissions" });
                  }
                },
              );
            } else {
              res.json({ message: "Invalid Token!" });
            }
          },
        );
      }
    } catch (err) {
      throw new Error(err);
    }
  }
}
