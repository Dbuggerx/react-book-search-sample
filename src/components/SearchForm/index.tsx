import React, { useCallback, useState, ChangeEvent, FormEvent } from 'react';
import Dropdown from '../Dropdown';
import { SearchParam } from '../../redux/searchParams/types';
import searchIcon from 'material-design-icons/action/svg/production/ic_search_24px.svg';

import './SearchForm.scss';

export type Props = {
  search: (category: string, genre: string, query: string) => void;
  selectedCategory?: string;
  selectedGenre?: string;
  selectedQuery?: string;
  availableCategories?: SearchParam[];
  availableGenres?: SearchParam[];
};

const SearchForm = (props: Props) => {
  const [category, setCategory] = useState('');
  const [genre, setGenre] = useState('');
  const [query, setQuery] = useState('');

  const handleQueryChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  const handleCategorySelected = useCallback((selectedCategory?: SearchParam) => {
    setCategory(selectedCategory ? selectedCategory.label : '');
  }, []);

  const handleGenreSelected = useCallback((selectedGenre?: SearchParam) => {
    setGenre(selectedGenre ? selectedGenre.label : '');
  }, []);

  const doSearch = (event: FormEvent<EventTarget>) => {
    event.preventDefault();
    props.search(category, genre, query);
  };

  const renderDropdownItem = useCallback((item: SearchParam) => ({ id: item.id, el: item.label }), []);

  return (
    <div className="search-form">
      {(props.selectedCategory || props.selectedGenre || props.selectedQuery) && (
        <div>
          <div className="search-form__selected-vals-container">
            {props.selectedCategory && (
              <div className="search-form__field">
                <span className="search-form__selected-name">Category:</span>
                <span className="search-form__field" data-testid="current-category">
                  {props.selectedCategory}
                </span>
              </div>
            )}

            {props.selectedGenre && (
              <div className="search-form__field">
                <span className="search-form__selected-name">Genre:</span>
                <span className="search-form__field" data-testid="current-genre">
                  {props.selectedGenre}
                </span>
              </div>
            )}

            {props.selectedQuery && (
              <div className="search-form__field">
                <span className="search-form__selected-name">Query:</span>
                <span className="search-form__field" data-testid="current-query">
                  {props.selectedQuery}
                </span>
              </div>
            )}
          </div>
          <hr />
        </div>
      )}

      <form className="search-form__fields-container" onSubmit={doSearch}>
        <div className="search-form__field" data-testid="category-dropdown">
          <Dropdown<SearchParam>
            items={props.availableCategories || []}
            renderItem={renderDropdownItem}
            onSelect={handleCategorySelected}
            placeholder="Category"
          />
        </div>
        <div className="search-form__field" data-testid="genre-dropdown">
          <Dropdown<SearchParam>
            items={props.availableGenres || []}
            renderItem={renderDropdownItem}
            onSelect={handleGenreSelected}
            placeholder="Genre"
          />
        </div>
        <input
          className="search-form__field search-form__field--input"
          name="query"
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleQueryChange}
          data-testid="query-input"
        />
        <button type="submit" className="search-form__button" data-testid="search-button">
          <svg
            className="dropdown__icon dropdown__icon--arrow"
            viewBox={searchIcon.viewBox}
          >
            <use xlinkHref={`#${searchIcon.id}`} />
          </svg>
        </button>
      </form>
    </div>
  );
};

SearchForm.displayName = 'SearchForm';

export default React.memo(SearchForm);
