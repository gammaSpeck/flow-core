import { html, fixture, expect } from "@open-wc/testing";

import "@cldcvr/flow-core";
import { FForm } from "@cldcvr/flow-core";

describe("f-form", () => {
	it("is defined", () => {
		const el = document.createElement("f-form");
		expect(el).instanceOf(FForm);
	});

	it("should render with default values", async () => {
		const el = await fixture(html` <f-form></f-form> `);
		expect(el.getAttribute("gap")).to.equal("medium");
	});
});
