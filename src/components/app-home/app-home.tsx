import { Component, h, State, Listen, ComponentInterface } from '@stencil/core';
import { Result } from '../../helpers/IResult';
import fetchJsonp from "fetch-jsonp";
import { toastController } from '@ionic/core';

const endpoint = "https://itunes.apple.com/search?media=music&entity=album&limit=10";

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome implements ComponentInterface {

  @State() albumName: string;
  @State() results: Result[];

  @Listen('flowUp')
  async submitHandler(e: CustomEvent<string>) {
    this.albumName = e.detail;

    try {
      await this.search(this.albumName)
    } catch (err) {

      const toast = await toastController.create({
        message: (err as Error).message,
        duration: 10000,
        buttons: [
          {
            text: 'Close',
            role: 'cancel'
          }
        ]
      });
      toast.present();
    }
  }

  async search(albumName: string) {
    const url = new URL(endpoint);
    url.searchParams.append("term", albumName)

    let res: fetchJsonp.Response | Response;
    
    const UA = window.navigator.platform;

    if (UA === "iPhone" || UA === "iPod" || UA === "iPad") {
      try {
        res = await fetch(url.toString(), { credentials: "include" })
      } catch (e) {
        throw e;
      }
    } else {
      try {
        res = await fetchJsonp(url.toString(), { jsonpCallback: 'callback' });
      } catch (e) {
        throw e;
      }
    }

    if (!res.ok) {
      throw new Error("cannot fetch iTunes Store result.");
    }

    const { results } = await res.json() as { resultCount: number, results: Result[] };

    this.results = results;
  }

  render() {
    return (
      <ion-content>
        <main>
          <header>
            <h1>Album Art Wallpaper Generator</h1>
            <p>This application looks for album arts in the iTunes Store,
            then creates a wallpaper with the album art.</p>
            <p>Note: This application may not work in iOS due to
              Safari modifying the iTunes Store request url to Apple Music scheme actively.</p>
          </header>
          <section><search-box></search-box></section>
          <section>
            <search-results resultsArray={this.results ?? []}></search-results>
          </section>
        </main>
      </ion-content>
    );
  }

}
