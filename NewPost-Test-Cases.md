## TC7: User can create a new public post

**Type:** Functional, Positive (Happy Path)

### Preconditions

- The application is available at: `http://training.skillo-bg.com:4300`
- The user is logged in (handled by the test suite’s `beforeEach` hook via the authenticated page fixture)
- The test starts from the **Create New Post** page (`/posts/create`)
- A valid test image exists at: `test-data/test-image.jpg`

### Test Steps

1. Upload a valid image file into the "Cover Image" field
   - Example: `test-image.jpg`
2. Enter a valid caption into the caption field
   - Example: `"Public Post TC7 <timestamp>"`
3. Ensure the **Public** option is selected (default option)
4. Click the **"Create post"** button
5. Wait for the post to be created and the page to resolve

### Expected Results

- The public post is successfully created
- The user is redirected to their Profile page
- The **"No posts here"** message is **not visible**
- A new post appears in the gallery (latest post)
- The post's image/container is visible on the page

### Notes

- Cleanup is automatically handled in `afterEach` via `deletePostIfExists()`
- This test is part of a **serial test suite** because posts are created and deleted (destructive operations)

## TC8: User can create a new private post

**Type:** Functional, Positive (Happy Path)

### Preconditions

- The application is available at: `http://training.skillo-bg.com:4300`
- The user is logged in (handled by the test suite’s `beforeEach` hook via the authenticated page fixture)
- The test starts from the **Create New Post** page (`/posts/create`)
- A valid test image exists at: `test-data/test-image.jpg`

### Test Steps

1. Upload a valid image file into the "Cover Image" field
   - Example: `test-image.jpg`
2. Enter a valid caption into the caption field
   - Example: `"Private Post TC8 <timestamp>"`
3. Switch to **Private** post status
4. Click the **Create post** button
5. Wait for the post to be created and navigate to **Private** posts section
6. Delete the post (for cleanup)

### Expected Results

- The private post is successfully created.
- The user is redirected ot their profile page and **Private** posts section, where the post appear.
- The private post is successfully deleted.
- The success message **\*"Post Deleeted"** appears.

### Notes

- The test also deletes the newly created private post as part of its flow.
- Private posts are not covered by the global `afterEach` cleanup used for public posts, because they are visible only in the _Private Posts_ section.
- Performing the delete inside this test ensures that the test data is cleaned up immediately after verification and that subsequent runs start from a clean state.
- This keeps the test independent, repeatable, and prevents old private posts from affecting later executions.

### TC9: User cannot create a post without uploading an image

**Type:** Functional, Negative

### Preconditions

- The application is available at: `http://training.skillo-bg.com:4300`
- The user is logged in (handled by the test suite’s `beforeEach` hook via the authenticated page fixture)
- The test starts from the **Create New Post** page (`/posts/create`)

### Test Steps

1. Enter a valid caption into the caption field
   - Example: `"No Image Post TC9 <timestamp>"`
2. Click the **Create Post** button
3. Verify the 'toast message' contains text (`Please upload an image!`)
4. Verify user is still on (`/posts/create`) URL

### Expected Results

- Creating a post without image is not possible
- Error message **_"Please upload an image!"_** appears
- User is still on the same page (`posts/create`) URL.

### TC10: User cannot create a post without entering a caption

**Type:** Functional, Negative

### Preconditions

- The application is available at: `http://training.skillo-bg.com:4300`
- The user is logged in (handled by the test suite’s `beforeEach` hook via the authenticated page fixture)
- The test starts from the **Create New Post** page (`/posts/create`)

### Test Steps

1. Upload a valid image file into the "Cover Image" field
   - Example: `test-image.jpg`
2. Click the **Create Post** button
3. Verify the 'toast messsage' contains text (`Please enter caption!`)
4. Verify user is still on (`/posts/create`)

### Expected Results

- Creating post without entering a caption is not possible
- Error message **_"Please enter caption!"_** appears
- User is still on the same page (`posts/create`) URL

### TC11: User can successfully delete their post

**Type:** Functional, Positive

### Preconditions

- The application is available at: `http://training.skillo-bg.com:4300`
- The user is logged in (handled by the test suite’s `beforeEach` hook via the authenticated page fixture)
- The test starts from the **Create New Post** page (`/posts/create`)

### Test Steps

1. Upload a valid image file into the "Cover Image" field
   - Example: `test-image.jpg`
2. Enter a valid caption into the caption field
   - Example: `"Delete Post TC10 <timestamp>"`
3. Click the **Create post** button
4. Verify the 'toast message' contains text (`Post created!`)
5. Verify the header `No posts here` is not visible
6. Delete the post
7. Verify the 'toast message' contains text (`Post Deleted`)

### Expected Results

- Successfully created post
- Sucessfully deleted post
- Verify the 'toast messsage' contains text (`Post Deleted!`)

### TC12: User cannot create an empty post

**Type:** Functional, Negative

### Preconditions

- The application is available at: `http://training.skillo-bg.com:4300`
- The user is logged in (handled by the test suite’s `beforeEach` hook via the authenticated page fixture)
- The test starts from the **Create New Post** page (`/posts/create`)

### Test Steps

1. Click the **Create Post** button
2. Verify the 'toast message' contains text (`Please upload an image!`)
3. Verify user is still on (`/posts/create`) URL

### Expected Results

- Creating an empty post is not possible
- Verify the 'toast messsage' contains text (`Please upload an image!`)
- Verify user is still on (`/posts/create`) URL
