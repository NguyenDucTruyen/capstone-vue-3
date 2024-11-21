<script setup>
const inputSearch = useTemplateRef('input-search')
const searchValue = ref('')
const router = useRouter()
const route = useRoute()
function handleNavigate() {
  console.log('update query')
}
function handleUpdateQuery() {
  console.log('update query')
}
onMounted(() => {
  if (route.query.q) {
    searchValue.value = route.query.q
  }
  if (Object.keys(route.query).includes('q'))
    inputSearch.value.focus()
})
</script>

<template>
  <div class="flex flex-col h-full bg-background justify-between">
    <div class="flex flex-col items-center gap-4 h-full w-full">
      <header class="flex w-full h-20 items-center">
        <AppHeader />
      </header>
      <ScrollArea class="w-full h-[calc(100%-6.5rem)]">
        <div class="flex justify-center gap-8 w-[calc(100%-4rem)]  pb-6">
          <AppSideBar class="max-lg:hidden" />
          <div class="flex flex-col gap-4 h-full rounded-xl max-w-4xl flex-1">
            <div class="rounded-lg p-6 bg-muted">
              <h2 class="text-2xl font-bold mb-4">
                Well come
              </h2>
              <div class="relative w-full flex justify-between items-center gap-4">
                <div class="relative w-full max-w-sm items-center">
                  <input
                    id="search"
                    ref="input-search"
                    v-model="searchValue"
                    type="text"
                    placeholder="Type tile to search"
                    class="flex h-10 w-full border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 rounded-full bg-background max-w-sm"
                    @focus="handleNavigate"
                    @change="handleUpdateQuery"
                  >
                  <span
                    class="absolute start-0 inset-y-0 flex items-center justify-center h-10"
                    style="left: 0.75rem"
                  >
                    <Icon name="IconSearch" class="w-4" />
                  </span>
                </div>
                <RouterLink to="/blogs/create">
                  <Button>Create blog</Button>
                </RouterLink>
              </div>
            </div>
            <Suspense>
              <router-view />
              <template #fallback>
                <div class="flex w-full p-8 justify-center items-center">
                  <Icon name="IconLoading" />
                </div>
              </template>
            </Suspense>
          </div>
          <TabRight class="max-lg:hidden" />
        </div>
        <AppFooter />
      </ScrollArea>
    </div>
  </div>
</template>
