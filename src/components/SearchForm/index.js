// @flow

import React, { Component } from 'react';

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

  handleSearchChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const { target } = event;
    const { value, name } = target;

    this.setState({
      [name]: value
    });
  };

  doSearch = () => {
    this.props.search(this.state.category, this.state.genre, this.state.query);
  };

  render() {
    return (
      <div>
        {Object.entries(this.state).map((kvp: [string, mixed]) => (
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
