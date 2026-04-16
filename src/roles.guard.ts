import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Roles } from "./roles.decorator";
import { Reflector } from "@nestjs/core";

export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}


    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get(Roles, context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        //return matchRoles(roles, user.roles);
        return true;
    }
}