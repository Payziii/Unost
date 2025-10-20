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
    <Page title="Профсоюз">
        <Title>Профсоюз</Title>
    <TitledImage
                src="/images/ProfSouth/ПрофСоюз2.jpeg" 
                alt="Профсоюз" 
            />
        <Title>Профсоюзная организация МТТ «Юность»</Title>
        <Text align="justify">
<span style="font-weight: 500;">Исполняющий обязанности председателя ППО:</span> Третяк Н.А.

<br><span style="font-weight: 500;">Членов профсоюза:</span> 46 человек

<br><span style="font-weight: 500;">Пенсионеры:</span> 4 человека.

 
<br><br><sapn style="font-weight: 500;">Профсоюзный комитет:</sapn> 
 
<br><br><span style="font-weight: 500;">1.</span> Иванова Альбина Григорьевна 
<br><span style="font-weight: 500;">2.</span> Рыжкова Светлана Евгеньевна 
<br><span style="font-weight: 500;">3.</span> Коршунова Галина Николаевна 
<br><span style="font-weight: 500;">4.</span> Ярославцева Елена Анатольевна

<br><br><File file="ДляЧегоНамПрофСоюз.pdf" icon>Для чего нам профсоюз</File>
<File file="Заслуженный учитель.pdf" icon>Заслуженный учитель</File>
<File file="ПриказМин.pdf" icon>Приказ Минпросвещения РФ "О ведомственных наградах"</File>
<File file="Коллектиный договор.pdf" icon>Коллективный договор</File>
<File file="КолДог.pdf" icon>Соглашение МОСО-СОПРНОН на 2021-2023</File>
<File file="Заслуженный учитель.pdf" icon>Партнеры Екатеринбург</File>
<File file="ПриказМин.pdf" icon>Федеральный проект Дисконтная карта члена профсоюза"</File>
<File file="Коллектиный договор.pdf" icon>О вакцинации</File>
        </Text>
    </Page>
</template>