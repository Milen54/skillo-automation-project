## TC2: User can log out successfully from Home Page

**Type:** Functional, Positive

### Preconditions

- The application is available at: `http://training.skillo-bg.com:4300`
- The user is already authenticated
  (login is performed through the authenticatedPage fixture before the test starts)
- The test starts from the Home page (`/posts/all`)

### Test Steps

1. Verify that the user is currently on the Home page (`/posts/all`)
2. Click the **"Logout"** button.
3. Wait for page navigation to finish.

### Expected Results

- The user is redirected to the Login page (`/users/login`)

## TC3: User can log out successfully from Profile Page

**Type:** Functional, Positive

### Preconditios

- The application is available at: `http://training.skillo-bg.com:4300`
- The user is already authenticated
  (login is performed through the authenticatedPage fixture before the test starts)
- The test starts from the Home page (`/posts/all`)

### Test Steps

1. Verify that the user is currently on the Home page (`/posts/all`)
2. Navigate to **"Profile Page"**
3. Verify that username is displayed
4. Click the **"Logout"** button.
5. Wait for page navigation to finish.

### Expected results

- The user is redirected to the Login page (`/users/login`)

## TC4: User can log out successfully from New Post Page

**Type:** Functional, Positive

### Preconditios

- The application is available at: `http://training.skillo-bg.com:4300`
- The user is already authenticated
  (login is performed through the authenticatedPage fixture before the test starts)
- The test starts from the Home page (`/posts/all`)

### Test Steps

1. Verify that the user is currently on the Home page (`/posts/all`)
2. Navigate to **"New Post Page"**
3. Verify that **"Browse Post button"** is visible
4. Click the **"Logout"** button.
5. Wait for page navigation to finish.

### Expected results

- The user is redirected to the Login page (`/users/login`)