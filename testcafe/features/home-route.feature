Feature: Home route

  Scenario: I see book cards
    When I go to the Home route
    Then I should see 10 book cards

  Scenario: SSR home route
    Given I'm logging server responses
    When I go to the Home route
    Then some server response contains the Redux state
    And some server response contains
      | pattern                                                              |
      | <div id="app"><div><div class="main-layout">.+?<\/div><\/div><\/div> |
      | <div class="main-layout__books">.+?<\/div>                           |
