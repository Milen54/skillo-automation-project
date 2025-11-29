# Skillo Social Media - Test Automation Suite

## 📖 Project Overview

This is a comprehensive end-to-end test automation suite for the **Skillo Social Media** application. The project uses **Playwright** as the testing framework and follows the **Page Object Model (POM)** design pattern to ensure maintainable, scalable, and reusable test code.

The suite covers critical user flows including registration, login, logout, and post management (create, delete, validate). It validates both positive and negative scenarios to ensure robust application behavior.

## 🎯 Project Purpose

This automation suite was created to:

- **Ensure quality** across critical user workflows in the Skillo application
- **Detect regressions** early through automated testing
- **Accelerate testing cycles** by automating repetitive manual tests
- **Demonstrate best practices** in test automation architecture using Playwright and POM
- **Provide reliable test coverage** for CI/CD integration

## 🛠️ Technologies Used

- **Playwright** (v1.56+) - Modern end-to-end testing framework
- **Node.js** - JavaScript runtime
- **JavaScript (ES6+)** - Test implementation language
- **Page Object Model** - Design pattern for maintainability
- **JSON** - Test data management
- **ESLint** - Code quality and linting

## 📋 Prerequisites

Before running the tests, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)
- A modern browser (Chromium, Firefox, or WebKit)

## 🚀 Installation & Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Milen54/skillo-automation-project.git
   cd skillo-automation-project
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Install Playwright browsers:**

   ```bash
   npx playwright install
   ```

4. **Verify installation:**
   ```bash
   npx playwright --version
   ```

## ▶️ Running Tests

### Run all tests:

```bash
npx playwright test
```

### Run specific test file:

```bash
npx playwright test tests/login.spec.js
```

### Run tests in headed mode (see browser):

```bash
npx playwright test --headed
```

### Run tests in a specific browser:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### View test report:

```bash
npx playwright show-report
```

### Run tests with UI mode (interactive):

```bash
npx playwright test --ui
```

## 📁 Project Structure

```
skillo-automation-project/
├── pages/                      # Page Object Model classes
│   ├── HomePage.js            # Home page actions and locators
│   ├── LoginPage.js           # Login page actions and locators
│   ├── RegisterPage.js        # Registration page actions and locators
│   ├── ProfilePage.js         # Profile page actions and locators
│   └── NewPostPage.js         # New post page actions and locators
├── tests/                      # Test specifications
│   ├── fixtures/              # Playwright fixtures for test setup
│   │   ├── auth.js           # Authenticated user fixture
│   │   ├── authNewPost.js    # Dedicated fixture for new post tests
│   │   └── loginPage.js      # Login page fixture with test data
│   ├── login.spec.js          # Login functionality tests
│   ├── logout.spec.js         # Logout functionality tests
│   ├── registration.spec.js   # Registration functionality tests
│   └── newPost.spec.js        # Post creation/deletion tests
├── test-data/                  # Test data files
│   ├── users.json             # User credentials and test data
│   └── test-image.jpg         # Sample image for post tests
├── helpers/                    # Utility functions
│   └── dataGenerator.js       # Generate dynamic test data
├── TestCases/                  # Test case documentation
│   ├── Login-Test-Cases.md
│   └── Registration-Test-Cases.md
├── playwright.config.js        # Playwright configuration
├── package.json                # Project dependencies
├── eslint.config.mjs          # ESLint configuration
└── README.md                   # Project documentation
```

## 🧪 Test Scenarios

### Registration Tests

- **TC11:** User can successfully register with valid data
- **TC12:** User can register with date in the future
- **TC13:** User cannot register without entering public info
- **DD-TC3:** User cannot register with invalid email (data-driven)
- **DD-TC4:** User cannot register with username shorter than 4 characters (data-driven)
- **DD-TC5:** User cannot register with invalid password (data-driven)

### Login Tests

- **TC1:** Login button is disabled when any field is empty
- **DD-TC:** Login with valid user credentials (data-driven)
- **DD-TC1:** Login fails with invalid user credentials (data-driven)

### Logout Tests

- **TC2:** User can log out successfully from Home Page
- **TC3:** User can log out successfully from Profile Page
- **TC4:** User can log out successfully from New Post Page

### New Post Tests

- **TC5:** User can create a new public post
- **TC6:** User can create and delete a new private post
- **TC7:** User cannot create a post without uploading an image
- **TC8:** User cannot create a post without entering a caption
- **TC9:** User can successfully delete their post
- **TC10:** User cannot create an empty post

## 📊 Test Coverage

- **Total test cases:** 25+
- **Positive tests:** 8
- **Negative tests:** 17
- **Data-driven tests:** 15+
- **Test execution mode:** Serial for destructive tests, parallel for read-only tests
- **Browsers covered:** Chromium, Firefox, WebKit

## 🏗️ Architecture

This project follows the **Page Object Model (POM)** design pattern:

### Page Objects

Each page of the application has a corresponding class that encapsulates:

- **Locators:** Element selectors (CSS, XPath, role-based)
- **Actions:** Methods to interact with the page (click, fill, navigate)
- **Assertions:** Expected page states

### Fixtures

Playwright fixtures provide reusable test setup:

- **`loginPage`** - Pre-navigated login page instance
- **`authenticatedPage`** - Logged-in user session
- **`authNewPost`** - Dedicated authenticated session for post tests
- **`validUser` / `invalidUser`** - Test user data

### Test Data Management

- Centralized in `test-data/users.json`
- Dynamic data generation via `helpers/dataGenerator.js`
- Supports data-driven testing with `forEach` and `Object.entries()`

### Benefits of This Architecture

- **Maintainability:** Page changes require updates in one place
- **Reusability:** Page objects and fixtures are shared across tests
- **Readability:** Tests are declarative and easy to understand
- **Scalability:** Easy to add new tests and pages

## 🐛 Known Issues

- **Toast message timing:** Some toast messages may require increased timeout on slower networks
- **Serial execution required:** Post creation/deletion tests must run serially to avoid race conditions

## 🔮 Future Improvements

- Add API testing layer for faster validation
- Implement visual regression testing
- Add performance testing metrics
- Integrate with CI/CD pipeline (GitHub Actions)
- Add Allure reporting for enhanced test visualization
- Expand test coverage for edge cases
- Add database validation for critical flows

## 👤 Author

**Milen Denkov**  
[GitHub Profile](https://github.com/Milen54)

## 📄 License

This project is created for **educational purposes** as part of test automation training.

---

**Happy Testing! 🚀**
