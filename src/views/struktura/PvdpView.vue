<script setup>
import { ref } from 'vue';
import Page from '@/components/pages/Page.vue';
import Title from '@/components/pages/Title.vue';
import Text from '@/components/pages/Text.vue';
import Highlight from '@/components/pages/Highlight.vue';
import Link from '@/components/pages/Link.vue';
import File from '@/components/pages/File.vue';
import CardGrid from '@/components/pages/CardGrid.vue';
import TitledImage from '@/components/pages/TitledImage.vue';

// состояние аккордеона
const openBlock = ref(null);
function toggleBlock(name) {
  openBlock.value = openBlock.value === name ? null : name;
}
</script>

<template>
  <Page title="Центр ПВиДП им. Г.К. Жукова">
    <Title>Центр ПВиДП</Title>

    <!-- 🔹 ДОКУМЕНТАЦИЯ ЦЕНТРА -->
    <div class="accordion-item" @click="toggleBlock('docs')">
      <div class="accordion-header"><Highlight>ДОКУМЕНТАЦИЯ ЦЕНТРА</Highlight></div>
      <transition name="fade">
        <div v-show="openBlock === 'docs'" class="accordion-content">
          <Text align="left">
            <File file="Приказ Министерства о создании Центра ПВиДП.pdf" icon>Приказ Министерства о создании Центра ПВиДП</File>
            <File file="Приказ о присвоении Центру ПВиДП имени Г.К. Жукова.pdf" icon>Приказ о присвоении Центру ПВиДП имени Г.К. Жукова</File>
            <File file="Положение о Центре ПВиДП ГАПОУ СО ВПМТТ Юность.pdf" icon>Положение о Центре ПВиДП ГАПОУ СО ВПМТТ «Юность»</File>
            <File file="Программа Служить России.pdf" icon>ПРОГРАММА «СЛУЖИТЬ РОССИИ»</File>
            <File file="Положение о волонтерском объединении Юность.pdf" icon>Положение о волонтерском объединении «Юность»</File>
            <File file="Соглашение о сотрудничестве с Волонтёрским центром Свердловской области.pdf" icon>Соглашение о сотрудничестве с Региональной общественной организацией «Волонтёрский центр Свердловской области»</File>
            <File file="Соглашение о сотрудничестве с Ресурсным центром добровольчества Сила Урала.pdf" icon>Соглашение о сотрудничестве с Региональной общественной организацией «Ресурсный центр добровольчества Сила Урала»</File>
            <File file="Соглашение о сотрудничестве с Региональным Центром ПВ.pdf" icon>Соглашение о сотрудничестве с Региональным Центром ПВ</File>
            <File file="План мероприятий по ГЗ на 2023 год Центра ПВиДП МТТ Юность.pdf" icon>План мероприятий по ГЗ на 2023 год Центра ПВиДП МТТ «Юность»</File>
            <File file="Отчет Центра ПВиДП за 2 семестр.pdf" icon>Отчет Центра ПВиДП за 2 семестр</File>
            <File file="План работы Центра ПВиДП на 2023-2024 гг.pdf" icon>План работы Центра ПВиДП на 2023–2024 гг.</File>
          </Text>
        </div>
      </transition>
    </div>

    <!-- 🔹 ИНФОРМАЦИЯ О МЕРОПРИЯТИЯХ -->
    <div class="accordion-item" @click="toggleBlock('events')">
      <div class="accordion-header"><Highlight>ИНФОРМАЦИЯ О МЕРОПРИЯТИЯХ ЦЕНТРА</Highlight></div>
      <transition name="fade">
        <div v-show="openBlock === 'events'" class="accordion-content">
          <Text align="left">
            <File file="Положение Квест-игра 2024.pdf" icon>Положение Квест-игра 2024</File>
            <File file="Патриотический урок Исторический путь 90 лет Свердловской области.pdf" icon>Патриотический урок «Исторический путь», посвященный 90-летию Свердловской области</File>
            <File file="Исторический путь 90 лет Свердловской области.pdf" icon>Исторический путь (90 лет Свердловской области)</File>
            <File file="Приказ №53-уч от 20.03.2023 О присвоении звания Мастер-кадет.pdf" icon>Приказ №53-уч от 20.03.2023 г. «О присвоении звания Мастер-кадет»</File>
            <File file="Положение о проведении Квест-игры Сын своего времени 2023.pdf" icon>Положение о проведении областной Квест-игры «Сын своего времени» – 2023</File>
            <File file="Программа Летних сборов по парашютной подготовке 2023.pdf" icon>Программа Летних сборов по парашютной подготовке – 2023</File>
            <File file="Положение о проведении Летних сборов по парашютной подготовке.pdf" icon>Положение о проведении Летних сборов по парашютной подготовке</File>
            <File file="Положение о проведении Зарницы 2023 Западного управленческого округа.pdf" icon>Положение о проведении Зарницы-2023 Западного управленческого округа</File>
            <File file="Сценарий 30-летия Фонда Жукова.pdf" icon>Сценарий 30-летия Фонда Жукова</File>
            <File file="Программа семинара-практикума Время быть патриотом.pdf" icon>Программа семинара-практикума «Время быть патриотом»</File>
            <File file="Положение Мастер-кадет.pdf" icon>Положение «Мастер-кадет»</File>
          </Text>
        </div>
      </transition>
    </div>

    <!-- 🔹 ВОЛОНТЕРСКОЕ ОБЪЕДИНЕНИЕ -->
    <div class="accordion-item" @click="toggleBlock('volunteers')">
      <div class="accordion-header"><Highlight>ВОЛОНТЕРСКОЕ ОБЪЕДИНЕНИЕ "ЮНОСТЬ"</Highlight></div>
      <transition name="fade">
        <div v-show="openBlock === 'volunteers'" class="accordion-content">
          <Text align="left">
            <File file="Положение о волонтерском объединении Юность.pdf" icon>Положение о волонтерском объединении «Юность»</File>
            <File file="План работы волонтерского объединения Юность на 2023-2024г.pdf" icon>План работы волонтерского объединения «Юность» на 2023–2024 гг.</File>
            <File file="Соглашение о сотрудничестве с Волонтёрским центром Свердловской области.pdf" icon>Соглашение о сотрудничестве с Региональной общественной организацией «Волонтёрский центр Свердловской области»</File>
            <File file="Соглашение о сотрудничестве с Ресурсным центром добровольчества Сила Урала.pdf" icon>Соглашение о сотрудничестве с Региональной общественной организацией «Ресурсный центр добровольчества Сила Урала»</File>
            <File file="Положение о логотипе волонтерского объединения Юность.pdf" icon>Положение о логотипе волонтерского объединения «Юность»</File>
            <File file="Калейдоскоп дел волонтерского объединения.pdf" icon>Калейдоскоп дел волонтерского объединения</File>
            <File file="Экскурс по работе волонтерского объединения Юность.pdf" icon>Экскурс по работе волонтерского объединения «Юность»</File>
            <File file="Трудовой декабрь волонтерского объединения Юность 10000 добрых дел.pdf" icon>Трудовой декабрь волонтерского объединения «Юность» в рамках областной акции «10000 добрых дел»</File>
          </Text>
        </div>
      </transition>
    </div>

    <!-- 🔹 Основной контент -->
    <Title>ЦЕНТР ПАТРИОТИЧЕСКОГО ВОСПИТАНИЯ И ДОПРИЗЫВНОЙ ПОДГОТОВКИ имени Маршала Советского Союза Георгия Константиновича ЖУКОВА</Title>

    <Text align="center">
      <TitledImage src="/images/центр ПВДП.jpg" alt="Руководители" />
    </Text>

    <Text align="justify">
      30 ноября 2011 года на базе ГБОУ СПО СО ВПМТТ «Юность» открылось структурное подразделение —
      Центр патриотического воспитания и допризывной подготовки, который реализует задачи по военно-патриотическому
      воспитанию обучающихся и молодежи, подготовке ее к военной службе.
    </Text>

    <Text align="center">
      <TitledImage src="/images/загрузка.png" />
    </Text>

    <Text align="justify">
      Центр патриотического воспитания и допризывной подготовки имени маршала Г.К. Жукова, как подразделение механико-технологического техникума «Юность», создан в 2011 году. 
      В 2012 г. при поддержке Фонда Г.К. Жукова Центру присвоено имя Маршала Советского Союза Георгия Константиновича Жукова. 
      В настоящее время Центр работает по Программе «Служить России» (2020–2024), соответствующей государственной и региональной стратегии патриотического воспитания.
    </Text>

    <Text align="center">
      <TitledImage src="/images/схема(1).jpg" />
    </Text>

    <Text align="center">
      <TitledImage src="/images/схема 2.jpg" />
    </Text>

    <Title>Основные направления деятельности Центра</Title>
    <Text align="justify">
      • Совершенствование процесса патриотического воспитания.<br/>
      • Организация социально открытого пространства для духовно-нравственного развития.<br/>
      • Повышение уровня информационного обеспечения.<br/>
      • Развитие волонтерского движения.<br/>
      • Развитие научно-методических основ воспитания.
    </Text>

    <!-- 🔹 Контакты и соцсети -->
    <Text align="left">
      <Highlight>Наши социальные сети:</Highlight><br/>
      <Link linkTo="mailto:centr-pv2013@yandex.ru">centr-pv2013@yandex.ru</Link><br/>
      <Link linkTo="https://vk.com/public193895113">ВКонтакте</Link>
    </Text>

    <!-- 🔹 Доп. разделы -->
    <Text align="left" class="mt-6">
      <Link linkTo="/publications">ПУБЛИКАЦИИ</Link><br/>
      <File file="Страницы истории Центра ПВиДП им. Г.К. Жукова.pdf" icon>СТРАНИЦЫ ИСТОРИИ ЦЕНТРА ПВиДП ИМ. Г.К. ЖУКОВА</File>
    </Text>
  </Page>
</template>

<style scoped>
.accordion-item {
  margin-bottom: 1rem;
  border-radius: 12px;
  background: #f8f8f8;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.accordion-header {
  cursor: pointer;
  padding: 1rem;
  font-weight: 600;
  transition: background 0.3s;
}
.accordion-header:hover {
  background: #efefef;
}
.accordion-content {
  padding: 0 1rem 1rem 1rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
