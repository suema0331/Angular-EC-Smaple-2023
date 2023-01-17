import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SEOService {
  constructor(private title: Title, private meta: Meta) {}

  updateTitle(title: string): void {
    this.title.setTitle(title);
  }

  updateOgUrl(url: string): void {
    this.meta.updateTag({ name: 'og:url', content: url });
  }

  updateDescription(desc: string): void {
    this.meta.updateTag({ name: 'description', content: desc });
  }
}
