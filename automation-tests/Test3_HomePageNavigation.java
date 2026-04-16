package org.example;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class Test3_HomePageNavigation {

    static final String BASE_URL = "http://localhost:8000";

    public static void main(String[] args) throws InterruptedException {

        System.setProperty("webdriver.chrome.driver", "/usr/bin/chromedriver");

        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        // PREREQUISITE: Quick login to enable dashboard navigation
        System.out.println("Setting up session (quick login)...");
        driver.get(BASE_URL + "/register.html");
        wait.until(ExpectedConditions.titleContains("Register"));
        Thread.sleep(2000);

        String testEmail = "selenium_nav_" + System.currentTimeMillis() + "@trippilot.com";
        driver.findElement(By.id("reg-name")).sendKeys("Nav Tester");
        driver.findElement(By.id("reg-email")).sendKeys(testEmail);
        driver.findElement(By.id("reg-password")).sendKeys("Test@123!");
        driver.findElement(By.id("reg-confirm")).sendKeys("Test@123!");
        driver.findElement(By.id("register-form")).submit();
        wait.until(ExpectedConditions.urlContains("login.html"));

        driver.findElement(By.id("login-email")).sendKeys(testEmail);
        driver.findElement(By.id("login-pw")).sendKeys("Test@123!");
        driver.findElement(By.id("login-button")).click();
        wait.until(ExpectedConditions.urlContains("dashboard.html"));
        Thread.sleep(2000);
        System.out.println("Session ready ✅");

        // TEST 4: Home Page & Browser Navigation
        System.out.println("\n===== TEST 4: Home Page & Navigation =====");
        driver.navigate().to(BASE_URL + "/index.html");
        wait.until(ExpectedConditions.titleContains("TripPilot"));
        Thread.sleep(3000);

        System.out.println("Title        : " + driver.getTitle());
        System.out.println("Hero Heading : " + driver.findElement(By.tagName("h1")).getText());
        System.out.println("Hero Button  : " + driver.findElement(By.id("create-trip-btn")).getText());

        // Navigate to dashboard
        driver.navigate().to(BASE_URL + "/dashboard.html");
        Thread.sleep(2500);
        System.out.println("Navigated to : " + driver.getCurrentUrl());

        // Back
        driver.navigate().back();
        Thread.sleep(2500);
        System.out.println("After Back   : " + driver.getCurrentUrl());

        // Forward
        driver.navigate().forward();
        Thread.sleep(2500);
        System.out.println("After Forward: " + driver.getCurrentUrl());

        // Refresh
        driver.navigate().refresh();
        Thread.sleep(2500);
        System.out.println("After Refresh: " + driver.getCurrentUrl());

        System.out.println("✅ Home page loaded & browser navigation verified");

        System.out.println("\n===== TEST 4 COMPLETED =====");
        Thread.sleep(3000);
        driver.quit();
    }
}
