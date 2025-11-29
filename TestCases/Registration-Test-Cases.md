### DD-TC3: User cannot register with invalid email

**Type:** Functional, Negative (Data-driven)

### Test Data - Invalid Emails

| ID | Invalid Email       | Reason                        |
|----|----------------------|-------------------------------|
| 1  | `user@`              | Missing domain                |
| 2  | `user@doamin`        | Missing top-level domain      |
| 3  | `userdomain.com`     | Missing '@' symbol            |
| 4  | `@domain.com`        | Missing username              |

### Preconditions
- The valid users from the table above exist in the system
- The application is available at: `http://training.skillo-bg.com:4300`

### Test Steps

1. Navigate to `/users/register`.
2. Fill the registration form with:
   - Valid **Username**  
   - **Invalid Email** (one from the test data)  
   - Valid **Birth Date**  
   - Valid **Password**  
   - Matching **Confirm Password**  
   - Valid **Public Info**
3. Try to click the **Sign in** button.

### Expected Results

_For each invalid email:

- The **email field** displays an error message and red validation styling.
- The **Sign in** button remains **disabled**.
- The user stays on the **registration page** (`/users/register`).
- No registration occurs and no account is created.


### DD-TC4: User cannot register with username shorter than 4 characters

**Type:** Functional, Negative (Data-driven)

### Preconditions

- The application is available at: `http://training.skillo-bg.com:4300`
- The test data contains invalid usernames: `"a"`, `"ab"`, `"abc"`.

### Test Steps

1. Navigate to (`/users/register`);
2. Fill the registration form with:
   - **Username**  `1-3 character strings from data set`
   - Email **Email**
   - Valid **Birth Date**  
   - Valid **Password**  
   - Matching **Confirm Password**  
   - Valid **Public Info**
3. Try to click the **Sign in** button.

### **Expected Result**
- The **username field** displays an error message and red validation styling.
- The **Sign in** button is **disabled**.
- The user **remains on** `/users/register`.
- The system does **not allow submission** of the form.


### DD-TC5: User cannot register with invalid password

**Type:** Functional, Negative (Data-driven)

### Preconditions

- The application is available at: `http://training.skillo-bg.com:4300`
- The test data contains invalid passwords: 

### Test Data 

| Case Name        | Password                 | Reason                                  |
|------------------|--------------------------|-----------------------------------------
| tooShort         | `123`                    | Fewer than 6 characters                 |
| noUppercase      | `password123`            | Missing uppercase letter                |
| noNumber         | `Password!`              | Missing numeric digit                   |
| longerThanMax    | `ThisIsAVeryLongPassword`| Exceeds maximum allowed password length |

_For each invalid password:

### Test Steps

1. Navigate to (`users/register`)
2. Fill in the registration form with:
   - Valid username  
   - Valid email  
   - Valid birth date  
   - **Password = weak password value**  
   - **Confirm Password = same weak password**
   - Valid public info
3. Try to click the **Sign in** button.

### Expected Results

- The application must **reject the password**.  
- The **Sign in** button must remain **disabled**.  
- The user **remains on** `/users/register`.
- The system does **not allow submission** of the form.


### TC11: User can successfully register with valid data

**Type:** Functional, Positive (Happy-Path)

### Preconditions

- The application is available at: `http://training.skillo-bg.com:4300`
- The test starts from the Register page (`/users/register`)
  (navigation is handled inside the test's `beforeEach` hook)


### Test Steps

1. Fill in the registration form with the following valid data:
   - **Username**  
   - **Email**  
   - **Birth date**  
   - **Password**  
   - **Confirm Password**  
   - **Public info**
2. Submit the registration form.
3. Wait for the success toast notification or redirect.

### Expected Results

- Registration is **successful**.
- User is redirected to **/posts/all**.
- The **home button** on the Home page is visible.
- A new user account is created in the system.


### TC12: User can register with a birth date in the future

**Type:** Functional, Positive (Happy-Path)

### Preconditions

- The application is available at: `http://training.skillo-bg.com:4300`
- The test starts from the Register page (`/users/register`)
  (navigation is handled inside the test's `beforeEach` hook)

### Test Steps

1. Navigate to the Registration page.
2. Fill in the registration form with:
   - **Username:** valid + `"Future"`
   - **Email:** `"qa"` prefix + valid email
   - **Birth date:** `2027-12-20` (future date)
   - **Password:** valid
   - **Confirm Password:** matching password
   - **Public info:** valid
3. Submit the registration form.
4. Wait for the success toast notification or redirect.

### Expected Results

- Registration is **successful**.
- User is redirected to **/posts/all**.
- The **home button** on the Home page is visible.
- A new user account is created in the system.


### TC13: User cannot register without entering public info

**Type:** Functional, Negative

### Preconditions

- The application is available at: `http://training.skillo-bg.com:4300`
- The test starts from the Register page (`/users/register`)
  (navigation is handled inside the test's `beforeEach` hook)

### Test Steps

1. Fill the registration form with:
   - **Username:** valid
   - **Email:** valid
   - **Birth date:** valid
   - **Password:** valid
   - **Confirm password:** valid
   - **Public info:** **empty**
2. Try to click the **Sign in** button.

### Expected Results

- The **Sign in** button is **disabled**.
- The user remains on `/users/register`.
- Registration **cannot proceed** without entering public info.