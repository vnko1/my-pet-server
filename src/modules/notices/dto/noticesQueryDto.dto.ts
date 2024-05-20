import { AppDto } from 'src/common';

export class NoticesQueryDto extends AppDto {
  sex?: 'male' | 'female';
  age?: '0.5' | '1' | '2';
  category: 'sell' | 'lost-found' | 'in-good-hands' | 'favorites' | 'own';
}
