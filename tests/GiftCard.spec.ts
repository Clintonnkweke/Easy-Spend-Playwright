import { test, expect } from '@playwright/test';
import { Login } from '../pages/Login';
import Mailosaur from 'mailosaur';
import { GiftCard } from '../pages/Gift_Card';

const apiKey = 'fplGAyuKtDNq9kL2gxIudm2oCeIskPQj';
const mailosaur = new Mailosaur(apiKey);
const serverId = 'ydfjq68b';
const testEmail = `anything@${serverId}.mailosaur.net`;

test.describe('Gift Card Screen Tests', () => {
    test('User can login and access gift card features', async ({ page, context }) => {
        const login = new Login(page);
        const giftCard = new GiftCard(page);

        test.setTimeout(120000);
        await page.goto('https://demo.easyspend.cc');
        await expect(page).toHaveTitle('EasySpend | Live Smart, Spend Easy');

        // Login to the dashboard
        await login.loginToDashboard(testEmail, 'Test12345');
        await expect(page).toHaveURL(/otp/);

        // Fetch the OTP from Mailosaur
        const message = await mailosaur.messages.get(serverId, {sentTo: testEmail, subject: 'OTP From Easyspend'}, {timeout: 50000});
        const otp = message.html?.codes?.[0]?.value;

        // Enter OTP and PIN
        await login.enterOTP(otp!);
        await login.enterPIN('1234');

        // Verify successful login
        await expect(login.dashboard).toBeVisible();
        await expect(page).toHaveURL(/dashboard/);
        if (await login.Xbutton.isVisible()) {
            await login.Xbutton.click();
        }

        // Open and verify Gift Card modal
        await giftCard.openGiftCardModal();
        await giftCard.verifyModalVisible();

        // Close modal and verify it's closed
        await giftCard.closeModal();
        await expect(giftCard.giftCardText).not.toBeVisible();
        await expect(page).toHaveURL(/dashboard/);

        // Goto Buy Gift Cards
        await giftCard.openGiftCardModal();
        await giftCard.verifyBuyOptionsVisible();
        await giftCard.clickBuyAndVerify();
        await expect(page).toHaveURL(/giftcard/);

        // Click Buy Gift Card and verify search input is visible
        await giftCard.clickAndVerifyBuyGiftCard();

        // Close Buy Gift Card with X button and verify it's closed
        await giftCard.XbuttonBuyGiftCard.click();
        await expect(giftCard.buyGiftCardText).toBeVisible();
        await expect(giftCard.searchGiftCardInput).not.toBeVisible();

        // Reopen Buy Gift Card and click Back to Buy Gift Cards, then verify we're back on the dashboard
        // await giftCard.clickAndVerifyBuyGiftCard();
        // await giftCard.backToBuyGiftCard.click();
        // await expect(giftCard.buyGiftCardText).toBeVisible();
        // await expect(giftCard.searchGiftCardInput).not.toBeVisible();

        // Go back to dashboard and verify URL
        await giftCard.backToDashboard.click();
        await expect(page).toHaveURL(/dashboard/);

        // Goto Sell Gift Cards
        await giftCard.openGiftCardModal();
        await giftCard.verifyModalVisible();
        await giftCard.verifySellOptionsVisible();      
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            giftCard.clickSell()
        ]);
        await newPage.waitForLoadState('domcontentloaded');

        // ✅ Correct assertion
        await expect(newPage.url()).toContain('whatsapp');


    });

    
});