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
    <Page title="Профессионалитет">
        
        <!-- Логотип уменьшенный -->
        <div class="logo-container">
            <img 
                src="https://вп-юность.рф/upload/images/%D0%BB%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF%20%D0%BF%D1%80%D0%BE%D1%84.jpg" 
                alt="Логотип Профессионалитет" 
                class="logo"
            />
        </div>

        <Title>ПРОФЕССИОНАЛИТЕТ</Title>
        
        <Text align="justify">
            <Highlight>Профессионалитет</Highlight> – это новая форма сотрудничества образовательных организаций и работодателей в формате образовательно-индустриальных кластеров, объединенных общностью образовательных программ, которые будут реализовываться под конкретный заказ работодателей с их непосредственным участием.
        </Text>

        <Text align="justify">
            Неотъемлемыми компонентами <Highlight>«Профессионалитета»</Highlight> являются наставничество, приоритет практической подготовки, оптимизация сроков подготовки кадров, целевое обучение и гарантированное трудоустройство на предприятиях-заказчиках, развитие материально-техническое базы колледжей и техникумов с учетом технологических особенностей производств.
        </Text>

        <Text align="justify">
            Проект «Профессионалитет» реализуется <Highlight>Министерством просвещения Российской Федерации</Highlight> в соответствии постановлением Правительства Российской Федерации от 16 марта 2022 года №387.
        </Text>

        <Title>Образовательные программы Профессионалитета</Title>
        
        <CardGrid>
            <Card title="ОПОП 22.02.08 Металлургическое производство">
                <Text align="left">
                    Специализация в металлургическом производстве с углубленной практической подготовкой на предприятиях-партнерах.
                </Text>
            </Card>
            <Card title="ОПОП 15.02.19 Сварочное производство">
                <Text align="left">
                    Современные технологии сварочного производства с использованием новейшего оборудования и методик.
                </Text>
            </Card>
            <Card title="ОПОП 13.02.13 Эксплуатация и обслуживание электрооборудования">
                <Text align="left">
                    Подготовка специалистов по эксплуатации и обслуживанию электрооборудования промышленных предприятий.
                </Text>
            </Card>
            <Card title="ОПОП 18.02.12 Технология аналитического контроля химических соединений">
                <Text align="left">
                    Лабораторный контроль и анализ химических соединений на производственных предприятиях.
                </Text>
            </Card>
        </CardGrid>

        <Title>Преимущества Профессионалитета для студентов</Title>
        
        <Text align="justify">
            Чем интересен проект «Профессионалитет» для студентов, выбравших эти программы:
        </Text>

        <Text align="justify">
            <strong>Наличие бюджетных мест.</strong> <strong>Более оптимальные сроки обучения</strong> – оптимизировано время подготовки за счет увеличения практикоориентированной подготовки на площадке предприятий и в мастерских и сокращено время на теоретическое обучение в кабинетах. <strong>Общежития для иногородних студентов.</strong> <strong>Обучение на современном оборудовании</strong>, приобретенном специально под потребности проекта. <strong>Приобретение профессиональных навыков и качеств для конкретных предприятий.</strong> <strong>Уникальное содержание программ</strong>, в разработке которых участвуют специалисты с производства. <strong>Это гарантии трудоустройства и социальная поддержка</strong> от предприятий-работодателей (стипендии, программы поддержки, наставничество от работодателей).
        </Text>

        <Title>Видео о Профессионалитете</Title>
        
        <div class="video-container">
            <iframe 
                src="https://vk.com/video_ext.php?oid=-175019051&id=456239503&hash=" 
                width="100%" 
                height="600" 
                frameborder="0" 
                allowfullscreen="1" 
                style="background-color: #000" 
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture">
            </iframe>
        </div>

        <Text align="left">
            <File file="ОПОП 22.02.08 Металлургическое производство.pdf" icon>ОПОП 22.02.08 Металлургическое производство</File>
            <File file="ОПОП 15.02.19 Сварочное производство.pdf" icon>ОПОП 15.02.19 Сварочное производство</File>
            <File file="ОПОП 13.02.13 Эксплуатация и обслуживание электрооборудования.pdf" icon>ОПОП 13.02.13 Эксплуатация и обслуживание электрооборудования</File>
            <File file="ОПОП 18.02.12 Технология аналитического контроля химических соединений.pdf" icon>ОПОП 18.02.12 Технология аналитического контроля химических соединений</File>
            <File file="Соглашение о партнерстве-2023.pdf" icon>Соглашение о партнерстве-2023</File>
        </Text>

    </Page>
</template>

<style scoped>
.logo-container {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    width: 100%;
}

.logo {
    width: 65%;
    max-width: 65%;
    height: auto;
    border-radius: 8px;
}

.video-container {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    border-radius: 8px;
    overflow: hidden;
}

.video-container iframe {
    width: 100%;
    height: 600px;
    border: none;
}


/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
    .logo {
        width: 75%;
        max-width: 75%;
    }
    
    .video-container iframe {
        height: 400px;
    }
}

@media (max-width: 480px) {
    .logo {
        width: 90%;
        max-width: 90%;
    }
    
    .video-container iframe {
        height: 300px;
    }
}
</style>