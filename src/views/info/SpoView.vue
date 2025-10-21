<script setup>
import Page from '@/components/pages/Page.vue';
import Title from '@/components/pages/Title.vue';
import Text from '@/components/pages/Text.vue';
import Link from '@/components/pages/Link.vue';
import File from '@/components/pages/File.vue';
import CardGrid from '@/components/pages/CardGrid.vue';
import Card from '@/components/pages/Card.vue';
</script>

<template>
  <Page title="Среднее профессиональное образование">
    <Title>Среднее профессиональное образование</Title>

    <!-- Основная информация -->
    <Text align="justify">
      <p><strong>Реализуемые программы среднего профессионального образования:</strong></p>
      <File file="Лицензия.pdf" icon>Выписка из реестра лицензий</File>
      <File file="Реестровая выписка.pdf" icon>Свидетельство государственной аккредитации образовательных программ</File>
    </Text>

    <!-- Таблица сроков обучения -->
    <Text align="center">
      <table border="1" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
        <thead>
          <tr>
            <th style="width: 246px;">Программы</th>
            <th style="width: 208px;">Срок обучения (лет)</th>
            <th style="width: 208px;">Форма обучения</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Программы подготовки специалистов среднего звена</td>
            <td style="text-align: center;">3 года 10 месяцев<br />2 года 10 месяцев</td>
            <td style="text-align: center;">очная</td>
          </tr>
        </tbody>
      </table>
    </Text>

    <!-- Статистика обучающихся -->
    <Text align="justify">
      <p><strong>Обучается в образовательном учреждении:</strong></p>
      <p>на начало 01.01.2025 учебного года 1152 учащихся:</p>
      <ul>
        <li>687 человек обучается на бюджетной основе (очная форма)</li>
        <li>465 человек обучается на платной основе (очная форма)</li>
      </ul>
      <p><strong>Обучение в учреждении осуществляется на русском языке.</strong></p>
    </Text>

    <!-- Список образовательных программ -->
    <Text align="justify">
      <p><strong>Широкий выбор образовательных программ:</strong></p>
      <ul>
        <li>13.02.13 Эксплуатация и обслуживание электрического и электромеханического оборудования (по отраслям)</li>
        <li>22.02.08 Металлургическое производство (по видам производства)</li>
        <li>15.02.19 Сварочное производство</li>
        <li>18.02.12 Технология аналитического контроля химических соединений</li>
        <li>23.02.07 Техническое обслуживание и ремонт двигателей, систем и агрегатов автомобилей</li>
        <li>15.02.16 Технология машиностроения</li>
        <li>43.02.15 Поварское и кондитерское дело</li>
        <li>09.02.07 Информационные системы и программирование</li>
        <li>22.02.02 Металлургия цветных металлов</li>
        <li>15.02.14 Оснащение средствами автоматизации технологических процессов и производств</li>
        <li>43.02.17 Технология индустрии красоты</li>
        <li>13.02.11 Техническая эксплуатация и обслуживание электрического и электромеханического оборудования (по отраслям)</li>
        <li>15.02.08 Технология машиностроения</li>
      </ul>
      <p>А также программы профессионального обучения (подготовка, переподготовка, повышение квалификации) по профессиям.</p>
    </Text>

    <!-- Документы и ссылки -->
    <Text align="left">
      
      <!-- Основные документы -->
      <p><strong>Основные документы:</strong></p>
      <File file="Сводный годовой календарный график учебного процесса.pdf" icon>Сводный годовой календарный график учебного процесса</File>
      <File file="Справка об отсутствии адаптированных образовательных программ.pdf" icon>Справка об отсутствии адаптированных образовательных программ</File>
      <File file="Информация о результатах приема.pdf" icon>Информация о результатах приема</File>
   
      
      <!-- Графики и планы -->
      <p><strong>Графики и учебные планы:</strong></p>
      <Link linkTo="/students/graphici">Графики аттестации</Link><br />
      <Link linkTo="/info/uchebplanspo">Учебные планы по профессиональным образовательным программам</Link><br />
      <Link linkTo="/students/uchebnye_plany">Календарные учебные графики</Link>
      
      <!-- Образовательные программы -->
      <p><strong>Образовательные программы:</strong></p>
      <Link linkTo="/info/mainprofprog">Основные профессиональные образовательные программы</Link><br />
      <Link linkTo="https://cloud.mail.ru/public/ZFNj/bj3TdhhdE">Основная профессиональная образовательная программа 2023-2024 уч.год</Link><br />
      <Link linkTo="https://disk.yandex.ru/d/F5evAkEQhXn-qg">Основная профессиональная образовательная программа 2024-2025 уч.год (Профессионалитет)</Link><br />
      <Link linkTo="/info/realiz">Реализация дополнительных общеобразовательных общеразвивающих программ</Link>
      
      <!-- Учебные материалы -->
      <p><strong>Учебные материалы:</strong></p>
      <Link linkTo="https://drive.google.com/drive/folders/1qVK2tuuQMhO0wHwRlmti4TUrsr45JKzN">Программы 1 курса 2023-2024 уч.год</Link><br />
      <Link linkTo="https://drive.google.com/drive/folders/1jBE9Hey0-rAB8q7PE0tPndSVTMClmmC3">Программы 1 курса 2024-2025 учебного года</Link><br />
      <Link linkTo="https://cloud.mail.ru/public/oH5Q/bkLmnbmUo">Программы учебной и производственной практики</Link><br />

      
      <!-- Методические материалы -->
      <p><strong>Методические материалы:</strong></p>
      <Link linkTo="https://cloud.mail.ru/public/FKyn/7dTGbWetb">Методические разработки для педагогов</Link><br />
      <Link linkTo="https://disk.yandex.ru/d/NHU-E0sgBwjiHg">Рабочая программа воспитания</Link>
    </Text>
  </Page>
</template>