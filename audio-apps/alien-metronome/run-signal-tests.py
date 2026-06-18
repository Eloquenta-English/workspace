from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import os, sys, time, json, re

BRAVE = r"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe"
URL = "http://127.0.0.1:8767/signal-tester.html"
DRV = r"C:\Users\irieb\Documents\William's Projects\web-apps\Guitar-apps\Alien-Metronome\Alien Metronome\chromedriver.exe"

options = webdriver.ChromeOptions()
options.binary_location = BRAVE
options.add_argument("--headless=new")
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
options.add_argument("--autoplay-policy=no-user-gesture-required")

# Use the downloaded chromedriver matching Brave 149
service = Service(DRV)
driver = webdriver.Chrome(service=service, options=options)

try:
    driver.get(URL)
    wait = WebDriverWait(driver, 30)
    # Wait until page has rendered results area and button
    wait.until(EC.presence_of_element_located((By.ID, "results")))
    run_btn = driver.find_element(By.CSS_SELECTOR, "button[onclick='runAllTests()']")
    run_btn.click()
    # Wait for tests to finish (log says "Tests complete")
    wait.until(EC.text_to_be_present_in_element((By.ID, "log"), "Tests complete"))
    time.sleep(1)
    results_html = driver.find_element(By.ID, "results").get_attribute("innerHTML")
    log_text = driver.find_element(By.ID, "log").text
    print("=== RESULTS ===")
    print(results_html)
    print("\n=== LOG ===")
    print(log_text)

    # Tally pass/fail
    fails = re.findall(r'class="test fail"', results_html)
    passes = re.findall(r'class="test pass"', results_html)
    warns = re.findall(r'class="test warn"', results_html)
    print(f"\nTALLY: {len(passes)} pass, {len(fails)} fail, {len(warns)} warn")
    sys.exit(0 if len(fails) == 0 else 1)
except TimeoutException as te:
    print("Timeout. Page source tail:\n", driver.page_source[-2000:])
    sys.exit(1)
finally:
    driver.quit()
