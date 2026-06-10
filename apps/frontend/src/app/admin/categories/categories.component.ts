import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-categories-root',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: true,
    imports: [RouterModule]
})
export class CategoriesComponent {
}
