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
    <Page title="Кадетская школа-интернат">
        
        <Title>ИНФОРМАЦИЯ ДЛЯ ПОСТУПЛЕНИЯ В КШИ</Title>


        <div class="links-container">
            <File file="https://вп-юность.рф/upload/files/%D0%98%D0%9D%D0%A4%D0%9E%D0%A0%D0%9C%D0%90%D0%A6%D0%98%D0%AF%20%D0%94%D0%9B%D0%AF%20%D0%9F%D0%9E%D0%A1%D0%A2%D0%A3%D0%9F%D0%9B%D0%95%D0%9D%D0%98%D0%AF%20%D0%92%20%D0%9A%D0%A8%D0%98.pdf" icon>документы для поступления</File>
            <File file="https://вп-юность.рф/upload/files/%D0%9C%D0%B5%D0%B4%D0%B8%D1%86%D0%B8%D0%BD%D1%81%D0%BA%D0%B0%D1%8F%20%D0%BA%D0%B0%D1%80%D1%82%D0%B0.pdf" icon>медкарта</File>
        </div>

        <Title>Виртуальный день открытых дверей</Title>

        <div class="video-container">
            <iframe 
                src="https://www.youtube.com/embed/PPHz6rHVB4w" 
                width="100%" 
                height="500" 
                frameborder="0" 
                allowfullscreen="1" 
                style="background-color: #000" 
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture">
            </iframe>
        </div>

    </Page>
</template>

<style scoped>
.links-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin: 2rem 0;
}

.video-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.video-container iframe {
    width: 100%;
    height: 500px;
    border: none;
}

/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
    .video-container {
        max-width: 100%;
    }
    
    .video-container iframe {
        height: 400px;
    }
}

@media (max-width: 480px) {
    .video-container iframe {
        height: 300px;
    }
}
</style>