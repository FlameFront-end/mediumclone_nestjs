import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { ExpressRequestInterface } from "../../types/expressRequest.interface";
import { JwtPayload, verify } from "jsonwebtoken";
import { UserService } from "../user.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(" ")[1];
    try {
      const decode = verify(token, "hgdfodiugfsdfgpour234") as JwtPayload;
      const user = await this.userService.findById(decode.id);
      req.user = user;
    } catch (e) {
      req.user = null;
      next();
    }
    next();
  }
}
