import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/login-registration/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  subscriptions$: Subscription = new Subscription();

  users: User[];

  constructor(private userService: UserService) { }

  getUsers(): void {
    this.subscriptions$.add(

      this.userService.getUsers().subscribe(res=>this.users = res)

    )
  }

  switcher(user: User): void {
    if(user.role === "user") {
      user.role = 'admin';
      this.subscriptions$.add(

        this.userService.editUser(user).subscribe()

      )
    }
    else if(user.role === 'admin') {
      user.role = 'user';
      this.subscriptions$.add(

        this.userService.editUser(user).subscribe()
        
      )
    }
  }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
  }

}
