import {Page, expect, Locator} from "@playwright/test";

export class Login {
    readonly page: Page;
    readonly dontAllow: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly continueToDashboard: Locator;
    readonly otp1 : Locator;
    readonly otp2 : Locator;
    readonly otp3 : Locator;
    readonly otp4 : Locator;
    readonly otp5 : Locator;
    readonly otp6 : Locator;
    readonly showPin : Locator;
    readonly enterVerificationCode : Locator;
    readonly enterVerificationPin : Locator;
    readonly dashboard : Locator;
    readonly Xbutton : Locator;
    readonly logoutButton : Locator;


    constructor(page: Page) {
        this.page = page;
        this.dontAllow = page.locator('//button[@id="ps-pn-disallow-button"]');
        this.emailInput = page.getByPlaceholder('laura@example.com');
        this.passwordInput = page.getByPlaceholder('Password');
        this.continueToDashboard = page.locator('//span[text()="Continue to Dashboard"]')
        this.otp1 = page.locator('//input[@name="otp1"]');
        this.otp2 = page.locator('//input[@name="otp2"]');
        this.otp3 = page.locator('//input[@name="otp3"]');
        this.otp4 = page.locator('//input[@name="otp4"]');
        this.otp5 = page.locator('//input[@name="otp5"]');
        this.otp6 = page.locator('//input[@name="otp6"]');
        this.showPin = page.getByText('Show PIN');
        this.enterVerificationCode = page.getByText('Enter Verification Code');
        this.enterVerificationPin = page.getByText('Enter verification PIN');
        this.dashboard = page.locator('//span[text()="Dashboard"]');
        this.Xbutton = page.locator('//button[@aria-label="Close Tour"]');
        this.logoutButton = page.locator('//button[@aria-label="Logout"]');
    }

    async loginToDashboard(email: string, password: string) {
        if (await this.dontAllow.isVisible()) {
            await this.dontAllow.click();
        }
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.continueToDashboard.click();
    }

    async enterOTP(otp: string) {
        await expect(this.enterVerificationCode).toBeVisible();
        await this.showPin.click();
        await this.otp1.fill(otp[0]);
        await this.otp2.fill(otp[1]);
        await this.otp3.fill(otp[2]);
        await this.otp4.fill(otp[3]);
        await this.otp5.fill(otp[4]);
        await this.otp6.fill(otp[5]);
    }

    async enterPIN(pin: string) {
        await expect(this.enterVerificationPin).toBeVisible();
        await this.showPin.click();
        await this.otp1.fill(pin[0]);
        await this.otp2.fill(pin[1]);
        await this.otp3.fill(pin[2]);
        await this.otp4.fill(pin[3]);
    }

    async clickLogoutAndVerify() {
        await this.logoutButton.click();
        await expect(this.emailInput).toBeVisible();
    }


}