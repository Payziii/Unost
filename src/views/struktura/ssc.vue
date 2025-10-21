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
    <Page title="Студенческий спортивный клуб">
    <Title>Студенческий спортивный клуб</Title>
    <Text align="center">
        Студенческий спортивный клуб приглашает в свою команду! Если у тебя море идей, позитива и желание воплотить свою мечту в реальность, то тебе к нам!  
    </Text>
    <Title>Направления</Title>
    <CardGrid maxCardsPerRow=2>
    <Card>
    <img 
        src="/images/ssc/Баскетбол.jpg"
        alt="Баскетбол"
        class="logo"
    />
    </Card>
    <Card>
    <img 
        src="/images/ssc/Волейбол.jpg"
        alt="Волейбол"
        class="logo"
    />
    </Card>
    </CardGrid>
    <CardGrid maxCardsPerRow=3>
    <Card>
    <Text align="center">
        <Bold>Волейбол</Bold><br>     
        Кривоусова 53<br>
        Понедельник: 18.00-19.00<br>
        Среда: 18.00-19.00
    </Text>
    </Card>

    <Card>
        <Text align="center">
        <Bold>Баскетбол</Bold><br>     
        Кривоусова 53<br>
        Вторник: 19.00-20.00<br>
        Четверг: 19.00-20.00
    </Text>
    </Card>

    <Card>
        <Text align="center">
        <Bold>Общая физическая подготовка</Bold><br>     
        Лесная 1 (Тренажёрный зал)<br>
        Вторник: 18.00-20.00<br>
        Четверг: с 18.00-20.00
    </Text>
    </Card>

    </CardGrid>
    <Text align="justify">
        <Highlight>Календарный план 2024-2025 (ОТСУТСТВУЕТ)</Highlight>
    </Text>
    <File file="ПланРаботыССК.pdf" icon>План работы ССК</File>
    <File file="УставССК.pdf" icon>Устав Студенческого спортивного клуба</File>
    <File file="ПротоколОбщегоСобрания.pdf" icon>Протокол общего собрания ССК</File>
    <File file="Отчёт о деятельности  ССК 23-24 (2).docx" icon>Отчёт о деятельности  ССК за 2023-2024</File>
    <File file="РасписаниеРаботССК.pdf" icon>Расписание Работы ССК</File>
    <Text align="justify">
        <Highlight>Наши новости (ОТСУТСТВУЕТ)</Highlight>
    </Text>
    <CardGrid maxCardsPerRow=3>
    <Card>
    <img 
        src="/images/ssc/ssc1.jpeg" 
        alt="сск" 
        class="logo"
    />
    </Card>
    <Card>
    <img 
        src="/images/ssc/ssc2.jpeg" 
        alt="сск" 
        class="logo"
    />
    </Card>
    <Card>
    <img 
        src="/images/ssc/ssc3.jpeg" 
        alt="сск" 
        class="logo"
    />
    </Card>
    </CardGrid>
    </Page>
</template>