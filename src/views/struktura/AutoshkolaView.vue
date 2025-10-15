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
    <Page title="Автошкола ВПМТТ «Юность»">
        <div class="content-wrapper">
            <Title>АВТОШКОЛА</Title>
            
            <div class="logo-container">
                <img 
                    src="https://вп-юность.рф/upload/images/%D0%BB%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF%20%D0%BF%D1%80%D0%BE%D1%84.jpg" 
                    alt="Логотип Профессионалитет" 
                    class="logo"
                />
            </div>
        </div>
        <CardGrid>
            <Card title="Подготовка водителей категории В">
                <Text align="left">
                    Обучение на управление транспортными средствами категории "В" - легковыми автомобилями с механической коробкой передач, допускаются лица, достигшие 17 летнего возраста.<br/> <span style="font-weight: 500;">Срок обучения:</span> 3 месяца<br/><span style="font-weight: 500;">Стоимость обучения:</span> 39 000 рублей.<br/><span style="font-weight: 500;">Форма обучения:</span> очная.
                </Text>
            </Card>
            <Card title="Переподготовка водителей с категории В на категорию С">
                <Text align="left">
                    Обучение на право управления грузовыми автомобилями, разрешенная максимальная масса которых превышает 3 500кл.<br>В обиходе такие автомобили мы обычно называют грузовыми.<br> <span style="font-weight: 500;">Срок обучения:</span> 2 месяца.<br><span style="font-weight: 500;">Стоимость обучения:</span> 30 900 рублей.<br><span style="font-weight: 500;">Форма обучения:</span> очная.
                </Text>
            </Card>
            <Card title="Документы, необходимые для обучения">
                <Text align="left">
                    1. Медицинская справка с открытой категорией «М», «В», «В1» (предоставляется ДО начала обучения).<br><br>2. Копия водительского удостоверения (при наличии).<br><br>3. Фото 3*4 – 1 шт.<br><br>
4. Паспорт гражданина.<br><br>5. Письменное согласие родителей, законных представителей на проведение экзамена, заверенное ГИБДД, если возраст до 18 лет.<br><br>6. Копия СНИЛС<br><br>7. Номер ИНН
                </Text>
            </Card>
            <Card title="Документы, необходимые для обучения:">
                <Text align="left">
                    1. Медицинская справка с открытой категорией «М», «В», «В1», «С» , «С1» (предоставляется ДО начала обучения).<br><br>2. Копия водительского удостоверения<br><br>3. Фото 3*4 – 1 шт.<br><br>4. Паспорт гражданина.<br><br>5. Копия СНИЛС<br><br>6. Номер ИНН
                </Text>
            </Card>
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

.pulsing-text-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 2rem;
}

</style>