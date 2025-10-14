<script setup>
import Button from '@/components/Button.vue';
import Button2 from '@/components/Button2.vue';
import DropdownMenu from '@/components/DropdownMenu.vue';
import { ref, onMounted } from 'vue';

const isMenuOpen = ref(false);
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);

const titleElement = ref(null);
const titles = [
  "ГАПОУ СО Верхнепышминский механико-технологический техникум «Юность»",
  "ГАПОУ СО Верхнепышминский механико-технологический техникум «Юность»"
];
let isAnimating = false;

const typeWriter = async (element, titlesArray, speed = 100) => {
  if (isAnimating) return;
  isAnimating = true;
  let count = 0;
  while (true) {
    const text = titlesArray[Math.floor(Math.random() * titlesArray.length)];
    for (let i = 0; i <= text.length; i++) {
      element.textContent = text.substring(0, i);
      await new Promise(resolve => setTimeout(resolve, speed));
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (count > 1) break;
    for (let i = text.length; i >= 0; i--) {
      element.textContent = text.substring(0, i);
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    await new Promise(resolve => setTimeout(resolve, 50));
    count++;
  }
};

onMounted(() => {
  if (titleElement.value) {
    typeWriter(titleElement.value, titles, 100);
  }
});

const menuItems = {
  basicInfo: [
    { text: 'Основные сведения', route: '/svedeniya/osnovnye' },
    { text: 'Структура и органы управления образовательной организацией', route: '/svedeniya/struktura_i_organy_upravleniya' },
    { text: 'Документы', route: '/svedeniya/dokumenty' },
    { text: 'Образование', route: '/svedeniya/obrazovanie' },
    { text: 'Руководство', route: '/svedeniya/rukovodstvo' },
    { text: 'Педагогический состав', route: '/svedeniya/pedagogicheskiy_sostav' },
    { text: 'Образовательные стандарты', route: '/svedeniya/standarty' },
    { text: 'Материально-техническое обеспечение и оснащение образовательного процесса', route: '/svedeniya/mto' },
    { text: 'Доступная среда', route: '/svedeniya/dostupnaya_sreda' },
    { text: 'Платные образовательные услуги', route: '/svedeniya/platnye_obrazovatelnye_uslugi' },
    { text: 'Финансово-хозяйственная деятельность', route: '/svedeniya/fhd' },
    { text: 'Вакантные места для приема (перевода)', route: '/svedeniya/vakantnye_mesta' },
    { text: 'Стипендии и меры поддержки обучающихся ', route: '/svedeniya/matpodderjka' },
    { text: 'Международное сотрудничество ', route: '/svedeniya/sotsialnye_partnery_' },
    { text: 'Предписания органов, осуществляющих государственный контроль (надзор)', route: '/svedeniya/predpisaniya' },
    { text: 'Независимая оценка качества', route: '/svedeniya/nezavisimaya_otsenka_kachestva_okazaniya_uslug' },
    { text: 'Центр карьеры', route: '/svedeniya/trudoustroystvo' },
    { text: 'Вакансии', route: '/svedeniya/vakansii' },
    { text: 'Противодействие коррупции', route: '/svedeniya/protivodeystvie_korruptsii' }
  ],
  students: [
    { text: 'Расписание занятий', route: '/students/raspisanie_zanyatiy' },
    { text: 'Учебные планы', route: '/students/uchebnye_plany' },
    { text: 'Графики', route: '/students/graphici' },
    { text: 'Промежуточная аттестация', route: '/students/promezhut' },
    { text: 'Государственная итоговая аттестация', route: '/students/gia' },
    { text: 'Конкурсы и олимпиады', route: '/students/konkursi' },
    { text: 'Образовательный кредит', route: '/students/credit' },
    { text: 'Доступ к библиотечным и электронным образовательным ресурсам', route: '/students/library' },
    { text: 'Полезные ссылки', route: '/students/links' },
    { text: 'Педагог и наставник 2023', route: '/students/pedagog' }
  ],
  applicants: [
    { text: 'Рейтинг', route: '/applicants/reyting_abiturientov' },
    { text: 'Профессионалитет', route: '/applicants/professionalitet' },
    { text: 'Правила приема', route: '/applicants/priem' },
    { text: 'Кадетская школа-интернат', route: '/applicants/kadetskaya_shkola-internat' }
  ],
  structure: [
    { text: 'О нас', route: '/info/simvolika' },
    { text: 'Кадетская школа-интернат', route: '/info/kshi' },
    { text: 'Центр ПВиДП', route: '/info/tsentr_pvidp_' },
    { text: 'Центр проведения демонстрационных экзаменов ', route: '/info/tsentr_provedeniya_demonstratsionnyh_ekzamenov_world_skills' },
    { text: 'Федеральный проект "Содействие занятости"', route: '/info/federalnyy_proekt_sodeystvie_zanyatosti' },
    { text: 'Проектная деятельность', route: '/info/proektnaya_deyatelnost' },
    { text: 'Центр профилактики детского дорожно-транспортного травматизма «Лаборатория безопасности»', route: '/info/laboratoriya_bezopasnosti_sverdlovskaya_oblast' },
    { text: 'Учебно-производственный комплекс', route: '/info/uchebno-proizvodstvennyy_kompleks' },
    { text: 'Автошкола', route: '/info/avtoshkola' },
    { text: 'Студенческий спортивный клуб', route: '/info/studencheskiy_sportivnyy_klub' },
    { text: 'Профсоюз', route: '/info/profsoyuz' },
    { text: 'Раскрытие информации', route: '/info/raskrytie_informatsii' },
    { text: 'Информация о доступности объектов Учреждения', route: '/info/informatsiya_o_dostupnosti_obyektov_uchrejdeniya' },
    { text: '«Сообщи, где торгуют смертью»', route: '/info/gde_torguyut_smertyu_' }
  ]
};
</script>

<template>
  <div class="header">
    <div class="upper">
      <div class="left">
        <router-link to="/" class="logo-wrap">
          <img src="/images/logo/logo.png" class="logo" />
          <div class="texta">
            <h1>ВПМТТ «Юность»</h1>
            <h2>Механико-технологический техникум</h2>
          </div>
        </router-link>

        <div class="nav-links">
          <DropdownMenu text="О техникуме" route="/" :items="menuItems.basicInfo" />
          <DropdownMenu text="Студентам" route="/" :items="menuItems.students" />
          <DropdownMenu text="Абитуриентам" route="/" :items="menuItems.applicants" />
          <DropdownMenu text="Структура" route="/" :items="menuItems.structure" />
          <Button text="Контакты" route="/kontakty" />
          <Button text="Личный кабинет" route="/login" />
        </div>

        <button class="burger" @click="toggleMenu">☰</button>
      </div>

      <Button2 text="Подать заявку" route="/novosti" />
    </div>

    <transition name="slide">
      <div class="mobile-menu" v-if="isMenuOpen">
        <DropdownMenu text="О техникуме" route="/" :items="menuItems.basicInfo" />
        <DropdownMenu text="Студентам" route="/" :items="menuItems.students" />
        <DropdownMenu text="Абитуриентам" route="/" :items="menuItems.applicants" />
        <DropdownMenu text="Структура" route="/" :items="menuItems.structure" />
        <Button text="Контакты" route="/kontakty" />
        <Button text="Личный кабинет" route="/login" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  background-color: var(--orang);
  margin-bottom: 20px;
}

.upper {
  padding: 0 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 75px;
}

.left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.logo {
  height: 50px;
  width: auto;
}

h1 {
  font-size: 18px;
  font-weight: 700;
  color: var(--white);
}

h2 {
  font-size: 14px;
  color: var(--white);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 10px;
}

.burger {
  display: none;
  background: none;
  border: none;
  color: var(--white);
  font-size: 26px;
  cursor: pointer;
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  background: var(--orang);
  padding: 10px 20px;
  gap: 10px;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* адаптивность */
@media (max-width: 900px) {
  .nav-links {
    display: none;
  }

  .burger {
    display: block;
  }

  .upper {
    padding: 0 20px;
  }

  .texta h1 {
    font-size: 16px;
  }

  .texta h2 {
    font-size: 12px;
  }
}
</style>
