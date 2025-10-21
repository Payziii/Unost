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
  <Page title="Центр карьеры">


    <Title>ЦЕНТР КАРЬЕРЫ</Title>

    <Text align="justify">
      <Highlight>Цель деятельности Центра карьеры ВПМТТ «Юность»</Highlight> — обеспечение условий
      для маршрутизации и трудоустройства обучающихся и выпускников в соответствии с освоенной
      профессией и специальностью среднего профессионального образования.
    </Text>

    <!-- Документы -->
    <Title>Документы</Title>
    <Text align="left">
      <File file="Положение о Центре карьеры(1).pdf" icon>Положение о Центре карьеры</File>
    </Text>

    <!-- План мероприятий -->
    <Title>План мероприятий</Title>
    <Text align="left">
      <File file="План ЦК_2025-2026 (2)(2).pdf" icon>План работы Центра карьеры на 2025–2026 год</File>
      <File file="План работы Центра на 2024-2025 годы(1).pdf" icon>План работы Центра карьеры на 2024–2025 год</File>
     
    </Text>

    <!-- Отчёты и мероприятия -->
    <Title>Информация о проведённых и предстоящих мероприятиях</Title>
    <Text align="left">
      <File file="Отчет Центра карьеры за 2024-2025.pdf" icon>Отчёт работы Центра карьеры 2024–2025 год</File>
      <File file="Отчет Центра за 2023-2024 (2).pdf" icon>Отчёт работы Центра карьеры 2023–2024 год</File>
      
    </Text>

    <!-- Список вакансий -->
    <Title>Список актуальных вакансий</Title>
    <CardGrid>
      <Card title="Работа России — г. Верхняя Пышма">
        <Text align="center">
          <Link href="https://trudvsem.ru/vacancy/search?_title=%D0%B2%D0%B5%D1%80%D1%85%D0%BD%D1%8F%D1%8F%20%D0%BF%D1%8B%D1%88%D0%BC%D0%B0&_regionIds=6600000000000" target="_blank" rel="noopener">
            Поиск вакансий на trudvsem.ru
          </Link>
        </Text>
      </Card>

      <Card title="Верхнепышминский Центр занятости">
        <Text align="center">
          <Link href="https://ir-center.ru/sznregion/dsktop/czninfo.asp?rn=%E3%20%C2%E5%F0%F5%ED%FF%FF%20%CF%FB%F8%EC%E0&rg=66" target="_blank" rel="noopener">
            Информация на сайте службы занятости
          </Link>
          <br />
          <Link href="https://vk.com/vpcz66" target="_blank" rel="noopener">
            Сообщество ВК
          </Link>
        </Text>
      </Card>

      <Card title="АО «Уралэлектромедь» — г. Верхняя Пышма">
        <Text align="center">
          <Link href="https://www.avito.ru/verhnyaya_pyshma/vakansii?q=%D1%83%D1%80%D0%B0%D0%BB%D1%8D%D0%BB%D0%B5%D0%BA%D1%82%D1%80%D0%BE%D0%BC%D0%B5%D0%B4%D1%8C" target="_blank" rel="noopener">
            Вакансии на Avito
          </Link>
        </Text>
      </Card>

      <Card title="ООО «Уральские локомотивы»">
        <Text align="center">
          <Link href="https://ulkm.ru/karera/vse-vakansii/" target="_blank" rel="noopener">
            Все вакансии
          </Link>
        </Text>
      </Card>

      <Card title="АО «Уралредмет»">
        <Text align="center">
          Ссылка на вакансии будет добавлена.
        </Text>
      </Card>

      <Card title="Компания «Металл Профиль»">
        <Text align="center">
          <Link href="https://metallprofil.ru/shop/kompaniya-metall-profil/vakansii/" target="_blank" rel="noopener">
            Вакансии
          </Link>
        </Text>
      </Card>

      <Card title="АО «Екатеринбургский завод по обработке цветных металлов»">
        <Text align="center">
          <Link href="https://ezocm.ru/careers/vacansy/" target="_blank" rel="noopener">
            Вакансии
          </Link>
        </Text>
      </Card>

      <Card title="ПАО «Машиностроительный завод им. М.И. Калинина» — г. Екатеринбург">
        <Text align="center">
          <Link href="https://www.zik.ru/politics/career/jobs/" target="_blank" rel="noopener">
            Вакансии
          </Link>
        </Text>
      </Card>

      <Card title="АО «ОКБ „Новатор“»">
        <Text align="center">
          <Link href="https://www.okb-novator.ru/Vacancies" target="_blank" rel="noopener">
            Вакансии
          </Link>
        </Text>
      </Card>

      <Card title="ООО «Уральский завод химической продукции»">
        <Text align="center">
          <Link href="https://www.szn-ural.ru/Employer/DetailVacancy/?companyId=6074c985-3e61-456c-96de-864a5405d3aa" target="_blank" rel="noopener">
            Вакансии
          </Link>
        </Text>
      </Card>

      <Card title="Фабрика здорового питания">
        <Text align="center">
          <Link href="https://xn----7sbabc6bol3be6ae.xn--p1ai/vakansii/" target="_blank" rel="noopener">
            Вакансии
          </Link>
        </Text>
      </Card>

      <Card title="«Мегамарт» — г. Верхняя Пышма">
        <Text align="center">
          <Link href="https://verkhniaia-pyshma.spravker.ru/job/megamart5.htm" target="_blank" rel="noopener">
            Вакансии
          </Link>
        </Text>
      </Card>
    </CardGrid>

    <!-- Полезные материалы -->
    <Title>Полезные материалы для студентов и выпускников</Title>
    <CardGrid>
      <Card title="HeadHunter (Екатеринбург)">
        <Text align="center">
          <Link
            href="https://ekaterinburg.hh.ru/search/vacancy?text=&area=3&experience=doesNotMatter&search_period=30"
            target="_blank" rel="noopener"
          >
            Вакансии на hh.ru
          </Link>
        </Text>
      </Card>
      <Card title="Зарплата.ру">
        <Text align="center">
          <Link href="https://ekb.zarplata.ru/" target="_blank" rel="noopener">Вакансии</Link>
        </Text>
      </Card>
      <Card title="Rabota.ru">
        <Text align="center">
          <Link href="https://eburg.rabota.ru/" target="_blank" rel="noopener">Вакансии</Link>
        </Text>
      </Card>
      <Card title="Госслужба">
        <Text align="center">
          <Link href="https://gossluzhba.gov.ru/" target="_blank" rel="noopener">Вакансии</Link>
        </Text>
      </Card>
      <Card title="Работа в России">
        <Text align="center">
          <Link href="https://trudvsem.ru/" target="_blank" rel="noopener">trudvsem.ru</Link>
        </Text>
      </Card>
      <Card title="Факультетус (цифровая карьерная среда)">
        <Text align="center">
          <Link href="https://facultetus.ru/" target="_blank" rel="noopener">facultetus.ru</Link>
        </Text>
      </Card>
      <Card title="Work In Law (юридические вакансии)">
        <Text align="center">
          <Link href="https://workinlaw.ru/" target="_blank" rel="noopener">workinlaw.ru</Link>
        </Text>
      </Card>
    </CardGrid>

    <!-- Программы поддержки -->
    <Title>Программы и меры поддержки для молодых специалистов</Title>
    <Text align="justify">
      <Link href="https://xn--80adjbxl0aeb4ii6a.xn--p1ai/%D0%B5%D0%BA%D0%B1/#desc" target="_blank" rel="noopener">
        Время карьеры
      </Link>
      — региональные и отраслевые возможности для старта и развития карьеры.
    </Text>

    <!-- Презентация/баннер: пустые пути -->

    <TitledImage src="/images/профстаж.jpg" alt="Баннер проекта «Профстажировки 2.0»" />

    <!-- Контакты и режим работы -->
    <Title>Контакты</Title>
    <Text align="justify">
      <strong>Контактный телефон:</strong> Третяк Надежда Александровна<br />
      <strong>Эл. почта: </strong>
      <Link href="mailto:mtt.zam-upr@yandex.ru">mtt.zam-upr@yandex.ru</Link><br />
      <strong>Адрес:</strong> 624090, Свердловская область, г. Верхняя Пышма, ул. Кривоусова, д. 53, каб. 72.
    </Text>

    <Title>Время работы</Title>
    <Text align="left">
      понедельник–пятница: 09:00–16:00<br />
      перерыв: 12:00–13:00
    </Text>

 
  </Page>
</template>

<style scoped>
/* Дополнительных стилей не требуется: используется проп align="center" у компонента Text в карточках */
</style>
