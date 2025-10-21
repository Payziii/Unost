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
    <Page title="Учебно-производственный комплекс">
        <Title>Учебно-производственный комплекс</Title>
        <Text align="left">
            <File file="О создании УПК.pdf" icon>О создании УПК</File>
            <File file="Положение УПК.pdf" icon>Положение УПК</File>
        </Text>

  
    </Page>
</template>