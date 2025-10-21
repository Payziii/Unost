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
    <Page title="Профсоюз">
        <Title>Профсоюз</Title>
    <TitledImage
                src="/images/ProfSouth/ПрофСоюз2.jpeg" 
                alt="Профсоюз" 
            />
        <Title>Профсоюзная организация МТТ «Юность»</Title>
        <Text align="justify">
<Bold>Исполняющий обязанности председателя ППО:</Bold> Третяк Н.А.

<br><Bold>Членов профсоюза:</Bold> 46 человек

<br><Bold>Пенсионеры:</Bold> 4 человека.

 
<br><br><Bold>Профсоюзный комитет:</Bold> 
 
<br><br><Bold>1.</Bold> Иванова Альбина Григорьевна 
<br><Bold>2.</Bold> Рыжкова Светлана Евгеньевна 
<br><Bold>3.</Bold> Коршунова Галина Николаевна 
<br><Bold>4.</Bold> Ярославцева Елена Анатольевна

<br><br><File file="ДляЧегоНамПрофСоюз.pdf" icon>Для чего нам профсоюз</File>
<File file="Заслуженный учитель.pdf" icon>Заслуженный учитель</File>
<File file="ПриказМин.pdf" icon>Приказ Минпросвещения РФ "О ведомственных наградах"</File>
<File file="Коллектиный договор.pdf" icon>Коллективный договор</File>
<File file="КолДог.pdf" icon>Соглашение МОСО-СОПРНОН на 2021-2023</File>
<File file="ПартнёрыЕкб.pdf" icon>Партнеры Екатеринбург</File>
<File file="ПартнёрыВП.pdf" icon>Партнеры Верхняя Пышма</File>
<File file="КартаСоюза.pdf" icon>Федеральный проект Дисконтная карта члена профсоюза"</File>
<File file="ОВакцинации.pdf" icon>О вакцинации</File>
        </Text>
    </Page>
</template>