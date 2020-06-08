import { Component, ComponentInterface, h, Prop } from '@stencil/core';
import { Result } from '../../helpers/IResult';

@Component({
  tag: 'search-results',
  styleUrl: 'search-results.css',
})
export class SearchResults implements ComponentInterface {

  @Prop() resultsArray: Result[];

  render() {
    if (this.resultsArray.length !== 0) {
      return this.resultsArray.map((r) => 
        <search-result
          thumbnailURL={r.artworkUrl100}
          albumName={r.collectionName}
          artistName={r.artistName} 
        />
      );
    }
  }
}
