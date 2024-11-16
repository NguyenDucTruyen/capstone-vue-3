<script setup lang="ts">
const categories = ref([
  {
    _id: '6738185ab4f1fe594f36362d',
    name: 'Books and Literature',
    description: 'Discuss your favorite books and literary works.',
    status: 'active',
    parentId: null,
    slug_history: ['books-and-literature'],
    deleted: false,
    slug: 'books-and-literature',
  },
  {
    _id: '6738185ab4f1fe594f36362e',
    name: 'Technology and Gadgets',
    description: 'Explore the latest in technology and gadgets.',
    status: 'active',
    parentId: null,
    slug_history: ['technology-and-gadgets'],
    deleted: false,
    slug: 'technology-and-gadgets',
  },
  {
    _id: '6738185ab4f1fe594f36362f',
    name: 'Health and Wellness',
    description: 'Share tips and discussions on health and well-being.',
    status: 'active',
    parentId: null,
    slug_history: ['health-and-wellness'],
    deleted: false,
    slug: 'health-and-wellness',
  },
  {
    _id: '6738185ab4f1fe594f363630',
    name: 'Travel and Adventure',
    description: 'Talk about your travels and adventure experiences.',
    status: 'active',
    parentId: null,
    slug_history: ['travel-and-adventure'],
    deleted: false,
    slug: 'travel-and-adventure',
  },
  {
    _id: '6738185ab4f1fe594f363631',
    name: 'Movies and TV Shows',
    description: 'Discuss your favorite movies and TV series.',
    status: 'active',
    parentId: null,
    slug_history: ['movies-and-tv-shows'],
    deleted: false,
    slug: 'movies-and-tv-shows',
  },
  {
    _id: '6738185ab4f1fe594f363632',
    name: 'Music and Instruments',
    description: 'Share your love for music and musical instruments.',
    status: 'active',
    parentId: null,
    slug_history: ['music-and-instruments'],
    deleted: false,
    slug: 'music-and-instruments',
  },
  {
    _id: '6738185ab4f1fe594f363633',
    name: 'Gaming and Esports',
    description: 'Join the discussion on gaming and esports events.',
    status: 'active',
    parentId: null,
    slug_history: ['gaming-and-esports'],
    deleted: false,
    slug: 'gaming-and-esports',
  },
  {
    _id: '6738185ab4f1fe594f363634',
    name: 'Food and Recipes',
    description: 'Share and discover delicious recipes and food tips.',
    status: 'active',
    parentId: null,
    slug_history: ['food-and-recipes'],
    deleted: false,
    slug: 'food-and-recipes',
  },
  {
    _id: '6738185ab4f1fe594f363635',
    name: 'Art and Design',
    description: 'Discuss art, design, and creative inspirations.',
    status: 'active',
    parentId: null,
    slug_history: ['art-and-design'],
    deleted: false,
    slug: 'art-and-design',
  },
  {
    _id: '6738185ab4f1fe594f363636',
    name: 'Science and Nature',
    description: 'Engage in conversations about science and the natural world.',
    status: 'active',
    parentId: null,
    slug_history: ['science-and-nature'],
    deleted: false,
    slug: 'science-and-nature',
  },
])
</script>

<template>
  <div class="flex flex-col items-start gap-5">
    <div class="bg-muted rounded-lg flex flex-col items-start gap-2 w-72 p-2">
      <h2 class="text-foreground font-medium text-2xl p-2 leading-5">
        Categories
      </h2>
      <Separator class="w-full bg-muted-foreground" />
      <ScrollArea class="max-h-[420px] w-full overflow-auto custom-scroll mb-5 pr-4">
        <div
          v-for="item in categories"
          :key="item._id"
          class="flex items-start gap-2 w-full rounded cursor-pointer hover:bg-secondary mb-3 p-2"
        >
          <Icon
            name="IconTag"
            class="object-contain h-8 w-8 flex justify-center items-center"
          />
          <div class="flex flex-col w-[calc(100%-2.5rem)] items-start gap-0.5">
              <span class="text-foreground font-medium text-sm leading-4">{{ item.name }}</span>
              <span class="text-foreground truncate font-normal w-full text-xs leading-[1.4]">{{ item.description }}</span>
            </div>
        </div>
      </ScrollArea>
    </div>
  </div>
</template>
