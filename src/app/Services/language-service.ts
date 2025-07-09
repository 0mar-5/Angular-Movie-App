import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private _lang = signal<'en-US' | 'ar-EG'>('en-US');
  private _dir = signal<'ltr' | 'rtl'>('ltr');

  constructor() {
    const savedLang = localStorage.getItem('lang') as 'en-US' | 'ar-EG' | null;
    if (savedLang) {
      this._lang.set(savedLang);
      this._dir.set(savedLang.startsWith('ar') ? 'rtl' : 'ltr');
      document.documentElement.dir = this._dir();
    }
  }

  get language() {
    return this._lang;
  }

  get direction() {
    return this._dir;
  }

  changeLanguage(lang: 'en-US' | 'ar-EG') {
    this._lang.set(lang);
    this._dir.set(lang.startsWith('ar') ? 'rtl' : 'ltr');
    localStorage.setItem('lang', lang);
    document.documentElement.dir = this._dir();
    document.documentElement.lang = lang;
  }
}
