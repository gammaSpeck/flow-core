import { html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FText } from "../f-text/f-text";
import eleStyle from "./f-form.scss";
import { FDiv } from "../f-div/f-div";
import { flowElement } from "./../../utils";

// import { ref, createRef } from "lit/directives/ref.js";

/**
 * @summary Text component includes Headings, titles, body texts and links.
 */
@flowElement("f-form")
export class FForm extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), ...FText.styles, ...FDiv.styles];

	/**
	 * @attribute Gap is used to define the gap between the elements
	 */
	@property({ reflect: true, type: String })
	gap?: "large" | "medium" | "small" | "x-small" = "medium";

	/**
	 * @attribute group separator
	 */
	@property({ reflect: true, type: Boolean })
	separator?: boolean = false;

	render() {
		/**
		 * Final html to render
		 */
		return html`
			<form gap=${this.gap}>
				<slot></slot>
			</form>
		`;
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-form": FForm;
	}
}
