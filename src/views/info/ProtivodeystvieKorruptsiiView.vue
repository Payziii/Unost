<script setup>
import { ref } from 'vue';
import Page from '@/components/pages/Page.vue';
import Title from '@/components/pages/Title.vue';
import Text from '@/components/pages/Text.vue';
import Bold from '@/components/pages/Bold.vue';
import Link from '@/components/pages/Link.vue';
import File from '@/components/pages/File.vue';

// состояние аккордеона
const openBlock = ref(null);
function toggleBlock(name) {
  openBlock.value = openBlock.value === name ? null : name;
}
</script>

<template>
  <Page title="Противодействие коррупции">
    <Title>Противодействие коррупции</Title>

    <Title>1. Телефон доверия по вопросам противодействия коррупции</Title>

    <Text align="justify">
      Приём граждан осуществляет заместитель директора по учебно-воспитательной работе
      <Bold>Яковлева Юлия Юрьевна</Bold>.
    </Text>

    <Text align="justify">
      <Bold>Телефон:</Bold> 8 (34368) 5-44-86
    </Text>

    <Text align="justify">
      <Bold>Время приёма обращений по «телефону доверия»:</Bold>
    </Text>

    <Text align="left">
      <ul>
        <li>понедельник – четверг: с 08:00 до 17:00;</li>
        <li>пятница: с 08:00 до 16:00;</li>
        <li> выходные и праздничные дни — приём не ведётся.</li>
      </ul>
    </Text>

    <Text align="justify">
      По «телефону доверия» принимается и рассматривается информация о фактах коррупции,
      включая сведения о коррупционных проявлениях в действиях работников, конфликте
      интересов, несоблюдении ограничений и запретов, установленных законодательством,
      а также иных коррупционных правонарушениях.
    </Text>

    <Text align="justify">
      Обращения рассматриваются в порядке и сроки, предусмотренные Федеральным законом от 2 мая
      2006 года № 59-ФЗ «О порядке рассмотрения обращений граждан Российской Федерации».
    </Text>

    <Text align="justify">
      <Bold>Телефоны доверия:</Bold>
    </Text>

    <Text align="left">
      <ul>
        <li>Прокуратура Свердловской области: (343) 377-02-39;</li>
        <li>ГУ МВД России по Свердловской области: (343) 358-71-61, 358-70-71;</li>
        <li>Следственное управление Следственного комитета РФ по Свердловской области: (343) 297-71-79;</li>
        <li>Администрация Губернатора и Аппарат Правительства Свердловской области: (343) 370-72-02;</li>
        <li>Министерство образования и молодёжной политики Свердловской области: (343) 371-97-20.</li>
      </ul>
    </Text>

    <Title>2. Нормативные правовые и иные акты</Title>

    <Text align="justify">
      С нормативными правовыми актами в сфере противодействия коррупции можно ознакомиться по
      следующим ссылкам:
    </Text>

    <Text align="left">
      <ul>
        <li>
          <Link linkTo="https://minobraz.egov66.ru/site/item?id=2324">
            Федеральные законы, указы Президента Российской Федерации и постановления Правительства Российской Федерации
          </Link>
        </li>
        <li>
          <Link linkTo="https://minobraz.egov66.ru/site/item?id=2325">
            Законы Свердловской области, указы Губернатора и постановления Правительства Свердловской области
          </Link>
        </li>
        <li>
          <Link linkTo="https://minobraz.egov66.ru/site/item?id=2326">
            Нормативные правовые и иные акты Министерства образования и молодёжной политики Свердловской области
          </Link>
        </li>
      </ul>
    </Text>

    <Title>3. Основные понятия в сфере противодействия коррупции</Title>

    <Text align="justify">
      <Bold>Должностное лицо</Bold> — гражданин, который постоянно, временно или по специальному
      полномочию осуществляет функции представителя власти либо выполняет организационно-
      распорядительные и административно-хозяйственные функции в государственных органах,
      органах местного самоуправления, государственных и муниципальных учреждениях,
      корпорациях, компаниях и предприятиях, а также в Вооружённых силах и иных воинских
      формированиях Российской Федерации.
    </Text>

    <Text align="justify">
      <Bold>Коррупция</Bold> включает злоупотребление служебным положением, дачу и получение
      взятки, злоупотребление полномочиями, коммерческий подкуп и иное незаконное
      использование должностного положения для получения выгоды для себя или третьих лиц,
      а также совершение указанных деяний от имени или в интересах юридического лица.
    </Text>

    <Text align="justify">
      <Bold>Дача взятки</Bold> — передача должностному лицу денег, ценных бумаг, иного имущества
      или предоставление услуг имущественного характера лично либо через посредника.
    </Text>

    <Text align="justify">
      <Bold>Получение взятки</Bold> — получение должностным лицом выгоды имущественного характера
      лично или через посредника за совершение действий (бездействие) в пользу взяткодателя либо
      за общее покровительство и попустительство по службе.
    </Text>

    <Text align="justify">
      <Bold>Общее покровительство</Bold> проявляется, например, в необоснованном назначении на более
      высокую должность или включении в список поощряемых лиц.
    </Text>

    <Text align="justify">
      <Bold>Попустительство по службе</Bold> может выражаться в согласии должностного лица
      контролирующего органа не применять предусмотренные меры ответственности при выявлении
      нарушений.
    </Text>

    <Text align="justify">
      <Bold>Посредничество во взяточничестве</Bold> — передача взятки по поручению взяткодателя или
      взяткополучателя либо содействие в реализации соглашения о её получении и даче.
    </Text>

    <Text align="justify">
      <Bold>Превышение должностных полномочий</Bold> — совершение должностным лицом действий,
      явно выходящих за пределы полномочий и повлекших существенное нарушение прав и законных
      интересов граждан, организаций или государства.
    </Text>

    <Title>4. Платформа обратной связи</Title>

    <Text align="justify">
      На едином портале государственных услуг действует платформа обратной связи, где можно
      оставить сообщение или жалобу в сфере противодействия коррупции.
    </Text>

    <Text align="center">
      <Link linkTo="https://www.gosuslugi.ru/10091">https://www.gosuslugi.ru/10091</Link>
    </Text>

    <Title>5. Дополнительные материалы</Title>

    <Text align="left">
      <ul>
        <li>
          <Link linkTo="https://regulation.gov.ru/">Антикоррупционная экспертиза</Link>
        </li>
        <li>
          <Link linkTo="/info/koruptprosv">
            Антикоррупционное просвещение
          </Link>
        </li>
      
      <li>
          <Link linkTo="https://mintrud.gov.ru/ministry/programms/anticorruption/9">Методические рекомендации</Link>
      </li></ul>
    </Text>

    <!-- Аккордеон с документами -->
    <div class="accordion-item" @click="toggleBlock('item7')">
      <div class="accordion-header">
        <span class="menu-title">7. Приказы и нормативные документы</span>
      </div>
      <transition name="fade">
        <div v-show="openBlock === 'item7'" class="accordion-content" @click.stop>
          <Text align="left">
            <File file="BS32hTHDQfRRYZBi22zNQzS3A.pdf" icon>Приказ №204 от 28.10.2021 г.</File>
            <File file="95dBtSsHKTfB8QikSSeNYzs6T.pdf" icon>Приказ об утверждении правил обмена деловыми подарками и знаками делового гостеприимства № 45-од от 26.02.2020г.</File>
            <File file="R555Rs5RaFGbnarBHzyBnGNzR.pdf" icon>Приказ об утверждения положения об антикоррупционной политики № 37-од от 26.02.2020г.</File>
            <File file="4r5DH4rFYnbF66drShzRnsfza.pdf" icon>Приказ об утверждении порядка защиты работников, сообщивших о коррупционных правонарушениях в деятельности ОО № 39-од от 26.02.2020г.</File>
            <File file="2869GYR5HyZef8d6EfT4GdBDQ.pdf" icon>Приказ об утверждении положения о порядке уведомления о склонении к кор.правонарушениям № 48-од от 26.02.2020г.</File>
            <File file="Sy2R6GZi92Fb3AAyH7KD2nKt9.pdf" icon>Приказ об утверждении положения о порядке информирования работодателя о ставшей известной работнику инф-и о случаях совершения кор. правонарушений др. лицами № 49-од</File>
            <File file="fsDatdb5yFiGr55RhGYnQ7iK4.pdf" icon>Приказ об утверждении положения о телефоне доверия по вопросам противодействия коррупции № 38-од от 26.02.2020г.</File>
            <File file="aHsEsiYTzBsQddfk886FZ89HY.pdf" icon>Приказ об утверждении положения о порядке информирования работниками работодателя о возникновении личной заинтересованности № 50-од от 26.02.2020г.</File>
            <File file="rBiSHsR2Ef54TH3dEZZfYT6bQ.pdf" icon>Приказ об утверждении перечня должностей, замещение которых связано с коррупционными рисками № 40-од от 26.02.2020г.</File>
            <File file="9nkEezKR9z78TQ87Zs7fGQDT6.pdf" icon>Приказ об утверждении положения о порядке информирования работниками руководителя о случаях к совершению кор.правонарушений № 47-од от 26.02.2020г.</File>
            <File file="fKNZr9zTanft9zrTtis2TrBhf.pdf" icon>Приказ об утверждении перечня коррупционно опасных видах деятельности № 41-од от 26.02.2020г.</File>
            <File file="KEa5AtZn7T87KEG8QB4HeeE4h.pdf" icon>Приказ об утверждении положения о конфликте интересов работников № 44-од от 26.02.2020г.</File>
            <File file="63N7Ta5GKAh667Rn6YdQYEQRz.pdf" icon>Приказ об утверждении кодекса этики и служебного поведения работников ОО № 46-од от 26.02.2020г.</File>
            <File file="72KGQyFZZy9e4Y9A97672Rs7t.pdf" icon>Приказ об утверждении памятки об установления ограничений, запретов и возложении обязанностей на работников ОО в целях предупреждения коррупции № 43-од от 26.02.2020г.</File>
            <File file="9hD3ktGY6Hr7F75YyfRN6tb6B.pdf" icon>Приказ о назначении лица, ответственного за профилактику коррупционных правонарушений ОО № 42-од от 26.02.2020г.</File>
            <File file="DA6bRr2ShDFiG93B2FyT3NRBR.pdf" icon>Приказы по коррупции</File>
            <File file="E7RaRK5F4nsr8zK7FBETZyB2k.pdf" icon>Положение о комиссии по коррупции</File>
            <File file="rfRS64BGY23YRdBG8RsyYradk.pdf" icon>Положение о порядке информирования работникам</File>
            <File file="43rz2BTdy9h3Gnz4Sa4t3TQTe.pdf" icon>Положение о конфликте интересов работников</File>
            <File file="bH5iEDKEsRyDiDf4yrtdBi3k9.pdf" icon>Правила обмена деловыми подарками и знаками делового гостеприимства</File>
          </Text>
        </div>
      </transition>
    </div>

<div class="accordion-item" @click="toggleBlock('item8')">
  <div class="accordion-header">
    <span class="menu-title">8. Планы работы Комиссии учреждения</span>
  </div>
  <transition name="fade">
    <div v-show="openBlock === 'item8'" class="accordion-content" @click.stop>
      <Text align="left">
        <File file="E4dArf3nrtEYis2NYzaK9R5Zn.pdf" icon>План работы Комиссии по противодействию коррупции на 2024 г.</File>
        <File file="yrY7n2RsFDfGnFetzzG7hFYT7.pdf" icon>План работы Комиссии по противодействию коррупции на 2023 г.</File>
        <File file="H3Tt4z7hnTbT2i583y2NhsKRr.pdf" icon>План работы комиссии по противодействию коррупции на 2022 г.</File>
        <File file="yZHnT2QrEzRBkEb5yENthE482.pdf" icon>План работы Комиссии по противодействию коррупции 2021 г.</File>
        <File file="BGRTB842NS4BY9R5G2tBayNdt.pdf" icon>План работы Комиссии по противодействию коррупции 2020 г.</File>
        <File file="HAKAyAQtGEy9Rf9eQ3hBfH44i.pdf" icon>План работы Комиссии по противодействию коррупции на 2017 г.</File>
        <File file="r8f4bDk2aBG3dZtBDTN6ZFnne.pdf" icon>План работы Комиссии по противодействию коррупции на 2015 г.</File>
        <File file="ZNRa4ZHnz7KYK5sdkrTyr39d8.pdf" icon>Планы работы Комиссии по противодействию коррупции по годам 2015, 2016, 2017, 2018, 2019, 2020гг</File>
      </Text>
    </div>
  </transition>
</div>

<div class="accordion-item" @click="toggleBlock('item9')">
  <div class="accordion-header">
    <span class="menu-title">9. Планы работы учреждения</span>
  </div>
  <transition name="fade">
    <div v-show="openBlock === 'item9'" class="accordion-content" @click.stop>
      <Text align="left">
        <File file="Zs6KkbNfZDaAi349dkbzf5762.pdf" icon>План работы по противодействию коррупции на 2021-2024 годы</File>
        <File file="QZhBaHHSdre3Y3BFd8BbzBftK.pdf" icon>План работы по противодействию коррупции на 2021-2023 год</File>
        <File file="99iTtbHBZZr9iFReD3Y7ZrQnK.pdf" icon>План работы по противодействию коррупции на 2018-2020 год</File>
        <File file="YinEesiFidAZ44iftNrHYFdHY.pdf" icon>План работы по противодействию коррупции на 2018-2019 год</File>
      </Text>
    </div>
  </transition>
</div>

    <div class="accordion-item" @click="toggleBlock('item10')">
      <div class="accordion-header">
        <span class="menu-title">10. Отчеты об исполнении планов</span>
      </div>
      <transition name="fade">
        <div v-show="openBlock === 'item10'" class="accordion-content" @click.stop>
          <Text align="left">
            <File file="TYZbk9DTiyk4EeEQQzSbKNiG8.pdf" icon>Отчет об исполнении плана работы по противодействию коррупции в 2024 году</File>
            <File file="S7Q5RYeYRZTT7bbnNfkSD4GDD.pdf" icon>Отчёт об исполнении плана работы по противодействию коррупции в 2023 году</File>
            <File file="N54AHh6asDnZHHh6dddK32FS4.pdf" icon>Отчет об исполнении плана работы по противодействию коррупции в 2022 г.</File>
            <File file="3AiY8Tz9t5y2R4fQdn8DRThkk.pdf" icon>Отчет об исполнении плана работы по противодействию коррупции в 2021 г.</File>
            <File file="z399AZnbERBe63Dd46TRktNK7.pdf" icon>Отчет об исполнении плана по противодействию коррупции за 2020 г.</File>
            <File file="BGKba49hD6RGbAZhENhTEennK.pdf" icon>Отчет об исполнении плана работы по противодействию коррупции за 1 квартал 2020г</File>
            <File file="hFnNainFASfKSE5hSrzahkyTH.pdf" icon>Отчет об исполнении плана работы по противодействию коррупции за 1 полугодие 2020г.</File>
            <File file="AAe86bHA7FdN8r4EyHYyh9kAN.pdf" icon>Отчет об исполнении плана по противодействию коррупции в 2019г.</File>
            <File file="bee2QeNadYEZsA2hKakz9F7nG.pdf" icon>Отчет об исполнении плана работы по противодействию коррупции в 2018г.</File>
            <File file="3A9fDSH6b4kkbZ9tHnaKN9i6E.pdf" icon>Отчет об исполнении плана работы по противодействию коррупции в 2017г.</File>
            <File file="NE68SSEirFeSs9Kn5rNHD6QrD.pdf" icon>Отчет об исполнении плана работы по противодействию коррупции в 2016г.</File>
            <File file="GEKb6BZ6685SASksd2GYhRKF7.pdf" icon>Отчет об исполнении плана работы по противодействию коррупции в 2015г.</File>
          </Text>
        </div>
      </transition>
    </div>

    <div class="accordion-item" @click="toggleBlock('item11')">
      <div class="accordion-header">
        <span class="menu-title">11. Протоколы заседаний</span>
      </div>
      <transition name="fade">
        <div v-show="openBlock === 'item11'" class="accordion-content" @click.stop>
          <Text align="left">
            <File file="Ga5YdyTsGFFfRE3zta7NR6aS2.pdf" icon>Выписки из протоколов заседаний комиссии по противодействию коррупции с 2022 года - 2024 год</File>
            <File file="5hAef4Z3a9bAN9DAYtKR7Sy73.pdf" icon>Протокол 2021 г</File>
            <File file="NBeGBz8b9s2yZGE9ZZ6Q5GHT5.pdf" icon>Выписки из протоколов заседаний комиссии по противодействию коррупции с 2015 по 2020 год</File>
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