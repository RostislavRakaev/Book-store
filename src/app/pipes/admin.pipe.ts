import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../login-registration/user';

@Pipe({
  name: 'adminFilter',
  pure: false
})
export class AdminPipe implements PipeTransform {

    transform(users: User[], filter?: User): any {
      if(!users) {
        return users;
      }
      else {
        return users.filter(user=>user.role === 'admin');
      }
    }
  }


