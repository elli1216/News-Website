export const isEmailValid = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isPasswordValid = (password: string) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return passwordRegex.test(password);
};

export const checkPassword = (password: string, confirmPassword: string) => {
  const passwordMessages: string[] = [
    password.length < 8 ? "Password must be at least 8 characters long" : "",
    !/[A-Z]/.test(password)
      ? "Password must contain at least one uppercase letter"
      : "",
    !/[0-9]/.test(password) ? "Password must contain at least one number" : "",
    !/[!@#$%^&*]/.test(password)
      ? "Password must contain at least one special character"
      : "",
    confirmPassword !== password ? "Passwords do not match" : "",
  ];

  return passwordMessages.filter((message) => message !== "");
};
