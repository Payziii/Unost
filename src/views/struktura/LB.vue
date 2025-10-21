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
    <Page title="Центр профилактики детского дорожно-транспортного травматизма «Лаборатория безопасности»">
    <Title>Центр профилактики детского дорожно-транспортного травматизма «Лаборатория безопасности»</Title>
    <CardGrid maxCardsPerRow=2>
        <Card>
            <img 
                src="/images/LB/РуководительLC.jpg" 
                alt="Руководители Лаборатории безопасности" 
                class="logo"
            />
        </Card>
    </CardGrid>
    </Page>
</template>