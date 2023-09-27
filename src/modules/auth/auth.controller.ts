import { Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./dto/login-user.dto";
import { LocalAuthGuard } from "./guards/local-auth-guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req: LoginUserDto) {
    return this.authService.login(req);
  }

  @Post("logout")
  async logout(@Request() req: any) {
    return this.authService.logout(
      req.headers.authorization.split("Bearer ")[1],
    );
  }
}
