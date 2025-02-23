import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property, query } from "lit/decorators.js";
import eleStyle from "./f-progress-bar.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv } from "../f-div/f-div";
import getCustomFillColor from "../../utils/get-custom-fill-color";
import { validateHTMLColor } from "validate-color";
import { validateHTMLColorName } from "validate-color";
import { flowElement } from "../../utils";

export type FProgressBarState =
	| "primary"
	| "default"
	| "success"
	| "warning"
	| "danger"
	| `custom, ${string}`;

export type FProgressBarWidthProp = "fill-container" | `${number}px`;

export type FProgressBarValueProp = `${number}%`;

@flowElement("f-progress-bar")
export class FProgressBar extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), ...FDiv.styles];

	/**
	 * @attribute value of the fill section in progress-bar
	 */
	@property({ type: String, reflect: true })
	value?: FProgressBarValueProp;

	/**
	 * @attribute Variants are visual representations of progress bar. A progress bar can be round or block.

	 */
	@property({ type: String, reflect: true })
	variant?: "block" | "curved" = "block";

	/**
	 * @attribute The medium size is the default and recommended option.
	 */
	@property({ type: String, reflect: true })
	size?: "large" | "medium" | "small" | "x-small" = "medium";

	/**
	 * @attribute States are used to communicate purpose and it’s connotation. For example, a red color connotes danger, whereas a green color connotes success and so on.
	 */
	@property({ reflect: true, type: String })
	state?: FProgressBarState = "default";

	/**
	 * @attribute By default progress bar takes full width of the parent container. User can change it using width property.
	 */
	@property({ reflect: true, type: String })
	width?: FProgressBarWidthProp = "fill-container";

	/**
	 * progress-bar fill query selector
	 */
	@query(".f-progress-bar-fill")
	fProgressBarFill?: FDiv;

	/**
	 * compyr height of the progress-bar
	 */
	get computedHeight() {
		if (this.size === "large") {
			return "16px";
		} else if (this.size === "medium") {
			return "12px";
		} else if (this.size === "small") {
			return "8px";
		} else {
			return "4px";
		}
	}

	/**
	 * compute width of fill in the track
	 */
	get computedWidth() {
		if (this.width === "fill-container") {
			return "100%";
		} else {
			return this.width;
		}
	}

	/**
	 * validation for all atrributes
	 */
	validateProperties() {
		if (
			this.state?.includes("custom") &&
			this.fill &&
			!validateHTMLColor(this.fill) &&
			!validateHTMLColorName(this.fill)
		) {
			throw new Error("f-progress-bar : enter correct color-name or color-code");
		}
	}

	fill = "";

	render() {
		/**
		 * creating local fill variable out of state prop.
		 */
		this.fill = getCustomFillColor(this.state ?? "");

		/**
		 * validate
		 */
		this.validateProperties();

		return html`
			<f-div
				class="f-progress-bar"
				.width=${this.computedWidth}
				height=${this.computedHeight}
				data-variant=${this.variant}
			>
				<f-div .width=${this.value} data-state=${this.state} class="f-progress-bar-fill"></f-div>
				<f-div width="fill-container"></f-div>
			</f-div>
		`;
	}
	protected async updated(
		changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
	): Promise<void> {
		super.updated(changedProperties);
		if (this.fill && this.state?.includes("custom") && this.fProgressBarFill) {
			this.fProgressBarFill.style.background = this.fill;
		}
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-progress-bar": FProgressBar;
	}
}
