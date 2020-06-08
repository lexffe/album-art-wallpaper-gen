import { Component, ComponentInterface, h, Prop } from '@stencil/core';
import { Resolutions, Resolution } from '../../helpers/Resolutions';
import { process } from '../../helpers/processImage';
import { toastController } from '@ionic/core';

@Component({
  tag: 'search-result',
  styleUrl: 'search-result.scss',
  shadow: true
})
export class SearchResult implements ComponentInterface {

  @Prop() thumbnailURL: string;
  @Prop() albumName: string;
  @Prop() artistName: string;

  get maxResURL() {
    const maxResURL = new URL(this.thumbnailURL);
    const path = maxResURL.pathname.split("/");
    path.pop();
    path.push("99999x99999.png");
    maxResURL.pathname = path.join("/");
    return maxResURL.toString();
  }

  private async fetchBlob(url: string) {

    let src: Response;

    try {
      src = await fetch(url);
    } catch(e) {
      throw e
    }

    return await src.blob();
  }

  private async createImage(blob: Blob): Promise<HTMLImageElement> {
    const image = new Image();
    image.src = URL.createObjectURL(blob);
  
    return new Promise((resolve, reject) => {
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("Image could not be loaded."));
    });
  }

  async getWallpaper(e: MouseEvent, r: Resolution) {
    e.preventDefault();

    // loading...

    const toast = await toastController.create({
      message: "Creating...",
      duration: 0,
    });

    toast.present();

    const imageBlob = await this.fetchBlob(this.maxResURL);
    const image = await this.createImage(imageBlob);

    const objBlob = await process(image, r.w, r.h, 12, 100, 64);

    const UA = window.navigator.platform;

    if (UA === "iPhone" || UA === "iPod" || UA === "iPad") {

      const buf = await objBlob.arrayBuffer();
      const imageNode = new Image();
      imageNode.src = `data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(buf)))}`;

      image.onload = () => document.body.appendChild(imageNode);

      return 
    }

    const blobURL = URL.createObjectURL(objBlob);
    // window.webkitURL

    const link = document.createElement("a");
    link.download = `${this.albumName}-${r.w}x${r.h}.png`;
    link.href = blobURL;
    link.click();

    toast.dismiss();

    URL.revokeObjectURL(link.href);
  }

  render() {
    return (
      <section class="album">
        <a href={this.maxResURL}>
          <img src={this.thumbnailURL}></img>
        </a>
        <div class="details">
          <h2>{this.albumName}</h2>
          <p>by {this.artistName}</p>
          <div class="resolutions">
            {
              Resolutions.map((r, i) =>
                <button onClick={(e) => this.getWallpaper(e, r)} class={i === 0 ? "resolution rstart" : "resolution"}>{r.ratio}</button>
              )
            }
          </div>
        </div>
      </section>
    );
  }

}
