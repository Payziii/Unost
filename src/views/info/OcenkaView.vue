<script setup>
import Page from '@/components/pages/Page.vue';
import Title from '@/components/pages/Title.vue';
import Text from '@/components/pages/Text.vue';
import Highlight from '@/components/pages/Highlight.vue';
import Link from '@/components/pages/Link.vue';
import File from '@/components/pages/File.vue';
import CardGrid from '@/components/pages/CardGrid.vue';
import Card from '@/components/pages/Card.vue';
import TitledImage from '@/components/pages/TitledImage.vue';
</script>

<template>
  <Page title="Независимая оценка качества">


    <Title>НЕЗАВИСИМАЯ ОЦЕНКА КАЧЕСТВА</Title>

    <Text align="justify">
      <ul>
        <li>
          <Link href="https://bus.gov.ru/" target="_blank" rel="noopener">
            Официальный сайт для размещения информации о государственных (муниципальных) учреждениях
          </Link>
        </li>
        <li>
          <Link href="https://bus.gov.ru/info-card/412834" target="_blank" rel="noopener">
            ГАПОУ СО «ВПМТТ «Юность» на сайте bus.gov.ru
          </Link>
        </li>
        <li>
          <Link href="https://bus.gov.ru/rate/412834" target="_blank" rel="noopener">
            Оставить отзыв о качестве услуг на bus.gov.ru
          </Link>
        </li>
        <li>
          <Link href="https://minobraz.egov66.ru/site/item?id=3791" target="_blank" rel="noopener">
            Приказы Министерства образования и молодёжной политики Свердловской области по вопросам НОКО
          </Link>
        </li>
        <li>
          <Link href="https://minobraz.egov66.ru/site/item?id=2703" target="_blank" rel="noopener">
            Федеральная правовая база по вопросам НОКО
          </Link>
        </li>
        <li>
          <Link href="https://nok.gepicentr.ru/" target="_blank" rel="noopener">
            Оставить отзыв на сайте НОКО
          </Link>
        </li>
        <li>
          <Link href="https://disk.yandex.ru/i/J_J6azZvH_WZ-g" target="_blank" rel="noopener">
            Видеоролик «Независимая оценка 2024»
          </Link>
        </li>
        <li>
          <Link href="https://disk.yandex.ru/i/JnUvItMT4Ye0zg" target="_blank" rel="noopener">
            Анимационный видеоролик «Независимая оценка качества 2024»
          </Link>
        </li>
      </ul>
    </Text>

    

    <Title>Документы и материалы</Title>
    <Text align="left">
      <File file="Анкета на нок(1).pdf" icon>
        QR‑код на анкету
      </File>
      <File file="Плакат на анкету.pdf" icon>
        QR‑код на анкету на сайте bus.gov.ru
      </File>
      <File file="План по устранению недостатков в 2024г.pdf" icon>
        План мероприятий по устранению недостатков (2024)
      </File>
      <File file="Отчет за 1-е полугодие 2022 года о выполнении плана мероприятий по устранению недостатков,.pdf" icon>
        Отчёт по устранению недостатков (1 полугодие 2022)
      </File>
      <File file="План мероприятий по устранению недостатков, выявленных в ходе проведения независимой оценки качества условий осуществления 2021.pdf" icon>
        План мероприятий (2021)
      </File>
      <File file="План по устранению недостатков 19.03.19.pdf" icon>
        План мероприятий (2018)
      </File>
      <File file="Отчет по устранению недостатков_2019.pdf" icon>
        Отчёт по устранению недостатков (2018)
      </File>
  
    </Text>

    <Title>Как пройти опрос</Title>
    <Text align="center">
      Уважаемые родители и обучающиеся старше 14 лет! Приглашаем вас принять участие в опросе.
      Опрос проводится в целях выявления мнения граждан о качестве условий образовательной деятельности.
    </Text>
    <Text align="center">
      Чтобы оценить условия осуществления образовательной деятельности, наведите камеру телефона и отсканируйте QR‑код
      или перейдите по прямой ссылке:
      <Link href="https://bus.gov.ru/qrcode/rate/412834" target="_blank" rel="noopener">
        https://bus.gov.ru/qrcode/rate/412834
      </Link>
    </Text>

    <CardGrid>
    <img
      src="/images/анкета на мнение(1).jpg"
      alt="QR‑код для перехода к анкете на bus.gov.ru"
      height="auto"
      width="500px"
    />
    </CardGrid>

    <Text align="left">
      Перейдя по ссылке, вы сможете:
      <ul>
        <li>оценить открытость и доступность информации об организации;</li>
        <li>оценить комфортность условий осуществления образовательной деятельности;</li>
        <li>оценить доброжелательность и вежливость работников;</li>
        <li>оценить удовлетворённость условиями осуществления образовательной деятельности;</li>
        <li>оценить доступность образовательной деятельности для инвалидов;</li>
        <li>оставить отзыв.</li>
      </ul>
    </Text>

    <Text align="center">
      <strong>Ссылка на анкету НОКО:</strong>
      <Link href="https://nok.gepicentr.ru/" target="_blank" rel="noopener">
        https://nok.gepicentr.ru/
      </Link>
    </Text>
    <Title>Видео</Title>
    <div class="video-container">
      <iframe
        src="https://www.youtube.com/embed/iPn6ENY5A5g?si=5o7f-4cdWFfqxTJR"
        title="Видео о независимой оценке качества"
        width="100%"
        height="600"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
        style="background-color:#000"
      ></iframe>
    </div>

    <Title>Платформа обратной связи (ПОС)</Title>
    <Text align="justify">
      Хотели задать вопрос, но не знали как? Платформа обратной связи Госуслуг позволит получить ответ на любой вопрос
      о деятельности организации. Подробности — в карточках ниже или по прямой ссылке:
      <Link href="https://www.gosuslugi.ru/10091/1" target="_blank" rel="noopener">
        https://www.gosuslugi.ru/10091/1
      </Link>
    </Text>


  </Page>
</template>

<style scoped>
.video-container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
}
.video-container iframe {
  width: 100%;
  height: 600px;
  border: none;
}

/* Адаптивность */
@media (max-width: 768px) {
  .video-container iframe {
    height: 400px;
  }
}
@media (max-width: 480px) {
  .video-container iframe {
    height: 300px;
  }
}
</style>
