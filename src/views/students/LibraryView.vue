<script setup>
import Page from '@/components/pages/Page.vue';
import Title from '@/components/pages/Title.vue';
import Text from '@/components/pages/Text.vue';
import Highlight from '@/components/pages/Highlight.vue';
import Link from '@/components/pages/Link.vue';
import File from '@/components/pages/File.vue';
import CardGrid from '@/components/pages/CardGrid.vue';
import Card from '@/components/pages/Card.vue';
</script>

<template>
    <Page title="Доступ к библиотечным и электронным образовательным ресурсам">
        <Title>Доступ к библиотечным и электронным образовательным ресурсам</Title>
        
       
        
        <Text align="justify">
            В обоих корпусах техникума есть большие библиотеки, сотрудники и студенты имеют право пользоваться каждой из них, имея при себе студенческий билет или паспорт.
        </Text>

        <CardGrid>
            <Card title="Библиотека 1-го корпуса">
                <Text align="left">
                    <strong>Адрес:</strong> ул. Кривоусова<br/>
                    <strong>График работы:</strong> ежедневно, кроме субботы и воскресенья<br/>
                    <strong>Время работы:</strong> с 8.00 до 17.00
                </Text>
            </Card>
            <Card title="Библиотека 2-го корпуса">
                <Text align="left">
                    <strong>Адрес:</strong> ул. Лесная<br/>
                    <strong>График работы:</strong> понедельник, среда, пятница<br/>
                    <strong>Время работы:</strong> с 8.00 до 17.00<br/>
                    <em>(в соответствии с количеством читателей)</em>
                </Text>
            </Card>
        </CardGrid>

        <Text align="justify">
            <Highlight>Объединённый фонд библиотеки составляет 38 666 экз.</Highlight> (библиотека корпуса №1 - 21 419 экз., корпуса №2 - 17 247 экз.), из них учебники - 27 414 экз. по общеобразовательным предметам и профессиональному образованию, а также художественная литература, справочная и научно-познавательная. Библиотека имеет в фонде более 600 электронных учебников. Имеется подписка на периодические издания.
        </Text>

        <Text align="justify">
            В библиотеке созданы постоянно пополняемые электронные базы данных книг и учебников библиотек каждого корпуса, состоящие из 13 300 наименований книг и учебников. Ведутся каталоги и картотеки газетно-журнальных статей на бумажных носителях.
        </Text>

        <Text align="justify">
            Библиотека имеет фонд видеокассет и телевизор, более 100 компакт-дисков, оснащена 6-ю компьютерами, 2-мя принтерами и ксероксом, подключена к Интернету. Учащиеся, студенты и сотрудники имеют возможность получить информацию в электронном виде.
        </Text>

        <Text align="justify">
            Студенты и преподаватели могут пользоваться электронными ресурсами Электронно-библиотечных систем:
        </Text>
        
        <Text align="left">
            <Link linkTo="https://www.urait.ru">«Юрайт» - www.urait.ru</Link><br/>
            <Link linkTo="https://www.biblio-online.ru">«Юрайт» - www.biblio-online.ru</Link><br/>
            Издательство «Академия»
        </Text>

        <Text align="justify">
            В целях популяризации литературы в библиотеках каждого корпуса сменяются тематические выставки, проводятся беседы, обзоры, литературно-музыкальные мероприятия и т.д.
        </Text>

        <Text align="left">
            <Highlight>В библиотеке техникума работают:</Highlight><br/><br/>
            • Ушакова Любовь Фёдоровна<br/>
            • Перфильева Ирина Васильевна
        </Text>

        <Title>Научная электронная библиотека</Title>
        <Text align="center">
            Студенты и преподаватели техникума имеют доступ к научным электронным ресурсам для проведения исследований и подготовки учебных материалов.
        </Text>
        
        <Text align="center">
            <Link linkTo="https://elibrary.ru/defaultx.asp">Научная электронная библиотека eLibrary.ru</Link>
        </Text>
    </Page>
</template>