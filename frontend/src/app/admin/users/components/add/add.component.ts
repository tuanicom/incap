import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-users-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
    imports: [ReactiveFormsModule]
})
export class AddComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

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
