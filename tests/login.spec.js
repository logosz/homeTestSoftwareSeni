const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pagesObject/LoginPage');

test.describe('login test', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    [
        {title:'Login with valid credentials', username:'standard_user', password:'secret_sauce'},
        {title:'Login with performance glitch user', username:'performance_glitch_user', password:'secret_sauce'},
        {title:'Login with problem user', username:'problem_user', password:'secret_sauce'}
    ].forEach(({title, username, password}) => {
        test(title, async ({ page }) => {
            await loginPage.login(username,password);
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        });
    });

    test('Failed Login with Invalid Username', async ({ page }) => {
        await loginPage.login('invalid_user', 'secret_sauce');
        expect(await loginPage.getErrorMessage()).toContain('Username and password do not match');
    });

})