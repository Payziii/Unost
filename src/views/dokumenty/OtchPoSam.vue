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
    <Page title="Отчеты по самообследованию">
        <Title>Отчеты по самообследованию</Title>
        <File file="Самообследование СПО 2024.pdf" icon>Самообследование СПО 2024</File>
        <File file="Самообследование КШИ 2024.pdf" icon>Самообследование КШИ 2024</File>
    </Page>
</template>