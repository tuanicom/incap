import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { faPlus, faEdit, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-users-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    standalone: true,
    imports: [CommonModule, FontAwesomeModule]
})
export class ListComponent implements OnInit {
  public users$!: Observable<User[]>;
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  public icons: { [id: string]: IconDefinition; } = {
    plus: faPlus,
    edit: faEdit,
    trash: faTrash,
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
