class ProductPage {
    constructor(page) {
        this.page = page;
        this.burgermenuButton = page.getByRole('button', { name: 'Open Menu' });
        this.sidebarLogout = page.getByTestId('logout-sidebar-link');
        this.cartButton = page.getByTestId('shopping-cart-link');
        this.cartBadge = page.getByTestId('shopping-cart-badge');
        this.sortDropDown = page.getByTestId('product-sort-container');
        this.addCartBackPack = page.getByTestId('add-to-cart-sauce-labs-backpack');
        this.removeCartBackPack = page.getByTestId('remove-sauce-labs-backpack');
        this.addCartBikeLight = page.getByTestId('add-to-cart-sauce-labs-bike-light');
        this.removeCartBikeLight = page.getByTestId('remove-sauce-labs-bike-light');
        this.addCartBoltTShirt = page.getByTestId('add-to-cart-sauce-labs-bolt-t-shirt');
        this.removeCartBoltTShirt = page.getByTestId('remove-sauce-labs-bolt-t-shirt');
        this.addCartFleeceJacket = page.getByTestId('add-to-cart-sauce-labs-fleece-jacket');
        this.removeCartFleeceJacket = page.getByTestId('remove-sauce-labs-fleece-jacket');
        this.addCartOnesie = page.getByTestId('add-to-cart-sauce-labs-onesie');
        this.removeCartOnesie = page.getByTestId('remove-sauce-labs-onesie');
        this.addCartShirtRed = page.getByTestId('add-to-cart-test.allthethings()-t-shirt-(red)');
        this.removeCartShirtRed = page.getByTestId('remove-test.allthethings()-t-shirt-(red)');
        this.removeCartFirstItem = page.locator(':nth-match(:text("Remove"), 1)');
    }

    async selectRandomItem(){
        const indexElement = Math.floor(Math.random() * 6) + 1;
        console.log(indexElement);
        await this.page.locator(`:nth-match(:text("Add to cart"), ${indexElement})`).click()
    }
}

module.exports = { ProductPage }