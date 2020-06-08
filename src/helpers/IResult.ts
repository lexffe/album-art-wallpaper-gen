type URLString = string;

export interface Result {
  amgArtistId: number;
  artistId: number;
  artistName: string;
  artistViewUrl: URLString;
  artworkUrl100: URLString;
  artworkUrl60: URLString;
  collectionCensoredName: string;
  collectionExplicitness: "notExplicit" | "explicit";
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  collectionType: "Album";
  collectionViewUrl: URLString;
  contentAdvisoryRating?: string;
  copyright: string;
  country: string,
  currency: string,
  primaryGenreName: string;
  releaseDate: string; // iso
  trackCount: number,
  wrapperType: "collection"
}
