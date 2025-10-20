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
</script>

<template>  
    <Page title="Раскрытие информации">
        <Title>Профсоюз</Title>
        <File file="ПредлоРегули.xls" icon>Предложение регулируемой организации об установлении тарифов в сфере теплоснабжения</File>
        <File file="ОНаличииТехВоз.xls" icon>О наличии технической возможности подключения к системе теплоснабжения за 1 кв 2025 года</File>
    </Page>
</template>

<style scoped>
.content-wrapper {
    width: 100%;
}
</style>