<script setup>
import Page from '@/components/pages/Page.vue';
import Title from '@/components/pages/Title.vue';
import Text from '@/components/pages/Text.vue';
import Bold from '@/components/pages/Bold.vue';
import Link from '@/components/pages/Link.vue';
import File from '@/components/pages/File.vue';
import TitledImage from '@/components/pages/TitledImage.vue';
import CardGrid from '@/components/pages/CardGrid.vue';
</script>

<template>
  <Page title="Организация питания">
    <Title>Организация питания</Title>

    <TitledImage src="/images/food/130x2.png" alt="Портал общественного контроля" />

    <Title>Основные сведения</Title>

    <Text align="left">
      <Link linkTo="https://disk.yandex.ru/d/7oPUg__UgrVrCA"><Bold>Меню ежедневного горячего питания</Bold></Link>
    </Text>

    <Text align="left">
      <Bold>Информация о наличии диетического меню:</Bold>
      <span> нет</span>
    </Text>

    <Text align="left">
      <Bold>Автоматический мониторинг и анализ ежедневного меню горячего питания обучающихся начального общего образования:</Bold>
    </Text>

    <Text align="left">
      <Link linkTo="https://foodfile.ru/mttyunost1113/food">https://foodfile.ru/mttyunost1113/food</Link>
    </Text>

    <Title>Сведения об организаторе питания</Title>

    <Text align="left">
      <Bold>Организация:</Bold>
      <span> ГАПОУ СО «ВПМТТ «ЮНОСТЬ»</span>
    </Text>
    <Text align="left">
      <Bold>Директор:</Bold>
      <span> Лобастов Виталий Геннадьевич</span>
    </Text>
    <Text align="left">
      <Bold>Телефон:</Bold>
      <span> 8 (34368) 5-44-86</span>
    </Text>
    <Text align="left">
      <Bold>График работы:</Bold>
      <span> понедельник–пятница 08:00–12:00, 13:00–17:00; суббота–воскресенье: выходной</span>
    </Text>
    <Text align="left">
      <Bold>Адрес:</Bold>
      <span> 624090, Свердловская область, г. Верхняя Пышма, ул. Кривоусова, д. 53</span>
    </Text>

    <Title>Перечень поставщиков</Title>

    <Text align="left">
      • <Bold>ИП Самылин:</Bold>
      <span> вода питьевая артезианская I категории «Ключи», 19 л</span>
    </Text>
    <Text align="left">
      • <Bold>ООО «Фаворит»:</Bold>
      <span> бакалея</span>
    </Text>
    <Text align="left">
      • <Bold>ООО «Фаворит»:</Bold>
      <span> молоко, молочная продукция, сыр</span>
    </Text>
    <Text align="left">
      • <Bold>АО «Режевской хлебокомбинат»:</Bold>
      <span> хлеб и хлебобулочные изделия</span>
    </Text>
    <Text align="left">
      • <Bold>ООО «Фаворит»:</Bold>
      <span> мясо, рыба, кура, яйцо</span>
    </Text>
    <Text align="left">
      • <Bold>ИП Шадиев А. М.:</Bold>
      <span> овощи и фрукты</span>
    </Text>

    <Title>Ответственное лицо за организацию питания</Title>

    <Text align="left">
      <Bold>Чезганова Елена Павловна</Bold>
    </Text>
    <Text align="left">
      <Bold>Телефон:</Bold>
      <span> 8 (343) 685-47-24</span>
    </Text>

    <Title>Обратная связь</Title>

    <Text align="left">
      <Bold>Форма обратной связи для родителей:</Bold>
    </Text>
    <Text align="left">
      <Link linkTo="https://forms.yandex.ru/u/65114bfa068ff02a657a0a33/">
        https://forms.yandex.ru/u/65114bfa068ff02a657a0a33/
      </Link>
    </Text>

    <Title>Горячие линии по вопросам питания</Title>

    <Text align="left">
      • Министерство просвещения Российской Федерации: 8 (800) 200-91-85
    </Text>
    <Text align="left">
      • Общероссийское общественное движение «Народный фронт «За Россию»: 8 (800) 200-34-11
    </Text>
    <Text align="left">
      • Министерство образования и молодежной политики Свердловской области: 8 (343) 312-00-04 (доб. 140)
    </Text>

    <Title>Нормативные документы</Title>

    <Text align="left">
      Постановление Главного государственного санитарного врача РФ от 27.10.2020 № 32 «Об утверждении санитарно-эпидемиологических правил и норм СанПиН 2.3/2.4.3590-20 «Санитарно-эпидемиологические требования к организации общественного питания населения»
    </Text>
    <File file="sanpin-2.3.pdf">(скачать)</File>

    <Title>Локальные акты и акты проверок</Title>

    <File file="приказ о созданииродительского контроля за орган. и качеством питания.pdf">Приказ о создании родительского контроля за организацией и качеством питания</File>
    <File file="положение о родительском контроле организации и качества горячего питания(1).pdf">Положение о родительском контроле организации и качества горячего питания</File>
    
    <File file="акт.pdf">Акт проверки от 28.10.2022</File>


    <Title>Участие в опросе</Title>

    <Text align="center">
      Уважаемые родители и обучающиеся старше 14 лет приглашены принять участие в опросе.
    </Text>
    <Text align="center">
      Опрос проводится в целях выявления мнения граждан о качестве условий образовательной деятельности.
    </Text>
    <Text align="center">
      Чтобы оценить условия осуществления образовательной деятельности, наведите камеру телефона и отсканируйте QR-код.
    </Text>
    <CardGrid>
    <img src="/images/food/анкета на мнение(1).jpg" alt="QR-код для участия в опросе"
    height="auto"
    width="450px" />
    </CardGrid>

    <Text align="left">
      Перейдя по ссылке, Вы сможете:
    </Text>
    <Text align="left">► оценить условия осуществления образовательной деятельности:</Text>
    <Text align="left">→ открытость и доступность информации об организации;</Text>
    <Text align="left">→ комфортность условий осуществления образовательной деятельности;</Text>
    <Text align="left">→ доброжелательность и вежливость работников;</Text>
    <Text align="left">→ удовлетворенность условиями осуществления образовательной деятельности;</Text>
    <Text align="left">→ доступность образовательной деятельности для инвалидов;</Text>
    <Text align="left">► оставить отзыв.</Text>

    <Text align="center">
      <Bold>Анкета доступна по QR-коду, а также по прямой ссылке:</Bold>
    </Text>
    <Text align="center">
      <Link linkTo="https://bus.gov.ru/qrcode/rate/412834">https://bus.gov.ru/qrcode/rate/412834</Link>
    </Text>
    <Text align="center">
      <Bold>bus.gov.ru</Bold>
    </Text>
  </Page>
</template>
