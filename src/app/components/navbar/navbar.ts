import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { filter } from 'rxjs/operators';
import { MovieStore } from '../../store/movie.store';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ButtonModule, MenubarModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  router = inject(Router);
  moviesStore = inject(MovieStore);

  menuItems = signal<any[]>([]);
  isDark = signal(false);
  isLoggedIn = signal(false);
  userName = signal<string | null>(null);

  ngOnInit() {
    this.loadTheme();
    this.checkAuthState();
    this.generateMenuItems();

    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe(() => {
        this.checkAuthState();
        this.generateMenuItems();
      });
  }

  loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      this.isDark.set(true);
    }
  }

  toggleDarkMode() {
    const html = document.documentElement;
    html.classList.toggle('dark');
    const dark = html.classList.contains('dark');
    this.isDark.set(dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }

  checkAuthState() {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    const userData = localStorage.getItem('userData');

    this.isLoggedIn.set(loggedIn);

    if (loggedIn && userData) {
      const user = JSON.parse(userData);
      this.userName.set(user.name || null);
    } else {
      this.userName.set(null);
    }
  }

  generateMenuItems() {
    const baseMenu = [
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
        label: 'Popular',
        icon: 'pi pi-star',
        items: [
          {
            label: 'Movies',
            icon: 'pi pi-camera',
            routerLink: '/popular-movies',
          },
          {
            label: 'TV Shows',
            icon: 'pi pi-video',
            routerLink: '/popular-tv',
          },
        ],
      },
    ];

    const authMenu = this.isLoggedIn()
      ? {
          label: this.userName(),
          icon: 'pi pi-user',
          styleClass: 'auth-link',
          items: [
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
        };

    this.menuItems.set([...baseMenu, authMenu]);
  }
  logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userData');
    this.moviesStore.clearWatchList();
    this.isLoggedIn.set(false);
    this.userName.set(null);
    this.router.navigate(['/login']);
  }
}
