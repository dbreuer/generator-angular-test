Feature: Running Cucumber with Protractor
  As a user of Protractor
  I should be able to use Cucumber
  to run my E2E tests

  @dev
  Scenario: Running Cucumber with Protractor
    Given I run Cucumber with Protractor
    Then it should still do normal tests
    Then it should expose the correct global variables

  @dev
  Scenario: Wrapping WebDriver
    Given I go on homepage
    Then the title should equal "AAT | The professional body for accounting technicians"

  @failing
  Scenario: Report failures
    Given I go on "/"
    Then the title should equal "Failing scenario 1"

  @failing
  Scenario: Reporting multiple failures
    Given I go on "/"
    Then the title should equal "Failing scenario 2"

  @strict
  Scenario: Missing step definition
    Given I go on "/"
    Then this step is not defined
