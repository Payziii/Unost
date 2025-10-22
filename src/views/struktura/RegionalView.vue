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
    <Page title="Региональные проекты">


        <Title>РЕГИОНАЛЬНЫЕ ПРОЕКТЫ</Title>
        
        <Text align="justify">
            На этой странице представлена информация о <Highlight>региональных проектах</Highlight> и мероприятиях, 
            в которых принимает участие ГАПОУ СО "ВПМТТ "Юность". Особое внимание уделено системе 
            независимой оценки квалификаций и профессиональным стандартам.
        </Text>

        <Title>Независимая оценка квалификаций</Title>

        <CardGrid>
            <Card title="Студенту о независимой оценке квалификации">
                <Text align="left">
                    <strong>Информация о Национальной системе квалификации:</strong><br>
                    <Link href="https://nok-nark.ru/about/nsk/">https://nok-nark.ru/about/nsk/</Link>
                </Text>
                <Text align="left">
                    <strong>Видеоролик "Профессиональный экзамен для студентов":</strong><br>
                    <Link href="https://www.youtube.com/watch?time_continue=3&v=-_fvGHJsOAk">Смотреть на YouTube</Link>
                </Text>
            </Card>

            <Card title="Нормативно-правовые основы">
                <Text align="left">
                    • Федеральный закон № 238-ФЗ «О независимой оценке квалификации»<br>
                    • Постановление Правительства РФ от 16.11.2016 N 1204<br>
                    • Приказы Минтруда России о порядке проведения оценки
                </Text>
            </Card>

            <Card title="Информационные ресурсы">
                <Text align="left">
                    • Федеральный реестр сведений о НОК<br>
                    • Национальное агентство развития квалификаций<br>
                    • Базовый центр профессиональной подготовки
                </Text>
            </Card>
        </CardGrid>

        <Title>Сведения о квалификациях и оценочных средствах</Title>
        
        <div class="qualification-table">
            <div class="table-header">
                <div class="table-cell"><strong>ФГОС СПО</strong></div>
                <div class="table-cell"><strong>Наименование профессиональных квалификаций</strong></div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    <strong>15.01.05</strong><br>
                    Сварщик ручной, частично механизированной сварки (наплавки)
                </div>
                <div class="table-cell">
                    <strong>40.00200.01</strong> Сварщик дуговой сварки плавящимся покрытым электродом<br>
                    <em>(2 уровень квалификации)</em>
                </div>
            </div>
            <div class="table-row">
                <div class="table-cell">
                    <strong>22.02.06</strong><br>
                    Сварочное производство
                </div>
                <div class="table-cell">
                    <strong>40.00200.01</strong> Сварщик дуговой сварки плавящимся покрытым электродом<br>
                    <em>(2 уровень квалификации)</em>
                </div>
            </div>
        </div>

        <Title>Оцени свои профессиональные знания онлайн</Title>
        
        <Text align="center">
            <Link href="https://demo.nark.ru/">https://demo.nark.ru/</Link>
        </Text>

        <Title>Основные понятия независимой оценки квалификации</Title>
        
        <CardGrid>
            <Card title="Независимая оценка квалификации">
                <Text align="left">
                    Процедура подтверждения соответствия квалификации соискателя положениям профессионального 
                    стандарта или квалификационным требованиям.
                </Text>
            </Card>

            <Card title="Центр оценки квалификаций (ЦОК)">
                <Text align="left">
                    Юридическое лицо, осуществляющее деятельность по проведению независимой оценки квалификации.
                </Text>
            </Card>

            <Card title="Соискатель">
                <Text align="left">
                    Работник или лицо, претендующее на осуществление определенного вида трудовой деятельности, 
                    обратившееся в ЦОК для подтверждения своей квалификации.
                </Text>
            </Card>

            <Card title="Профессиональный стандарт">
                <Text align="left">
                    Документ, определяющий характеристику квалификации, необходимой работнику для осуществления 
                    определенного вида профессиональной деятельности.
                </Text>
            </Card>

            <Card title="Свидетельство о квалификации">
                <Text align="left">
                    Документ государственного образца, подтверждающий успешное прохождение профессионального 
                    экзамена в рамках Федерального закона № 238-ФЗ.
                </Text>
            </Card>
        </CardGrid>

        <Title>Профессиональный экзамен</Title>
        
        <Text align="justify">
            Независимая оценка квалификации проводится в форме профессионального экзамена, который выявляет, 
            соответствует ли квалификация соискателя положениям профессионального стандарта.
        </Text>

        <Text align="justify">
            Для подтверждения квалификации соискателю надо обратиться в ЦОК, предоставив необходимый пакет 
            документов и указав уровень квалификации для проведения профессионального экзамена.
        </Text>

        <CardGrid>
            <Card title="Теоретическая часть">
                <Text align="left">
                    Проходит в форме тестирования с вариантами ответов. Проверяет теоретические знания 
                    по выбранной квалификации.
                </Text>
            </Card>

            <Card title="Практическая часть">
                <Text align="left">
                    Представляет собой задания, состоящие из профессиональной задачи, решаемой 
                    «здесь и сейчас». Демонстрирует практические навыки.
                </Text>
            </Card>
        </CardGrid>

        <Title>Полезные ссылки</Title>
        
        <Text align="left">
            <strong>Федеральный реестр сведений о проведении независимой оценки квалификации:</strong><br>
            <Link href="https://nok-nark.ru/">https://nok-nark.ru/</Link>
        </Text>

        <Text align="left">
            <strong>Национальное агентство развития квалификаций:</strong><br>
            <Link href="https://nark.ru/">https://nark.ru/</Link>
        </Text>

        <Text align="left">
            <strong>Базовый центр профессиональной подготовки, переподготовки и повышения квалификации рабочих кадров:</strong><br>
            <Link href="https://bc-nark.ru/">https://bc-nark.ru/</Link>
        </Text>

        <Text align="left">
            <strong>Национальный совет по профессиональным квалификациям:</strong><br>
            <Link href="http://nspkrf.ru/">http://nspkrf.ru/</Link>
        </Text>

        <Text align="left">
            <strong>Государственный информационный ресурс "Справочник профессий":</strong><br>
            <Link href="http://spravochnik.rosmintrud.ru/">http://spravochnik.rosmintrud.ru/</Link>
        </Text>

        <Text align="left">
            <strong>Программно-аппаратный комплекс "Профессиональные стандарты":</strong><br>
            <Link href="https://profstandart.rosmintrud.ru/">https://profstandart.rosmintrud.ru/</Link>
        </Text>

        <Text align="left">
            <strong>Программно-методический комплекс "Оценка квалификаций":</strong><br>
            <Link href="https://kos-nark.ru/">https://kos-nark.ru/</Link>
        </Text>

        <Text align="center" class="contact-info">
            По вопросам независимой оценки квалификации обращайтесь:<br>
            <strong>ГАПОУ СО "ВПМТТ "Юность"</strong><br>
            г. Верхняя Пышма, ул. Кривоусова, д. 53<br>
            Телефон: +7 (34368) 5-44-86
        </Text>

    </Page>
</template>

<style scoped>
.qualification-table {
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    margin: 20px 0;
}

.table-header {
    display: flex;
    background-color: #f8f9fa;
    border-bottom: 2px solid #dee2e6;
}

.table-row {
    display: flex;
    border-bottom: 1px solid #dee2e6;
}

.table-row:last-child {
    border-bottom: none;
}

.table-cell {
    flex: 1;
    padding: 15px;
    border-right: 1px solid #dee2e6;
}

.table-cell:last-child {
    border-right: none;
}

.table-header .table-cell {
    font-weight: bold;
    background-color: #e9ecef;
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
    .qualification-table {
        font-size: 0.9em;
    }
    
    .table-header,
    .table-row {
        flex-direction: column;
    }
    
    .table-cell {
        border-right: none;
        border-bottom: 1px solid #dee2e6;
    }
    
    .table-cell:last-child {
        border-bottom: none;
    }
    
    .table-header .table-cell:last-child {
        border-bottom: 2px solid #dee2e6;
    }
}

@media (max-width: 480px) {
    .qualification-table {
        font-size: 0.8em;
    }
    
    .table-cell {
        padding: 10px;
    }
    
    .contact-info {
        padding: 15px;
    }
}
</style>