import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-selector',
  templateUrl: './tab-selector.component.html',
  styleUrls: ['./tab-selector.component.css']
})
export class TabSelectorComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
