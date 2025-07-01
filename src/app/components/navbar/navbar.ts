import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, ButtonModule, MenubarModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  menuItems = signal<any[]>([]);
  isDark = signal(false);

  isLoggedIn = signal(true);
  user = {
    name: 'Omar',
    email: 'omar@example.com',
  };

  ngOnInit() {
    this.generateMenuItems();

    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      this.isDark.set(true);
    }
  }

  toggleDarkMode() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    this.isDark.set(html.classList.contains('dark'));
    localStorage.setItem('theme', this.isDark() ? 'dark' : 'light');
  }

  generateMenuItems() {
    this.menuItems.update((prev) => [
      ...prev,
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
        label: 'Wishlist',
        icon: 'pi pi-heart',
        routerLink: '/wishlist',
      },
      {
        label: 'Register',
        icon: 'pi pi-user-plus',
        routerLink: '/register',
      },
      this.isLoggedIn()
        ? {
            label: this.user.name,
            icon: 'pi pi-user',
            styleClass: 'auth-link',
            items: [
              {
                label: 'Profile',
                icon: 'pi pi-id-card',
                routerLink: '/profile',
              },
              {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                command: () => this.logout(),
              },
            ],
          }
        : {
            label: 'Login',
            icon: 'pi pi-sign-in',
            routerLink: '/login',
            styleClass: 'auth-link',
          },
    ]);
  }

  logout() {
    this.isLoggedIn.set(false);
    this.generateMenuItems();

    console.log(this.isLoggedIn());
  }
}
