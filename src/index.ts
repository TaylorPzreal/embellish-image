import { Option } from './model';

export class EmbellishImage {
  constructor(private e: Element | '', private option?: Option) {
    // do config
  }

  // init upload container
  public init() {
    // do
  }

  public uploadLocal() {
    // do
  }

  private initDom() {
    this.e = typeof this.e === 'object' ? this.e : document.querySelector(this.e);

    this.e.innerHTML = `
      <section>
        <header>
          <h3>Title</h3>
          <button>Select an image</button>
          <input type="file" name="uploadLocal">
        </header>

        <div>
          <div>
            <canvas id="embellish-image"></canvas>
            <div class="edit-container">

            </div>
          </div>

          <!--preview-->
          <div>

          </div>
        </div>

        <footer>
          <button type="button">Save</button>
          <button type="button">Cancel</button>
        </footer>
      </section>
    `;


  }
}
