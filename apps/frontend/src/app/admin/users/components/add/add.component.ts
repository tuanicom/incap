import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-users-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule]
})
export class AddComponent {
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  addUserForm = new FormGroup({
    name: new FormControl('', { nonNullable: true }),
  });

  onSubmit(): void {
    const user: User = {
      name: this.addUserForm.controls.name.value,
    };
    this.userService.addUser(user).subscribe(() => {
      this.goBackToList();
    });
  }

  goBackToList(): void {
    this.router.navigate(['../list'], { relativeTo: this.route });
  }
}
