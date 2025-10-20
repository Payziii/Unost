<script setup>
import Page from '@/components/pages/Page.vue';
import Title from '@/components/pages/Title.vue';
import Text from '@/components/pages/Text.vue';
import Highlight from '@/components/pages/Highlight.vue';
import Link from '@/components/pages/Link.vue';
import File from '@/components/pages/File.vue';
import CardGrid from '@/components/pages/CardGrid.vue';
import Card from '@/components/pages/Card.vue';
import Bold from '@/components/pages/Bold.vue';
</script>

<template>  
    <Page title="Автошкола ВПМТТ «Юность»">
        <Title>АВТОШКОЛА</Title>
            

        <CardGrid>
            <Card title="Подготовка водителей категории В">
                <Text align="left">
                    Обучение на управление транспортными средствами категории "В" - легковыми автомобилями с механической коробкой передач, допускаются лица, достигшие 17 летнего возраста.<br/> <Bold>Срок обучения:</Bold> 3 месяца.<br/><Bold>Стоимость обучения:</Bold> 39 000 рублей.<br/><Bold>Форма обучения:</Bold> очная.
                </Text>
            </Card>
            <Card title="Переподготовка водителей с категории В на категорию С">
                <Text align="left">
                    Обучение на право управления грузовыми автомобилями, разрешенная максимальная масса которых превышает 3 500кл.<br>В обиходе такие автомобили мы обычно называют грузовыми.<br> <Bold>Срок обучения:</Bold> 2 месяца.<br><Bold>Стоимость обучения:</Bold> 30 900 рублей.<br><Bold>Форма обучения:</Bold> очная.
                </Text>
            </Card>
            <Card title="Документы, необходимые для обучения">
                <Text align="left">
                    1. Медицинская справка с открытой категорией «М», «В», «В1» (предоставляется ДО начала обучения).<br><br>2. Копия водительского удостоверения (при наличии).<br><br>3. Фото 3*4 – 1 шт.<br><br>
4. Паспорт гражданина.<br><br>5. Письменное согласие родителей, законных представителей на проведение экзамена, заверенное ГИБДД, если возраст до 18 лет.<br><br>6. Копия СНИЛС.<br><br>7. Номер ИНН.
                </Text>
            </Card>
            <Card title="Документы, необходимые для обучения:">
                <Text align="left">
                    1. Медицинская справка с открытой категорией «М», «В», «В1», «С» , «С1» (предоставляется ДО начала обучения).<br><br>2. Копия водительского удостоверения.<br><br>3. Фото 3*4 – 1 шт.<br><br>4. Паспорт гражданина.<br><br>5. Копия СНИЛС.<br><br>6. Номер ИНН.
                </Text>
            </Card>
        </CardGrid>
        <Text align="justify">
            <Bold>Практические занятия</Bold> проводятся на закрытой площадке - автодром <Bold>Лесная 1</Bold> и в городских условиях в течение рабочего дня по индивидуальному графику. <Bold>Теоретические занятия</Bold> проводятся в вечернее время в уч. классе расположенном на <Bold>Кривоусова 53</Bold>. 
        </Text>
        <Text align="justify">
        <File file="АвтошколаЗаключение.jpg" icon>Заключение</File>
        </Text>
        <CardGrid>
                <div class="logo-container">
            <img 
                src="/images/autoskola/Автошкола1.jpg" 
                alt="Автошкола ЮНОСТЬ" 
                class="logo"
            />
        </div>
                <div class="logo-container">
            <img 
                src="/images/autoskola/Автошкола2.jpg" 
                alt="Автошкола ЮНОСТЬ" 
                class="logo"
            />
        </div>
                <div class="logo-container">
            <img 
                src="/images/autoskola/Автошкола3.jpg" 
                alt="Автошкола ЮНОСТЬ" 
                class="logo"
            />
        </div>
                <div class="logo-container">
            <img 
                src="/images/autoskola/Автошкола4.jpg" 
                alt="Автошкола ЮНОСТЬ" 
                class="logo"
            />
        </div>
        </CardGrid>
    </Page>
</template>


<style scoped>
.content-wrapper {
    width: 100%;
}

.logo-container {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    width: 100%;
}

.logo {
    width: 65%;
    max-width: 65%;
    height: auto;
    border-radius: 8px;
}

</style>