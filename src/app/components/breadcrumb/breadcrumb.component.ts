import { Component, OnInit, Input } from '@angular/core';
import { IBreadCrumb } from 'src/app/components/breadcrumb/IBreadCrumb';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  @Input() breadcrumbs: IBreadCrumb[];
  @Input() label: string;

  constructor() { }

  ngOnInit(): void {
  }
}
