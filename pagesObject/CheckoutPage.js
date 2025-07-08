class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstNameField = page.getByTestId('firstName');
        this.lastNameField = page.getByTestId('lastName');
        this.zipField = page.getByTestId('postalCode');
        this.cancelButton = page.getByTestId('cancel');
        this.continueButton = page.getByTestId('continue');
        this.errorMessage = page.getByTestId('error');
        this.productPrice = page.getByTestId('inventory-item-price');
        this.subTotalPrice = page.getByTestId('subtotal-label');
        this.tax = page.getByTestId('tax-label');
        this.totalPrice = page.getByTestId('total-label');
        this.finishButton = page.getByTestId('finish');
        this.backHomeButton = page.getByTestId('back-to-products');
        this.thanksTextHeader = page.getByTestId('complete-header');
        this.thanksTextBody = page.getByTestId('complete-text');
    }

    async confirmation(first, last, zip) {
        await this.firstNameField.fill(first);
        await this.lastNameField.fill(last);
        await this.zipField.fill(zip);
        await this.continueButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    async subTotalPriceAmount(){
        const subTotalText = await this.subTotalPrice.textContent();
        const subTotal = parseFloat(subTotalText.replace('Item total: $',''));

        return subTotal;
    }

    async taxPriceAmount(){
        const taxText = await this.tax.textContent();
        const taxAmount = parseFloat(taxText.replace('Tax: $',''));

        return taxAmount;
    }

    async totalPriceAmount(){
        const totalText = await this.totalPrice.textContent();
        const totalAmount = parseFloat(totalText.replace('Total: $',''));

        return totalAmount;
    }

    async getTotalPrice(){
        const prices = [];
        const count = await this.productPrice.count();

        for (let i = 0; i < count; i++) {
            const priceText = await this.productPrice.nth(i).textContent();
            prices.push(parseFloat(priceText.replace('$','')));
        }

        const totalPrice = prices.reduce((total, current) => {
            return total + current;
        }, 0);

        return totalPrice;
    }

}

module.exports = { CheckoutPage }