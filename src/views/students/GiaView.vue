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
    <Page title="Государственная итоговая аттестация">
        <Title>Государственная итоговая аттестация</Title>
        
        <Title>Документы ГИА</Title>
        <Text align="left">
            <File file="Пр_О составе аппеляц_комиссии.pdf" icon>Приказ о составе апелляционной комиссии</File>
            <File file="Пр_О составе ГЭК_2025.pdf" icon>Приказ о составе ГЭК 2025</File>
            <File file="ПР_Об организации ГИА_2025.pdf" icon>Приказ об организации ГИА 2025</File>
            <File file="Положение об организации и проведении демонстрационного экзамена в ГАПОУ СО ВПМТТ Юность.pdf" icon>Положение об организации и проведении демонстрационного экзамена</File>
            <File file="Пр_О докуске к ГИА_2025.pdf" icon>Приказ о допуске к ГИА 2025</File>
            <File file="Пр_О закреплении тем и назначении руководителей_2025.pdf" icon>Приказ о закреплении тем и назначении руководителей 2025</File>
            <File file="Порядок ГИА_2025.pdf" icon>Порядок ГИА 2025</File>
            <File file="Положение о дипломном проекте студентов.pdf" icon>Положение о дипломном проекте студентов</File>
        </Text>

        <Title>Методические указания по выполнению и оформлению выпускной квалификационной работы</Title>
        <Text align="left">
            <File file="МУ_ДР_ПКД_2025.pdf" icon>Методические указания - ДР ПКД 2025</File>
            <File file="МУ_ДП_МЦМ_2025.pdf" icon>Методические указания - ДП МЦМ 2025</File>
            <File file="МУ по ДП_ИС_2025.pdf" icon>Методические указания по ДП ИС 2025</File>
            <File file="МУ по ДП _ТОРД_2025.pdf" icon>Методические указания по ДП ТОРД 2025</File>
            <File file="МУ ДП_ТЭО_2024.pdf" icon>Методические указания ДП ТЭО 2024</File>
            <File file="МУ ДП_ТМ_2025.pdf" icon>Методические указания ДП ТМ 2025</File>
            <File file="МУ ДП_СП_2025.pdf" icon>Методические указания ДП СП 2025</File>
            <File file="Стандарт предприятия_19.02.10 ТОП.pdf" icon>Стандарт предприятия 19.02.10 ТОП</File>
            <File file="Стандарт предприятия_ 2020.pdf" icon>Стандарт предприятия 2020</File>
        </Text>

        <Title>Программы государственной итоговой аттестации по специальностям</Title>
        <Text align="left">
            <File file="программа ГИА_ДЭ_ДП_ИС.pdf" icon>Программа ГИА ДЭ ДП ИС</File>
            <File file="программа ГИА_ДЭ_ДП_МЦМ.pdf" icon>Программа ГИА ДЭ ДП МЦМ</File>
            <File file="программа ГИА_ДЭ_ДП_ПКД.pdf" icon>Программа ГИА ДЭ ДП ПКД</File>
            <File file="программа ГИА_ДЭ_ДП_СП.pdf" icon>Программа ГИА ДЭ ДП СП</File>
            <File file="программа ГИА_ДЭ_ДП_ТМ.pdf" icon>Программа ГИА ДЭ ДП ТМ</File>
            <File file="программа ГИА_ДЭ_ДП_ТОРД.pdf" icon>Программа ГИА ДЭ ДП ТОРД</File>
            <File file="программа ГИА_ДЭ_ДП_ТЭО.pdf" icon>Программа ГИА ДЭ ДП ТЭО</File>
        </Text>
    </Page>
</template>