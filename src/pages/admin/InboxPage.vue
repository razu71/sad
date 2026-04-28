<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  Image as ImageIcon,
  MessageCircle,
  Paperclip,
  Pause,
  Search,
  Send,
  Smile,
  UserRound,
  X,
} from 'lucide-vue-next'
import PageHeader from '@/components/app/PageHeader.vue'
import Avatar from '@/components/ui/Avatar.vue'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Separator from '@/components/ui/Separator.vue'
import Textarea from '@/components/ui/Textarea.vue'

type ChannelId = 'instagram' | 'telegram' | 'whatsapp' | 'messenger'

type MsgDirection = 'in' | 'out'

interface ChatMessage {
  id: string
  direction: MsgDirection
  body: string
  at: string
  senderLabel: string
  receiverLabel: string
}

interface ContactDetail {
  channelLabel: string
  externalId: string
  phone: string
  email?: string
  address?: string
}

interface ThreadRow {
  id: string
  channel: ChannelId
  contactName: string
  lastPreview: string
  unread: number
  updatedAt: string
  messages: ChatMessage[]
  contact: ContactDetail
}

const { t } = useI18n()

const channelMeta: Record<ChannelId, { labelKey: string; short: string; bubble: string }> = {
  instagram: { labelKey: 'inbox.channelInstagram', short: 'IG', bubble: 'bg-gradient-to-br from-purple-500 to-pink-500' },
  telegram: { labelKey: 'inbox.channelTelegram', short: 'TG', bubble: 'bg-sky-500' },
  whatsapp: { labelKey: 'inbox.channelWhatsapp', short: 'WA', bubble: 'bg-emerald-500' },
  messenger: { labelKey: 'inbox.channelMessenger', short: 'MS', bubble: 'bg-blue-600' },
}

const threads = ref<ThreadRow[]>([
  {
    id: 't1',
    channel: 'whatsapp',
    contactName: 'Cora Goyette',
    lastPreview: 'Thanks — can you confirm the refund timeline?',
    unread: 2,
    updatedAt: '2026-04-28T14:05:00.000Z',
    contact: {
      channelLabel: 'WhatsApp Business',
      externalId: 'wa-biz-991284',
      phone: '+1 (415) 555-0198',
      email: 'cora.g@example.com',
      address: '428 Market St, San Francisco, CA',
    },
    messages: [
      {
        id: 'm1',
        direction: 'in',
        body: 'Hi, I was charged twice for last month.',
        at: '2026-04-28T13:40:00.000Z',
        senderLabel: 'Cora Goyette',
        receiverLabel: 'Support',
      },
      {
        id: 'm2',
        direction: 'out',
        body: 'Sorry about that — I see both charges. I am issuing a refund for the duplicate now.',
        at: '2026-04-28T13:42:00.000Z',
        senderLabel: 'John Doe (Agent)',
        receiverLabel: 'Cora Goyette',
      },
      {
        id: 'm3',
        direction: 'in',
        body: 'Thanks — can you confirm the refund timeline?',
        at: '2026-04-28T14:05:00.000Z',
        senderLabel: 'Cora Goyette',
        receiverLabel: 'Support',
      },
    ],
  },
  {
    id: 't2',
    channel: 'telegram',
    contactName: 'Irene Dicki',
    lastPreview: 'Shipment says delivered but nothing here.',
    unread: 0,
    updatedAt: '2026-04-28T12:18:00.000Z',
    contact: {
      channelLabel: 'Telegram',
      externalId: 'tg-772910',
      phone: '+44 7700 900123',
      email: 'irene.d@example.co.uk',
    },
    messages: [
      {
        id: 'm4',
        direction: 'in',
        body: 'Shipment says delivered but nothing here.',
        at: '2026-04-28T12:15:00.000Z',
        senderLabel: 'Irene Dicki',
        receiverLabel: 'Support',
      },
      {
        id: 'm5',
        direction: 'out',
        body: 'I am opening a carrier investigation and will email you the reference shortly.',
        at: '2026-04-28T12:18:00.000Z',
        senderLabel: 'John Doe (Agent)',
        receiverLabel: 'Irene Dicki',
      },
    ],
  },
  {
    id: 't3',
    channel: 'instagram',
    contactName: 'Marcus Chen',
    lastPreview: 'Do you ship to Canada?',
    unread: 1,
    updatedAt: '2026-04-28T11:02:00.000Z',
    contact: {
      channelLabel: 'Instagram DM',
      externalId: 'ig-448821',
      phone: '+1 (604) 555-0144',
    },
    messages: [
      {
        id: 'm6',
        direction: 'in',
        body: 'Do you ship to Canada?',
        at: '2026-04-28T11:02:00.000Z',
        senderLabel: 'Marcus Chen',
        receiverLabel: 'Support',
      },
    ],
  },
  {
    id: 't4',
    channel: 'messenger',
    contactName: 'Priya Nair',
    lastPreview: 'Appointment reschedule please.',
    unread: 0,
    updatedAt: '2026-04-28T09:45:00.000Z',
    contact: {
      channelLabel: 'Messenger',
      externalId: 'fb-msg-301992',
      phone: '+91 98765 43210',
      email: 'priya.n@example.in',
    },
    messages: [
      {
        id: 'm7',
        direction: 'out',
        body: 'Hi Priya — your slot is confirmed for Tuesday 10:00.',
        at: '2026-04-28T09:40:00.000Z',
        senderLabel: 'John Doe (Agent)',
        receiverLabel: 'Priya Nair',
      },
      {
        id: 'm8',
        direction: 'in',
        body: 'Appointment reschedule please.',
        at: '2026-04-28T09:45:00.000Z',
        senderLabel: 'Priya Nair',
        receiverLabel: 'Support',
      },
    ],
  },
])

const searchQuery = ref('')
const channelFilter = ref<ChannelId | 'all'>('all')
const selectedId = ref<string>(threads.value[0]?.id ?? '')
const composeText = ref('')
const noteDraft = ref('')

const filteredThreads = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return threads.value.filter((row) => {
    if (channelFilter.value !== 'all' && row.channel !== channelFilter.value) {
      return false
    }
    if (!q) {
      return true
    }
    return (
      row.contactName.toLowerCase().includes(q)
      || row.lastPreview.toLowerCase().includes(q)
      || row.contact.phone.includes(q)
    )
  })
})

const selectedThread = computed(() => filteredThreads.value.find((r) => r.id === selectedId.value))

watch(filteredThreads, (list) => {
  if (list.length === 0) {
    selectedId.value = ''
    return
  }
  if (!list.some((r) => r.id === selectedId.value)) {
    selectedId.value = list[0]?.id ?? ''
  }
})

function channelCount(ch: ChannelId): number {
  return threads.value.filter((r) => r.channel === ch).length
}

function formatShortTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
}

function formatDay(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function selectThread(id: string) {
  selectedId.value = id
}

function sendMessage() {
  const text = composeText.value.trim()
  const thread = selectedThread.value
  if (!text || !thread) {
    return
  }
  const msg: ChatMessage = {
    id: `local-${Date.now()}`,
    direction: 'out',
    body: text,
    at: new Date().toISOString(),
    senderLabel: 'John Doe (Agent)',
    receiverLabel: thread.contactName,
  }
  thread.messages.push(msg)
  thread.lastPreview = text
  thread.updatedAt = msg.at
  composeText.value = ''
}

function pauseConversation() {
  /* mock action */
}
function closeConversation() {
  /* mock action */
}
</script>

<template>
  <div>
    <PageHeader :title="t('inbox.pageTitle')" :description="t('inbox.pageDescription')" />
    <div class="flex h-[calc(100dvh-11rem)] min-h-[420px] flex-col gap-0 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] md:flex-row">
    <!-- Channel filters -->
    <aside class="flex w-full shrink-0 flex-col border-[var(--border)] bg-[var(--muted)]/40 md:w-56 md:border-r">
      <div class="border-b border-[var(--border)] p-3">
        <label class="sr-only">{{ $t('inbox.searchChats') }}</label>
        <div class="relative">
          <Search class="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <Input v-model="searchQuery" type="search" size="sm" class="pl-8" :placeholder="$t('inbox.searchChats')" />
        </div>
      </div>
      <div class="flex gap-1 overflow-x-auto p-2 md:flex-col md:overflow-visible">
        <button
          type="button"
          class="flex shrink-0 items-center justify-between rounded-[var(--radius-md)] px-2 py-2 text-left text-sm transition-colors"
          :class="channelFilter === 'all' ? 'bg-[var(--sidebar-active-bg)] text-[var(--sidebar-active-text)]' : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)]'"
          @click="channelFilter = 'all'"
        >
          <span>{{ $t('inbox.allChannels') }}</span>
          <Badge variant="outline" size="sm">{{ threads.length }}</Badge>
        </button>
        <button
          v-for="ch in (['whatsapp', 'telegram', 'instagram', 'messenger'] as ChannelId[])"
          :key="ch"
          type="button"
          class="flex shrink-0 items-center gap-2 rounded-[var(--radius-md)] px-2 py-2 text-left text-sm transition-colors"
          :class="channelFilter === ch ? 'bg-[var(--sidebar-active-bg)] text-[var(--sidebar-active-text)]' : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)]'"
          @click="channelFilter = ch"
        >
          <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white" :class="channelMeta[ch].bubble">{{ channelMeta[ch].short }}</span>
          <span class="min-w-0 flex-1 truncate">{{ t(channelMeta[ch].labelKey) }}</span>
          <Badge variant="outline" size="sm">{{ channelCount(ch) }}</Badge>
        </button>
      </div>
      <Separator />
      <div class="hidden p-3 text-xs text-[var(--muted-foreground)] md:block">
        {{ $t('inbox.filtersHint') }}
      </div>
    </aside>

    <!-- Thread list -->
    <section class="flex w-full min-w-0 flex-col border-[var(--border)] md:w-72 md:border-r lg:w-80">
      <div class="flex shrink-0 items-center justify-between border-b border-[var(--border)] px-3 py-2">
        <div class="min-w-0">
          <p class="truncate text-sm font-semibold text-[var(--foreground)]">John Doe</p>
          <p class="text-xs text-[var(--muted-foreground)]">{{ $t('inbox.inboxTitle') }}</p>
        </div>
        <Badge variant="secondary" size="sm">{{ filteredThreads.length }}</Badge>
      </div>
      <div class="min-h-0 flex-1 overflow-y-auto">
        <button
          v-for="row in filteredThreads"
          :key="row.id"
          type="button"
          class="flex w-full gap-2 border-b border-[var(--border)] px-3 py-3 text-left transition-colors"
          :class="selectedId === row.id ? 'bg-[var(--muted)]' : 'hover:bg-[var(--muted)]/60'"
          @click="selectThread(row.id)"
        >
          <Avatar :alt="row.contactName" size="sm" />
          <div class="min-w-0 flex-1">
            <div class="flex items-start justify-between gap-1">
              <span class="truncate text-sm font-medium text-[var(--foreground)]">{{ row.contactName }}</span>
              <span class="shrink-0 text-[10px] text-[var(--muted-foreground)]">{{ formatShortTime(row.updatedAt) }}</span>
            </div>
            <div class="mt-0.5 flex items-center gap-1.5">
              <span class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white" :class="channelMeta[row.channel].bubble">{{ channelMeta[row.channel].short }}</span>
              <span class="truncate text-xs text-[var(--muted-foreground)]">{{ row.lastPreview }}</span>
            </div>
          </div>
          <Badge v-if="row.unread > 0" variant="destructive" size="sm" class="shrink-0 self-center">{{ row.unread > 9 ? '9+' : row.unread }}</Badge>
        </button>
        <p v-if="filteredThreads.length === 0" class="px-3 py-8 text-center text-sm text-[var(--muted-foreground)]">{{ $t('inbox.noThreads') }}</p>
      </div>
    </section>

    <!-- Chat -->
    <section class="flex min-h-0 min-w-0 flex-1 flex-col border-[var(--border)] md:border-r">
      <template v-if="selectedThread">
        <header class="flex shrink-0 flex-wrap items-center gap-2 border-b border-[var(--border)] px-3 py-2">
          <div class="flex min-w-0 flex-1 items-center gap-2">
            <Avatar :alt="selectedThread.contactName" size="sm" status="online" />
            <div class="min-w-0">
              <p class="truncate text-sm font-semibold">{{ selectedThread.contactName }}</p>
              <p class="text-xs text-[var(--muted-foreground)]">{{ t(channelMeta[selectedThread.channel].labelKey) }} · {{ formatDay(selectedThread.updatedAt) }}</p>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <Button variant="outline" size="sm" @click="pauseConversation">
              <Pause class="h-3.5 w-3.5" />
              {{ $t('inbox.pause') }}
            </Button>
            <Button variant="outline" size="sm" @click="closeConversation">
              <X class="h-3.5 w-3.5" />
              {{ $t('inbox.close') }}
            </Button>
            <Button variant="ghost" size="icon" :aria-label="$t('inbox.profile')">
              <UserRound class="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div class="min-h-0 flex-1 space-y-3 overflow-y-auto bg-[var(--background)] px-3 py-4">
          <article
            v-for="msg in selectedThread.messages"
            :key="msg.id"
            class="flex flex-col gap-1"
            :class="msg.direction === 'out' ? 'items-end' : 'items-start'"
          >
            <div
              class="max-w-[min(100%,28rem)] rounded-2xl px-3 py-2 text-sm shadow-[var(--shadow-sm)]"
              :class="msg.direction === 'out'
                ? 'rounded-br-md bg-[var(--info)] text-[var(--info-foreground)]'
                : 'rounded-bl-md bg-[var(--muted)] text-[var(--foreground)]'"
            >
              <p class="whitespace-pre-wrap">{{ msg.body }}</p>
            </div>
            <div class="max-w-[min(100%,28rem)] px-1 text-[10px] text-[var(--muted-foreground)]">
              <span class="font-medium text-[var(--foreground)]">{{ msg.senderLabel }}</span>
              <span aria-hidden="true"> → </span>
              <span>{{ msg.receiverLabel }}</span>
              <span class="mx-1 text-[var(--border)]">·</span>
              <time :datetime="msg.at">{{ formatShortTime(msg.at) }}</time>
            </div>
          </article>
        </div>

        <footer class="shrink-0 border-t border-[var(--border)] bg-[var(--card)] p-3">
          <Textarea v-model="composeText" class="min-h-[72px] resize-none" :placeholder="$t('inbox.composePlaceholder')" />
          <div class="mt-2 flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-1">
              <Button variant="ghost" size="icon" type="button" :aria-label="$t('inbox.attach')">
                <Paperclip class="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" type="button" :aria-label="$t('inbox.emoji')">
                <Smile class="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" type="button" :aria-label="$t('inbox.image')">
                <ImageIcon class="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" type="button">{{ $t('inbox.template') }}</Button>
            </div>
            <Button variant="primary" size="sm" type="button" @click="sendMessage">
              <Send class="h-4 w-4" />
              {{ $t('inbox.send') }}
            </Button>
          </div>
        </footer>
      </template>
      <div v-else class="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center text-[var(--muted-foreground)]">
        <MessageCircle class="h-10 w-10 opacity-40" />
        <p class="text-sm">{{ $t('inbox.selectThread') }}</p>
      </div>
    </section>

    <!-- Contact details -->
    <aside class="flex w-full shrink-0 flex-col overflow-hidden border-[var(--border)] bg-[var(--muted)]/25 md:w-72 lg:w-80">
      <template v-if="selectedThread">
        <div class="border-b border-[var(--border)] p-4">
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-3">
              <Avatar :alt="selectedThread.contactName" size="lg" />
              <div class="min-w-0">
                <p class="font-semibold text-[var(--foreground)]">{{ selectedThread.contactName }}</p>
                <p class="text-xs text-[var(--muted-foreground)]">{{ selectedThread.contact.channelLabel }}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" type="button">{{ $t('inbox.edit') }}</Button>
          </div>
        </div>
        <div class="min-h-0 flex-1 overflow-y-auto p-4">
          <h3 class="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">{{ $t('inbox.contactDetails') }}</h3>
          <dl class="mt-3 space-y-2 text-sm">
            <div>
              <dt class="text-[var(--muted-foreground)]">{{ $t('inbox.fieldChannel') }}</dt>
              <dd class="text-[var(--foreground)]">{{ selectedThread.contact.channelLabel }}</dd>
            </div>
            <div>
              <dt class="text-[var(--muted-foreground)]">{{ $t('inbox.fieldId') }}</dt>
              <dd class="font-mono text-[var(--foreground)]">{{ selectedThread.contact.externalId }}</dd>
            </div>
            <div>
              <dt class="text-[var(--muted-foreground)]">{{ $t('inbox.fieldPhone') }}</dt>
              <dd class="text-[var(--foreground)]">{{ selectedThread.contact.phone }}</dd>
            </div>
            <div v-if="selectedThread.contact.email">
              <dt class="text-[var(--muted-foreground)]">{{ $t('inbox.fieldEmail') }}</dt>
              <dd class="break-all text-[var(--foreground)]">{{ selectedThread.contact.email }}</dd>
            </div>
            <div v-if="selectedThread.contact.address">
              <dt class="text-[var(--muted-foreground)]">{{ $t('inbox.fieldAddress') }}</dt>
              <dd class="text-[var(--foreground)]">{{ selectedThread.contact.address }}</dd>
            </div>
          </dl>
          <button type="button" class="mt-3 text-sm font-medium text-[var(--primary)]">{{ $t('inbox.addAttribute') }}</button>

          <Separator class="my-4" />

          <h3 class="text-xs font-semibold uppercase tracking-wide text-[var(--muted-foreground)]">{{ $t('inbox.notes') }}</h3>
          <Textarea v-model="noteDraft" class="mt-2 min-h-[72px]" :placeholder="$t('inbox.notePlaceholder')" />
          <ul class="mt-4 space-y-3">
            <li class="flex gap-2 text-sm">
              <Avatar alt="Justin Hickle" size="sm" />
              <div>
                <p class="text-[var(--foreground)]"><span class="font-medium">Justin Hickle</span> <span class="text-xs text-[var(--muted-foreground)]">· {{ $t('inbox.noteSample1Time') }}</span></p>
                <p class="text-[var(--muted-foreground)]">{{ $t('inbox.noteSample1') }}</p>
              </div>
            </li>
            <li class="flex gap-2 text-sm">
              <Avatar alt="Ellen Hirthe" size="sm" />
              <div>
                <p class="text-[var(--foreground)]"><span class="font-medium">Ellen Hirthe</span> <span class="text-xs text-[var(--muted-foreground)]">· {{ $t('inbox.noteSample2Time') }}</span></p>
                <p class="text-[var(--muted-foreground)]">{{ $t('inbox.noteSample2') }}</p>
              </div>
            </li>
          </ul>
        </div>
      </template>
    </aside>
    </div>
  </div>
</template>
