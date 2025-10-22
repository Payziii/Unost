<script setup>
import { ref, watch } from 'vue'
import { generateId } from './componentLibrary'

const props = defineProps({
  modelValue: {
    type: [String, Array],
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const defaultHighlightProps = () => ({
  content: '',
  color: '#ff4800',
  isBold: true
})

const defaultLinkProps = () => ({
  content: '',
  linkTo: 'https://',
  color: '#ff4800'
})

const createTextSegment = (value = '', id = generateId('segment')) => ({
  id,
  type: 'text',
  value
})

const createBoldSegment = (props = {}, id = generateId('segment')) => ({
  id,
  type: 'Bold',
  props: {
    content: '',
    ...(typeof props === 'object' && props ? props : {})
  }
})

const createHighlightSegment = (props = {}, id = generateId('segment')) => ({
  id,
  type: 'Highlight',
  props: {
    ...defaultHighlightProps(),
    ...(typeof props === 'object' && props ? props : {})
  }
})

const createLinkSegment = (props = {}, id = generateId('segment')) => ({
  id,
  type: 'Link',
  props: {
    ...defaultLinkProps(),
    ...(typeof props === 'object' && props ? props : {})
  }
})

const normalizeModelValue = (value, currentSegments = []) => {
  if (!value) {
    const existing = Array.isArray(currentSegments) ? currentSegments.find(segment => segment.type === 'text') : null
    return [createTextSegment('', existing?.id)]
  }

  if (typeof value === 'string') {
    const existing = Array.isArray(currentSegments) ? currentSegments.find(segment => segment.type === 'text') : null
    return [createTextSegment(value, existing?.id)]
  }

  if (!Array.isArray(value)) {
    const existing = Array.isArray(currentSegments) ? currentSegments.find(segment => segment.type === 'text') : null
    return [createTextSegment('', existing?.id)]
  }

  const segments = value.map((segment, index) => {
    const current = Array.isArray(currentSegments) ? currentSegments[index] : undefined
    const fallbackId = segment?.id || current?.id || generateId('segment')

    if (segment === null || segment === undefined) {
      return createTextSegment('', fallbackId)
    }

    if (typeof segment === 'string') {
      return createTextSegment(segment, fallbackId)
    }

    if (typeof segment !== 'object') {
      return createTextSegment('', fallbackId)
    }

    const id = segment.id || current?.id || fallbackId

    if (!segment.type || segment.type === 'text') {
      const textValue = segment.value ?? segment.content ?? ''
      return createTextSegment(typeof textValue === 'string' ? textValue : '', id)
    }

    if (segment.type === 'Bold') {
      const boldProps = segment.props ?? { content: segment.content ?? '' }
      return createBoldSegment(boldProps, id)
    }

    if (segment.type === 'Highlight') {
      const highlightProps = segment.props ?? {
        content: segment.content ?? '',
        color: segment.color,
        isBold: segment.isBold
      }
      return createHighlightSegment(highlightProps, id)
    }

    if (segment.type === 'Link') {
      const linkProps = segment.props ?? {
        content: segment.content ?? '',
        linkTo: segment.linkTo,
        color: segment.color
      }
      return createLinkSegment(linkProps, id)
    }

    return createTextSegment('', id)
  })

  return segments.length ? segments : [createTextSegment('')]
}

const serializeSegments = (segments) => {
  if (!segments.length) {
    return ''
  }

  const onlyText = segments.every(segment => segment.type === 'text')
  if (onlyText) {
    return segments.map(segment => segment.value ?? '').join('')
  }

  return segments.map((segment) => {
    if (segment.type === 'text') {
      return {
        id: segment.id,
        type: 'text',
        value: segment.value ?? ''
      }
    }

    if (segment.type === 'Bold') {
      return {
        id: segment.id,
        type: 'Bold',
        props: {
          content: segment.props?.content ?? ''
        }
      }
    }

    if (segment.type === 'Highlight') {
      return {
        id: segment.id,
        type: 'Highlight',
        props: {
          ...defaultHighlightProps(),
          ...(segment.props || {})
        }
      }
    }

    if (segment.type === 'Link') {
      return {
        id: segment.id,
        type: 'Link',
        props: {
          ...defaultLinkProps(),
          ...(segment.props || {})
        }
      }
    }

    return {
      id: segment.id || generateId('segment'),
      type: 'text',
      value: segment.value ?? ''
    }
  })
}

const segments = ref([])

const emitChange = () => {
  emit('update:modelValue', serializeSegments(segments.value))
}

watch(
  () => props.modelValue,
  (value) => {
    segments.value = normalizeModelValue(value, segments.value)
  },
  { immediate: true, deep: true }
)

const addSegment = (type) => {
  if (type === 'Bold') {
    segments.value.push(createBoldSegment())
  } else if (type === 'Highlight') {
    segments.value.push(createHighlightSegment())
  } else if (type === 'Link') {
    segments.value.push(createLinkSegment())
  } else {
    segments.value.push(createTextSegment(''))
  }
  emitChange()
}

const removeSegment = (index) => {
  segments.value.splice(index, 1)
  emitChange()
}

const moveSegment = (index, direction) => {
  const targetIndex = index + direction
  if (targetIndex < 0 || targetIndex >= segments.value.length) {
    return
  }
  const [segment] = segments.value.splice(index, 1)
  segments.value.splice(targetIndex, 0, segment)
  emitChange()
}
</script>

<template>
  <div class="inline-content-builder">
    <div
      v-if="!segments.length"
      class="inline-content-empty"
    >
      Сегментов еще нет...
    </div>
    <div
      v-else
      class="inline-segment-list"
    >
      <article
        v-for="(segment, index) in segments"
        :key="segment.id"
        class="inline-segment-card"
      >
        <header class="inline-segment-card__header">
          <h5 class="inline-segment-card__title">
            {{ segment.type === 'text' ? 'Текст' : segment.type === 'Bold' ? 'Жирный текст' : segment.type === 'Highlight' ? 'Выделение' : segment.type === 'Link' ? 'Ссылка' : segment.type }}
          </h5>
          <div class="inline-segment-card__actions">
            <button
              type="button"
              class="inline-icon-button"
              :disabled="index === 0"
              @click="moveSegment(index, -1)"
              aria-label="Поднять"
            >
              ↑
            </button>
            <button
              type="button"
              class="inline-icon-button"
              :disabled="index === segments.length - 1"
              @click="moveSegment(index, 1)"
              aria-label="Опустить"
            >
              ↓
            </button>
            <button
              type="button"
              class="inline-icon-button danger"
              @click="removeSegment(index)"
              aria-label="Удалить"
            >
              ×
            </button>
          </div>
        </header>

        <div class="inline-segment-card__fields">
          <template v-if="segment.type === 'text'">
            <textarea
              v-model="segment.value"
              class="inline-input textarea"
              placeholder="Текст"
              @input="emitChange"
            />
          </template>

          <template v-else-if="segment.type === 'Bold'">
            <input
              v-model="segment.props.content"
              type="text"
              class="inline-input"
              placeholder="Жирный текст"
              @input="emitChange"
            />
          </template>

          <template v-else-if="segment.type === 'Highlight'">
            <input
              v-model="segment.props.content"
              type="text"
              class="inline-input"
              placeholder="Выделяемый текст"
              @input="emitChange"
            />
            <input
              v-model="segment.props.color"
              type="text"
              class="inline-input"
              placeholder="Цвет"
              @input="emitChange"
            />
            <label class="inline-checkbox">
              <input
                v-model="segment.props.isBold"
                type="checkbox"
                @change="emitChange"
              />
              <span>Жирный текст</span>
            </label>
          </template>

          <template v-else-if="segment.type === 'Link'">
            <input
              v-model="segment.props.content"
              type="text"
              class="inline-input"
              placeholder="Имя ссылки"
              @input="emitChange"
            />
            <input
              v-model="segment.props.linkTo"
              type="text"
              class="inline-input"
              placeholder="https://example.com"
              @input="emitChange"
            />
            <input
              v-model="segment.props.color"
              type="text"
              class="inline-input"
              placeholder="Цвет"
              @input="emitChange"
            />
          </template>
        </div>
      </article>
    </div>

    <div class="inline-add-segment">
      <span>Добавить сегмент текста:</span>
      <button
        type="button"
        class="inline-secondary-button"
        @click="addSegment('text')"
      >
        Текст
      </button>
      <button
        type="button"
        class="inline-secondary-button"
        @click="addSegment('Bold')"
      >
        Жирный текст
      </button>
      <button
        type="button"
        class="inline-secondary-button"
        @click="addSegment('Highlight')"
      >
        Выделение
      </button>
      <button
        type="button"
        class="inline-secondary-button"
        @click="addSegment('Link')"
      >
        Ссылка
      </button>
    </div>
  </div>
</template>

<style scoped>
.inline-content-builder {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.inline-content-empty {
  border: 1px dashed #d1d5db;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  color: #6b7280;
  font-size: 0.9rem;
}

.inline-segment-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.inline-segment-card {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 14px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.inline-segment-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.inline-segment-card__title {
  margin: 0;
  font-size: 1rem;
  color: #1f2937;
}

.inline-segment-card__actions {
  display: flex;
  gap: 6px;
}

.inline-segment-card__fields {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.inline-input {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 0.95rem;
  width: 100%;
  box-sizing: border-box;
}

.inline-input.textarea {
  min-height: 70px;
  resize: vertical;
}

.inline-icon-button {
  border: 1px solid #d1d5db;
  background: #fff;
  border-radius: 6px;
  width: 28px;
  height: 28px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.inline-icon-button:hover:not(:disabled) {
  background: #f3f4f6;
}

.inline-icon-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.inline-icon-button.danger {
  border-color: #fca5a5;
  color: #b91c1c;
}

.inline-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
}

.inline-add-segment {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

.inline-secondary-button {
  border: 1px solid #d1d5db;
  background: #f3f4f6;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.inline-secondary-button:hover {
  background: #e5e7eb;
}
</style>
