import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  
  constructor (
    private authService: AuthService
  ) {}

  logout() {
    this.authService.logout()
  }
}
