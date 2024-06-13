import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoOptimizationService {
  title =inject(Title);
  metadata=inject(Meta);


  setTitle(title: string) {
    this.title.setTitle(title);
  }

  setMetaDescription(description: string) {
    this.metadata.updateTag({ name: 'description', content: description });
  }

  setMetaKeywords(keywords: string) {
    this.metadata.updateTag({ name: 'keywords', content: keywords });
  }

  setMetaTags(tags: string) {
    this.metadata.updateTag({ name: 'tags', content: tags });
  }

  setMetaAuthor(author: string) {
    this.metadata.updateTag({ name: 'author', content: author });
  }
}
