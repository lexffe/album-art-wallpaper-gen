import { Component, h, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: "search-box",
  styleUrl: "search-box.scss",
})
export class SearchBoxComponent {

  @State() albumName: string;
  @Event() flowUp: EventEmitter<string>;

  async handleChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.albumName = target.value
  }

  async handleSubmit(e: Event) {
    e.preventDefault();
    this.flowUp.emit(this.albumName);
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <div class="flex">
          <input
            id="input"
            type="text"
            placeholder="Search album here."
            value={this.albumName}
            onInput={(e) => this.handleChange(e)}
            />
          <button class="submit" type="submit">Search</button>
        </div>
      </form>
    )
  }

}
