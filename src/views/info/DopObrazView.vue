<script setup>
import { ref } from 'vue';
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
    <Page title="Дополнительного образования кадетской школы-интерната">
        <Title>Дополнительного образования кадетской школы-интерната</Title>
        
        <Text align="center">
            <strong>ПЛАН</strong><br/>
            <strong>дополнительного образования кадетской школы-интерната</strong>
        </Text>

        <CardGrid>
            <Card title="Естественнонаучное направление">
                <Text align="left">
                    <strong>Кружки:</strong><br/>
                    • «Полиглот» - 2 часа в неделю, 70 часов в год<br/>
                    • «Интернет для жизни» - 1 час в неделю, 34 часа в год<br/>
                    • «Решение нестандартных математических задач» - 2 часа в неделю, 51 час в год<br/>
                    • «Занимательная математика» - 1 час в неделю, 35 часов в год<br/>
                    <strong>Срок освоения:</strong> 10 месяцев
                </Text>
            </Card>

            <Card title="Художественно-эстетическое направление">
                <Text align="left">
                    <strong>Кружки:</strong><br/>
                    • «Исторические и народные танцы» - 1 час в неделю, 35 часов в год<br/>
                    • «Декоративно-прикладное искусство» - 2 часа в неделю, 70 часов в год<br/>
                    • «Эстрадный вокал» - 6 часов в неделю, 210 часов в год<br/>
                    <strong>Срок освоения:</strong> 10 месяцев
                </Text>
            </Card>

            <Card title="Туристско-краеведческое направление">
                <Text align="left">
                    <strong>Кружок:</strong><br/>
                    • «Пеше-лыжный туризм» - 6 часов в неделю, 210 часов в год<br/>
                    <strong>Срок освоения:</strong> 10 месяцев
                </Text>
            </Card>

            <Card title="Военно-патриотическое направление">
                <Text align="left">
                    <strong>Кружок:</strong><br/>
                    • «ОВС. Меткий стрелок» - 1 час в неделю, 35 часов в год<br/>
                    <strong>Срок освоения:</strong> 10 месяцев
                </Text>
            </Card>

            <Card title="Физкультурно-спортивное направление">
                <Text align="left">
                    <strong>Кружки:</strong><br/>
                    • «Тхэквандо» - 2 часа в неделю, 70 часов в год<br/>
                    • «Самбо» - 2 часа в неделю, 70 часов в год<br/>
                    <strong>Срок освоения:</strong> 10 месяцев
                </Text>
            </Card>
        </CardGrid>

        <Title>Программы дополнительного образования</Title>
        
        <Text align="left">
            <File file="Эстрадный вокал.pdf" icon>Эстрадный вокал</File>
            <File file="Тхэквандо.pdf" icon>Тхэквандо</File>
            <File file="Самбо.pdf" icon>Самбо</File>
            <File file="Рукопашный бой.pdf" icon>Рукопашный бой</File>
            <File file="Программа хореография.pdf" icon>Программа хореография</File>
            <File file="Пеше-лыжный туризм.pdf" icon>Пеше-лыжный туризм</File>
            <File file="Меткий стрелок.pdf" icon>Меткий стрелок</File>
            <File file="Авиамоделирование.pdf" icon>Авиамоделирование</File>
            <File file="Полиглот.pdf" icon>Полиглот</File>
        </Text>

        <Text align="justify">
            <Highlight>Общая информация:</Highlight><br/>
            Все программы дополнительного образования реализуются в течение 10 месяцев.<br/>
            Кружки охватывают различные направления развития кадетов: интеллектуальное, творческое, спортивное и военно-патриотическое.
        </Text>
    </Page>
</template>

<style scoped>
.card-grid {
    margin: 2rem 0;
}
</style>