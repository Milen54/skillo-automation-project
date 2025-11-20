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
