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
    <Page title="Федеральный проект 'Содействие занятости'">


        <Title>ФЕДЕРАЛЬНЫЙ ПРОЕКТ "СОДЕЙСТВИЕ ЗАНЯТОСТИ"</Title>
        
        <Text align="center" class="highlight-orange">
            <Bold>ПРИГЛАШАЕМ ПРОЙТИ БЕСПЛАТНОЕ ОБУЧЕНИЕ ПО ПРОГРАММЕ ПРОФЕССИОНАЛЬНОЙ ПОДГОТОВКИ</Bold>
        </Text>

        <Text align="center">
            <u><Bold>Старт обучения март 2024 года</Bold></u>
        </Text>

        <Title>Программы обучения</Title>
        
        <CardGrid>
            <Card title="Сварщик ручной дуговой сварки плавящимся покрытым электродом">
                <Text align="left">
                    <Bold>Вид:</Bold> профессиональная подготовка<br>
                    <Bold>Количество часов:</Bold> 144<br>
                    <Bold>Форма обучения:</Bold> очная
                </Text>
            </Card>
            <Card title="18511 Слесарь по ремонту автомобилей">
                <Text align="left">
                    <Bold>Вид:</Bold> профессиональная подготовка<br>
                    <Bold>Количество часов:</Bold> 144<br>
                    <Bold>Форма обучения:</Bold> очная
                </Text>
            </Card>
            <Card title="13321 Лаборант химического анализа">
                <Text align="left">
                    <Bold>Вид:</Bold> профессиональная подготовка<br>
                    <Bold>Количество часов:</Bold> 144<br>
                    <Bold>Форма обучения:</Bold> очная
                </Text>
            </Card>
        </CardGrid>

        <Title>Документы и инструкции</Title>
        
        <Text align="left">
            <File file="Содействие занятости Истории успеха - ЛХА.pdf" icon>Содействие занятости Истории успеха</File>
            <File file="Инструкция по регистрации и подачи заявки на обучение.pdf" icon>Инструкция по регистрации и подачи заявки на обучение</File>
            <File file="ПОСТАНОВЛЕНИЕ Содействие занятости.pdf" icon>Постановление об утверждении Положения о реализации мероприятий</File>
        </Text>

        <Title>Кто может стать участником программы</Title>
        
        <Text align="justify">
            К гражданам, имеющим право принять участие в мероприятиях по обучению, относятся следующие категории:
        </Text>

        <CardGrid>
            <Card title="Граждане старшего возраста">
                <Text align="left">
                    - Граждане в возрасте 50 лет и старше<br>
                    - Граждане предпенсионного возраста
                </Text>
            </Card>
            <Card title="Родители и опекуны">
                <Text align="left">
                    - Граждане, осуществляющие уход за ребенком до 3 лет<br>
                    - Женщины с детьми дошкольного возраста (0-7 лет)
                </Text>
            </Card>
            <Card title="Социально защищаемые категории">
                <Text align="left">
                    - Инвалиды<br>
                    - Безработные граждане<br>
                    - Граждане, обратившиеся в службу занятости
                </Text>
            </Card>
            <Card title="Работники под риском увольнения">
                <Text align="left">
                    - Работники при введении режима неполного рабочего времени<br>
                    - Работники при простое или временной приостановке работ
                </Text>
            </Card>
            <Card title="Граждане Украины">
                <Text align="left">
                    - Граждане Украины и лица без гражданства<br>
                    - Получившие убежище или временное убежище в РФ
                </Text>
            </Card>
            <Card title="Участники СВО и их семьи">
                <Text align="left">
                    - Ветераны боевых действий<br>
                    - Члены семей участников СВО<br>
                    - Участники боевых действий в ДНР/ЛНР
                </Text>
            </Card>
            <Card title="Молодежь до 35 лет">
                <Text align="left">
                    - Выпускники учебных заведений<br>
                    - Граждане без профессионального образования<br>
                    - Молодежь под риском увольнения
                </Text>
            </Card>
        </CardGrid>

        <Text align="justify" class="additional-info">
            <Bold>Дополнительные категории:</Bold> граждане, завершающие обучение в текущем году; граждане после военной службы по призыву; граждане, для которых отсутствует подходящая работа по получаемой профессии.
        </Text>

        <Title>Как принять участие</Title>
        
        <Text align="justify">
            Для участия в программе необходимо обратиться в центр занятости населения или подать заявку через портал "Работа в России". Обучение проводится полностью за счет федерального бюджета.
        </Text>

        <Text align="center" class="contact-info">
            По всем вопросам обращайтесь:<br>
            <Bold>ГАПОУ СО "ВПМТТ "Юность"</Bold><br>
            г. Верхняя Пышма, ул. Кривоусова, д. 53<br>
            Телефон: +7 (34368) 5-44-86
        </Text>

    </Page>
</template>

<style scoped>
.highlight-orange {
    color: #ff6633;
    font-size: 1.2em;
    margin: 20px 0;
}

.additional-info {
    background-color: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    border-left: 4px solid #ff6633;
    margin: 20px 0;
}

.contact-info {
    background-color: #e9f7fe;
    padding: 20px;
    border-radius: 10px;
    margin: 30px 0;
    border: 2px solid #bee5eb;
}

/* Адаптивность для мобильных устройств */
@media (max-width: 768px) {
    .highlight-orange {
        font-size: 1.1em;
    }
    
    .contact-info {
        padding: 15px;
        margin: 20px 0;
    }
}

@media (max-width: 480px) {
    .highlight-orange {
        font-size: 1em;
    }
    
    .additional-info {
        padding: 10px;
    }
}
</style>