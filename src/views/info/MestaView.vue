<script setup>
import Page from '@/components/pages/Page.vue';
import Title from '@/components/pages/Title.vue';
import Text from '@/components/pages/Text.vue';
import Highlight from '@/components/pages/Highlight.vue';
import Link from '@/components/pages/Link.vue';
import File from '@/components/pages/File.vue';
import CardGrid from '@/components/pages/CardGrid.vue';
import Card from '@/components/pages/Card.vue';
import TitledImage from '@/components/pages/TitledImage.vue';
</script>

<template>
    <Page title="Вакантные места для приема (перевода)">
       

        <Title level="2">Вакантные места для приема (перевода) СПО</Title>
        <Text align="center">
            Информация формируется.
        </Text>

        <Title level="2">Вакантные места для приема (перевода) КШИ</Title>

        <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Уровень образования</th>
                        <th>Параллель</th>
                        <th>Количество вакантных мест</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td rowspan="5">Основное общее</td>
                        <td>5-е классы</td>
                        <td>Нет</td>
                    </tr>
                    <tr>
                        <td>6-е классы</td>
                        <td>Нет</td>
                    </tr>
                    <tr>
                        <td>7-е классы</td>
                        <td>Нет</td>
                    </tr>
                    <tr>
                        <td>8-е классы</td>
                        <td>Нет</td>
                    </tr>
                    <tr>
                        <td>9-е классы</td>
                        <td>Нет</td>
                    </tr>
                    <tr>
                        <td rowspan="2">Среднее общее</td>
                        <td>10 класс</td>
                        <td>5</td>
                    </tr>
                    <tr>
                        <td>11 класс</td>
                        <td>Нет</td>
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

.table th, .table td {
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
</style>
