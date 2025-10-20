<template>
  <div class="splash-screen">
    <div class="splash-content">
      <img src="/images/logo/logo.png" alt="Logo" class="logo">
      <h1>Вас приветствует Юность!</h1>
      <div class="image-loader">
        <img src="/images/icons/settings.png" alt="Loading" class="loader-img">
      </div>
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
  background-color: var(--yellow);
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
  font-size: 2em;
  margin-bottom: 30px;
  font-weight: 500;
}

.logo {
  max-width: 200px;
  margin-bottom: 20px;
  animation: pulse 1.5s ease-in-out infinite;
}

.image-loader {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.loader-img {
  width: 70px;
  height: 70px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
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

@media (max-width: 768px) {
  h1 {
    font-size: 1.5em;
  }

  .logo {
    max-width: 140px;
  }

  .loader-img {
    width: 50px;
    height: 50px;
  }
}
</style>