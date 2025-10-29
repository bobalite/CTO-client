export default defineNuxtPlugin((nuxtApp) => {
  let inactivityTimer;

  const resetTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      logoutUser();
    }, 5 * 60 * 1000); // 5 minutes
  };

  // const logoutUser = () => {
  //   // Example logout logic
  //   $fetch('/api/logout', { method: 'POST' })
  //     .finally(() => {
  //       // Clear local storage or tokens
  //       localStorage.removeItem('auth_token');
  //       window.location.href = '/login';
  //     });
  // };

  const logoutUser = async () => {
  try {
    await $fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch (err) {
    console.error('Logout error:', err);
  } finally {
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
  }
};

  // Detect user activity
  ['click', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach((event) => {
    window.addEventListener(event, resetTimer);
  });

  // Start the inactivity timer
  resetTimer(); 
});
