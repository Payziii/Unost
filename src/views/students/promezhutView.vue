<script setup>
import Page from '@/components/pages/Page.vue';
import Title from '@/components/pages/Title.vue';
import Text from '@/components/pages/Text.vue';
import File from '@/components/pages/File.vue';
import CardGrid from '@/components/pages/CardGrid.vue';
import Card from '@/components/pages/Card.vue';
</script>

<template>
    <Page title="Промежуточная аттестация">
        <Title>Промежуточная аттестация</Title>
        

        <CardGrid>
            <Card title="Промежуточная аттестация 1 курс" isButton buttonText="Скачать" buttonLink="../docs/промежуточная_аттестация_1_курс.pdf">
            </Card>
            <Card title="Промежуточная аттестация 2 курс" isButton buttonText="Скачать" buttonLink="../docs/промежуточная_аттестация_2_курс.pdf">
            </Card>
            <Card title="Промежуточная аттестация 3 курс" isButton buttonText="Скачать" buttonLink="../docs/промежуточная_аттестация_3_курс.pdf">
            </Card>
            <Card title="Промежуточная аттестация 4 курс" isButton buttonText="Скачать" buttonLink="../docs/промежуточная_аттестация_4_курс.pdf">
            </Card>
        </CardGrid>
    </Page>
</template>