<script setup>

</script>

<template>
  <div class="main">
    <div class="isp3304">
      <h1>
        Государственное автономное профессиональное образовательное учреждение Свердловской области «Верхнепышминский механико-технологический техникум «Юность»
      </h1>
      <div class="map-container">
        <iframe
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A1f4fa582c6cdaeb78b1c03ef2acfcb40c705125817b2754188f8758ddfbf892e&amp;source=constructor"
          width="674"
          height="493"
          frameborder="0"
        ></iframe>
      </div>
      <p>
        624096, Свердловская область, г. Верхняя Пышма, ул. Кривоусова, 53<br>
        Тел/факс: +7 (34368) 5-44-86<br>
        E-mail: lobastov07@mail.ru<br>
        Адреса сайта: вп-юность.рф<br>
        <br>
        Директор: Лобастов Виталий Геннадьевич
      </p>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.isp3304 {
  background-color: var(--soft-white, #fff);
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 24px;
  padding: 32px 24px 24px 24px;
  box-shadow: 0 4px 24px 0 rgba(0,0,0,0.08);
  gap: 24px;
}

.isp3304 h1 {
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 12px;
  font-weight: 600;
  color: #222;
}

.map-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 12px;
}

.map-container iframe {
  border: none;
  width: 100%;
  max-width: 674px;
  height: 400px;
  min-height: 300px;
  background: #eaeaea;
}

.isp3304 p {
  text-align: center;
  font-size: 1.05rem;
  color: #444;
  margin-top: 0;
  margin-bottom: 0;
  line-height: 1.6;
}
</style>
