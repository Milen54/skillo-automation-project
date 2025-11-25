## DD-TC: Login with valid credetials (data-driven)

**Type:** Functional, Positive (Happy Path), Data-driven

### Test Data

The credentials are taken from `test-data/users.json`, all keys starting with `validUser`

| ID         | Username   | Password     |
|-----------|-----------|-------------|
| validUser2 | `testuser21` | `Test123456`  |
| validUser3 | `sampleuser` | `Sample123456` |

*(If more valid users are added in `users.json` with keys `validUserX`, they are automatically included in this test.)*

### Preconditions
- The valid users from the table above exist in the system
- The application is available at: `http://training.skillo-bg.com:4300`
- The test starts from the Login page (`/users/login`)
  (navigation is handled inside the test's `beforeEach` hook)

### Test Steps

_For each valid user from the test data (validUser2, validUser3, ...):_

1. Open the Login page (`/users/login`).
2. Verify that the page header displays **"Sign in"**.
3. Enter the username from the current data set into the username field.  
   - Example: `testuser21`
4. Enter the password from the current data set into the password field.  
   - Example: `Test123456`
5. Click the **"Sign in"** button.

### Expected Results

_For each valid user:_

- A success toast message is displayed with text (or similar):  
   - **"Successful login!"**
- The user is redirected to the Home/Posts page:  
   - URL: `/posts/all`
- The navigation element available only for logged-in users become visible **Home** button/link.


## DD-TC1: Login with invalid credentials (data-driven)

**Type:** Functional, Negative, Data-driven

### Test Data

The credentials are taken from `test-data/users.json`, all keys starting with `invalidUser`.

| ID            | Username      | Password     |
|---------------|---------------|--------------|
| invalidUser1  | invaliduser   | WrongPass1   |
| invalidUser2  | fakeuser      | FakePass2    |
| invalidUser3  | nouser        | NoPass3      |

*If more invalid users are added in `users.json` with keys `invalidUserX`naming pattern, they will be automatically included in the test.*

### Preconditions

- THe invalid user shown in the table above exist in the test data
- The application is available at: `http://training.skillo-bg.com:4300`
- The test starts from the Login page (`/users/login`)
  (navigation is handled inside the test's `beforeEach` hook)

### Test Steps

*For each invalid user from the test data (invalidUser1, invalidUser2, invalidUser3, ...):*

1. Open the Login page (`/users/login`).
2. Verify that the page header displays **"Sign in"**.
3. Enter the username from the current data set into the username field.  
   - Example: `invaliduser`
4. Enter the password from the current data set into the password field.  
   - Example: `WrongPass1`
5. Click the **"Sign in"** button.

### Expected Results

- The login **fails**, and the user **is not authenticated**.
- The application **does NOT redirect** to `/posts/all`.
- The user **remains on the Login page** at `/users/login`.
- (Optional UI validation) An **error message** is displayed, such as:  
  - *“Invalid username or password.”*

## TC1: Login with valid credentials

**Type:** Functional, Positive (Happy Path)

### Preconditions

- A user with valid credentials exists:
  - **Username** `milen0922`
  - **Password** `User123456`
- The application is available at: `http://training.skillo-bg.com:4300`
- The test starts from the Login page (`/users/login`)
  (navigation is handled inside the test's `beforeEach` hook)

### Test Steps

1. Open the Login page (`/users/login`).
2. Verify that the page header displays **"Sign in"**
3. Enter a valid username into the username field.
   - Example: `milen0922`
4. Enter a valid password into the password field.
   - Example: `User123456`
5. Click the **"Sign in"** button.

### Expected Results

- A success message is displayed with text:
  - **"Successful login!**
- The user is redirected to the Home/Posts page:
  - URL: `/posts/all`
- The navigation element available only for logged-in users become visible **Home** button/link.

## TC2: Login button is disabled when any field is empty

**Type** Functional, Negative

### Preconditions

- The application is available at: `http://training.skillo-bg.com:4300`
- The test starts from the Login page (`/users/login`)
  (navigation is handled inside the test's `beforeEach` hook)

### Test Steps

1. Navigate to Login page (`/users/login`).
2. Verify that page header displays **"Sign in"**.

---

### CASE 1: Username empty, password filled

3. Leave username empty.
4. Enter a valid password (e.g. `User123456`).
5. Verify **Sign in** button is **disabled**.

---

### CASE 2: Username filled, password empty

6. Enter a valid username (e.g. `milen0922`).
7. Leave password empty.
8. Verify **Sign in** button is **disabled**.

### Expected Results

- In both cases, the **Sign in** button remains dissabled
- No login request is sent.

## TC3: Login fails with wrong username and password

**Type** Functional, Negative

### Preconditions

- The application is available at: `http://training.skillo-bg.com:4300`
- The test starts from the Login page (`/users/login`)
  (navigation is handled inside the test's `beforeEach` hook)

### Test Steps

1. Navigate to Login page (`/users/login`).
2. Verify that page header displays **"Sign in"**.
3. Enter invalid username (e.g. `wronguser`).
4. Enter invalid password (e.g. `wrongpass`).
5. Click **Sign in** button.

### Expected Results

- Error message **"Wrong username or password!"** appears.
- User remains on the Login page (`/users/login`).
