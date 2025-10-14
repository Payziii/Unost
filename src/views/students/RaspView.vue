<script setup>
import Page from '@/components/pages/Page.vue';
import Title from '@/components/pages/Title.vue';
import { ref } from 'vue';

const activeDay = ref('monday');

const scheduleData = {
  monday: {
    title: 'Понедельник',
    spo: [
      '8.00 – поднятие флага',
      '8.15-8.55 – Разговоры о важном',
      '1 урок: 9.15-9.55',
      '2 урок: 10.00-10.40',
      '3 урок: 10.50-11.30',
      '4 урок: 11.35-12.15',
      'ОБЕД',
      '5 урок: 13.10-13.50',
      '6 урок: 13.55-14.35',
      '7 урок: 14.45-15.25',
      '8 урок: 15.30-16.10',
      '9-10 урок: 16.20-17.40',
      '11-12 урок: 17.50-19.10',
      '13-14 урок: 19.20-20.40',
    ],
    kshi: [
      '8.00 – поднятие флага',
      '8.15-8.55 – Разговоры о важном',
      '1 урок: 9.15-9.55',
      '2 урок: 10.00-10.40',
      '3 урок: 10.50-11.30',
      '4 урок: 11.35-12.15',
      '5 урок: 12.25-13.05',
      'ОБЕД',
      '6 урок: 13.55-14.35'
    ]
  },
  tuesday: {
    title: 'Вторник-Пятница',
    spo: [
      '1 урок: 8.30-9.10',
      '2 урок: 9.15-09.55',
      '3 урок: 10.05-10.45',
      '4 урок: 10.50-11.30',
      'ОБЕД',
      '5 урок: 12.25-13.05',
      '6 урок: 13.10-13.50',
      '7 урок: 14.00-14.40',
      '8 урок: 14.45-15.25',
      '9-10 урок: 15.35-16.55',
      '11-12 урок: 17.05-18.25',
      '13-14 урок: 18.35-19.55'
    ],
    kshi: [
      '1 урок: 8.30-9.10',
      '2 урок: 9.15-09.55',
      '3 урок: 10.05-10.45',
      '4 урок: 10.50-11.30',
      '5 урок: 11.40-12.20',
      'ОБЕД',
      '6 урок: 13.10-13.50'
    ]
  },
  saturday: {
    title: 'Суббота',
    spo: [
      '1 урок: 8.30-9.05',
      '2 урок: 9.10-09.45',
      '3 урок: 9.55-10.30',
      '4 урок: 10.35-11.10',
      '5 урок: 11.30-12.05',
      '6 урок: 12.10-12.45',
      '7 урок: 12.55-13.30',
      '8 урок: 13.35-14.10',
      '9-10 урок: 14.20-15.30',
      '11-12 урок: 15.40-16.50',
      '13-14 урок: 17.00-18.10'
    ],
    kshi: [
      '1 урок: 8.30-9.05',
      '2 урок: 9.10-09.45',
      '3 урок: 9.55-10.30',
      '4 урок: 10.35-11.10',
      '5 урок: 11.30-12.05',
      '6 урок: 12.10-12.45',
      '7 урок: 12.55-13.30',
      '8 урок: 13.35-14.10'
    ]
  }
};
</script>

<template>
  <Page title="Расписание звонков">
    <Title>Расписание звонков</Title>
    
    <!-- Навигация по дням -->
    <div class="days-navigation">
      <button 
        v-for="(day, key) in scheduleData" 
        :key="key"
        :class="['day-btn', { active: activeDay === key }]"
        @click="activeDay = key"
      >
        {{ day.title }}
      </button>
    </div>

    <!-- Контент расписания -->
    <div class="schedule-content">
      <div class="schedule-header">
        <h2>{{ scheduleData[activeDay].title }}</h2>
      </div>

      <div class="schedule-grid">
        <!-- СПО -->
        <div class="schedule-card spo-card">
          <div class="card-header">
            <div class="card-title">
              <h3>СПО</h3>
              <div class="card-badge">Среднее профессиональное образование</div>
            </div>
            <div class="card-icon">🎓</div>
          </div>
          <div class="lessons-list">
            <div 
              v-for="(lesson, index) in scheduleData[activeDay].spo" 
              :key="index"
              :class="['lesson-item', { lunch: lesson === 'ОБЕД' }]"
            >
              <span class="lesson-time">{{ lesson }}</span>
            </div>
          </div>
        </div>

        <!-- Связующий элемент -->
        <div class="connection">
          
          <div class="connection-icon">🤝</div>
          <div class="connection-text">Братство знаний</div>
        </div>

        <!-- КШИ -->
        <div class="schedule-card kshi-card">
          <div class="card-header">
            <div class="card-icon">⚡</div>
            <div class="card-title">
              <h3>КШИ</h3>
              <div class="card-badge">Кадетская школа-интернат</div>
            </div>
          </div>
          <div class="lessons-list">
            <div 
              v-for="(lesson, index) in scheduleData[activeDay].kshi" 
              :key="index"
              :class="['lesson-item', { lunch: lesson === 'ОБЕД' }]"
            >
              <span class="lesson-time">{{ lesson }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Page>
</template>

<style scoped>
.days-navigation {
  display: flex;
  gap: 8px;
  margin-bottom: 40px;
  flex-wrap: wrap;
  justify-content: center;
}

.day-btn {
  padding: 14px 28px;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  background: white;
  color: #374151;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
  position: relative;
  overflow: hidden;
}

.day-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  transition: left 0.5s;
}

.day-btn:hover::before {
  left: 100%;
}

.day-btn:hover {
  border-color: #3b82f6;
  color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.15);
}

.day-btn.active {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border-color: #3b82f6;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

.schedule-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.schedule-header {
  text-align: center;
  margin-bottom: 40px;
}

.schedule-header h2 {
  font-size: 32px;
  font-weight: 800;
  color: #1f2937;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.schedule-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 0;
  align-items: start;
  position: relative;
}

/* Карточки */
.schedule-card {
  width: 100%;
  max-width: 500px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.4s ease;
  border: 1px solid #f1f5f9;
  position: relative;
}

.schedule-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--gradient-from), var(--gradient-to));
  opacity: 0.8;
}

.spo-card {
  --gradient-from: #667eea;
  --gradient-to: #764ba2;
  justify-self: end;
}

.kshi-card {
  --gradient-from: #069235;
  --gradient-to: #0dcaa1;
  justify-self: start;
}

.schedule-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
}

.card-header {
  padding: 24px 28px;
  background: linear-gradient(135deg, var(--gradient-from), var(--gradient-to));
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.card-header::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  animation: pulse 4s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 0.3; }
}

.card-title h3 {
  font-size: 28px;
  font-weight: 800;
  margin: 0 0 6px 0;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card-badge {
  font-size: 14px;
  opacity: 0.9;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.card-icon {
  font-size: 32px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}

.lessons-list {
  padding: 24px 28px;
  max-height: 500px;
  overflow-y: auto;
}

.lesson-item {
  padding: 14px 0;
  border-bottom: 1px solid #f8fafc;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;
}

.lesson-item::before {
  content: '';
  position: absolute;
  left: -28px;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background: linear-gradient(135deg, var(--gradient-from), var(--gradient-to));
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.lesson-item:hover {
  background: #f8fafc;
  border-radius: 12px;
  margin: 0 -12px;
  padding: 14px 12px;
  transform: translateX(8px);
}

.lesson-item:hover::before {
  opacity: 1;
}

.lesson-item:last-child {
  border-bottom: none;
}

.lesson-item.lunch {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  margin: 12px -28px;
  padding: 16px 28px;
  border: none;
  border-radius: 0;
  position: relative;
  overflow: hidden;
}

.lesson-item.lunch::before {
  content: '🍽️';
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
}

.lesson-item.lunch .lesson-time {
  color: #92400e;
  font-weight: 700;
  font-size: 17px;
}

.lesson-time {
  font-size: 16px;
  color: #374151;
  font-weight: 500;
  transition: color 0.3s ease;
}

.lesson-item:hover .lesson-time {
  color: #1f2937;
  font-weight: 600;
}

/* Связующий элемент */
.connection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  position: relative;
  height: 100%;
  min-height: 400px;
}

.connection-line {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 80%;
  background: linear-gradient(180deg, 
    transparent 0%, 
    #3b82f6 20%, 
    #10b981 50%, 
    #3b82f6 80%, 
    transparent 100%);
  opacity: 0.6;
}

.connection-icon {
  font-size: 48px;
  background: white;
  padding: 20px;
  border-radius: 50%;
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
  z-index: 2;
  animation: connectionPulse 2s ease-in-out infinite;
  border: 3px solid #f1f5f9;
}

@keyframes connectionPulse {
  0%, 100% { 
    transform: scale(1) rotate(0deg);
    box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
  }
  50% { 
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 15px 40px rgba(59, 130, 246, 0.5);
  }
}

.connection-text {
  margin-top: 16px;
  font-size: 14px;
  font-weight: 700;
  color: #3b82f6;
  text-align: center;
  background: linear-gradient(135deg, #3b82f6, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Адаптивность */
@media (max-width: 1024px) {
  .schedule-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .connection {
    display: none;
  }
  
  .spo-card, .kshi-card {
    justify-self: center;
    max-width: 600px;
  }
}

@media (max-width: 768px) {
  .days-navigation {
    gap: 6px;
  }
  
  .day-btn {
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 12px;
  }
  
  .schedule-header h2 {
    font-size: 26px;
  }
  
  .card-header {
    padding: 20px 24px;
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
  
  .card-title h3 {
    font-size: 24px;
  }
  
  .lessons-list {
    padding: 20px 24px;
  }
  
  .lesson-item.lunch {
    margin: 10px -24px;
    padding: 14px 24px;
  }
}

@media (max-width: 480px) {
  .schedule-content {
    padding: 0 15px;
  }
  
  .schedule-card {
    border-radius: 20px;
  }
  
  .card-header {
    padding: 18px 20px;
  }
  
  .lessons-list {
    padding: 18px 20px;
  }
  
  .lesson-time {
    font-size: 15px;
  }
}
</style>