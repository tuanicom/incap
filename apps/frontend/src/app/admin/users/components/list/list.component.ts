import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrimeIcons } from 'primeng/api';

@Component({
    selector: 'app-users-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    standalone: true,
    imports: [CommonModule]
})
export class ListComponent implements OnInit {
  public users$!: Observable<User[]>;
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  public icons = {
    plus: PrimeIcons.PLUS,
    edit: PrimeIcons.PENCIL,
    trash: PrimeIcons.TRASH,
  };

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.users$ = this.userService.getUsers();
  }

  addUser(): void {
    this.router.navigate(['../add'], { relativeTo: this.route });
  }

  deleteUser(id?: string): void {
    if (!id) {
      return;
    }
    this.userService.deleteUser(id).subscribe(() => {
      this.getUsers();
    });
  }
}
