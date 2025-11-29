export function generateUsername() {
    const timestamp = Date.now().toString().slice(-6); // Use last 6 digits for uniqueness;
    return `user${timestamp}`;
};

export function generateEmail() {
    const timestamp = Date.now().toString().slice(-4); // Use last 4 digits for uniqueness
    return `user${timestamp}@mail.com`;
};

export function generateRandomBirthDate(yearsBack = 30) {
    const today = new Date();

    const maxDays = yearsBack * 365;
    const randomDaysAgo = Math.floor(Math.random() * maxDays);

    // Moving date back by randomDaysAgo
    today.setDate(today.getDate() - randomDaysAgo);

    // Returning date in YYYY-MM-DD format
    return today.toISOString().slice(0, 10);
}

export function generatePassword() {
    const timestamp = Date.now();
    return `Pass!${timestamp}`;
};

export function confirmPassword(password) {
    return password;
};

export function generatePublicInfo() {
    const timestamp = Date.now().toString().slice(-6); // Use last 6 digits for uniqueness
    return `Public info ${timestamp}`;
};
