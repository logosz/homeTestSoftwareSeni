const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pagesObject/LoginPage');
const { ProductPage } = require('../pagesObject/ProductPage');

test.describe('Select Items (2 items, 3 items, 4 items)', () => {
    let loginPage;
    let productPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)

        await loginPage.navigate();
        await loginPage.login('standard_user','secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })

    test('Select 2 items', async () => {
        await productPage.addCartBackPack.click()
        await productPage.addCartBikeLight.click()
        await expect(productPage.cartBadge).toHaveText('2');
    })

    test('Select 3 items', async () => {
        await productPage.addCartBackPack.click()
        await productPage.addCartBikeLight.click()
        await productPage.addCartBoltTShirt.click()
        await expect(productPage.cartBadge).toHaveText('3');
    })

    test('Select 4 items', async () => {
        await productPage.addCartBackPack.click()
        await productPage.addCartBikeLight.click()
        await productPage.addCartBoltTShirt.click()
        await productPage.addCartFleeceJacket.click()
        await expect(productPage.cartBadge).toHaveText('4');
    })

})