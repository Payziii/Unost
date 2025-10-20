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
    <Page title="Информация о доступности объектов Учреждения">
        <Title>Информация о доступности объектов Учреждения</Title>
        <TitledImage
                src="/images/reestrsvedenii/РеестрДоступ.jpg" 
                alt="Кадетская школа Интернат" 
            />
    </Page>
</template>

<style scoped>
.content-wrapper {
    width: 100%;
}
</style>