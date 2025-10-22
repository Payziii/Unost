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
    <Page title="Нормативные документы">
        <Title>Нормативные документы</Title>
        <File file="НДК1.pdf" icon>Расписание ОГЭ 2021</File>
        <File file="НДК2.pdf" icon>Приказ Расписание ЕГЭ</File>
        <File file="НДК3.pdf" icon>Положение о кадетской школе интернат</File>
    </Page>
</template>