import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { UseStyle } from 'primeng/usestyle';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, ButtonModule, MenubarModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  items: any[] = [];

  wishlistCount: number = 0;
  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'TV Shows',
        icon: 'pi pi-video',
        routerLink: '/tv',
      },
      {
        label:
          this.wishlistCount === 0
            ? 'Wishlist'
            : this.wishlistCount + ' Wishlist',
        icon: 'pi pi-heart',
        routerLink: '/wishlist',
      },
      {
        label: 'Register',
        icon: 'pi pi-user-plus',
        routerLink: '/register',
      },
      {
        label: 'Login',
        icon: 'pi pi-sign-in',
        routerLink: '/login',
      },
    ];
  }
}
