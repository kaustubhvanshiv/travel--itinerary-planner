package org.example;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class Test4_CreateTrip {

    static final String BASE_URL = "http://localhost:8000";

    public static void main(String[] args) throws InterruptedException {

        System.setProperty("webdriver.chrome.driver", "/usr/bin/chromedriver");

        WebDriver driver = new ChromeDriver();
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        JavascriptExecutor js = (JavascriptExecutor) driver;

        // PREREQUISITE: Register & Login to get a valid session
        System.out.println("Setting up session (register + login)...");
        driver.get(BASE_URL + "/register.html");
        wait.until(ExpectedConditions.titleContains("Register"));
        Thread.sleep(2000);

        String testEmail = "selenium_trip_" + System.currentTimeMillis() + "@trippilot.com";
        driver.findElement(By.id("reg-name")).sendKeys("Trip Tester");
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

        // TEST 5: Create Trip
        System.out.println("\n===== TEST 5: Create Trip =====");
        driver.navigate().to(BASE_URL + "/create-trip.html");
        wait.until(ExpectedConditions.presenceOfElementLocated(By.id("create-trip-form")));
        Thread.sleep(3000);

        System.out.println("Title       : " + driver.getTitle());
        System.out.println("Current URL : " + driver.getCurrentUrl());

        // Fill all required fields
        driver.findElement(By.id("trip-name")).sendKeys("Summer Vacation in Tokyo");
        Thread.sleep(1000);
        driver.findElement(By.id("trip-destination")).sendKeys("Tokyo, Japan");
        Thread.sleep(1000);

        // Set dates using native date inputs
        js.executeScript("document.getElementById('trip-start').value = '2026-07-10'");
        Thread.sleep(1000);
        js.executeScript("document.getElementById('trip-end').value = '2026-07-20'");
        Thread.sleep(1000);

        driver.findElement(By.id("trip-budget")).sendKeys("4500");
        Thread.sleep(1000);
        driver.findElement(By.id("trip-travelers")).sendKeys("2");
        Thread.sleep(1000);
        new Select(driver.findElement(By.id("trip-style"))).selectByValue("adventure");
        Thread.sleep(1000);

        System.out.println("Trip Name   : " + driver.findElement(By.id("trip-name")).getAttribute("value"));
        System.out.println("Destination : " + driver.findElement(By.id("trip-destination")).getAttribute("value"));
        System.out.println("Start Date  : " + driver.findElement(By.id("trip-start")).getAttribute("value"));
        System.out.println("End Date    : " + driver.findElement(By.id("trip-end")).getAttribute("value"));
        System.out.println("Budget      : " + driver.findElement(By.id("trip-budget")).getAttribute("value"));
        System.out.println("Travelers   : " + driver.findElement(By.id("trip-travelers")).getAttribute("value"));
        System.out.println("Travel Style: " + new Select(driver.findElement(By.id("trip-style"))).getFirstSelectedOption().getText());

        // Submit the form
        driver.findElement(By.id("generate-itinerary")).click();
        System.out.println("Waiting for simulated AI generator overlay...");

        // Wait for redirect to itinerary.html
        wait.until(ExpectedConditions.urlContains("itinerary.html"));
        Thread.sleep(3000);
        System.out.println("After Submit URL: " + driver.getCurrentUrl());
        System.out.println("✅ Trip submitted and itinerary generated");

        System.out.println("\n===== TEST 5 COMPLETED =====");
        Thread.sleep(3000);
        driver.quit();
    }
}
