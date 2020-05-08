import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterEvent as Event} from '@angular/router';
import { filter, distinctUntilChanged } from 'rxjs/operators';
import { IBreadCrumb } from 'src/app/components/breadcrumb/IBreadCrumb';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public breadcrumbs: IBreadCrumb[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _breadcrumbService: BreadcrumbService
  ) { 
    this.breadcrumbs = _breadcrumbService.buildBreadCrumb(route.root);
  }

  ngOnInit(): void {
    this.router.events.pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        distinctUntilChanged(),
    ).subscribe(() => {
        this.breadcrumbs = this._breadcrumbService.buildBreadCrumb(this.route.root);
    });
  }

}
