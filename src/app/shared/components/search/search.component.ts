import { Component } from '@angular/core';
import { IFakeCategory } from '../../../models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  toggleDropdown = false;
  selectedOption = 'Select genre';

  listOfCategories:IFakeCategory[] = [
    { id: 1, name: 'Fiction', value: 'fiction' },
    { id: 2, name: 'Non-Fiction', value: 'non-fiction' },
    { id: 3, name: 'Science', value: 'science' },
    { id: 4, name: 'Technology', value: 'technology' },
    { id: 5, name: 'Biography', value: 'biography' },
    { id: 6, name: 'Self-Help', value: 'self-help' },
    { id: 7, name: 'Travel', value: 'travel' },
    { id: 8, name: 'Cooking', value: 'cooking' },
  ];

  toggleDropDown() {
    this.toggleDropdown = !this.toggleDropdown;
  }

  onSelectCategoryForSearch(category: IFakeCategory) {
    this.selectedOption = category.name;
  }
}
