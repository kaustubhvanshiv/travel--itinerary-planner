package org.example;

import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class Test1_WindowManagement {

    static final String BASE_URL = "http://localhost:8000";

    public static void main(String[] args) throws InterruptedException {

        System.setProperty("webdriver.chrome.driver", "/usr/bin/chromedriver");

        WebDriver driver = new ChromeDriver();

        // TEST 1: Window Management
        System.out.println("\n===== TEST 1: Window Management =====");
        driver.navigate().to(BASE_URL + "/index.html");
        Thread.sleep(3000);

        // Maximize
        driver.manage().window().maximize();
        Thread.sleep(3000);
        Dimension maxSize = driver.manage().window().getSize();
        System.out.println("Maximized  -> Width: " + maxSize.getWidth() + " | Height: " + maxSize.getHeight());

        // Minimize
        driver.manage().window().minimize();
        Thread.sleep(3000);
        System.out.println("Window minimized");

        // Restore after minimize
        driver.manage().window().maximize();
        Thread.sleep(2000);
        System.out.println("Window restored after minimize");

        // Fullscreen
        driver.manage().window().fullscreen();
        Thread.sleep(3000);
        Dimension fullSize = driver.manage().window().getSize();
        System.out.println("Fullscreen -> Width: " + fullSize.getWidth() + " | Height: " + fullSize.getHeight());

        // Custom size
        driver.manage().window().setSize(new Dimension(1280, 720));
        Thread.sleep(3000);
        Dimension customSize = driver.manage().window().getSize();
        System.out.println("Custom     -> Width: " + customSize.getWidth() + " | Height: " + customSize.getHeight());

        System.out.println("\n===== TEST 1 COMPLETED =====");
        Thread.sleep(3000);
        driver.quit();
    }
}
