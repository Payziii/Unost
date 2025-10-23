<script setup>
import { computed, ref, watch } from 'vue'
import {
  pageComponentLibrary,
  getComponentDefinition,
  createComponentInstance,
  sanitizeComponents,
  normalizeComponents,
  generateId
} from './componentLibrary'
import InlineContentBuilder from './InlineContentBuilder.vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  saving: {
    type: Boolean,
    default: false
  },
  initialTitle: {
    type: String,
    default: ''
  },
  initialComponents: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['cancel', 'preview', 'save'])

const editorTitle = ref(props.initialTitle)
const selectedType = ref('')
const components = ref([])
const validationError = ref('')

const isOpen = computed(() => props.open)

const resetState = () => {
  editorTitle.value = props.initialTitle || ''
  components.value = normalizeComponents(props.initialComponents || [])
  validationError.value = ''
  selectedType.value = ''
}

watch(
  () => props.open,
  (open) => {
    if (open) {
      resetState()
    }
  },
  { immediate: true }
)

watch(
  () => [props.initialTitle, props.initialComponents],
  () => {
    if (props.open) {
      resetState()
    }
  }
)

const definitionLabel = (type) => getComponentDefinition(type)?.label ?? type
const definitionDescription = (type) => getComponentDefinition(type)?.description ?? ''

const addComponent = () => {
  if (!selectedType.value) return
  const instance = createComponentInstance(selectedType.value)
  components.value.push(instance)
  selectedType.value = ''
}

const removeComponent = (index) => {
  components.value.splice(index, 1)
}

const moveComponent = (index, direction) => {
  const targetIndex = index + direction
  if (targetIndex < 0 || targetIndex >= components.value.length) return
  const [item] = components.value.splice(index, 1)
  components.value.splice(targetIndex, 0, item)
}

const setComponentOrder = (index, value) => {
  const parsed = Number.parseInt(value, 10)
  if (!Number.isFinite(parsed)) return
  const targetIndex = Math.min(
    Math.max(parsed - 1, 0),
    components.value.length - 1
  )
  if (targetIndex === index) return
  const [item] = components.value.splice(index, 1)
  components.value.splice(targetIndex, 0, item)
}

const ensureCollectionArray = (component, collection) => {
  if (!Array.isArray(component.props[collection.name])) {
    component.props[collection.name] = []
  }
}

const addCollectionItem = (component, collection) => {
  ensureCollectionArray(component, collection)
  component.props[collection.name].push(
    collection.schema.reduce(
      (acc, field) => {
        let value
        if (field.type === 'checkbox') {
          value = Boolean(field.default ?? false)
        } else if (field.type === 'number') {
          const defaultValue = field.default ?? 0
          value = Number.isFinite(defaultValue) ? defaultValue : 0
        } else {
          value = field.default ?? ''
        }
        return { ...acc, [field.name]: value }
      },
      { id: generateId('item') }
    )
  )
}

const removeCollectionItem = (component, collection, index) => {
  ensureCollectionArray(component, collection)
  component.props[collection.name].splice(index, 1)
}

const moveCollectionItem = (component, collection, index, direction) => {
  ensureCollectionArray(component, collection)
  const targetIndex = index + direction
  if (targetIndex < 0 || targetIndex >= component.props[collection.name].length) return
  const [item] = component.props[collection.name].splice(index, 1)
  component.props[collection.name].splice(targetIndex, 0, item)
}

const isFieldValueEmpty = (field, value) => {
  if (value === undefined || value === null) {
    return true
  }

  if (typeof value === 'string') {
    return value.trim().length === 0
  }

  if (typeof value === 'number') {
    return Number.isNaN(value)
  }

  if (Array.isArray(value)) {
    if (!value.length) {
      return true
    }

    return !value.some(segment => {
      if (segment === null || segment === undefined) {
        return false
      }

      if (typeof segment === 'string') {
        return segment.trim().length > 0
      }

      if (typeof segment !== 'object') {
        return false
      }

      if (!segment.type || segment.type === 'text') {
        const textValue = segment.value ?? segment.content ?? ''
        return typeof textValue === 'string' && textValue.trim().length > 0
      }

      const contentValue = segment.props?.content ?? segment.content ?? ''
      if (typeof contentValue !== 'string' || contentValue.trim().length === 0) {
        return false
      }

      if (segment.type === 'Link') {
        const linkValue = segment.props?.linkTo ?? segment.linkTo ?? ''
        return typeof linkValue === 'string' && linkValue.trim().length > 0
      }

      return true
    })
  }

  return false
}

const validateComponents = () => {
  for (const component of components.value) {
    const definition = getComponentDefinition(component.type)
    if (!definition) continue

    definition.propsSchema?.forEach(field => {
      const value = component.props[field.name]
      if (
        field.required &&
        field.type !== 'checkbox' &&
        isFieldValueEmpty(field, value)
      ) {
        throw new Error(`Заполните поле "${field.label}" для компонента "${definition.label}"`)
      }
    })

    definition.collections?.forEach(collection => {
      ensureCollectionArray(component, collection)
      component.props[collection.name].forEach((item, index) => {
        collection.schema.forEach(field => {
          const value = item[field.name]
          if (
            field.required &&
            field.type !== 'checkbox' &&
            isFieldValueEmpty(field, value)
          ) {
            throw new Error(
              `Заполните поле "${field.label}" в элементе ${index + 1} "${collection.label}"`
            )
          }
        })
      })
    })
  }
}

const handleSave = () => {
  try {
    validationError.value = ''
    validateComponents()
    emit('save', {
      title: editorTitle.value,
      components: sanitizeComponents(components.value)
    })
  } catch (error) {
    validationError.value = error.message || 'Проверьте корректность данных'
  }
}

const handlePreview = () => {
  emit('preview', {
    title: editorTitle.value,
    components: sanitizeComponents(components.value)
  })
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<template>
  <teleport to="body">
    <div
      v-if="isOpen"
      class="page-editor-overlay"
      @click.self="handleCancel"
    >
      <div class="page-editor-modal" role="dialog" aria-modal="true">
        <header class="page-editor-header">
          <div>
            <h2 class="page-editor-title">Редактирование страницы</h2>
            <p class="page-editor-subtitle">
              Настройте набор компонентов и их содержимое. Изменения вступят в силу после сохранения.
            </p>
          </div>
          <button class="page-editor-close" type="button" @click="handleCancel" aria-label="Закрыть">
            ✕
          </button>
        </header>

        <div class="page-editor-body">
          <label class="form-label" for="page-title">Заголовок страницы</label>
          <input
            id="page-title"
            v-model="editorTitle"
            type="text"
            class="form-input"
            placeholder="Введите заголовок"
          />

          <div class="add-component">
            <select v-model="selectedType" class="form-select">
              <option disabled value="">Выберите компонент</option>
              <option
                v-for="component in pageComponentLibrary"
                :key="component.type"
                :value="component.type"
              >
                {{ component.label }}
              </option>
            </select>
            <button
              type="button"
              class="secondary-button"
              :disabled="!selectedType"
              @click="addComponent"
            >
              Добавить
            </button>
          </div>

          <p v-if="validationError" class="error-text">{{ validationError }}</p>

          <div v-if="!components.length" class="empty-state">
            <p>Контент пока не добавлен. Выберите компонент и начните наполнять страницу.</p>
          </div>

          <div v-else class="component-list">
            <section
              v-for="(component, index) in components"
              :key="component.id"
              class="component-card"
            >
              <header class="component-card__header">
                <div>
                  <h3>{{ definitionLabel(component.type) }}</h3>
                  <p class="component-card__description">
                    {{ definitionDescription(component.type) }}
                  </p>
                </div>
                <div class="component-card__actions">
                  <input
                    type="number"
                    class="component-order-input"
                    :value="index + 1"
                    :min="1"
                    :max="components.length"
                    @change="setComponentOrder(index, $event.target.value)"
                    aria-label="Порядковый номер компонента"
                  />
                  <button
                    type="button"
                    class="icon-button"
                    :disabled="index === 0"
                    @click="moveComponent(index, -1)"
                    aria-label="Переместить вверх"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    class="icon-button"
                    :disabled="index === components.length - 1"
                    @click="moveComponent(index, 1)"
                    aria-label="Переместить вниз"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    class="icon-button danger"
                    @click="removeComponent(index)"
                    aria-label="Удалить компонент"
                  >
                    ✕
                  </button>
                </div>
              </header>

              <div class="component-fields">
                <div
                  v-for="field in getComponentDefinition(component.type)?.propsSchema || []"
                  :key="field.name"
                  class="form-field"
                >
                  <label :for="`${component.id}-${field.name}`" class="form-label">
                    {{ field.label }}
                    <span v-if="field.required" class="required">*</span>
                  </label>

                  <template v-if="component.type === 'Text' && field.name === 'content'">
                    <InlineContentBuilder
                      :model-value="component.props[field.name]"
                      @update:modelValue="value => (component.props[field.name] = value)"
                    />
                  </template>

                  <template v-else-if="field.type === 'textarea'">
                    <textarea
                      :id="`${component.id}-${field.name}`"
                      v-model="component.props[field.name]"
                      class="form-input textarea"
                      :placeholder="field.placeholder"
                    />
                  </template>

                  <template v-else-if="field.type === 'select'">
                    <select
                      :id="`${component.id}-${field.name}`"
                      v-model="component.props[field.name]"
                      class="form-select"
                    >
                      <option
                        v-for="option in field.options"
                        :key="option.value"
                        :value="option.value"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                  </template>

                  <template v-else-if="field.type === 'checkbox'">
                    <label class="checkbox">
                      <input
                        type="checkbox"
                        v-model="component.props[field.name]"
                      />
                      <span>{{ field.label }}</span>
                    </label>
                  </template>

                  <template v-else-if="field.type === 'number'">
                    <input
                      :id="`${component.id}-${field.name}`"
                      v-model.number="component.props[field.name]"
                      type="number"
                      class="form-input"
                      :min="field.min"
                      :max="field.max"
                      :step="field.step ?? 1"
                    />
                  </template>

                  <template v-else>
                    <input
                      :id="`${component.id}-${field.name}`"
                      v-model="component.props[field.name]"
                      type="text"
                      class="form-input"
                      :placeholder="field.placeholder"
                    />
                  </template>
                </div>

                <div
                  v-for="collection in getComponentDefinition(component.type)?.collections || []"
                  :key="collection.name"
                  class="collection"
                >
                  <div class="collection-header">
                    <h4>{{ collection.label }}</h4>
                    <button
                      type="button"
                      class="secondary-button"
                      @click="addCollectionItem(component, collection)"
                    >
                      Добавить
                    </button>
                  </div>

                  <div v-if="!component.props[collection.name]?.length" class="collection-empty">
                    <p>Элементы отсутствуют.</p>
                  </div>

                  <div
                    v-else
                    class="collection-items"
                  >
                    <article
                      v-for="(item, itemIndex) in component.props[collection.name]"
                      :key="item.id"
                      class="collection-item"
                    >
                      <header class="collection-item__header">
                        <h5>{{ collection.itemLabel }} {{ itemIndex + 1 }}</h5>
                        <div class="component-card__actions">
                          <button
                            type="button"
                            class="icon-button"
                            :disabled="itemIndex === 0"
                            @click="moveCollectionItem(component, collection, itemIndex, -1)"
                            aria-label="Переместить вверх"
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            class="icon-button"
                            :disabled="itemIndex === component.props[collection.name].length - 1"
                            @click="moveCollectionItem(component, collection, itemIndex, 1)"
                            aria-label="Переместить вниз"
                          >
                            ↓
                          </button>
                          <button
                            type="button"
                            class="icon-button danger"
                            @click="removeCollectionItem(component, collection, itemIndex)"
                            aria-label="Удалить элемент"
                          >
                            ✕
                          </button>
                        </div>
                      </header>

                      <div class="collection-fields">
                        <div
                          v-for="field in collection.schema"
                          :key="field.name"
                          class="form-field"
                        >
                          <label :for="`${item.id}-${field.name}`" class="form-label">
                            {{ field.label }}
                            <span v-if="field.required" class="required">*</span>
                          </label>

                          <template v-if="field.type === 'textarea'">
                            <textarea
                              :id="`${item.id}-${field.name}`"
                              v-model="item[field.name]"
                              class="form-input textarea"
                              :placeholder="field.placeholder"
                            />
                          </template>

                          <template v-else-if="field.type === 'checkbox'">
                            <label class="checkbox">
                              <input
                                type="checkbox"
                                v-model="item[field.name]"
                              />
                              <span>{{ field.label }}</span>
                            </label>
                          </template>

                          <template v-else-if="field.type === 'number'">
                            <input
                              :id="`${item.id}-${field.name}`"
                              v-model.number="item[field.name]"
                              type="number"
                              class="form-input"
                              :min="field.min"
                              :max="field.max"
                              :step="field.step ?? 1"
                            />
                          </template>

                          <template v-else>
                            <input
                              :id="`${item.id}-${field.name}`"
                              v-model="item[field.name]"
                              type="text"
                              class="form-input"
                              :placeholder="field.placeholder"
                            />
                          </template>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <footer class="page-editor-footer">
          <button type="button" class="secondary-button" @click="handleCancel">
            Отмена
          </button>
          <button
            type="button"
            class="secondary-button"
            :disabled="saving"
            @click="handlePreview"
          >
            Предпросмотр
          </button>
          <button
            type="button"
            class="primary-button"
            :disabled="saving"
            @click="handleSave"
          >
            {{ saving ? 'Сохранение…' : 'Сохранить' }}
          </button>
        </footer>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.page-editor-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  z-index: 2000;
}

.page-editor-modal {
  background: #fff;
  border-radius: 12px;
  width: min(960px, 100%);
  max-height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.20);
}

.page-editor-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 24px 28px 16px;
  border-bottom: 1px solid #ececec;
  gap: 16px;
}

.page-editor-title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 600;
  color: #1b1b1b;
}

.page-editor-subtitle {
  margin: 8px 0 0;
  color: #6b7280;
  font-size: 0.95rem;
}

.page-editor-close {
  border: none;
  background: transparent;
  font-size: 1.2rem;
  cursor: pointer;
  color: #6b7280;
  transition: color 0.2s ease;
}

.page-editor-close:hover {
  color: #111827;
}

.page-editor-body {
  padding: 16px 28px 0;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.page-editor-footer {
  padding: 20px 28px;
  border-top: 1px solid #ececec;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.form-label {
  font-weight: 500;
  color: #1f2937;
  margin-bottom: 6px;
  display: inline-block;
}

.form-input,
.form-select,
.textarea {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 0.95rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input:focus,
.form-select:focus,
.textarea:focus {
  outline: none;
  border-color: #f97316;
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.15);
}

.textarea {
  min-height: 120px;
  resize: vertical;
}

.add-component {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.empty-state {
  padding: 24px;
  border: 1px dashed #d1d5db;
  border-radius: 10px;
  text-align: center;
  color: #6b7280;
  font-size: 0.95rem;
}

.component-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.component-card {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 18px 20px;
  background: #fbfbfb;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.component-card__header {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
}

.component-card__header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #111827;
}

.component-card__description {
  margin: 4px 0 0;
  color: #6b7280;
  font-size: 0.9rem;
}

.component-card__actions {
  display: flex;
  gap: 6px;
  align-items: center;
}

.component-order-input {
  width: 56px;
  padding: 4px 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.9rem;
}

.component-order-input:focus {
  outline: none;
  border-color: #f97316;
  box-shadow: 0 0 0 1px rgba(249, 115, 22, 0.2);
}

.icon-button {
  border: 1px solid #d1d5db;
  background: #fff;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.icon-button:hover:not(:disabled) {
  background: #f3f4f6;
}

.icon-button:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.icon-button.danger {
  border-color: #fca5a5;
  color: #b91c1c;
}

.component-fields {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.collection {
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.collection-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.collection-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.collection-item {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 14px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.collection-item__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.collection-item__header h5 {
  margin: 0;
  font-size: 1rem;
  color: #1f2937;
}

.collection-fields {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.collection-empty {
  border: 1px dashed #d1d5db;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  color: #6b7280;
  font-size: 0.9rem;
}

.checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: #1f2937;
}

.primary-button,
.secondary-button {
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.primary-button {
  background: #f97316;
  color: #fff;
}

.primary-button:hover:not(:disabled) {
  background: #ea580c;
}

.primary-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.secondary-button {
  background: #f3f4f6;
  color: #1f2937;
}

.secondary-button:hover:not(:disabled) {
  background: #e5e7eb;
}

.secondary-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.error-text {
  color: #dc2626;
  font-size: 0.9rem;
}

.required {
  color: #ef4444;
}

@media (max-width: 768px) {
  .page-editor-modal {
    width: 100%;
    max-height: 100%;
  }

  .page-editor-header,
  .page-editor-body,
  .page-editor-footer {
    padding-left: 18px;
    padding-right: 18px;
  }

  .add-component {
    flex-direction: column;
    align-items: stretch;
  }

  .component-card__header {
    flex-direction: column;
    align-items: stretch;
  }

  .component-card__actions {
    align-self: flex-end;
  }
}
</style>
