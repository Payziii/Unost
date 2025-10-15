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
    <Page title="Структура и органы управления образовательной организацией">
        <Title>Структура и органы управления образовательной организацией</Title>

        <Title>Учредитель</Title>
        <CardGrid>
            <Card title="Министерство образования и молодежной политики Свердловской области">
                <Text align="left">
                    <Highlight>Сайт:</Highlight> <Link linkTo="https://minobraz.egov66.ru">minobraz.egov66.ru</Link><br/>
                    <Highlight>Адрес:</Highlight> 620075 Свердловская область, г. Екатеринбург ул. Малышева, 33<br/>
                    <Highlight>Контактный телефон:</Highlight> +7-343-312-00-04
                </Text>
            </Card>
        </CardGrid>

        <Title>Руководство учредителя</Title>
        <CardGrid>
            <Card title="Министр министерства образования и молодежной политики Свердловской области">
                <Text align="left">
                    <Highlight>ФИО:</Highlight> Исполняющий обязанности Министра - Тренихина Светлана Юрьевна<br/>
                    <Highlight>Сайт:</Highlight> <Link linkTo="https://minobraz.egov66.ru">minobraz.egov66.ru</Link><br/>
                    <Highlight>Рабочий адрес:</Highlight> 620075, город Екатеринбург, ул. Малышева, д.33, каб. 309<br/>
                    <Highlight>Рабочий телефон:</Highlight> +7-343-312-00-04
                </Text>
            </Card>
            <Card title="Отдел профессионального образования">
                <Text align="left">
                    <Highlight>Начальник отдела:</Highlight> Коваленко Елена Николаевна<br/>
                    <Highlight>Сайт:</Highlight> <Link linkTo="https://minobraz.egov66.ru">minobraz.egov66.ru</Link><br/>
                    <Highlight>Рабочий адрес:</Highlight> 620075, город Екатеринбург, ул. Малышева, д.33<br/>
                    <Highlight>Рабочий телефон:</Highlight> +7-343-312-00-04 доб. 133<br/>
                    <Highlight>Электронная почта:</Highlight> e.kovalenko@egov66.ru
                </Text>
            </Card>
        </CardGrid>

        <Title>Руководитель образовательного учреждения</Title>
        <CardGrid>
            <Card title="Директор Лобастов Виталий Геннадьевич">
                <Text align="left">
                    <Highlight>Сайт:</Highlight> <Link linkTo="https://вп-юность.рф/">Вп-Юность.Рф</Link><br/>
                    <Highlight>Рабочий адрес:</Highlight> 624090, Свердловская область, г. Верхняя Пышма, ул. Кривоусова, д. 53<br/>
                    <Highlight>Телефон:</Highlight> +7 (34368) 5-44-86<br/>
                    <Highlight>Электронная почта:</Highlight> lobastov07@mail.ru<br/>
                    <File file="Назначение Лобастова В.Г. с 22.04.2022 на 5 лет.pdf" icon>Распоряжение №155-РП от 15.04.2022</File>
                </Text>
            </Card>
        </CardGrid>

        <Title>Структурные подразделения</Title>
        <CardGrid>
            <Card title="Кадетская школа-интернат">
                <Text align="left">
                    <File file="Приказ №03-д от 28.04.2004 г. (Об изменении типа, вида и наименования училища Юность Центр с КШИ).pdf" icon>Приказ создания № 03-д от 28.04.2004</File>
                    <File file="Положение КШИ(2).pdf" icon>Положение</File><br/>
                    <Highlight>Адрес:</Highlight> 624090, Свердловская Область, г. Верхняя Пышма, ул. Кривоусова, д. 53<br/>
                    <Highlight>Свидетельство о гос. аккредитации:</Highlight> рег. № 9581 от 31.03.2020 г.<br/>
                    <Highlight>Срок действия:</Highlight> до 02.03.2029 г.<br/>
                    <Highlight>Сайт:</Highlight> <Link linkTo="https://vk.com/club45797349">Кадеты Верхней Пышмы</Link>
                </Text>
            </Card>
            <Card title="Центр патриотического воспитания и допризывной подготовки имени Г.К. Жукова">
                <Text align="left">
                    <File file="Приказ  Министерства о создании Центра ПВиДП.pdf" icon>Приказ о создании № 196-И от 11.05.2011</File>
                    <File file="Положение о создании ЦПиВП.pdf" icon>Положение о создании</File><br/>
                    <Highlight>Руководитель:</Highlight> Габец Нина Евгеньевна<br/>
                    <Highlight>Эл. почта:</Highlight> centr-pv2013@yandex.ru<br/>
                    <Highlight>Адрес:</Highlight> 624090, Свердловская Область, г. Верхняя Пышма, ул. Кривоусова, д. 53<br/>
                    <Highlight>Сайт:</Highlight> <Link linkTo="https://vk.com/public193895113">Патриотическое воспитание в "Юности"</Link>
                </Text>
            </Card>
            <Card title="Центр профилактики детского дорожно-транспортного травматизма «Лаборатория безопасности»">
                <Text align="left">
                    <File file="О создании структурного подразделения ЦПДТТ СО(1).pdf" icon>Приказ о создании № 149/1-од от 29.10.2018</File>
                    <File file="Положение Центра ПДДТТ.pdf" icon>Положение</File><br/>
                    <Highlight>Руководитель:</Highlight> Абрарова Гульнара Ахатовна<br/>
                    <Highlight>Адрес:</Highlight> 624093, Свердловская Область, г. Верхняя Пышма, ул. Лесная, д. 1<br/>
                    <Highlight>Телефон:</Highlight> 8-919-376-30-16<br/>
                    <Highlight>Эл. почта:</Highlight> centr_bdd@mail.ru
                </Text>
            </Card>
            <Card title="Центр проведения демонстрационных экзаменов">
                <Text align="left">
                    <File file="приказ.pdf" icon>Приказ о создании 01.08.2020 № 130/-од</File>
                    <File file="Положение ЦПДЭ.pdf" icon>Положение о создании</File><br/>
                    <Highlight>Руководитель:</Highlight> Вагайская Татьяна Александровна<br/>
                    <Highlight>Адрес:</Highlight> 624093, Свердловская Область, г. Верхняя Пышма, ул. Лесная, д. 1<br/>
                    <Highlight>Телефон:</Highlight> 8-996-17-78-168
                </Text>
            </Card>
            <Card title="Учебно-производственный комплекс (УПК)">
                <Text align="left">
                    <File file="О создании УПК.pdf" icon>Приказ о создании 29.02.2024 №27/1-од</File>
                    <File file="Положение УПК.pdf" icon>Положение о создании</File><br/>
                    <Highlight>Руководитель:</Highlight> Вагайская Татьяна Александровна<br/>
                    <Highlight>Адрес:</Highlight> 624093, Свердловская Область, г. Верхняя Пышма, ул. Лесная, д. 1<br/>
                    <Highlight>Телефон:</Highlight> 8-996-17-78-168
                </Text>
            </Card>
        </CardGrid>

        <Title>Коллегиальные органы самоуправления</Title>
        <CardGrid>
            <Card title="Наблюдательный совет">
                <File file="Положение о Наблюдательном совете(1).pdf" icon>Положение о наблюдательном совете</File>
            </Card>
            <Card title="Совет Техникума">
                <File file="Положение о Совете_подпись(1).pdf" icon>Положение о совете</File>
            </Card>
            <Card title="Общее собрание работников">
                <File file="Положение об общем собрании работников и представителей обучающихся.pdf" icon>Положение о собрании работников</File>
            </Card>
            <Card title="Студенческий совет">
                <File file="Положение о Совете обучающихся.pdf" icon>Положение о студ.совете</File>
            </Card>
            <Card title="Родительский комитет">
                <File file="Положение о родительском комитете(1).pdf" icon>Положение о род. комитете</File>
            </Card>
        </CardGrid>

        <Title>Инновационная деятельность</Title>
        <CardGrid>
            <Card title="Стажировочная площадка ИРО">
                <Text align="left">
                    ГАПОУ СО «ВПМТТ «Юность» - Стажировочная площадка ИРО<br/>
                    <Link linkTo="https://cloud.mail.ru/public/DDue/Tx7k86XUJ">https://cloud.mail.ru/public/DDue/Tx7k86XUJ</Link>
                </Text>
            </Card>
            <Card title="Региональная инновационная площадка">
                <Text align="left">
                    ГАПОУ СО «ВПМТТ «Юность» - Региональная инновационная площадка Свердловской области<br/>
                    <Link linkTo="https://cloud.mail.ru/public/6g1P/mjgTNhUAv">https://cloud.mail.ru/public/6g1P/mjgTNhUAv</Link>
                </Text>
            </Card>
        </CardGrid>
    </Page>
</template>