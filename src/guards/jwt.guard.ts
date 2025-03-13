import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token manquant ou invalide');
    } 
    
    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;
    
    if(!secret) {
        throw new UnauthorizedException("Clé secrete non définie");
    }
    
    try {
      const payload: any = jwt.verify(token, secret); // Vérification du token 
      request.payload = payload; // Attache le payload à la requête
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token invalide ou expiré');
    }
  }
}