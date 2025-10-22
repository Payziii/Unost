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
    <Page title="Нормативные документы">
        <Title>Нормативные документы</Title>
        <Text align="left">
            <Bold>Учебно-воспитательная деятельность</Bold>
        </Text>
        <File file="УВД1.pdf" icon>Правила поведения студентов</File>
        <File file="УВД2.pdf" icon>Правила внутреннего распорядка</File>
        <File file="УВД3.pdf" icon>Порядок пользования оздоровит инфраструктурой</File>
        <File file="УВД4.pdf" icon>Положение о текущей и промежуточной аттестации</File>
        <File file="УВД5.pdf" icon>Положение о студ. общежитии</File>
        <File file="УВД6.pdf" icon>Положение о стипендиальном обеспечении</File>
        <File file="УВД7.pdf" icon>Положение о предоставлении общежития</File>
        <File file="УВД8.pdf" icon>Положение о поощрении</File>
        <File file="УВД9.pdf" icon>Положение о мат. помощи</File>
        <Text align="left">
            <Bold>Образовательная деятельность</Bold>
        </Text>
        <File file="ОД1.pdf" icon>Отчет о деятельности медиацентра ГАПОУ СО ВПМТТ Юность</File>
        <File file="ОД2.pdf" icon>Положение медиацентр</File>
        <File file="ОД3.pdf" icon>Приказ №225-1-од от 08.12.2023 О создании медиацентра</File>
        <File file="ОД4.pdf" icon>Положение ЭИОС</File>
        <File file="ОД5.pdf" icon>Положение о ВСКО Юность</File>
        <File file="ОД6.pdf" icon>Порядок урегулирования споров,конфликтов</File>
        <File file="ОД7.pdf" icon>Порядок осущ. и орг. ОД Юность</File>
        <File file="ОД8.pdf" icon>Порядок организации СР</File>
        <File file="ОД9.pdf" icon>Порядок бесплатного пользования услугами ОО</File>
        <File file="ОД10.pdf" icon>Положение по ДОП</File>
        <File file="ОД11.pdf" icon>Положение оформления возникновения, приостановления и прекращения отношений</File>
        <File file="ОД12.pdf" icon>Положение об общественной экспертизе деятельности и качества образования в техникуме</File>
        <File file="ОД13.pdf" icon>Положение об обучении по инд. уч. плану</File>
        <File file="ОД14.pdf" icon>Положение об итоговом индивидуальном проекте</File>
        <File file="ОД15.pdf" icon>Положение о Службе трудоустройства</File>
        <File file="ОД16.pdf" icon>Положение о реферате</File>
        <File file="ОД17.pdf" icon>Положение о режиме занятий СПО</File>
        <File file="ОД18.pdf" icon>Положение о расписании учебных занятий</File>
        <File file="ОД19.pdf" icon>Положение о порядке проведения контроля и оценке уровня учебных достижений</File>
        <File file="ОД20.pdf" icon>Положение о порядке перевода, отчисления и восстановления</File>
        <File file="ОД21.pdf" icon>Положение о порядке выдачи дипломов</File>
        <File file="ОД22.pdf" icon>Положение о ПН</File>
        <File file="ОД23.pdf" icon>Положение о мониторинге КО</File>
        <File file="ОД24.pdf" icon>Положение о курсовой работе</File>
        <File file="ОД25.pdf" icon>Положение о зачете результатов освоения учебных дисциплин СПО</File>
        <File file="ОД26.pdf" icon>Положение о зачете результатов освоения курсов (ЭОР и ДОТ)</File>
        <File file="ОД27.pdf" icon>Положение о журнале ПО</File>
        <File file="ОД28.pdf" icon>Положение о ВСКО Юность</File>
        <File file="ОД29.pdf" icon>Положение о библиотечно-инф. ресурсах</File>
        <File file="ОД30.pdf" icon>Положение о ведении журнала</File>
        <File file="ОД31.pdf" icon>Положение о мониторинге деятельности ОУ</File>
        <File file="ОД32.pdf" icon>Методические рекомендации по организации предметной недели (профессиональной недели)</File>
        <File file="ОД33.pdf" icon>Методические рекомендации по СР</File>


        <Text align="left">
            <Bold>Методическая деятельность</Bold>
        </Text>
        <File file="МД1.pdf" icon>Типовая модель действий</File>
        <File file="МД2.pdf" icon>Алгоритм действий персонала образовательной организации</File>
        <File file="МД3.pdf" icon>Порядок расп. пед. нагрузки</File>
        <File file="МД4.pdf" icon>Положение конкурс. Препод. года</File>
        <File file="МД5.pdf" icon>Приказ от 10.04.2020 № 360-Д О назначении, выплате и определении размера денежной компенсации на обеспечение бесплатным питанием отдельных категорий обучающихся, осваивающих основные общеобразовательные программы с применением электронного обучения и дистанционных образовательных технологий в государственных образовательных организациях Свердловской области и обособленных структурных подразделениях государственных образовательных организаций Свердловской области, в отношении которых функции и полномочия учредителя осуществляются Министерством образования и молодежной политики Свердловской области, муниципальных общеобразовательных организациях, расположенных на территории Свердловской области, частных общеобразовательных организациях Свердловской области по имеющим государственную аккредитацию основным общеобразовательным программам</File>
        <File file="МД6.pdf" icon>Положение о квотировании рабочих мест для инвалидов</File>
        <File file="МД7.pdf" icon>Положение о комиссии по трудовым спорам</File>
        <File file="МД8.pdf" icon>Положение о нормах проф. этики пед. работников</File>
        <File file="МД9.pdf" icon>Порядок создания, организации работы и принятия решений комиссией по урегулированию споров</File>
        <File file="МД10.pdf" icon>Программа адаптации студентов-первокурсников к обучению</File>
    </Page>
</template>