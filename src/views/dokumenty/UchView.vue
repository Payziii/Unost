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
    <Page title="Учредительные документы">
        <Title>Учредительные документы</Title>
        <File file="РеестроваяВыписка.pdf" icon>Реестровая выписка</File>
        <File file="Выписка из информационной.pdf" icon> Выписка из государственной информационной системы «Реестр организаций, осуществляющих образовательную деятельность по имеющим государственную аккредитацию образовательным программам»</File>
        <File file="Свидетельство о государственной регистрации права.pdf" icon>Свидетельство о государственной регистрации права</File>
        <File file="Распоряжение о назначении руководителя.pdf" icon>Распоряжение о назначении руководителя</File>
        <File file="Устав ГАПОУ СО Верхнепышминский механико-технологический техникум Юность.pdf" icon>Устав ГАПОУ СО Верхнепышминский механико-технологический техникум Юность</File>
    </Page>
</template>