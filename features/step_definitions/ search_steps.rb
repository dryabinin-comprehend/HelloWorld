require 'selenium-webdriver'
driver = Selenium::WebDriver.for :chrome

name = "Peter"

Given(/^We navigate to the homepage$/) do
  driver.navigate.to "http://localhost:9000/hello"
end

When(/^We send the word Peter$/) do
    driver.find_element(:id, 'name-input').send_keys("Peter") 
    driver.find_element(:id, 'add-button').click  
end

Then(/^The results from serever will be the same as we have already sent$/) do
    wait = Selenium::WebDriver::Wait.new(:timeout => 5) # seconds

    begin
      element = wait.until { driver.find_element(:id => 'greeting-name') }
      expect(element.text).to eq("Welcome to the system, " + name)
    ensure
      driver.quit
    end
end
