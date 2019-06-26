Feature: Home route feature

  I want to see book cards

  Scenario: Accessing the Home route
    When I navigate to the home route
    Then I should see 10 book cards

  Scenario: SSR home route
    Given I'm logging server responses
    When I navigate to the home route
    Then some server response contains the Redux state