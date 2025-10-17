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
    <Page title="Руководство">
        <Title>Руководство</Title>

        <CardGrid>
            <Card title="Лобастов Виталий Геннадьевич">
                <img src="/images/AboutUs/Lobastov.jpeg"></img>
                <Text align="left">
                    <span style="font-weight: 500">Должность: </span>Директор<br /><br />
                    <span style="font-weight: 500">Образование:</span> Свердловский государственный педагогический
                    институт, 1980 г. Специальность: «Русский язык и литература». <br /><br /><span
                        style="font-weight: 500"> Квалификация:</span> учитель.
                    Повышение квалификации (2024 г.): «ИРО», программа «Управление программой развития профессиональной
                    образовательной организации», 72 часа.<br /><br />
                    <span style="font-weight: 500">Опыт работы:</span> Общий — 43 года, по специальности — 42 года.
                    Ученой степени и звания не имеет.<br /><br />

                    <span style="font-weight: 500">Контакты:</span><br />
                    Телефон: +7 (34368) 5-44-86<br />
                    E-mail: lobastov07@mail.ru<br /><br />

                    <span style="font-weight: 500">Награды и звания:</span><br />
                    • 1995 г. – Отличник народного просвещения<br />
                    • 2007 г. – Ветеран труда РФ<br />
                    • 2008 г. – Почетная грамота Министерства общего и профессионального образования Свердловской
                    области<br />
                    • 2010 г. – Грамота Министерства общего и профессионального образования Свердловской области<br />
                    • 2012 г. – Почетный работник среднего профессионального образования Российской Федерации<br />
                    • 2014 г. – Грамота Министерства образования и науки Российской Федерации<br />
                    • 2015 г. – Почетный знак «Директор года»<br />
                    • 2016 г. – Медаль «Патриот России»
                </Text>
            </Card>
<Card title="Рабенок Мария Александровна">
    <img src="/images/AboutUs/Rabenok.png" height="465px"></img>
    <Text align="left">
        <span style="font-weight: 500">Должность: </span>Заместитель директора по учебной работе<br /><br />
        
        <span style="font-weight: 500">Образование:</span> Уральский государственный педагогический университет. 
        Специальности: «Социальная педагогика» (социальный педагог), «Педагогика» (магистр).<br /><br />
        
        <span style="font-weight: 500">Повышение квалификации:</span> Регулярное обучение по программам управления 
        образованием, оценки качества образования и внедрения ФГОС (2021-2024 гг.).<br /><br />
        
        <span style="font-weight: 500">Опыт работы:</span> Общий стаж — 31 год, по специальности — 31 год.<br /><br />

        <span style="font-weight: 500">Контакты:</span><br />
        Телефон: +7 (34368) 5-44-33<br />
        E-mail: marija-2907@rambler.ru<br /><br />

        <span style="font-weight: 500">Награды и звания:</span><br />
        • Ветеран труда Российской Федерации<br />
        • Отличник просвещения Министерства просвещения РФ<br />
        • Почётная грамота Министерства образования и науки РФ<br />
        • Финалист Всероссийского конкурса «Завуч года – 2019»<br />
        • Благодарственные письма органов власти Свердловской области
    </Text>
</Card>
        </CardGrid>



    </Page>
</template>