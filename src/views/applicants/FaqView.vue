<script setup>
import Page from '@/components/pages/Page.vue';
import Title from '@/components/pages/Title.vue';
import Text from '@/components/pages/Text.vue';
import Highlight from '@/components/pages/Highlight.vue';
import Link from '@/components/pages/Link.vue';
import Bold from '@/components/pages/Bold.vue';
</script>

<template>
  <Page title="Часто задаваемые вопросы — ВПМТТ «Юность»">
    <Title>Часто задаваемые вопросы</Title>

    <Text align="left">
      <Bold>
        <Highlight isBold color="#222">Какие документы необходимы при поступлении на первый курс?</Highlight>
      </Bold>
    </Text>
    <Text align="justify">
      Полный перечень документов и актуальные формы заявлений размещены в разделе
      <Link linkTo="https://вп-юность.рф/abiturientam/vpmtt_yunost/">«ВПМТТ «Юность»»</Link>.
      Перед подачей документов рекомендуем сверить список с опубликованной на странице информацией.
    </Text>

    <Text align="left">
      <Bold>
        <Highlight isBold color="#222">Кто может поступить в кадетскую школу?</Highlight>
      </Bold>
    </Text>
    <Text align="justify">
      В кадетскую школу-интернат ГАПОУ СО «ВПМТТ «Юность»» принимаются несовершеннолетние граждане,
      проживающие на территории Свердловской области, годные по состоянию здоровья и не имеющие хронических заболеваний.
    </Text>
    <Text align="justify">
      Кандидаты должны соответствовать требованиям психологической и физической подготовленности и выразить желание обучаться
      в кадетской школе-интернате.
    </Text>

    <Text align="left">
      <Bold>
        <Highlight isBold color="#222">Как проходят сборы?</Highlight>
      </Bold>
    </Text>
    <Text align="justify">
      Абитуриенты, которые предоставили полный пакет документов и прошли психологическое собеседование, приглашаются приемной
      комиссией на трёхдневные сборы. В ходе сборов проводятся вступительные испытания.
    </Text>
    <Text align="justify">Определение уровня физической подготовленности.</Text>
    <Text align="justify">Определение уровня психологической готовности кандидатов к обучению.</Text>
    <Text align="justify">Вступительные испытания по русскому языку, математике и технике чтения.</Text>
    <Text align="justify">Оценка общественных, творческих и спортивных достижений кандидата при наличии грамот и медалей за последние три года.</Text>
  </Page>
</template>
