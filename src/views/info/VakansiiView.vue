<script setup>
import Page from '@/components/pages/Page.vue';
import Title from '@/components/pages/Title.vue';
import Text from '@/components/pages/Text.vue';
import Link from '@/components/pages/Link.vue';
import CardGrid from '@/components/pages/CardGrid.vue';
import Card from '@/components/pages/Card.vue';
import Bold from '@/components/pages/Bold.vue';

const vacancies = [
  {
    role: 'Преподаватель спец.дисциплины «Техническое обслуживание и ремонт электрического, электромеханического оборудования»',
    qty: '1',
    nature: 'постоянная или по совместительству',
    salary: 'от 40 000',
    schedule: 'Шестидневная рабочая неделя, в соответствии с расписанием учебных занятий',
    start: '8.00',
    end: '',
    requirements: 'Высшее профессиональное педагогическое образование',
    benefits: 'коллективный договор',
  },
  {
    role: 'Преподаватель спец.дисциплины «Техническое обслуживание и ремонт двигателей, систем и агрегатов автомобилей»',
    qty: '1',
    nature: 'постоянная или по совместительству',
    salary: 'от 40 000',
    schedule: 'Шестидневная рабочая неделя, в соответствии с расписанием учебных занятий',
    start: '8.00',
    end: '',
    requirements: 'Высшее профессиональное педагогическое образование',
    benefits: 'коллективный договор',
  },
  {
    role: 'Преподаватель спец.дисциплины «Оснащение средствами автоматизации технологических процессов и производств»',
    qty: '1',
    nature: 'постоянная или по совместительству',
    salary: 'от 40 000',
    schedule: 'Шестидневная рабочая неделя, в соответствии с расписанием учебных занятий',
    start: '8.00',
    end: '',
    requirements: 'Высшее профессиональное педагогическое образование',
    benefits: 'коллективный договор',
  },
  {
    role: 'Преподаватель спец.дисциплины «Металлургия цветных металлов»',
    qty: '1',
    nature: 'постоянная или по совместительству',
    salary: 'от 40 000',
    schedule: 'Шестидневная рабочая неделя, в соответствии с расписанием учебных занятий',
    start: '8.00',
    end: '',
    requirements: 'Высшее профессиональное педагогическое образование',
    benefits: 'коллективный договор',
  },
  {
    role: 'Преподаватель спец.дисциплины «Сварочное производство»',
    qty: '1',
    nature: 'постоянная или по совместительству',
    salary: 'от 40 000',
    schedule: 'Шестидневная рабочая неделя, в соответствии с расписанием учебных занятий',
    start: '8.00',
    end: '',
    requirements: 'Высшее профессиональное педагогическое образование',
    benefits: 'коллективный договор',
  },
  {
    role: 'Преподаватель спец.дисциплины «Информационные системы и программирование»',
    qty: '1',
    nature: 'постоянная или по совместительству',
    salary: 'от 40 000',
    schedule: 'Шестидневная рабочая неделя, в соответствии с расписанием учебных занятий',
    start: '8.00',
    end: '',
    requirements: 'Высшее профессиональное педагогическое образование',
    benefits: 'коллективный договор',
  },
  {
    role: 'Преподаватель спец.дисциплины «Технология машиностроения»',
    qty: '1',
    nature: 'постоянная или по совместительству',
    salary: 'от 40 000',
    schedule: 'Шестидневная рабочая неделя, в соответствии с расписанием учебных занятий',
    start: '8.00',
    end: '',
    requirements: 'Высшее профессиональное педагогическое образование',
    benefits: 'коллективный договор',
  },
  {
    role: 'Учитель (преподаватель) математики',
    qty: '1',
    nature: 'постоянная или по совместительству',
    salary: 'от 40 000',
    schedule: 'Шестидневная рабочая неделя, в соответствии с расписанием учебных занятий',
    start: '8.00',
    end: '',
    requirements: 'Высшее профессиональное педагогическое образование',
    benefits: 'коллективный договор',
  },
  {
    role: 'Учитель (преподаватель) физики',
    qty: '1',
    nature: 'постоянная или по совместительству',
    salary: 'от 40 000',
    schedule: 'Шестидневная рабочая неделя, в соответствии с расписанием учебных занятий',
    start: '8.00',
    end: '',
    requirements: 'Высшее профессиональное педагогическое образование',
    benefits: 'коллективный договор',
  },
  {
    role: 'Учитель информатики',
    qty: '1',
    nature: 'постоянная или по совместительству',
    salary: 'от 40 000',
    schedule: 'Шестидневная рабочая неделя, в соответствии с расписанием учебных занятий',
    start: '8.00',
    end: '',
    requirements: 'Высшее профессиональное педагогическое образование',
    benefits: 'коллективный договор',
  },
  {
    role: 'Воспитатель кадетской школы-интерната',
    qty: '1',
    nature: 'постоянная',
    salary: '30 000',
    schedule: 'Нормальная продолжительность рабочего времени (пятидневная рабочая неделя)',
    start: '12.00',
    end: '',
    requirements: 'Высшее или среднее специальное педагогическое образование (офицер запаса или офицер в отставке)',
    benefits: 'коллективный договор',
  },
  {
    role: 'Инженер – энергетик',
    qty: '1',
    nature: 'постоянная',
    salary: 'от 40 000',
    schedule: 'Пятидневная рабочая неделя',
    start: '8.00',
    end: '17.00',
    requirements: 'Высшее профессиональное образование, опыт работы от 3 лет',
    benefits: 'коллективный договор',
  },
  {
    role: 'Инженер-электроник',
    qty: '1',
    nature: 'постоянная',
    salary: 'от 35 000',
    schedule: 'Пятидневная рабочая неделя',
    start: '8.00',
    end: '17.00',
    requirements: 'Среднее профессиональное образование',
    benefits: 'коллективный договор',
  },
  {
    role: 'Кухонный рабочий',
    qty: '1',
    nature: 'постоянная',
    salary: 'от 27 000',
    schedule: 'Пятидневная рабочая неделя',
    start: '8.00',
    end: '17.00',
    requirements: 'Без опыта',
    benefits: 'коллективный договор',
  },
  {
    role: 'Оператор диспетчерской службы (г. Верхняя Пышма, ул. Лесная, 1)',
    qty: '1',
    nature: 'постоянная',
    salary: 'от 27 000',
    schedule: 'Сменный график 2/2 (дневные смены)',
    start: '8.00',
    end: '20.00',
    requirements: 'Без опыта',
    benefits: 'коллективный договор',
  },
];

const timeRange = (v) => {
  if (v.start && v.end) return `${v.start}–${v.end}`;
  if (v.start && !v.end) return `с ${v.start}`;
  if (!v.start && v.end) return `до ${v.end}`;
  return '';
};
</script>

<template>
  <Page title="Вакансии">
    <Title>Вакансии</Title>

    <Text align="center">
      <Bold>Сведения</Bold>
      <Bold> о потребности в работниках, наличии свободных рабочих мест (вакантных должностей) по состоянию на 14.02.2025 г.</Bold>
    </Text>

    <Text align="justify">
      <Bold>Наименование:</Bold>
      ГАПОУ СО «ВП МТТ «Юность» (Государственное автономное профессиональное образовательное учреждение
      Свердловской области «Верхнепышминский механико‑технологический техникум «Юность»).
    </Text>
    <Text align="justify"><Bold>Адрес:</Bold> г. Верхняя Пышма, ул. Кривоусова, 53.</Text>
    <Text align="justify"><Bold>Телефон:</Bold> 8 (34368) 5‑44‑86.</Text>
    <Text align="justify">
      <Bold>Проезд:</Bold> автобус № 1, 2, 3, 4; остановки «Торговый центр», «Администрация».
    </Text>
    <Text align="justify"><Bold>ОКВЭД:</Bold> 85.21 «Образование профессиональное среднее».</Text>
    <Text align="justify">
      <Bold>Социальные гарантии:</Bold> медицинское обслуживание, санаторно‑курортное обеспечение, обеспечение детскими
      дошкольными учреждениями, <u>условия для приёма пищи во время перерыва</u>.
    </Text>
    <Text align="justify">
      <Bold>Нормативные акты:</Bold> Штатное расписание.
    </Text>

    <Title>Открытые позиции</Title>

    <CardGrid>
      <Card
        v-for="(v, i) in vacancies"
        :key="i"
        :title="v.role"
        :style="{ textAlign: 'center' }"
      >
        <div class="vacancy-card">
          <!-- Убрали верхние чипы (кол-во, характер, соцгарантии) -->

          <div class="rows">
            <div class="row">
              <span class="label">З/п</span>
              <span class="value salary">{{ v.salary }}</span>
            </div>
            <div class="row">
              <span class="label">Режим</span>
              <span class="value">{{ v.schedule }}</span>
            </div>
            <div class="row" v-if="v.start || v.end">
              <span class="label">Время</span>
              <span class="value">{{ timeRange(v) }}</span>
            </div>
            <div class="row">
              <span class="label">Требования</span>
              <span class="value">{{ v.requirements }}</span>
            </div>
          </div>
        </div>
      </Card>
    </CardGrid>

    <Text align="justify">
      <Bold>Специалист по кадрам:</Bold> Вальдиянова Татьяна Станиславовна<br />
      тел./факс: 8 (34368) 5‑44‑86;<br />
      эл. адрес:
      <Link href="mailto:Lobastov07@mail.ru">Lobastov07@mail.ru</Link>
    </Text>
  </Page>
</template>

<style scoped>
/* Весь текст внутри карточек по центру */
.vacancy-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: center;
}

/* Вертикальные блоки «метка → значение» по центру */
.rows {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.row {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 4px;
  padding: 6px 0;
  border-top: 1px dashed #e5e7eb;
  width: 100%;
}

.row:first-child {
  border-top: 0;
}

.label {
  font-size: 12px;
  letter-spacing: .02em;
  text-transform: uppercase;
  color: #64748b;
}

.value {
  color: #111827;
}

.salary {
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
</style>
