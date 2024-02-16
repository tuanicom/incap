import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-users-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  addUserForm = new FormGroup({
    name: new FormControl(''),
  });

  onSubmit(): void {
    const user: User = {
      name: this.addUserForm.get('name').value,
    } as User;
    this.userService.addUser(user).subscribe(() => {
      this.goBackToList();
    });
  }

  goBackToList(): void {
    this.router.navigate(['../list'], { relativeTo: this.route });
  }
}
