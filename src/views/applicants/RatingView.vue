<script setup>
import Page from '@/components/pages/Page.vue';
import Title from '@/components/pages/Title.vue';
import Link from '@/components/pages/Link.vue';
import File from '@/components/pages/File.vue';
</script>

<template>
  <Page title="Рейтинг абитуриентов 2024">
    <Text align="left">
      <File file="../docs/отчет_о_выполнении_контрольных_цифр_приема_2024.pdf" icon>
        Отчет о выполнении контрольных цифр приема 2024 г
      </File>
</Text>

    <Title level="2">Информация о баллах абитуриентов в 2024</Title>

    <div class="table-responsive">
      <table class="table table-bordered">
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
    </div>
  </Page>
</template>

<style scoped>
.table-responsive {
  overflow-x: auto;
  margin: 20px 0;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 2px solid #000000;
  background-color: #f8f9fa;
  padding: 12px;
  text-align: center;
  font-size: 20px;
}

.table th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.table td:nth-child(2) {
  text-align: left;
  padding-left: 12px;
}

.text-center {
  text-align: center;
  margin-bottom: 20px;
}
</style>
