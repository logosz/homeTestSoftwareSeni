const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pagesObject/LoginPage');
const { ProductPage } = require('../pagesObject/ProductPage');
const { CartPage } = require('../pagesObject/CartPage');
const { CheckoutPage } = require('../pagesObject/CheckoutPage');

test.describe('Full flow scenario from login to checkout', () => {
    let loginPage;
    let productPage;
    let cartPage;
    let checkoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();

        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
    });

    test('End to end checkout random product flow', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

        await productPage.selectRandomItem();
        await productPage.selectRandomItem();
        //await productPage.selectRandomItem();
        
        await expect(productPage.cartBadge).toHaveText('2');
        await productPage.cartButton.click();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

        await productPage.removeCartFirstItem.click();
        await expect(productPage.cartBadge).toHaveText('1');

        await cartPage.checkoutButton.click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
        await expect(checkoutPage.firstNameField).toHaveCount(1);
        await expect(checkoutPage.lastNameField).toHaveCount(1);
        await expect(checkoutPage.zipField).toHaveCount(1);

        await checkoutPage.confirmation('Mikael', 'Mancini', '12345');
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

        const totalProductPrice = await checkoutPage.getTotalPrice();
        const totalItemPrice = await checkoutPage.subTotalPriceAmount();
        const taxAmount = await checkoutPage.taxPriceAmount();
        const totalAmount = await checkoutPage.totalPriceAmount();

        expect(totalProductPrice).toEqual(totalItemPrice);
        expect(totalProductPrice).toEqual(parseFloat((totalAmount - taxAmount).toFixed(2)));

        await checkoutPage.finishButton.click();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
        await expect(checkoutPage.backHomeButton).toHaveCount(1);
        await expect(checkoutPage.thanksTextHeader).toHaveText('Thank you for your order!');
        await expect(checkoutPage.thanksTextBody).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');

        await productPage.burgermenuButton.click();
        await productPage.sidebarLogout.click();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(loginPage.loginButton).toHaveCount(1);
    })
})