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
    <Page title="Волонтёрство – среда эффективной социализации студентов ГАПОУ СО ВПМТТ «Юность»">


        <Title>ВОЛОНТЁРСТВО – СРЕДА ЭФФЕКТИВНОЙ СОЦИАЛИЗАЦИИ СТУДЕНТОВ ГАПОУ СО ВПМТТ «ЮНОСТЬ»</Title>
        
        <Text align="justify">
            <Highlight>Волонтёрская деятельность</Highlight> является важным компонентом образовательного процесса и эффективным инструментом социализации студентов техникума. Через участие в добровольческих проектах и акциях студенты развивают социальную ответственность, лидерские качества и профессиональные компетенции.
        </Text>

        <Text align="justify">
            Проект реализуется в рамках <Highlight>федеральной инновационной площадки</Highlight> и направлен на создание комплексной системы вовлечения студентов в волонтёрскую деятельность, формирование активной гражданской позиции и подготовку конкурентоспособных специалистов.
        </Text>

        <Title>Документы проекта</Title>
        
        <Text align="left">
            <File file="Выписка из Совета техникума.pdf" icon>Выписка из Совета техникума</File>
            <File file="Положение о Координационном совете.pdf" icon>Положение о Координационном совете</File>
            <File file="Положение об организации и деятельности МТТ Юность в режиме ФИП.pdf" icon>Положение об организации и деятельности МТТ Юность в режиме ФИП</File>
            <File file="Заявка на присвоение статуса ФИП.pdf" icon>Заявка на присвоение статуса ФИП</File>
            <File file="Паспорт заявки.docx" icon>Паспорт заявки</File>
        </Text>

        <Title>Направления волонтёрской деятельности</Title>
        
        <CardGrid>
            <Card title="Социальное волонтёрство">
                <Text align="left">
                    Помощь пожилым людям, детям-сиротам, людям с ограниченными возможностями здоровья. Организация благотворительных акций и мероприятий.
                </Text>
            </Card>
            <Card title="Экологическое волонтёрство">
                <Text align="left">
                    Участие в экологических акциях, субботниках, мероприятиях по благоустройству территории города и техникума.
                </Text>
            </Card>
            <Card title="Событийное волонтёрство">
                <Text align="left">
                    Помощь в организации и проведении массовых мероприятий, конференций, спортивных соревнований и культурных событий.
                </Text>
            </Card>
            <Card title="Профессиональное волонтёрство">
                <Text align="left">
                    Применение профессиональных знаний и навыков для решения социально значимых задач в рамках получаемой специальности.
                </Text>
            </Card>
        </CardGrid>

        <Title>Преимущества волонтёрства для студентов</Title>
        
        <Text align="justify">
            Участие в волонтёрской деятельности предоставляет студентам уникальные возможности для личностного и профессионального роста:
        </Text>

        <Text align="justify">
            <strong>Развитие soft skills:</strong> коммуникабельность, работа в команде, лидерские качества, управление проектами. <strong>Приобретение практического опыта:</strong> применение профессиональных знаний в реальных ситуациях. <strong>Социальная активность:</strong> формирование активной гражданской позиции и социальной ответственности. <strong>Карьерные перспективы:</strong> волонтёрский опыт ценится работодателями и может стать преимуществом при трудоустройстве. <strong>Личностный рост:</strong> развитие эмпатии, толерантности и организаторских способностей.
        </Text>

        <Title>Видео о волонтёрской деятельности</Title>
        
        <Text align="center">
            Ниже представлены видеоматериалы, презентующие проект волонтёрской деятельности:
        </Text>

        <div class="video-grid">
            <div class="video-item">
                <h3>Видео 1: Презентация проекта</h3>
                <div class="video-container">
                    <iframe 
                        src="https://vk.com/video_ext.php?oid=-193895113&id=456240061&hash=" 
                        width="100%" 
                        height="400"
                        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                        frameborder="0"
                        loading="lazy">
                    </iframe>
                </div>
            </div>

            <div class="video-item">
                <h3>Видео 2: Волонтёрские акции</h3>
                <div class="video-container">
                    <iframe 
                        src="https://vk.com/video_ext.php?oid=-193895113&id=456240060&hash=" 
                        width="100%" 
                        height="400"
                        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                        frameborder="0"
                        loading="lazy">
                    </iframe>
                </div>
            </div>

            <div class="video-item">
                <h3>Видео 3: Итоги работы</h3>
                <div class="video-container">
                    <iframe 
                        src="https://vk.com/video_ext.php?oid=-193895113&id=456240062&hash=" 
                        width="100%" 
                        height="400"
                        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                        frameborder="0"
                        loading="lazy">
                    </iframe>
                </div>
            </div>
        </div>

        <Text align="center" class="video-note">
            Если видео не отображаются, пожалуйста, проверьте настройки безопасности браузера или перейдите по 
            <Link href="https://vk.com/videos-193895113">ссылке на видео в VK</Link>
        </Text>

    </Page>
</template>

<style scoped>
.video-grid {
    display: flex;
    flex-direction: column;
    gap: 30px;
    margin: 20px 0;
}

.video-item {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid #e9ecef;
}

.video-item h3 {
    margin: 0 0 15px 0;
    color: #2c3e50;
    font-size: 1.2em;
    text-align: center;
}

.video-container {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.video-container iframe {
    width: 100%;
    height: 400px;
    border: none;
    display: block;
}

.video-note {
    margin-top: 20px;
    font-size: 0.9em;
    color: #6c757d;
}

/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
    .video-container iframe {
        height: 300px;
    }
    
    .video-item {
        padding: 15px;
    }
    
    .video-item h3 {
        font-size: 1.1em;
    }
}

@media (max-width: 480px) {
    .video-container iframe {
        height: 250px;
    }
    
    .video-grid {
        gap: 20px;
    }
}
</style>