import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import eleStyle from "./f-text.scss";

/**
 * @summary Text component includes Headings, titles, body texts and links.
 */
@customElement("f-text")
export class FText extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle)];

  /**
   * @attribute Variants of text component are use cases such as Heading, paragraph, and code.
   */
  @property({ type: String, reflect: true })
  variant?: "heading" | "para" | "code" = "para";

  /**
   * @attribute Each variant has various sizes. By default medium is the default size.
   */
  @property({ type: String, reflect: true })
  size?: "x-large" | "large" | "medium" | "small" | "x-small" = "medium";

  /**
   * @attribute Weight property defines the visual weight of the text such as regular, medium and bold.
   */
  @property({ type: String, reflect: true })
  weight?: "bold" | "medium" | "regular";

  /**
   * @attribute States on texts are used to communicate purpose and it’s connotation. For example, a red color connotes danger, whereas a green color connotes success and so on.
   */
  @property({ type: String, reflect: true })
  state?:
    | "default"
    | "secondary"
    | "subtle"
    | "primary"
    | "success"
    | "danger"
    | "warning"
    | "inherit" = "default";

  /**
   * @attribute Sets the alignment of the text. Can take 3 values: left, center, and right.
   */
  @property({ type: String, reflect: true })
  align?: "left" | "center" | "right" = "left";

  /**
   * @attribute Loader icon replaces the content of the button .
   */
  @property({ reflect: true, type: Boolean })
  loading?: boolean = false;

  /**
   * @attribute The disabled attribute can be set to keep a user from clicking on the button.
   */
  @property({ reflect: true, type: Boolean })
  disabled?: boolean = false;

  /**
   * @attribute will ellipsis apply on overflow
   */
  @property({ reflect: true, type: Boolean })
  ellipsis?: boolean = false;

  /**
   * @attribute will copy the content inside f-text
   */
  @property({ reflect: true, type: Boolean })
  copyOnClick?: boolean = false;

  copyToClipboard() {
    if (this.copyOnClick) {
      navigator.clipboard.writeText(this.textContent ?? "");
      const oldContent = this.innerHTML;
      const oldColor = this.style.color;
      this.textContent = "Copied";
      if (this.textContent === "Copied") {
        this.style.color = "#66cc69";
      }
      setTimeout(() => {
        this.innerHTML = oldContent;
        this.style.color = oldColor;
      }, 500);
    }
  }

  render() {
    /**
     * set default weight according to variant
     */
    if (!this.weight) {
      if (this.variant === "heading") {
        this.weight = "bold";
      } else {
        this.weight = "regular";
      }
    }

    this.onclick = this.copyToClipboard;

    /**
     * Final html to render
     */
    return html`<slot></slot>`;
  }
}

/**
 * Required for typescript
 */
declare global {
  interface HTMLElementTagNameMap {
    "f-text": FText;
  }
}
