import {Page, expect, Locator} from "@playwright/test";

export class GiftCard {
    readonly page: Page;
    readonly giftCardbutton: Locator;
    readonly Xbutton: Locator;
    readonly buyGiftCard: Locator;
    readonly sellGiftCard: Locator;
    readonly giftCardText: Locator;
    readonly buyGiftCardText: Locator;
    readonly buyGiftCardButton: Locator;
    readonly searchGiftCardInput: Locator;
    readonly buyButtonDescription: Locator;
    readonly sellButtonDescription: Locator;
    readonly backToDashboard: Locator;
    readonly backToBuyGiftCard: Locator;
    readonly XbuttonBuyGiftCard: Locator;

    constructor(page: Page) {
        this.page = page;
        this.giftCardbutton = page.locator('//span[text()="GiftCards"]');
        this.Xbutton = page.locator('//button[@class="p-2 hover:bg-gray-100 rounded-full transition-colors"]');
        this.buyGiftCard = page.locator('//h3[text()="Buy Gift Cards"]');
        this.sellGiftCard = page.locator('//h3[text()="Sell Gift Cards"]');
        this.giftCardText = page.locator('//h1[text()="GiftCard"]');
        this.buyGiftCardText = page.locator('//p[text()="Buy Giftcard"]');
        this.buyGiftCardButton = page.locator('//span[text()="Buy Gift Card"]');
        this.searchGiftCardInput = page.getByPlaceholder('Search Giftcard countries');
        this.buyButtonDescription = page.locator('//p[text()="Browse and purchase gift cards instantly."]');
        this.sellButtonDescription = page.locator(`//p[text()="You'll be redirected to WhatsApp to complete this."]`);
        this.backToDashboard = page.locator("//body/div/div/main/div/div/div/div/div[1]/div[1]/div[1]//*[name()='svg']");
        this.backToBuyGiftCard = page.locator('//button[@aria-label="Go back"]');
        this.XbuttonBuyGiftCard = page.locator('//button[@aria-label="Close"]');
    }

    async openGiftCardModal() {
        await expect(this.giftCardbutton).toBeVisible();
        await this.giftCardbutton.click();
    }

    async closeModal() {
        await this.Xbutton.click();
    }

    async clickBuyAndVerify() {
        await expect(this.buyGiftCard).toBeVisible();
        await this.buyGiftCard.click();
        await expect(this.buyGiftCardText).toBeVisible();
    }

    async clickSell() {
        await expect(this.sellGiftCard).toBeVisible();
        await this.sellGiftCard.click();
    }

    async clickAndVerifyBuyGiftCard() {
        await this.buyGiftCardButton.click();
        await expect(this.searchGiftCardInput).toBeVisible();
    }

    // Assertions (optional but useful)
    async verifyModalVisible() {
        await expect(this.giftCardText).toBeVisible();
    }

    async verifyBuyOptionsVisible() {
        await expect(this.buyButtonDescription).toHaveText("Browse and purchase gift cards instantly.");     
    }

    async verifySellOptionsVisible() {
        await expect(this.sellButtonDescription).toHaveText("You'll be redirected to WhatsApp to complete this.");
    }


}
