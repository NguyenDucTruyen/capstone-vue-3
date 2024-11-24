<script setup>
import { toTypedSchema } from '@vee-validate/zod'
import { ErrorMessage, Field, Form, useForm } from 'vee-validate'
import { z } from 'zod'
// Zod Schema
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 2 * 1024 * 1024
const schema = z.object({
  file: z
    .instanceof(File)
    .refine(file => file.size < MAX_FILE_SIZE, 'File must be less than 2MB')
    .refine(
      file => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'File must be a valid image format (.jpg, .jpeg, .png and .webp)',
    ),
})

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: toTypedSchema(schema),
})

// File Change Handler
function onFileChange(event, field) {
  const file = event.target.files[0]
  setFieldValue(field.name, file) // Update field value in Vee-Validate
}

// Submit Handler
const onSubmit = handleSubmit((values) => {
  console.log('Form Submitted with values:', values)
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label for="file">Upload File:</label>
      <Field v-slot="{ field }" name="file">
        <input
          id="file"
          type="file"
          accept="image/*"
          @change="onFileChange($event, field)"
        >
      </Field>
      <ErrorMessage name="file" class="text-sm font-normal text-destructive" />
    </div>

    <!-- Submit Button -->
    <button type="submit">
      Submit
    </button>
  </form>
</template>
