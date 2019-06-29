Feature: Home route

  Scenario: I see book cards
    When I go to the Home route
    Then I should see 10 book cards

  Scenario: SSR home route
    Given I'm logging server responses
    When I go to the Home route
    Then some server response contains the Redux state