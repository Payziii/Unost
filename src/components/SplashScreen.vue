<template>
  <div class="splash-screen">
    <div class="splash-content">
      <img src="/images/logo/logo.png" alt="Logo" class="logo">
      <h1>Вас приветствует Юность!</h1>
      <div class="loader"></div>
    </div>
  </div>
</template>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--soft-white);
  z-index: 9999;
  transition: opacity 0.5s ease-out;
}

.splash-screen.fade-out {
  opacity: 0;
}

.splash-content {
  text-align: center;
}

h1 {
    margin-bottom: 30px;
}

.logo {
  max-width: 200px;
  margin-bottom: 20px;
  animation: pulse 1.5s ease-in-out infinite;
}

.loader {
  width: 50px;
  height: 50px;
  border: 5px solid var(--soft-white);
  border-top: 5px solid var(--orange);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0% {
    transform: scale(1); 
  }
  50% {
    transform: scale(1.1); 
  }
  100% {
    transform: scale(1); 
  }
}
</style>