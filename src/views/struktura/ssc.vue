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
    <Text align="justify">
        <Highlight>Календарный план 2024-2025 (ОТСУТСТВУЕТ)</Highlight>
    </Text>

    <CardGrid maxCardsPerRow=2>
    <Card>
    <Text align="justify">
        <Bold>Баскетбол, воллейбол</Bold><br>
        Понедельник: 18.00-20.00<br>
        Среда: 18.00-20.00
    </Text>
    </Card>
    </CardGrid>
    <File file="ПланРаботыССК.pdf" icon>План работы ССК</File>
    <File file="УставССК.pdf" icon>Устав Студенческого спортивного клуба</File>
    <File file="ПротоколОбщегоСобрания.pdf" icon>Протокол общего собрания ССК</File>
    <File file="Отчёт о деятельности  ССК 23-24 (2).docx" icon>Отчёт о деятельности  ССК за 2023-2024</File>
    </Page>
</template>