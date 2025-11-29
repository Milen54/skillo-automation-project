# Bug Reports

## **Bug 1: Username message is incorrect**

### **Summary**
The UI displays the message **"Minimum 2 characters!"**, but the actual validation requires **at least 4 characters**.
Usernames with 2 or 3 characters are rejected.

### **Environment**
- Application version: *1.01.1*
- Page: **Registration Page**
- Browser: Chrome / Playwright
- OS: macOS

### **Steps to Reproduce**
1. Open the registration page.
2. Enter a username with **2 characters** (e.g., `ab`).
3. Observe the validation error.
4. Enter a username with **3 characters** (e.g., `abc`).
5. Observe the validation error.

### **Actual Results**
- The form rejects usernames with 2 or 3 characters.
- Only usernames with **4+ characters** pass validation.

### **Severity**
⚠️ **Medium** — Incorrect validation rules confuse users and contradict the displayed UI guidance.

------

## **Bug 2: Registration allows future birth dates**

### **Summary**
The registration form accepts **future birth dates**, which is logically incorrect.  
A user can register with a birth date in the future (e.g., next month or next year).

### **Environment**
- Application version: *1.01.1*
- Page: **Registration Page**
- Browser: Chrome / Playwright
- OS: macOS

### **Steps to Reproduce**
1. Navigate to the registration page.
2. Enter a **future date** in the Birth Date field.
3. Submit the form.
4. Observe that no validation error is triggered.

### **Expected Result**
- Future dates should not be allowed.
- Validation error should show, e.g.:
  - **"Birth date cannot be in the future."**

### **Actual Result**
- Future dates are accepted with no validation error.
- Registration completes successfully.

### **Severity**
⚠️ **High** — Logical data integrity issue. Users can enter invalid personal information.