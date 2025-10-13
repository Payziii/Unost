<script setup>
import Page from '@/components/pages/Page.vue';
import Title from '@/components/pages/Title.vue';
import Link from '@/components/pages/Link.vue';
</script>

<template>
  <Page title="Рейтинг абитуриентов 2024">
    <div class="text-center mb-4">
      <Link linkTo="#" class="text-orange-700 text-lg font-semibold underline">
        Отчет о выполнении контрольных цифр приема 2024 г
      </Link>
    </div>

    <h2 class="text-center text-2xl font-bold mb-6" style="font-family: 'Times New Roman';">
      Информация о баллах абитуриентов в 2024
    </h2>

    <table class="rating-table">
      <thead>
        <tr>
          <th>№</th>
          <th>Специальность</th>
          <th>max</th>
          <th>min</th>
          <th>средний балл</th>
          <th>Кол-во заявлений</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>13.02.13 Эксплуатация и обслуживание электрического и электромеханического оборудования (по отраслям)</td>
          <td>4,25</td>
          <td>3,47</td>
          <td>3,71</td>
          <td>31</td>
        </tr>
        <tr>
          <td>2</td>
          <td>22.02.08 Металлургическое производство (по видам производства)</td>
          <td>4,26</td>
          <td>3,5</td>
          <td>3,71</td>
          <td>32</td>
        </tr>
        <tr>
          <td>3</td>
          <td>15.02.19 Сварочное производство</td>
          <td>4,25</td>
          <td>3,5</td>
          <td>3,88</td>
          <td>65</td>
        </tr>
        <tr>
          <td>4</td>
          <td>18.02.12 Технология аналитического контроля химических соединений</td>
          <td>5</td>
          <td>3,27</td>
          <td>3,92</td>
          <td>34</td>
        </tr>
        <tr>
          <td>5</td>
          <td>23.02.07 Техническое обслуживание и ремонт двигателей, систем и агрегатов автомобилей</td>
          <td>4,33</td>
          <td>3,57</td>
          <td>3,81</td>
          <td>65</td>
        </tr>
        <tr>
          <td>6</td>
          <td>15.02.16 Технология машиностроения</td>
          <td>4,75</td>
          <td>3,95</td>
          <td>4,18</td>
          <td>70</td>
        </tr>
        <tr>
          <td>7</td>
          <td>43.02.15 Поварское и кондитерское дело</td>
          <td>4,55</td>
          <td>3,7</td>
          <td>4,07</td>
          <td>55</td>
        </tr>
        <tr>
          <td>8</td>
          <td>09.02.07 Информационные системы и программирование</td>
          <td>4,57</td>
          <td>3,15</td>
          <td>3,74</td>
          <td>80</td>
        </tr>
      </tbody>
    </table>
  </Page>
</template>

<style scoped>
.rating-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  font-family: "Times New Roman", serif;
  font-size: 18px;
  text-align: center;
  box-shadow: 0 0 2px rgba(0,0,0,0.2);
  font-weight: bold;
}

.rating-table th,
.rating-table td {
  border: 1px solid black;
  padding: 8px 12px;
  font-weight: bold;
}

.rating-table th {
  font-weight: 900;
  font-size: 19px;
}

.rating-table td:nth-child(2) {
  text-align: left;
  padding-left: 10px;
}

h2 {
  margin-top: 10px;
  margin-bottom: 20px;
  font-weight: 900;
}

.text-center {
  text-align: center;
}
</style>