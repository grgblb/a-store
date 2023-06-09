import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import {ShowcaseItem} from "./index";

const product = {id: 1, preview: "preview", title: "one", description: "", price: 1000, availability: true, images: []};
const productWithSubtitle = {
    id: 1, preview: "preview", title: "one", description: "", subtitle: "test", price: 1000, availability: false,
    images: []
};

const element = (
    <MemoryRouter>
        <ShowcaseItem product={product}/>
    </MemoryRouter>
)

describe("Showcase Item", () => {
    it("should contain link with product id", () => {
        render(element);

        const actual = screen.getByRole("link");

        expect(actual).toBeInTheDocument();
        expect(actual).toHaveAttribute("href", `/product/${product.id}`);
    });

    it ("should contain products image with alt text", () => {
        render(element);

        const actual = screen.getByRole("img");

        expect(actual).toBeInTheDocument();
        expect(actual).toHaveAttribute("alt", product.title);
    })

    it ("should contain title with tag 'h2'", () => {
        render(element);

        const actual = screen.getByText(product.title);

        expect(actual).toBeInTheDocument();
        expect(actual.tagName).toBe("H2");
    })

    it ("should contain text with formatted product price", () => {
        render(element);

        expect(screen.getByText("1 000")).toBeInTheDocument();
    })

    it ("should contain subtitle text if present in product", () => {
        render(<MemoryRouter>
            <ShowcaseItem product={productWithSubtitle}/>
        </MemoryRouter>);

        const actual = screen.getByText(productWithSubtitle.subtitle);

        expect(actual).toBeInTheDocument();
        expect(actual.tagName).toBe("SPAN");
    })
});
