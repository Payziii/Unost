<script setup>
import Page from '@/components/pages/Page.vue';
import Title from '@/components/pages/Title.vue';
import Text from '@/components/pages/Text.vue';
import Highlight from '@/components/pages/Highlight.vue';
import Link from '@/components/pages/Link.vue';
import File from '@/components/pages/File.vue';
</script>

<template>
    <Page title="Педагог и наставник 2023">
        <Title>Педагог и наставник 2023</Title>
        
        <Text align="justify">
            2023 год <Link linkTo="https://docs.edu.gov.ru/document/26ba12611bfc19a49fd3afee9d45e0a0/">Указом Президента России Владимира Путина</Link> 
            объявлен <Highlight>Годом педагога и наставника</Highlight>. Миссия Года – признание особого статуса педагогических работников, 
            в том числе выполняющих наставническую деятельность. Мероприятия направлены на повышение престижа профессии учителя.
        </Text>

        <Title>🔗 Официальные ресурсы</Title>
        <Text align="left">
            • <Link linkTo="https://vk.com/gpn_2023">Официальная группа ВКонтакте</Link><br/>
            • <Link linkTo="https://edu.gov.ru/">Министерство просвещения РФ</Link><br/>
            • <Link linkTo="https://minobraz.egov66.ru/">Министерство образования СО</Link>
        </Text>

        <Title>📺 Видеоматериалы</Title>
        
        <Text align="center">
            <strong>Официальный ролик Года педагога и наставника</strong>
        </Text>
        <div class="video-container">
            <iframe 
                src="https://rutube.ru/play/embed/160799907fdecbc855be95bf297bf7fc"
                allow="clipboard-write; autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowfullscreen
                frameborder="0"
                class="video-player"
            ></iframe>
        </div>

        <Text align="center" class="video-caption">
            <Link linkTo="https://rutube.ru/play/embed/160799907fdecbc855be95bf297bf7fc">Открыть на Rutube</Link>
        </Text>

        <Text align="center" class="video-separator">
            <strong>Дополнительные материалы</strong>
        </Text>
        <div class="video-container">
            <iframe 
                src="https://vk.com/video_ext.php?oid=-218878795&amp;id=456239034&amp;hash=ee4d6003589965a6&amp;hd=2"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowfullscreen
                frameborder="0"
                class="video-player"
            ></iframe>
        </div>

        <Text align="center" class="video-caption">
            <Link linkTo="https://vk.com/video_ext.php?oid=-218878795&amp;id=456239034&amp;hash=ee4d6003589965a6&amp;hd=2">Открыть во ВКонтакте</Link>
        </Text>

        <Title>📄 Нормативные документы</Title>
        
        <Text align="left">
            <Highlight>Федеральные документы:</Highlight><br/>
            <File file="Указ Президента РФ от 27 июня 2022 № 401.pdf" icon>Указ Президента РФ от 27.06.2022 № 401</File>
            <File file="Распоряжение Правительства РФ от 18.02.2023 № 399-р.pdf" icon>Распоряжение Правительства РФ от 18.02.2023 № 399-р</File>
            <File file="План основных мероприятий 2023.pdf" icon>План основных мероприятий Года педагога и наставника</File><br/>
            
            <Highlight>Региональные документы:</Highlight><br/>
            <File file="Указ Губернатора СО от 29.12.2022 № 686-УГ.pdf" icon>Указ Губернатора СО от 29.12.2022 № 686-УГ</File>
            <File file="План мероприятий СО 2023.pdf" icon>План мероприятий по проведению в СО Года педагога и наставника</File>
        </Text>

        <Title>📰 Новости и события</Title>
        
        <Text align="left">
            <Highlight>Март 2023:</Highlight><br/>
            • <Link linkTo="https://minobraz.egov66.ru/news/item?id=7540">«Радуга возможностей»: областной медиафестиваль для детей с ОВЗ</Link><br/>
            • <Link linkTo="https://minobraz.egov66.ru/news/item?id=7537">В финале конкурса «Учитель года России» появится новое испытание</Link><br/>
            • <Link linkTo="https://minobraz.egov66.ru/news/item?id=7539">В оздоровительных лагерях области пройдут тематические смены РДДМ</Link><br/>
            • <Link linkTo="https://minobraz.egov66.ru/news/item?id=7532">Уральские педагоги принимают поздравления и награды</Link><br/><br/>
            
            <Highlight>Февраль 2023:</Highlight><br/>
            • <Link linkTo="https://minobraz.egov66.ru/news/item?id=7503">Сергей Кравцов: «Нам очень важно, что в систему образования приходят прекрасные мотивированные люди»</Link><br/>
            • <Link linkTo="https://minobraz.egov66.ru/news/item?id=7500">Президент России Владимир Путин дал старт Году педагога и наставника</Link><br/>
            • <Link linkTo="https://minobraz.egov66.ru/news/item?id=7491">«Учитель года России»: региональный этап</Link><br/><br/>
            
            <Highlight>Январь 2023:</Highlight><br/>
            • <Link linkTo="https://minobraz.egov66.ru/news/item?id=7332">Учить ученого</Link><br/>
            • <Link linkTo="https://minobraz.egov66.ru/news/item?id=7316">Педагогические династии Среднего Урала. Андреевы</Link><br/>
            • <Link linkTo="https://minobraz.egov66.ru/news/item?id=7290">«Зимняя школа» вдохновляет и ставит рекорды</Link>
        </Text>

        <Title>💫 Итоги и значение</Title>
        <Text align="justify">
            <Highlight>Год педагога и наставника</Highlight> стал важным этапом в признании заслуг педагогических работников 
            и повышении социального статуса профессии. Мероприятия года способствовали повышению престижа педагогической профессии, 
            развитию наставничества в образовательных организациях, обмену лучшими педагогическими практиками, поддержке молодых 
            специалистов и укреплению педагогических династий.
        </Text>
    </Page>
</template>

<style scoped>
.video-container {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.video-player {
    width: 100%;
    height: 450px;
    border: none;
    display: block;
}

.video-caption {
    margin-top: 10px;
    margin-bottom: 40px;
    font-size: 0.9em;
    color: #666;
}

.video-separator {
    margin: 40px 0 20px 0;
    padding: 15px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 8px;
    border-left: 4px solid #667eea;
}

:deep(.highlight) {
    background-color: #fff3cd;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-weight: 600;
}

/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
    .video-player {
        height: 250px;
    }
    
    .video-container {
        margin: 15px auto;
        border-radius: 8px;
    }
}

@media (max-width: 480px) {
    .video-player {
        height: 200px;
    }
}
</style>