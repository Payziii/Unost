<script setup>
import { ref } from 'vue';
import Page from '@/components/pages/Page.vue';
import Title from '@/components/pages/Title.vue';
import Text from '@/components/pages/Text.vue';
import Highlight from '@/components/pages/Highlight.vue';
import Link from '@/components/pages/Link.vue';
import File from '@/components/pages/File.vue';
import CardGrid from '@/components/pages/CardGrid.vue';
import Card from '@/components/pages/Card.vue';

// состояние аккордеона
const openBlock = ref(null);
function toggleBlock(name) {
  openBlock.value = openBlock.value === name ? null : name;
}
</script>

<template>
  <Page title="Мониторинг объективности ГАПОУ СО «ВП МТТ «Юность» с отделением кадетской школы-интернат">
    <Title>Мониторинг объективности ГАПОУ СО «ВП МТТ «Юность» с отделением кадетской школы-интернат</Title>

    <!-- Пункт 1 -->
    <div class="accordion-item" @click="toggleBlock('item1')">
      <div class="accordion-header">
        <span class="menu-title">1. Наличие приказов об утверждении сроков, ответственных, порядка, регламентов проведения независимых оценочных процедур (ВПР, ОГЭ, ЕГЭ и олимпиад школьников)</span>
      </div>
      <transition name="fade">
        <div v-show="openBlock === 'item1'" class="accordion-content" @click.stop>
          <Text align="left">
            <File file="График проведения ВПР.pdf" icon>График проведения ВПР</File>
            <File file="О проведении итогового собеседования по русскому языку для обучающихся, освоивших образовательные программы ОО.pdf" icon>О проведении итогового собеседования по русскому языку для обучающихся, освоивших образовательные программы ОО</File>
            <File file="О проведении школьного этапа олимпиады школьников.pdf" icon>О проведении школьного этапа олимпиады школьников</File>
            <File file="Об организации проведения мониторинга формирования функциональной грамотности.pdf" icon>Об организации проведения мониторинга формирования функциональной грамотности</File>
            <File file="Об участии в проведении ВПР 5-8 кл.pdf" icon>Об участии в проведении ВПР 5-8 кл</File>
            <File file="Об участии в проведении ВПР 5-9кл осенью 2020.pdf" icon>Об участии в проведении ВПР 5-9кл осенью 2020</File>
            <File file="Об участии в проведении ВПР.pdf" icon>Об участии в проведении ВПР</File>
            <File file="Об участии в проведении ВПР_ История_11кл.pdf" icon>Об участии в проведении ВПР_ История_11кл</File>
          </Text>
        </div>
      </transition>
    </div>

    <!-- Пункт 2 -->
    <div class="accordion-item" @click="toggleBlock('item2')">
      <div class="accordion-header">
        <span class="menu-title">2. Наличие приказа (или иного документа) об обеспечении объективности процедур оценки качества образования и олимпиад школьников, предусматривающего предварительное коллегиальное обсуждение подходов к оцениванию</span>
      </div>
      <transition name="fade">
        <div v-show="openBlock === 'item2'" class="accordion-content" @click.stop>
          <Text align="left">
            <File file="Положение о внутренней системе оценки качества образования в кадетской школе-интернат.pdf" icon>Положение о внутренней системе оценки качества образования в кадетской школе-интернат</File>
          </Text>
        </div>
      </transition>
    </div>

    <!-- Пункт 3 -->
    <div class="accordion-item" @click="toggleBlock('item3')">
      <div class="accordion-header">
        <span class="menu-title">3. Наличие принятых прозрачных критериев внутришкольного и итогового оценивания в образовательной организации</span>
      </div>
      <transition name="fade">
        <div v-show="openBlock === 'item3'" class="accordion-content" @click.stop>
          <Text align="left">
            <File file="Методические рекомендации по УУД.pdf" icon>Методические рекомендации по УУД</File>
            <File file="Положение о порядке выставления текущих, четвертных, полугодовых, годовых и итоговых отметок в кадетской школе-интернат.pdf" icon>Положение о порядке выставления текущих, четвертных, полугодовых, годовых и итоговых отметок в кадетской школе-интернат</File>
            <File file="Положение о формах, периодичности и порядке текущего контроля успеваемости и промежуточной аттестации обучающихся кадетской школы-интернат.pdf" icon>Положение о формах, периодичности и порядке текущего контроля успеваемости и промежуточной аттестации обучающихся кадетской школы-интернат</File>
          </Text>
        </div>
      </transition>
    </div>

    <!-- Пункт 4 -->
    <div class="accordion-item" @click="toggleBlock('item4')">
      <div class="accordion-header">
        <span class="menu-title">4. Наличие системы подготовки общественных наблюдателей за процедурами оценки качества образования и олимпиад школьников</span>
      </div>
      <transition name="fade">
        <div v-show="openBlock === 'item4'" class="accordion-content" @click.stop>
          <Text align="left">
            <File file="Регламент процедуры общественного наблюдения при проведении олимпиад, конрольных, ВПР, ДКР.pdf" icon>Регламент процедуры общественного наблюдения при проведении олимпиад, конрольных, ВПР, ДКР</File>
          </Text>
        </div>
      </transition>
    </div>

    <!-- Пункт 5 -->
    <div class="accordion-item" @click="toggleBlock('item5')">
      <div class="accordion-header">
        <span class="menu-title">5. Наличие графика выходов общественных наблюдателей на наблюдение за проведением процедуры оценки качества образования и олимпиад школьников с указанием сроков, образовательных организаций</span>
      </div>
      <transition name="fade">
        <div v-show="openBlock === 'item5'" class="accordion-content" @click.stop>
          <Text align="left">
            <File file="График выхода общественных наблюдателей на наблюдение.pdf" icon>График выхода общественных наблюдателей на наблюдение</File>
          </Text>
        </div>
      </transition>
    </div>

    <!-- Пункт 6 -->
    <div class="accordion-item" @click="toggleBlock('item6')">
      <div class="accordion-header">
        <span class="menu-title">6. Обеспечение видеонаблюдения за проведением процедуры оценки качества образования и олимпиад школьников и проверки работ участников</span>
      </div>
      <transition name="fade">
        <div v-show="openBlock === 'item6'" class="accordion-content" @click.stop>
          <Text align="left">
            <File file="Регламент использования системы наблюдения.pdf" icon>Положение о системе видеонаблюдения</File>
          </Text>
        </div>
      </transition>
    </div>

    <!-- Пункт 7 -->
    <div class="accordion-item" @click="toggleBlock('item7')">
      <div class="accordion-header">
        <span class="menu-title">7. Отсутствие ситуации конфликта интересов в отношении учителей и общественных наблюдателей из числа родителей</span>
      </div>
      <transition name="fade">
        <div v-show="openBlock === 'item7'" class="accordion-content" @click.stop>
          <Text align="left">
            <File file="Порядок создания, организации работы и принятия решений комиссией по урегулированию споров.pdf" icon>Порядок создания, организации работы и принятия решений комиссией по урегулированию споров</File>
            <File file="Приложение 1.pdf" icon>Приложение 1</File>
            <File file="Приложение 2.pdf" icon>Приложение 2</File>
            <File file="Приложение 3.pdf" icon>Приложение 3</File>
            <File file="Приложение 4.pdf" icon>Приложение 4</File>
            <File file="Приложение 5.pdf" icon>Приложение 5</File>
          </Text>
        </div>
      </transition>
    </div>

    <!-- Пункт 8 -->
    <div class="accordion-item" @click="toggleBlock('item8')">
      <div class="accordion-header">
        <span class="menu-title">8. Наличие информационной (аналитической) справки о результатах обеспечения в образовательных организациях объективности проведения процедур оценки качества образования и олимпиад школьников</span>
      </div>
      <transition name="fade">
        <div v-show="openBlock === 'item8'" class="accordion-content" @click.stop>
          <Text align="left">
            <File file="Аналитический отчет о результатах ВПР за 2019-2020 уч.год.pdf" icon>Аналитический отчет о результатах ВПР за 2019-2020 уч.год</File>
            <File file="Информационная справка о результатах обеспечения.pdf" icon>Информационная справка о результатах обеспечения</File>
            <File file="Система внутришкольных мер по подготовке и проведению ВПР в 2020-2021 учебном году.pdf" icon>Система внутришкольных мер по подготовке и проведению ВПР в 2020-2021 учебном году</File>
          </Text>
        </div>
      </transition>
    </div>

    <!-- Пункт 9 -->
    <div class="accordion-item" @click="toggleBlock('item9')">
      <div class="accordion-header">
        <span class="menu-title">9. Проверка всероссийских проверочных работ и олимпиад школьников осуществляется комиссией образовательной организации, состоящей из педагогов, не работающих в классе, работы которого проверяются</span>
      </div>
      <transition name="fade">
        <div v-show="openBlock === 'item9'" class="accordion-content" @click.stop>
          <Text align="left">
            <File file="Графики проверки ВПР по географии 2021.pdf" icon>Графики проверки ВПР по географии 2021</File>
            <File file="Графики проверки ВПР по истории 2021.pdf" icon>Графики проверки ВПР по истории 2021</File>
            <File file="Графики проверки ВПР по математике 2021.pdf" icon>Графики проверки ВПР по математике 2021</File>
          </Text>
        </div>
      </transition>
    </div>



    <!-- Пункт 10 -->
    <div class="accordion-item" @click="toggleBlock('item11')">
      <div class="accordion-header">
        <span class="menu-title">10. Наличие плана мероприятий по повышению объективности оценки качества образования и олимпиад школьников в образовательной организации</span>
      </div>
      <transition name="fade">
        <div v-show="openBlock === 'item11'" class="accordion-content" @click.stop>
          <Text align="left">
            <File file="О мероприятиях по итогам ВПР.pdf" icon>О мероприятиях по итогам ВПР</File>
            <File file="План мероприятий по повышению объективности оценки образовательных результатов в 2020-2021 учебном году.pdf" icon>План мероприятий по повышению объективности оценки образовательных результатов в 2020-2021 учебном году</File>
            <File file="План прохождения инструктажа.pdf" icon>План прохождения инструктажа</File>
          </Text>
        </div>
      </transition>
    </div>

    <!-- Пункт 11 -->
    <div class="accordion-item" @click="toggleBlock('item12')">
      <div class="accordion-header">
        <span class="menu-title">11. Наличие самостоятельно разработанных процедур общественной экспертизы качества образования в образовательной организации</span>
      </div>
      <transition name="fade">
        <div v-show="openBlock === 'item12'" class="accordion-content" @click.stop>
          <Text align="left">
            <File file="Положение об общественной экспертизе деятельности и качества образования в ГАПОУ СО ВП МТТ Юность.pdf" icon>Положение об общественной экспертизе деятельности и качества образования в ГАПОУ СО ВП МТТ Юность</File>
          </Text>
        </div>
      </transition>
    </div>

    <!-- Пункт 12 -->
    <div class="accordion-item" @click="toggleBlock('item13')">
      <div class="accordion-header">
        <span class="menu-title">12. Систематическая трансляция эффективного административного и педагогического опыта на другие образовательные организации</span>
      </div>
      <transition name="fade">
        <div v-show="openBlock === 'item13'" class="accordion-content" @click.stop>
          <Text align="left">
            <File file="Информационная справка по систематической трансляции эффективного административного и педагогического опыта.pdf" icon>Информационная справка по систематической трансляции эффективного административного и педагогического опыта</File>
          </Text>
        </div>
      </transition>
    </div>

    <!-- Пункт 13 -->
    <div class="accordion-item" @click="toggleBlock('item14')">
      <div class="accordion-header">
        <span class="menu-title">13. Наличие повышения объективности оценивания результатов независимых процедур оценки качества образования и олимпиад школьников (глубина 3 года)</span>
      </div>
      <transition name="fade">
        <div v-show="openBlock === 'item14'" class="accordion-content" @click.stop>
          <Text align="left">
            <File file="Информационная справка по наличию повышения объективности.pdf" icon>Информационная справка по наличию повышения объективности</File>
          </Text>
        </div>
      </transition>
    </div>

    <!-- Пункт 14 -->
    <div class="accordion-item" @click="toggleBlock('item15')">
      <div class="accordion-header">
        <span class="menu-title">14. Реализация программ помощи учителям, имеющим профессиональные проблемы и дефициты в части оценивания результатов обучающихся и олимпиад школьников (повышение квалификации, внутришкольное обучение и самообразование, другое)</span>
      </div>
      <transition name="fade">
        <div v-show="openBlock === 'item15'" class="accordion-content" @click.stop>
          <Text align="left">
            <File file="Реализация программы помощи учителям, имеющим проффессиональные проблемы и дефициты в части оценивания результатов обучающихся и олимпиад.pdf" icon>Реализация программы помощи учителям, имеющим проффессиональные проблемы и дефициты в части оценивания результатов обучающихся и олимпиад</File>
          </Text>
        </div>
      </transition>
    </div>

    <!-- Пункт 15 -->
    <div class="accordion-item" @click="toggleBlock('item16')">
      <div class="accordion-header">
        <span class="menu-title">15. Проведение учителями и методическими объединениями аналитической и экспертной работы с результатами процедур оценки качества образования и олимпиад школьников</span>
      </div>
      <transition name="fade">
        <div v-show="openBlock === 'item16'" class="accordion-content" @click.stop>
          <Text align="left">
            <File file="Протокол №5.pdf" icon>Протокол №5</File>
            <File file="Протокол №6.pdf" icon>Протокол №6</File>
            <File file="Протокол №8.pdf" icon>Протокол №8</File>
            <File file="Протокол №9.pdf" icon>Протокол №9</File>
          </Text>
        </div>
      </transition>
    </div>

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
.menu-title {
  font-size: 1rem;
  line-height: 1.4;
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