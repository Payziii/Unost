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
  <Page title="Реализация дополнительных общеобразовательных общеразвивающих программ">
    <Title>Реализация дополнительных общеобразовательных общеразвивающих программ</Title>

    <Text align="center">
      <p><strong>Реализация</strong></p>
      <p><strong>дополнительных общеобразовательных общеразвивающих программ</strong></p>
    </Text>

    <!-- Таблица кружков -->
    <Text align="center">
      <table border="1" cellpadding="0" cellspacing="0" style="margin: 0 auto; width: 100%; max-width: 800px;">
        <thead>
          <tr>
            <th style="width: 50px;">№ пп</th>
            <th style="width: 300px;">Наименование кружка</th>
            <th style="width: 120px;">Количество часов за год</th>
            <th style="width: 120px;">Срок обучения</th>
            <th style="width: 120px;">Количество обучающихся</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Технология управления автотранспортным средством</td>
            <td style="text-align: center;">144 ч</td>
            <td style="text-align: center;">10 месяцев</td>
            <td style="text-align: center;">15</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Технология кулинарного искусства</td>
            <td style="text-align: center;">144 ч</td>
            <td style="text-align: center;">10 месяцев</td>
            <td style="text-align: center;">15</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Сварочное дело</td>
            <td style="text-align: center;">144 ч</td>
            <td style="text-align: center;">10 месяцев</td>
            <td style="text-align: center;">15</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Английский в профессии</td>
            <td style="text-align: center;">144 ч</td>
            <td style="text-align: center;">10 месяцев</td>
            <td style="text-align: center;">15</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Программирование в электрооборудовании</td>
            <td style="text-align: center;">144 ч</td>
            <td style="text-align: center;">10 месяцев</td>
            <td style="text-align: center;">15</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Электромонтаж</td>
            <td style="text-align: center;">144 ч</td>
            <td style="text-align: center;">10 месяцев</td>
            <td style="text-align: center;">15</td>
          </tr>
          <tr>
            <td>7</td>
            <td>Электроника и электрооборудование в автомобиле</td>
            <td style="text-align: center;">144 ч</td>
            <td style="text-align: center;">10 месяцев</td>
            <td style="text-align: center;">15</td>
          </tr>
          <tr>
            <td>8</td>
            <td>Юный стилист</td>
            <td style="text-align: center;">144 ч</td>
            <td style="text-align: center;">10 месяцев</td>
            <td style="text-align: center;">15</td>
          </tr>
          <tr>
            <td>9</td>
            <td>Основы аналитической химии</td>
            <td style="text-align: center;">144 ч</td>
            <td style="text-align: center;">10 месяцев</td>
            <td style="text-align: center;">15</td>
          </tr>
          <tr>
            <td>10</td>
            <td>Станочник</td>
            <td style="text-align: center;">144 ч</td>
            <td style="text-align: center;">10 месяцев</td>
            <td style="text-align: center;">15</td>
          </tr>
          <tr>
            <td>11</td>
            <td>Программирование и интернет технологии</td>
            <td style="text-align: center;">144 ч</td>
            <td style="text-align: center;">10 месяцев</td>
            <td style="text-align: center;">15</td>
          </tr>
          <tr>
            <td>12</td>
            <td>Современная хореография</td>
            <td style="text-align: center;">144 ч</td>
            <td style="text-align: center;">10 месяцев</td>
            <td style="text-align: center;">15</td>
          </tr>
          <tr>
            <td>13</td>
            <td>Волейбол</td>
            <td style="text-align: center;">144 ч</td>
            <td style="text-align: center;">10 месяцев</td>
            <td style="text-align: center;">15</td>
          </tr>
          <tr>
            <td>14</td>
            <td>Эстрадный вокал</td>
            <td style="text-align: center;">144 ч</td>
            <td style="text-align: center;">10 месяцев</td>
            <td style="text-align: center;">15</td>
          </tr>
          <tr>
            <td>15</td>
            <td>Программа общефизической подготовки</td>
            <td style="text-align: center;">144 ч</td>
            <td style="text-align: center;">10 месяцев</td>
            <td style="text-align: center;">15</td>
          </tr>
        </tbody>
      </table>
    </Text>

    <!-- Документы программ -->
    <Text align="left">
      <File file="Образовательная программа дополнительного образования по направлению АНГЛИЙСКИЙ ЯЗЫК В ПРОФЕССИИ.pdf" icon>Образовательная программа дополнительного образования по направлению "АНГЛИЙСКИЙ ЯЗЫК В ПРОФЕССИИ"</File>
      <File file="Образовательная программа дополнительного образования по направлению ОСНОВЫ АНАЛИТИЧЕСКОЙ ХИМИИ.pdf" icon>Образовательная программа дополнительного образования по направлению "ОСНОВЫ АНАЛИТИЧЕСКОЙ ХИМИИ"</File>
      <File file="Образовательная программа дополнительного образования по направлению Основы управления автотранспортом.pdf" icon>Образовательная программа дополнительного образования по направлению "Основы управления автотранспортом"</File>
      <File file="Образовательная программа дополнительного образования по направлению ПРОГРАММИРОВАНИЕ В ЭЛЕКТРООБОРУДОВАНИИ.pdf" icon>Образовательная программа дополнительного образования по направлению "ПРОГРАММИРОВАНИЕ В ЭЛЕКТРООБОРУДОВАНИИ"</File>
      <File file="Образовательная программа дополнительного образования по направлению Станочник.pdf" icon>Образовательная программа дополнительного образования по направлению "Станочник"</File>
      <File file="Образовательная программа дополнительного образования по направлению Электромонтаж.pdf" icon>Образовательная программа дополнительного образования по направлению "Электромонтаж"</File>
      <File file="Образовательная программа дополнительного образования по направлению Технология кулинарного искусства.pdf" icon>Образовательная программа дополнительного образования по направлению "Технология кулинарного искусства"</File>
      <File file="Образовательная программа дополнительного образования по направлению Электроника и электрооборудование в автомобиле.pdf" icon>Образовательная программа дополнительного образования по направлению "Электроника и электрооборудование в автомобиле"</File>
      <File file="Образовательная программа дополнительного образования по направлению Юный стилист.pdf" icon>Образовательная программа дополнительного образования по направлению "Юный стилист"</File>
      <File file="Положение по ДОП.pdf" icon>Положение по ДОП</File>
      <File file="Образовательная программа дополнительного образования по направлению физкультурно-спортивное Волейбол.pdf" icon>Образовательная программа дополнительного образования по направлению физкультурно-спортивное Волейбол</File>
      <File file="Образовательная программа дополнительного образования по направлению в области искусства Современная хореография.pdf" icon>Образовательная программа дополнительного образования по направлению в области искусства Современная хореография</File>
      <File file="Образовательная программа дополнительного образования по направлению физкультурно-спортивное Программа общефизической подготовки.pdf" icon>Образовательная программа дополнительного образования по направлению физкультурно-спортивное Программа общефизической подготовки</File>
      <File file="Образовательная программа дополнительного образования по направлению туристическо-краеведческое туристические тропы.pdf" icon>Образовательная программа дополнительного образования по направлению туристическо-краеведческое туристические тропы</File>
      <File file="График дополнительного образования.pdf" icon>График дополнительного образования</File>
    </Text>


  </Page>
</template>