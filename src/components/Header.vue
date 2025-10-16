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
          <Button 
            text="Личный кабинет" 
            :route="profileRoute" 
            @click="handleProfileClick"
          />
        </div>

        <button class="burger" @click="toggleMenu">☰</button>
      </div>

      <!-- ПК-кнопка -->
      <Button2 class="desktop-apply" text="Подать заявку" route="/novosti" />
    </div>

    <!-- Мобильное бургер-меню -->
    <transition name="slide">
      <div class="mobile-menu" v-if="isMenuOpen">
        <DropdownMenu text="О техникуме" route="/" :items="menuItems.basicInfo" />
        <DropdownMenu text="Студентам" route="/" :items="menuItems.students" />
        <DropdownMenu text="Абитуриентам" route="/" :items="menuItems.applicants" />
        <DropdownMenu text="Структура" route="/" :items="menuItems.structure" />
        <Button text="Контакты" route="/kontakty" />
        <Button 
          text="Личный кабинет" 
          :route="profileRoute" 
          @click="handleProfileClick"
        />
        <!-- Мобильная версия кнопки "Подать заявку" -->
        <Button2 class="mobile-apply" text="Подать заявку" route="/novosti" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import Button from '@/components/Button.vue';
import Button2 from '@/components/Button2.vue';
import DropdownMenu from '@/components/DropdownMenu.vue';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isMenuOpen = ref(false);

// Реактивные данные для пользователя
const userRole = ref('');
const isLoggedIn = ref(false);

const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);

// Функция для проверки статуса авторизации
const checkAuthStatus = () => {
  const token = localStorage.getItem('token');
  userRole.value = localStorage.getItem('user_role') || '';
  isLoggedIn.value = !!token;
};

// Вычисляемое свойство для маршрута профиля
const profileRoute = computed(() => {
  if (!isLoggedIn.value) return '/login';
  return userRole.value === 'admin' ? '/admin/kniga-zhalob' : '/profile';
});

// Обработчик клика по кнопке профиля
const handleProfileClick = (event) => {
  // Если пользователь авторизован как админ, перенаправляем в админ-панель
  if (isLoggedIn.value && userRole.value === 'admin') {
    event.preventDefault();
    router.push('/admin/kniga-zhalob');
  }
  // Закрываем мобильное меню после клика
  isMenuOpen.value = false;
};

onMounted(() => {
  checkAuthStatus();
});

const menuItems = {
  basicInfo: [
    { text: 'Основные сведения', route: '/info/maininfo' },
    { text: 'Структура и органы управления образовательной организацией', route: '/info/structure' },
    { text: 'Документы', route: '/info/dokumenty' },
    { text: 'Образование', route: '/info/obrazovanie' },
    { text: 'Руководство', route: '/info/rukovodstvo' },
    { text: 'Педагогический состав', route: '/info/pedagogicheskiy_sostav' },
    { text: 'Образовательные стандарты', route: '/info/standarty' },
    { text: 'Материально-техническое обеспечение и оснащение образовательного процесса', route: '/info/mto' },
    { text: 'Доступная среда', route: '/info/dostupnaya_sreda' },
    { text: 'Платные образовательные услуги', route: '/info/platnye_obrazovatelnye_uslugi' },
    { text: 'Финансово-хозяйственная деятельность', route: '/info/fhd' },
    { text: 'Вакантные места для приема (перевода)', route: '/info/vakantnye_mesta' },
    { text: 'Стипендии и меры поддержки обучающихся ', route: '/info/matpodderjka' },
    { text: 'Международное сотрудничество ', route: '/info/sotsialnye_partnery_' },
    { text: 'Предписания органов, осуществляющих государственный контроль (надзор)', route: '/info/predpisaniya' },
    { text: 'Независимая оценка качества', route: '/info/nezavisimaya_otsenka_kachestva_okazaniya_uslug' },
    { text: 'Центр карьеры', route: '/info/trudoustroystvo' },
    { text: 'Вакансии', route: '/info/vakansii' },
    { text: 'Противодействие коррупции', route: '/info/protivodeystvie_korruptsii' }
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
    { text: 'О нас', route: '/structure/simvolika' },
    { text: 'Кадетская школа-интернат', route: '/structure/kshi' },
    { text: 'Центр ПВиДП', route: '/structure/tsentr_pvidp_' },
    { text: 'Центр проведения демонстрационных экзаменов ', route: '/structure/tsentr_provedeniya_demonstratsionnyh_ekzamenov_world_skills' },
    { text: 'Федеральный проект "Содействие занятости"', route: '/structure/federalnyy_proekt_sodeystvie_zanyatosti' },
    { text: 'Проектная деятельность', route: '/structure/proektnaya_deyatelnost' },
    { text: 'Центр профилактики детского дорожно-транспортного травматизма «Лаборатория безопасности»', route: '/structure/laboratoriya_bezopasnosti_sverdlovskaya_oblast' },
    { text: 'Учебно-производственный комплекс', route: '/structure/uchebno-proizvodstvennyy_kompleks' },
    { text: 'Автошкола', route: '/structure/avtoshkola' },
    { text: 'Студенческий спортивный клуб', route: '/structure/studencheskiy_sportivnyy_klub' },
    { text: 'Профсоюз', route: '/structure/profsoyuz' },
    { text: 'Раскрытие информации', route: '/structure/raskrytie_informatsii' },
    { text: 'Информация о доступности объектов Учреждения', route: '/structure/informatsiya_o_dostupnosti_obyektov_uchrejdeniya' },
    { text: '«Сообщи, где торгуют смертью»', route: '/structure/gde_torguyut_smertyu_' }
  ]
};
</script>

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

.desktop-apply {
  display: block;
}

.mobile-apply {
  display: none;
}

/* плавная анимация */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 📱 Адаптация под мобильные устройства */
@media (max-width: 768px) {
  .upper {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
    padding: 10px 15px;
    gap: 10px;
    text-align: center;
  }

  .left {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .logo {
    height: 40px;
  }

  h1 {
    font-size: 16px;
  }

  h2 {
    font-size: 12px;
  }

  .nav-links {
    display: none;
  }

  .burger {
    display: block;
    font-size: 28px;
    margin-top: 5px;
  }

  /* скрываем десктопную кнопку */
  .desktop-apply {
    display: none;
  }

  /* показываем кнопку в мобильном меню */
  .mobile-apply {
    display: block;
    width: 100%;
  }

  .mobile-menu {
    width: 100%;
    align-items: center;
    text-align: center;
    padding: 15px 0;
    gap: 12px;
    background: var(--orang);
    border-top: 1px solid rgba(255,255,255,0.2);
  }

  .mobile-menu a,
  .mobile-menu button {
    font-size: 15px;
  }

  .texta {
    text-align: center;
  }
}
</style>