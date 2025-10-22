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
            <File file="ИНФОРМАЦИЯ ДЛЯ ПОСТУПЛЕНИЯ В КШИ.pdf" icon>Документы для поступления</File>
            <File file="Медицинская карта.pdf" icon>Медицинская карта</File>
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