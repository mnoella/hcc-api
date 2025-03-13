import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    
    canActivate(context: ExecutionContext): boolean {
        //recupère les roles requis
        const requiredRoles = this.reflector.get<string[]>('expectedRoles', context.getHandler());
        if(!requiredRoles) {
            return true; // si aucun role defini, acces autorisé
        }

        //recupere le user depuis la requete
        const request = context.switchToHttp().getRequest();
        const role = request.payload.role;
        if (!role || !requiredRoles.includes(role)) {
            throw new ForbiddenException('Accès interdit : rôle insuffisant');
        }

        return true; // si le role correspond, acces autorisé 
    }
}