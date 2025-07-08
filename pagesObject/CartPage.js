class CartPage {
    constructor(page) {
        this.page = page;
        this.checkoutButton = page.getByTestId('checkout');
        this.continueShoppingButton = page.getByTestId('continue-shopping');
        this.emptyCart = page.locator('.removed_cart_item');
        this.productInCart = page.getByTestId('inventory-item');
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
    }
}

module.exports = { CartPage }