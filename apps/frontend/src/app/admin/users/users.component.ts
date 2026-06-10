import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: true,
    imports: [RouterModule]
})
export class UsersComponent {

}
