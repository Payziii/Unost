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
import Bold from '@/components/pages/Bold.vue';
</script>

<template>
    <Page title="ФП «Национальная система квалификаций – конструктор карьеры»">
        <Title>ФП «Национальная система квалификаций – конструктор карьеры»</Title>
        <Text align="justify">
            Проект направлен на внедрение практики поддержки профессионального и карьерного развития молодежи с
            применением инструментов национальной системы квалификации.<br />
            <Bold>Участники и преимущества для них:</Bold><br />
            студенты и молодые специалисты - осознанное построение профессиональной карьеры. Повышение
            конкурентоспособности на рынке труда.<br />
            образовательные организации - повышение качества подготовки и мотивации студентов.<br />
            работодатели - совершенствование системы стимулирования и развития персонала.<br /><br />
            <Bold>Что такое национальная система квалификаций?</Bold><br />
            О национальной системе квалификаций<br />
            <Link linkTo="https://bc-nark.ru/projects/nsk-konstruktor-karery/">
            https://bc-nark.ru/projects/nsk-konstruktor-karery/</Link><br />
            <Link linkTo="https://bc-nark.ru/projects/nsk-konstruktor-karery/materialy/">
            https://bc-nark.ru/projects/nsk-konstruktor-karery/materialy/</Link><br />
            <Link linkTo="https://ok.nark.ru/nok/">https://ok.nark.ru/nok/</Link><br /><br />
            ГАПОУ СО «Верхнепышминский механико-технологический техникум «Юность» вступил в проект «НСК-Конструктор
            карьеры» с 2023г., проведены ряд мероприятий:<br/>
            апробация рекомендаций по проектированию и организации деятельности центра карьеры, организованной ГАПОУ СО «Верхнепышминский механико-технологический техникум «Юность», в результате определен перечень организаций- партнеров, которые заинтересованы в совместном проекте;<br/>
            анкетирование студентов 4 курса с использованием опросной платформы Национального агентства (изучение готовности к трудоустройству, построению карьеры и профессиональному развитию, применению в этих целях инструментов НСК);<br/>
            внедрение в ОПОП СПО аналога учебной дисциплины «Карьерное моделирование» (в 2023 году - УД «Технология трудоустройства»; в 2024 году – УД «Эффективное поведение на рынке труда» - учебная дисциплина ) на основе примерной программы, разработанной Базовым центром АНО НАРК;<br/>
            организация независимой оценки квалификации (НОК) для студентов в рамках системы менеджмента качества - 40.00200.01 Сварщик дуговой сварки плавящимся покрытым электродом (2 уровень квалификации).<br/>
            <Bold>Сведения о динамике успешности реализации проекта</Bold>
        </Text>
        <div class="table-responsive">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Код и наименование профессии/ специальности СПО, квалификация по ФГОС</th>
                        <th>Код и наименование профессиональной квалификации</th>
                        <th colspan="2">в 2021 году</th>
                        <th colspan="2">в 2022 году</th>
                        <th colspan="2">в 2023 году</th>
                        <th colspan="2">в 2024 году</th>
                    </tr>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>численность участников, чел.</th>
                        <th>доля успешных соискателей, %</th>
                        <th>численность участников, чел.</th>
                        <th>доля успешных соискателей, %</th>
                        <th>численность участников, чел.</th>
                        <th>доля успешных соискателей, %</th>
                        <th>численность участников, чел.</th>
                        <th>доля успешных соискателей, %</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>22.02.06 Сварочное производство (техник, электросварщик ручной сварки)</td>
                        <td>40.00200.01 Сварщик дуговой сварки плавящимся покрытым электродом (2 уровень квалификации)
                        </td>
                        <td>1</td>
                        <td>50</td>
                        <td>5</td>
                        <td>83</td>
                        <td>3</td>
                        <td>75</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>22.02.06 Сварочное производство (техник, электросварщик ручной сварки)</td>
                        <td>40.00200.10 Сварщик дуговой сварки плавящимся электродом в защитном газе (2 уровень
                            квалификации)</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>3</td>
                        <td>67</td>
                    </tr>
                    <tr>
                        <td>22.02.06 Сварочное производство (техник, электросварщик ручной сварки)</td>
                        <td>40.00200.13 Сварщик дуговой сварки неплавящимся электродом в защитном газе (2 уровень
                            квалификации)</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>2</td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <td colspan="2"><strong>Итого:</strong></td>
                        <td>1</td>
                        <td>50</td>
                        <td>5</td>
                        <td>83</td>
                        <td>3</td>
                        <td>75</td>
                        <td>5</td>
                        <td>80</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Text align="justify">
             <Link linkTo="https://bc-nark.ru/projects/nsk-konstruktor-karery/uchebnik/">Карьерное моделирование</Link><br/>
             <Link linkTo="https://bc-nark.ru/projects/nsk-konstruktor-karery/professionalnyy-ekzamen-dlya-studentov/">Независимая оценка квалификаций</Link><br/>
             <Link linkTo="https://profstandart.rosmintrud.ru/obshchiy-informatsionnyy-blok/natsionalnyy-reestr-professionalnykh-standartov/reestr-professionalnykh-standartov/">Профессиональные стандарты</Link><br/>
        </Text>
        <File icon file="9TddZNefkh9DbsK5Krk3hsFTD.pdf">План реализации_2024</File>
        <File icon file="H7YnEBzQ9kAB5yyrsQf7ydbFQ.pdf">1_Опрос студентов_ВПМТТ Юность_2023_Согласовано МЦРК</File>
        <File icon file="3B67aFF8rYBRebRtDdi2BBebG.pdf">2_Апробация рекомендаций_ВПМТТ Юность_Согласовано МЦРК</File>
        <File icon file="azNd4n6sh3tRyr6dRKiTnEitQ.pdf">3_Справка_НСК-КК_ВПМТТ Юность_2023_Согласовано МЦРК</File>
    </Page>
</template>

<style scoped>
.content-wrapper {
    width: 100%;
}

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
</style>