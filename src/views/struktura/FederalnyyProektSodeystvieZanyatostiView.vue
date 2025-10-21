<script setup>
import Page from '@/components/pages/Page.vue'
import Title from '@/components/pages/Title.vue'
import Text from '@/components/pages/Text.vue'
import Bold from '@/components/pages/Bold.vue'
import File from '@/components/pages/File.vue'
import CardGrid from '@/components/pages/CardGrid.vue'
import Card from '@/components/pages/Card.vue'
</script>

<template>
  <Page title="Федеральный проект \u00abСодействие занятости\u00bb">
    <Title>Федеральный проект &laquo;Содействие занятости&raquo;</Title>

    <Text align="center">
      <Bold>ПРИГЛАШАЕМ ПРОЙТИ БЕСПЛАТНОЕ ОБУЧЕНИЕ ПО ПРОГРАММЕ ПРОФЕССИОНАЛЬНОЙ ПОДГОТОВКИ</Bold>
    </Text>

    <Text align="center">
      <Bold>Старт обучения март 2024 года</Bold>
    </Text>

    <Title>Программы обучения</Title>

    <CardGrid maxCardsPerRow=3>
      <Card title="Сварщик ручной дуговой сварки">
        <Text align="center">
          <Bold>Код программы:</Bold> Сварщик РДС<br>
          <Bold>Тип:</Bold> Профессиональная подготовка<br>
          <Bold>Объем:</Bold> 144 академических часа<br>
          <Bold>Форма:</Bold> Очная<br>
          <Bold>Срок обучения:</Bold> 1.5 месяца
        </Text>
      </Card>

      <Card title="Слесарь по ремонту автомобилей">
        <Text align="center">
          <Bold>Код программы:</Bold> 18511<br>
          <Bold>Тип:</Bold> Профессиональная подготовка<br>
          <Bold>Объем:</Bold> 144 академических часа<br>
          <Bold>Форма:</Bold> Очная<br>
          <Bold>Срок обучения:</Bold> 1.5 месяца
        </Text>
      </Card>

      <Card title="Лаборант химического анализа">
        <Text align="center">
          <Bold>Код программы:</Bold> 13321<br>
          <Bold>Тип:</Bold> Профессиональная подготовка<br>
          <Bold>Объем:</Bold> 144 академических часа<br>
          <Bold>Форма:</Bold> Очная<br>
          <Bold>Срок обучения:</Bold> 1.5 месяца
        </Text>
      </Card>
    </CardGrid>

    <Title>Полезные материалы</Title>
       
          <File icon file="Содействие занятости Истории успеха.pdf">Содействие занятости  Истории успеха</File>
          <File icon file="Инструкция по регистрации и подачи заявки на обучение.pdf">Инструкция по регистрации и подачи заявки на обучение</File>
          <File icon file="Постановление об утверждении Положения о реализации мероприятий по организации профессионального обучения.pdf">Постановление об утверждении Положения о реализации мероприятий по организации профессионального обучения</File> 



    <Title>Кто может стать участником программы</Title>

    <Text align="center">
      <Bold>К гражданам, имеющим право принять участие в мероприятиях по обучению, относятся следующие категории:</Bold>
    </Text>

    <CardGrid maxCardsPerRow=2>
      <Card title="Граждане 50+ и предпенсионного возраста">
        <Text align="center">
          Граждане в возрасте 50 лет и старше, граждане предпенсионного возраста
        </Text>
      </Card>

      <Card title="Родители с детьми">
        <Text align="center">
          Граждане, осуществляющие уход за ребенком и находящиеся в отпуске по уходу за ребенком до 3 лет
        </Text>
      </Card>

      <Card title="Мамы дошкольников">
        <Text align="center">
          Женщины, не состоящие в трудовых отношениях и имеющие детей дошкольного возраста от 0 до 7 лет
        </Text>
      </Card>

      <Card title="Инвалиды">
        <Text align="center">
          Граждане с ограниченными возможностями здоровья
        </Text>
      </Card>

      <Card title="Обратившиеся в службу занятости">
        <Text align="center">
          Граждане, обратившиеся в органы службы занятости в целях поиска работы
        </Text>
      </Card>

      <Card title="Безработные">
        <Text align="center">
          Безработные граждане, зарегистрированные в органах службы занятости
        </Text>
      </Card>

      <Card title="Под риском увольнения">
        <Text align="center">
          Работники, находящиеся под риском увольнения, включая режим неполного рабочего времени
        </Text>
      </Card>

      <Card title="Граждане Украины">
        <Text align="center">
          Граждане Украины и лица без гражданства, получившие убежище в РФ
        </Text>
      </Card>

      <Card title="Ветераны боевых действий">
        <Text align="center">
          Ветераны боевых действий, участвовавшие в СВО и других операциях
        </Text>
      </Card>

      <Card title="Молодежь до 35 лет">
        <Text align="center">
          Молодежь до 35 лет, относящаяся к определенным категориям граждан
        </Text>
      </Card>
    </CardGrid>
  </Page>
</template>

<style scoped>
.content-wrapper {
    width: 100%;
}

.logo {
    width: 100%;
    max-width: 100%;
    height: 100%;
    border-radius: 8px;
}
</style>