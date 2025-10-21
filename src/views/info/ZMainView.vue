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
    <Page title="Основные сведения">
        <Title>Основные сведения</Title>
        
        <Text align="left">
            <Highlight>Полное наименование:</Highlight> Государственное автономное профессиональное образовательное учреждение Свердловской области «Верхнепышминский механико-технологический техникум «Юность»<br/><br/>
            
            <Highlight>Сокращенное наименование:</Highlight> ГАПОУ СО «ВПМТТ «Юность»<br/><br/>
            
            <Highlight>Год создания образовательного учреждения:</Highlight> 1970 год
        </Text>

        <Title>Учредители образовательной организации</Title>
        <CardGrid>
            <Card title="Министерство образования Свердловской области">
                <Text align="left">
                    <Highlight>Вид ответственности:</Highlight> Юридическое лицо<br/>
                    <Highlight>ФИО руководителя учредителя:</Highlight> Исполняющий обязанности Министра - Тренихина Светлана Юрьевна<br/>
                    <Highlight>Адрес учредителя:</Highlight> 620075, г. Екатеринбург, ул. Малышева, д. 33<br/>
                    <Highlight>Телефоны учредителя:</Highlight> +7 (343) 312-00-04<br/>
                    <Highlight>Адрес электронной почты учредителя:</Highlight> info.minobraz@egov66.ru<br/>
                    <Highlight>Сайт:</Highlight> <Link linkTo="https://minobraz.egov66.ru/">https://minobraz.egov66.ru/</Link>
                </Text>
            </Card>
        </CardGrid>

        <Title>Место нахождения образовательной организации</Title>
        <CardGrid>
            <Card title="Главный учебно-лабораторный корпус">
                <Text align="left">
                    624090, Свердловская область, г. Верхняя Пышма, ул. Кривоусова, д. 53
                </Text>
            </Card>
            <Card title="Учебно-производственный корпус">
                <Text align="left">
                    624093, Свердловская область, г. Верхняя Пышма, ул. Лесная, д. 1
                </Text>
            </Card>
        </CardGrid>

        <Title>Режим работы</Title>
        <Text align="left">
            Понедельник-пятница: с 08-00 до 17-00<br/>
            Суббота: с 08-00 до 14-00<br/>
            Воскресение: Выходной
        </Text>

        <Title>Контактная информация</Title>
        <Text align="left">
            <Highlight>Адрес электронной почты:</Highlight> lobastov07@mail.ru<br/>
            <Highlight>Адрес официального сайта:</Highlight> <Link linkTo="https://вп-юность.рф">https://вп-юность.рф</Link><br/>
            <Highlight>Телефон:</Highlight> +7 (34368) 5-44-86
        </Text>

        <Title>Руководство</Title>
        <CardGrid>
            <Card title="Директор">
                <Text align="left">
                    <Highlight>ФИО:</Highlight> Лобастов Виталий Геннадьевич<br/>
                    <Highlight>Телефон:</Highlight> +7 (34368) 5-44-86<br/>
                    <Highlight>Электронная почта:</Highlight> lobastov07@mail.ru
                </Text>
            </Card>
            <Card title="Заместитель директора по УР">
                <Text align="left">
                    <Highlight>ФИО:</Highlight> Рабенок Мария Александровна<br/>
                    <Highlight>Телефон:</Highlight> +7 (34368) 5-44-33<br/>
                    <Highlight>Электронная почта:</Highlight> marija-2907@rambler.ru
                </Text>
            </Card>
            <Card title="Заместитель директора по УПР">
                <Text align="left">
                    <Highlight>ФИО:</Highlight> Третяк Надежда Александровна<br/>
                    <Highlight>Телефон:</Highlight> +7 993 505 90-41<br/>
                    <Highlight>Электронная почта:</Highlight> mtt.zam-upr@yandex.ru
                </Text>
            </Card>
            <Card title="Заместитель директора по УВР">
                <Text align="left">
                    <Highlight>ФИО:</Highlight> Яковлева Юлия Юрьевна<br/>
                    <Highlight>Телефон:</Highlight> +7 (34368) 5-42-67<br/>
                    <Highlight>Электронная почта:</Highlight> mtt_zamuvr@mail.ru
                </Text>
            </Card>
            <Card title="Приемная комиссия">
                <Text align="left">
                    <Highlight>Телефон:</Highlight> +7-992-029-52-73, +7-992-029-52-01<br/>
                    <Highlight>Электронная почта:</Highlight> priemMTTyunost@yandex.ru
                </Text>
            </Card>
        </CardGrid>

        <Title>Документы</Title>
        <Text align="left">
            <File file="reestrova_vipiska.pdf" icon>Информация о лицензии на осуществление образовательной деятельности</File>
            <File file="Реестровая выписка(3).pdf" icon>Государственная аккредитация образовательной деятельности</File>
        </Text>

        <Title>Структурные подразделения</Title>
        <CardGrid>
            <Card title="Кадетская школа-интернат">
                <Text align="left">
                    624090, Свердловская Область, г. Верхняя Пышма, ул. Кривоусова, д. 53<br/>
                    Свидетельство о гос. аккредитации: рег. № 9581 от 31.03.2020 г.<br/>
                    Срок действия: до 02.03.2029 г.
                </Text>
            </Card>
            <Card title="Центр патриотического воспитания и допризывной подготовки имени Г.К. Жукова">
                <Text align="left">
                    <File file="Приказ  Министерства о создании Центра ПВиДП.pdf" icon>Приказ о создании № 196-И от 11.05.2011</File>
                </Text>
            </Card>
            <Card title="Центр профилактики детского дорожно-транспортного травматизма «Лаборатория безопасности»">
                <Text align="left">
                    <File file="О создании структурного подразделения ЦПДТТ СО(1).pdf" icon>Приказ о создании № 149/1-од от 29.10.2018</File>
                </Text>
            </Card>
            <Card title="Центр проведения демонстрационных экзаменов">
                <Text align="left">
                    <File file="приказ.pdf" icon>Приказ о создании 01.08.2020 № 130/-од</File>
                </Text>
            </Card>
        </CardGrid>
    </Page>
</template>