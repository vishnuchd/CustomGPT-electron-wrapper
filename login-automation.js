// Login automation for CustomGPT
// This file handles automatic login based on the actual form structure

const EMAIL = 'developer@easybot.chat';
const PASSWORD = 'PERJBEhbi8E@zhB';

/**
 * Get the login automation script
 * Based on the actual HTML structure from CustomGPT login page
 */
function getLoginScript() {
  return `
    (function() {
      const email = '${EMAIL}';
      const password = '${PASSWORD}';
      
      let loginStep = 0; // 0: email, 1: continue clicked, 2: password filled, 3: submitted
      let loginAttempts = 0;
      const maxAttempts = 40; // Try for 20 seconds (40 * 500ms)
      
      const loginInterval = setInterval(() => {
        loginAttempts++;
        
        // Step 1: Fill email and click continue button
        if (loginStep === 0) {
          const emailInput = document.querySelector('input#email[type="email"]');
          
          if (emailInput && !emailInput.value) {
            // Fill email
            emailInput.focus();
            
            // Use native setter for React/Vue compatibility
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
              window.HTMLInputElement.prototype, 
              'value'
            ).set;
            nativeInputValueSetter.call(emailInput, email);
            
            // Trigger all necessary events
            emailInput.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
            emailInput.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
            emailInput.dispatchEvent(new Event('blur', { bubbles: true, cancelable: true }));
            
            // Find and click "Continue With Company Email" button
            setTimeout(() => {
              const continueButton = Array.from(document.querySelectorAll('button')).find(btn => {
                const content = (btn.textContent || btn.innerText || '').trim();
                return content.includes('Continue With Company Email') || 
                       (content.includes('Continue') && content.includes('Email'));
              });
              
              if (continueButton && !continueButton.disabled) {
                continueButton.click();
                loginStep = 1;
                console.log('Email filled and continue button clicked');
              }
            }, 300);
          }
        }
        
        // Step 2: Wait for password field and fill it
        if (loginStep === 1) {
          const passwordInput = document.querySelector('input[type="password"]');
          
          if (passwordInput) {
            passwordInput.focus();
            
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
              window.HTMLInputElement.prototype, 
              'value'
            ).set;
            nativeInputValueSetter.call(passwordInput, password);
            
            passwordInput.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
            passwordInput.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
            
            loginStep = 2;
            console.log('Password filled');
            
            // Step 3: Find and click Sign In button
            setTimeout(() => {
              const submitButton = Array.from(document.querySelectorAll('button')).find(btn => {
                const content = (btn.textContent || btn.innerText || '').trim();
                return content.includes('Sign In') || 
                       content.includes('Sign in') ||
                       btn.type === 'submit';
              });
              
              if (submitButton && !submitButton.disabled) {
                submitButton.click();
                loginStep = 3;
                clearInterval(loginInterval);
                console.log('Login submitted');
              } else {
                // Fallback: try form submit
                const form = passwordInput.closest('form');
                if (form) {
                  form.submit();
                  loginStep = 3;
                  clearInterval(loginInterval);
                  console.log('Form submitted');
                }
              }
            }, 500);
          }
        }
        
        // Stop trying after max attempts
        if (loginAttempts >= maxAttempts) {
          clearInterval(loginInterval);
          console.log('Login automation stopped - max attempts reached. Step:', loginStep);
        }
      }, 500);
      
      // Safety: clear interval after 30 seconds
      setTimeout(() => {
        clearInterval(loginInterval);
      }, 30000);
    })();
  `;
}

/**
 * Check if we're on the login page
 */
function isLoginPage(url) {
  return url.includes('app.customgpt.ai') &&
    url.includes('/login');
}

/**
 * Check if user is logged in (on dashboard or main app)
 */
function isLoggedIn(url) {
  return url.includes('app.customgpt.ai') &&
    (url.includes('/dashboard') ||
      url.includes('/agents') ||
      url.includes('/projects') ||
      (!url.includes('/login') && !url.includes('/register')));
}

module.exports = {
  getLoginScript,
  isLoginPage,
  isLoggedIn,
  EMAIL,
  PASSWORD
};

