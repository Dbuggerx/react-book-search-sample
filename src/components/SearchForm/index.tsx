import React, { ChangeEvent, Component } from 'react';

type State = {
  category: string;
  genre: string;
  query: string;
};

export type Props = {
  search: (category: string, genre: string, query: string) => void;
  category?: string;
  genre?: string;
  query?: string;
};

class SearchForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      category: '',
      genre: '',
      query: ''
    };
  }

  handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value, name } = target;

    // @see: https://stackoverflow.com/questions/53039935/typescript-reactjs-how-to-dynamically-set-state/53040447#53040447
    this.setState({
      [name]: value
    } as Pick<State, keyof State>);
  };

  doSearch = () => {
    this.props.search(this.state.category, this.state.genre, this.state.query);
  };

  render() {
    return (
      <div>
        <ul>
          <li>Category: {this.props.category}</li>
          <li>Genre: {this.props.genre}</li>
          <li>Query: {this.props.query}</li>
        </ul>

        <input
          name="category"
          type="text"
          value={this.state.category}
          onChange={this.handleSearchChange}
          data-testid="categ-input"
        />

        <input
          name="genre"
          type="text"
          value={this.state.genre}
          onChange={this.handleSearchChange}
          data-testid="genre-input"
        />

        <input
          name="query"
          type="text"
          value={this.state.query}
          onChange={this.handleSearchChange}
          data-testid="query-input"
        />

        <button onClick={this.doSearch} data-testid="search-button">
          Search
        </button>
      </div>
    );
  }
}

export default SearchForm;
