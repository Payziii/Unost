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
import TitledImage from '@/components/pages/TitledImage.vue';
</script>

<template>  
    <Page title="Центр профилактики детского дорожно-транспортного травматизма «Лаборатория безопасности»">
    <Title>Центр профилактики детского дорожно-транспортного травматизма «Лаборатория безопасности»</Title>
    <CardGrid maxCardsPerRow=2>
        <Card>
            <TitledImage
                src="/images/LB/Руководитель центра 1.jpg" 
                alt="Руководители Лаборатории безопасности"
            />
            <Text align="center">
                <Bold>Руководитель Центра профилактики детского дорожно транспортного травматизма</Bold><br>
                Абрарова Гульнара Ахатовна
            </Text>
            </Card>

            <Card>
            <TitledImage
                src="/images/LB/Педагог Лаборатории.jpg" 
                alt="Педагог"
            />
            <Text align="center">
                <Bold>Педагог</Bold><br>
                Власова Марина Ивановна
            </Text>
            </Card>

            <Card>
            <TitledImage
                src="/images/LB/Педагог Лаборатории 2.jpg" 
                alt="Педагог"
            />
            <Text align="center">
                <Bold>Педагог</Bold><br>
                Сабирзянова Наталья Александровна
            </Text>
            </Card>

            <Card>
            <TitledImage
                src="/images/LB/Педагог Лаборатории 4.jpg" 
                alt="Педагог"
            />
            <Text align="center">
                <Bold>Педагог</Bold><br>
                Мачкарина Татьяна Сергеевна
            </Text>
            </Card>
    </CardGrid>
    <Text align="left">
    9 октября перед Дворцом игровых видов спорта состоялось открытие инновационного центра по профилактике детского дорожно-транспортного травматизма <Bold>«Лаборатория безопасности».</Bold>
    <br>Центр создан в рамках федерального проекта по поручению Президента РФ. Организаторы — Госавтоинспекция МВД России и Российский союз автостраховщиков при поддержке экспертного центра <Bold>«Движение без опасности».</Bold>
    <br><Bold>Мобильная «Лаборатория безопасности»</Bold> на базе микроавтобуса Ford оснащена оборудованием для обучения детей, родителей и педагогов правилам дорожного движения.
    <br>Центр будет работать на базе механико-технологического техникума «Юность». На открытии присутствовали представители власти, педагоги и юные инспекторы движения.
    <br>Начальник областной Госавтоинспекции Алексей Кисляков отметил, что мобильная лаборатория <Bold>позволит обучать детей по всей области</Bold>. Президент центра <Bold>«Движение без опасности»</Bold> Наталья Агре подчеркнула важность личного примера взрослых, а министр образования региона Юрий Биктуганов поблагодарил организаторов и <Bold>отметил значимость проекта</Bold> для обучения и детей, и взрослых.
    <br><Bold>Свердловская область стала участником федерального проекта по повышению безопасности детей на дорогах.</Bold>
    </Text>
    <Text align="left">
      <Link linkTo="https://vk.com/labbezvp">Наш ВК: https://vk.com/labbezvp</Link>
    </Text>
    <CardGrid maxCardsPerRow=2>
        <Card>
        <img 
                src="/images/LB/Автобусники.jpg" 
                alt="" 
                class="logo"
        />
        </Card>
        <Card>
        <img 
                src="/images/LB/Автобусники 2.jpg" 
                alt="Автобус" 
                class="logo"
        />
        </Card>
    </CardGrid>
    </Page>
</template>