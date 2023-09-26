import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getMushi(): string {
    return 'Mushi Mushi!';
  }
}
