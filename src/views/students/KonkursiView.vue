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
    <Page title="Конкурсы и олимпиады">
        <Title>Конкурсы и олимпиады</Title>
        
        <Text align="left">
            <File file="приказ ВСОШ от 05.09.2025.pdf" icon>Приказ ВСОШ от 05.09.2025</File>
            <File file="приказ № 169 от 17.09.2025.pdf" icon>Приказ № 169 от 17.09.2025</File>
            <File file="приказ № 160 от 09.09.2025.pdf" icon>Приказ № 160 от 09.09.2025</File>
            <File file="Приказ № 65-од Об организации и проведении городской квест-игры 2025.pdf" icon>Приказ № 65-од Об организации и проведении городской квест-игры 2025</File>
            <File file="приказ 153 от 03.09.2025.pdf" icon>Приказ № 153 от 03.09.2025</File>
        </Text>
    </Page>
</template>