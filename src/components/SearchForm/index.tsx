import React, { ChangeEvent, Component } from 'react';

type State = {
  category: string,
  genre: string,
  query: string
};

export type Props = {
  search: (category: string, genre: string, query: string) => void
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

    // tslint:disable-next-line: max-line-length
    // @see: https://stackoverflow.com/questions/53039935/typescript-reactjs-how-to-dynamically-set-state/53040447#53040447
    this.setState({
      [name]: value
    } as Pick<State, keyof State>);
  }

  doSearch = () => {
    this.props.search(this.state.category, this.state.genre, this.state.query);
  }

  render() {
    return (
      <div>
        {Object.entries(this.state).map(kvp => (
          <div key={kvp[0]}>{`${kvp.toLocaleString()}`}</div>
        ))}

        <input
          name="category"
          type="text"
          value={this.state.category}
          onChange={this.handleSearchChange}
        />

        <input
          name="genre"
          type="text"
          value={this.state.genre}
          onChange={this.handleSearchChange}
        />

        <input
          name="query"
          type="text"
          value={this.state.query}
          onChange={this.handleSearchChange}
        />

        <button onClick={this.doSearch}>Search</button>
      </div>
    );
  }
}

export default SearchForm;
