<script setup>
import Button from '@/components/Button.vue';
import DropdownMenu from '@/components/DropdownMenu.vue';
import { ref, onMounted } from 'vue';

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
    
    if(count > 1) break;
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

// Данные для выпадающих меню
const menuItems = {
  basicInfo: [
    { text: 'Основнык сведения', route: '/svedeniya/osnovnye' },
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
    { text: 'Расписание занятий', route: '/studentu/raspisanie_zanyatiy' },
    { text: 'Учебные планы', route: '/studentu/uchebnye_plany' },
    { text: 'Графики', route: '/studentu/grafiki' },
    { text: 'Промежуточная аттестация', route: '/promejutochnaya_attestatsiya_' },
    { text: 'Государственная итоговая аттестация', route: '/studentu/gosudarstvennaya_itogovaya_attestatsiya' },
    { text: 'Конкурсы и олимпиады', route: '/studentu/nashi_dostijeniya' },
    { text: 'Образовательный кредит', route: '/studentu/obrazovatelnyy_kredit_' },
    { text: 'Доступ к библиотечным и электронным образовательным ресурсам', route: '/studentu/dostup_k_bibliotechnym_i_elektronnym_obrazovatelnym_resursam' },
    { text: 'Полезные ссылки', route: '/studentu/poleznye_ssylki' },
    { text: 'Педагог и наставник 2023', route: '/studentu/pedagog_i_nastavnik_2023' }
  ],
  applicants: [
    { text: 'Рейтинг', route: '/abiturientam/reyting_abiturientov' },
    { text: 'Профессионалитет', route: '/abiturientam/professionalitet' },
    { text: 'Правила приема', route: '/abiturientam/vpmtt_yunost' },
    { text: 'Кадетская школа-интернат', route: '/abiturientam/kadetskaya_shkola-internat' }
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
        <img src="/images/logo/logo.png" class="logo" />
        <h1 ref="titleElement" id="title" class="typing-text"></h1>
      </div>
      <div class="right">
        <img src="/images/icons/eye.svg" class="icon" />
        <div class="search">
          <input type="text" placeholder="Поиск..." />
        </div>
      </div>
    </div>
    <div class="navbar">
      <DropdownMenu text="Основные сведения" route="/" :items="menuItems.basicInfo" />
      <DropdownMenu text="Студентам" route="/news" :items="menuItems.students" />
      <DropdownMenu text="Абитуриентам" route="/timetable" :items="menuItems.applicants" />
      <DropdownMenu text="Структура" route="/students" :items="menuItems.structure" />
      <Button text="Новости" route="/novosti" />
      <Button text="Контакты" route="/kontakty" />
      <Button text="Личный кабинет" route="/login" />
    </div>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  height: 150px;
  background: linear-gradient(90deg,var(--orange) 0%, var(--soft-orange) 50%, var(--orange) 100%);
  margin-bottom: 20px;
}

.upper {
  padding-left: 340px;
  padding-right: 340px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  height: 50%;

  .left {
    display: flex;
    align-items: center;
    gap: 20px;

    .logo {
      height: 50px;
      width: auto;
    }

    h1 {
      font-size: 24px;
      font-weight: 700;
      color: var(--white);
    }
  }

  .right {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

.navbar {
  padding-left: 300px;
  padding-right: 300px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.search {
  display: inline-block;
  background: none;
  border-radius: 8px;
  padding: 10px 20px;
  transition: background 0.3s;
  cursor: pointer;
}

.search:hover {
  background: var(--soft-orange);
}

.search input {
  color: var(--black);
  font-weight: 600;
  font-size: 20px;
  transition: color 0.3s ease;
  background: transparent;
  border: none;
  outline: none;
  width: 100px;
}

.search input::placeholder {
  color: var(--white);
}

.search:hover input::placeholder {
  color: var(--black);
}

.typing-text::after {
  content: '|';
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>