"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useHomeTheme, THEME_TRANSITION } from "../../lib/homeTheme"
import { containerVariants, itemVariants } from "../../lib/homeMotion"
import ComponentPreviewCard from "./ComponentPreviewCard"
import type { CodeTab } from "./ComponentPreviewCard"

/* ── Real ZenithUi component imports ───────────────────── */
import { DayPicker } from "@zenithui/day-picker"
import "@zenithui/day-picker/style.css"
import { TimePicker } from "@zenithui/time-picker"
import * as TooltipPrimitive from "@zenithui/tooltip"
import { toast } from "@zenithui/toast"
import * as Fab from "@zenithui/fab"
import { cn } from "@/lib/utils"
import {
  Plus,
  Share2,
  FileEdit,
  Mail,
  Check,
  List,
  LayoutGrid,
} from "lucide-react"
import LightBox from "@/components/ui/light-box"
import type { LightBoxImages } from "@zenithui/light-box"

/* ── Tab Types ─────────────────────────────────────────── */
type TabID =
  | "daypicker"
  | "timepicker"
  | "toast"
  | "tooltip"
  | "lightbox"
  | "fab"

const TABS: { id: TabID; label: string }[] = [
  { id: "daypicker", label: "DayPicker" },
  { id: "timepicker", label: "TimePicker" },
  { id: "toast", label: "Toast" },
  { id: "tooltip", label: "Tooltip" },
  { id: "lightbox", label: "LightBox" },
  { id: "fab", label: "FAB" },
]

/* ── Live Preview Components ───────────────────────────── */

function DayPickerPreview() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <DayPicker
      mode="single"
      selected={selectedDate}
      onSelect={setSelectedDate}
    />
  )
}

function TimePickerPreview() {
  const [time, setTime] = useState<string>("16:13")

  return (
    <TimePicker
      time={time}
      onTimeChange={(t) => setTime(t)}
      align="center"
      side="right"
    />
  )
}

function ToastPreview() {
  const THEME = useHomeTheme()

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        className="rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:opacity-90"
        style={{ backgroundColor: THEME.accent.primary }}
        onClick={() => toast.success("This is a success toast")}
      >
        Success
      </button>
      <button
        type="button"
        className="rounded-lg border px-5 py-2.5 text-sm font-medium shadow-sm transition-all hover:opacity-80"
        style={{ borderColor: THEME.border.default, color: THEME.text.primary }}
        onClick={() => toast.info("This is an info toast")}
      >
        Info
      </button>
      <button
        type="button"
        className="rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:opacity-90"
        style={{ backgroundColor: "#ef4444" }}
        onClick={() => toast.error("This is an error toast")}
      >
        Error
      </button>
      <button
        type="button"
        className="rounded-lg px-5 py-2.5 text-sm font-medium shadow-md transition-all hover:opacity-80"
        style={{ backgroundColor: THEME.bg.card, color: THEME.text.primary }}
        onClick={() => toast.warning("This is a warning toast")}
      >
        Warning
      </button>
    </div>
  )
}

function TooltipPreview() {
  const THEME = useHomeTheme()

  return (
    <div className="flex items-center gap-6">
      {(["top", "right", "bottom"] as const).map((side) => (
        <TooltipPrimitive.Root key={side}>
          <TooltipPrimitive.Trigger asChild>
            <button
              type="button"
              className="rounded-lg border px-5 py-2.5 text-sm font-medium shadow-sm transition-all hover:opacity-80"
              style={{
                borderColor: THEME.border.default,
                color: THEME.text.primary,
              }}
            >
              {side.charAt(0).toUpperCase() + side.slice(1)}
            </button>
          </TooltipPrimitive.Trigger>
          <TooltipPrimitive.Content
            side={side}
            animation="fade"
            className={cn(
              "bg-card-foreground text-card z-50 rounded-sm px-3.5 py-2 text-sm",
            )}
          >
            Add to library
            <TooltipPrimitive.Arrow />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Root>
      ))}
    </div>
  )
}

function LightBoxPreview() {
  const THEME = useHomeTheme()
  const [open, setOpen] = useState<boolean>(false)

  const dummyImages: LightBoxImages[] = [
    {
      src: `${process.env.NEXT_PUBLIC_SITE_URL}/assets/images/spider-man-2.jpg`,
      alt: "Image 1",
      caption: "First Image",
      captionDescription: "This is the first image description.",
    },
    {
      src: `${process.env.NEXT_PUBLIC_SITE_URL}/assets/images/spider-man-1.jpg`,
      alt: "Image 2",
      caption: "Second Image",
      captionDescription: "This is the second image description.",
    },
    {
      src: `${process.env.NEXT_PUBLIC_SITE_URL}/assets/images/spider-man-3.jpg`,
      alt: "Image 3",
      caption: "Third Image",
      captionDescription: "This is the third image description.",
    },
  ]

  return (
    <div>
      <button
        type="button"
        className="rounded-lg px-5 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:opacity-90"
        style={{ backgroundColor: THEME.accent.primary }}
        onClick={() => setOpen(true)}
      >
        Open LightBox
      </button>
      <LightBox
        images={dummyImages}
        open={open}
        animation="slide"
        onOpenChange={setOpen}
        showCloseButton={true}
        showPagination={true}
        showCaption={true}
      />
    </div>
  )
}

function FabPreview() {
  const [open, setOpen] = useState(false)
  const [view, setView] = useState("list")
  const [compact, setCompact] = useState(false)

  const quickActions = [
    { icon: Share2, label: "Share" },
    { icon: FileEdit, label: "Edit" },
    { icon: Mail, label: "Send" },
  ]

  const itemStyles = cn(
    "group flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-left text-sm",
    "hover:bg-accent hover:text-accent-foreground",
    "focus:ring-primary/20 focus:ring-2 focus:outline-none",
    "transition-colors",
  )

  const indicatorStyles =
    "hidden size-4 shrink-0 group-data-[state=checked]:inline-flex"

  return (
    <div className="relative flex h-72 w-full items-center justify-center">
      <Fab.Root
        open={open}
        onOpenChange={setOpen}
        position="bottom-center"
        xOffset={0}
        yOffset={24}
      >
        <Fab.Trigger
          className={cn(
            "flex size-14 items-center justify-center rounded-full shadow-lg transition-all",
            "bg-primary text-primary-foreground",
            "hover:scale-105 hover:shadow-xl",
            "focus:outline-primary focus:outline focus:outline-offset-2",
          )}
        >
          <Plus
            className={cn(
              "size-6 transition-transform duration-200",
              open && "rotate-45",
            )}
            aria-hidden
          />
        </Fab.Trigger>
        <Fab.Content
          placement="top"
          offset={12}
          className={cn(
            "border-border bg-background min-w-[12rem] rounded-xl border p-3 shadow-lg",
            "animate-in fade-in-0 zoom-in-95 duration-200",
          )}
        >
          <Fab.Group>
            <Fab.Label
              className="text-muted-foreground mb-2 block text-xs font-semibold tracking-wider uppercase"
              aria-hidden
            >
              Quick actions
            </Fab.Label>
            {quickActions.map(({ icon: Icon, label }) => (
              <Fab.Item
                key={label}
                className={itemStyles}
              >
                <Icon
                  className="size-4 shrink-0"
                  aria-hidden
                />
                {label}
              </Fab.Item>
            ))}
          </Fab.Group>

          <Fab.Separator className="bg-border my-2 h-px" />

          <Fab.Group>
            <Fab.Label
              className="text-muted-foreground mb-2 block text-xs font-semibold tracking-wider uppercase"
              aria-hidden
            >
              View
            </Fab.Label>
            <Fab.RadioGroup
              value={view}
              onValueChange={setView}
            >
              <Fab.RadioItem
                value="list"
                className={itemStyles}
              >
                <List
                  className="size-4 shrink-0"
                  aria-hidden
                />
                List
                <Fab.ItemIndicator className={cn("ml-auto", indicatorStyles)}>
                  <Check
                    className="size-4"
                    aria-hidden
                  />
                </Fab.ItemIndicator>
              </Fab.RadioItem>
              <Fab.RadioItem
                value="grid"
                className={itemStyles}
              >
                <LayoutGrid
                  className="size-4 shrink-0"
                  aria-hidden
                />
                Grid
                <Fab.ItemIndicator className={cn("ml-auto", indicatorStyles)}>
                  <Check
                    className="size-4"
                    aria-hidden
                  />
                </Fab.ItemIndicator>
              </Fab.RadioItem>
            </Fab.RadioGroup>
          </Fab.Group>

          <Fab.Separator className="bg-border my-2 h-px" />

          <Fab.CheckboxItem
            checked={compact}
            onCheckedChange={setCompact}
            className={itemStyles}
          >
            Compact view
            <Fab.ItemIndicator className={cn("ml-auto", indicatorStyles)}>
              <Check
                className="size-4"
                aria-hidden
              />
            </Fab.ItemIndicator>
          </Fab.CheckboxItem>
        </Fab.Content>
      </Fab.Root>
    </div>
  )
}

/* ── Tab Data ──────────────────────────────────────────── */

interface TabData {
  preview: React.ReactNode
  codeTabs: CodeTab[]
  docsHref: string
}

const TAB_DATA: Record<TabID, TabData> = {
  daypicker: {
    preview: <DayPickerPreview />,
    codeTabs: [
      {
        id: "install",
        label: "Install",
        code: "npm install @zenithui/day-picker",
      },
      {
        id: "import",
        label: "Import",
        code: `import { useState } from "react"
import { DayPicker } from "@zenithui/day-picker"
import "@zenithui/day-picker/style.css"

const App = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <DayPicker
      mode="single"
      selected={selectedDate}
      onSelect={setSelectedDate}
    />
  )
}

export default App`,
      },
    ],
    docsHref: "/docs/day-picker/getting-started",
  },
  timepicker: {
    preview: <TimePickerPreview />,
    codeTabs: [
      {
        id: "install",
        label: "Install",
        code: "npm install @zenithui/time-picker",
      },
      {
        id: "import",
        label: "Import",
        code: `import { TimePicker } from "@zenithui/time-picker"

const [time, setTime] = useState<string>("16:13")

<TimePicker
  time={time}
  onTimeChange={(time) => setTime(time)}
  align="center"
  side="right"
/>`,
      },
    ],
    docsHref: "/docs/time-picker/getting-started",
  },
  toast: {
    preview: <ToastPreview />,
    codeTabs: [
      {
        id: "install",
        label: "Install",
        code: "npm install @zenithui/toast",
      },
//       {
//         id: "setup",
//         label: "Setup",
//         code: `// Wrap your app with ToastProvider
// import { ToastProvider } from "@zenithui/toast"

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <ToastProvider>
//       <App />
//     </ToastProvider>
//   </StrictMode>,
// )`,
//       },
      {
        id: "usage",
        label: "Usage",
        code: `import { toast } from "@zenithui/toast"

toast.success("This is a success toast")
toast.info("This is an info toast")
toast.error("This is an error toast")
toast.warning("This is a warning toast")`,
      },
    ],
    docsHref: "/docs/toast/getting-started",
  },
  tooltip: {
    preview: <TooltipPreview />,
    codeTabs: [
      {
        id: "install",
        label: "Install",
        code: "npm install @zenithui/tooltip",
      },
//       {
//         id: "setup",
//         label: "Setup",
//         code: `// Wrap your app with the Tooltip Provider
// import * as TooltipPrimitive from "@zenithui/tooltip"

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <TooltipPrimitive.Provider>
//       <App />
//     </TooltipPrimitive.Provider>
//   </StrictMode>,
// )`,
//       },
      {
        id: "usage",
        label: "Usage",
        code: `import * as TooltipPrimitive from "@zenithui/tooltip"

<TooltipPrimitive.Root>
  <TooltipPrimitive.Trigger asChild>
    <Button variant="outline">Hover</Button>
  </TooltipPrimitive.Trigger>
  <TooltipPrimitive.Content
    side="top"
    animation="fade"
  >
    Add to library
    <TooltipPrimitive.Arrow />
  </TooltipPrimitive.Content>
</TooltipPrimitive.Root>`,
      },
    ],
    docsHref: "/docs/tooltip/getting-started",
  },
  lightbox: {
    preview: <LightBoxPreview />,
    codeTabs: [
      {
        id: "install",
        label: "Install",
        code: "npm install @zenithui/light-box",
      },
      {
        id: "import",
        label: "Usage",
        code: `import { type LightBoxImages, LightBox } from "@zenithui/light-box"

const [open, setOpen] = useState<boolean>(false)
const images: LightBoxImages[] = [
  {
    src: "/my-image.jpg",
    alt: "Image 1",
    caption: "First Image",
  },
]

<Button onClick={() => setOpen(true)}>Open</Button>
<LightBox
  images={images}
  open={open}
  animation="slide"
  onOpenChange={setOpen}
/>`,
      },
    ],
    docsHref: "/docs/light-box/getting-started",
  },
  fab: {
    preview: <FabPreview />,
    codeTabs: [
      {
        id: "install",
        label: "Install",
        code: "npm install @zenithui/fab",
      },
      {
        id: "import",
        label: "Usage",
        code: `import * as Fab from "@zenithui/fab"

<Fab.Root position="bottom-right">
  <Fab.Trigger>+</Fab.Trigger>
  <Fab.Content placement="top">
    <Fab.Group>
      <Fab.Label>Quick actions</Fab.Label>
      <Fab.Item>Share</Fab.Item>
      <Fab.Item>Edit</Fab.Item>
    </Fab.Group>
  </Fab.Content>
</Fab.Root>`,
      },
    ],
    docsHref: "/docs/fab/getting-started",
  },
}

/* ── Main Showcase ─────────────────────────────────────── */

export default function ComponentShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.25 })
  const THEME = useHomeTheme()
  const [activeTab, setActiveTab] = useState<TabID>("daypicker")

  const currentData = TAB_DATA[activeTab]

  console.log(currentData)

  return (
    <section
      className="relative z-10 flex w-full flex-col items-center border-t px-6 py-24"
      style={{
        backgroundColor: THEME.bg.page,
        borderColor: THEME.border.default,
        transition: THEME_TRANSITION,
      }}
    >
      <motion.div
        ref={ref}
        className="mx-auto w-full max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Heading */}
        <motion.div
          className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"
          variants={itemVariants}
        >
          <div>
            <h2
              className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl"
              style={{
                color: THEME.text.primary,
                transition: THEME_TRANSITION,
              }}
            >
              See it. Use it. Ship it.
            </h2>
            <p
              className="max-w-xl text-lg"
              style={{
                color: THEME.text.secondary,
                transition: THEME_TRANSITION,
              }}
            >
              Every component is interactive — try it right here.
            </p>
          </div>
        </motion.div>

        {/* Tab Switcher */}
        <motion.div
          className="mb-8 flex flex-wrap gap-2"
          variants={itemVariants}
        >
          {TABS.map((tab) => (
            <motion.button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="relative cursor-pointer rounded-md px-5 py-2.5 text-sm font-semibold transition-all"
              style={{
                backgroundColor:
                  activeTab === tab.id ? THEME.bg.card : "transparent",
                color:
                  activeTab === tab.id ? THEME.text.primary : THEME.text.muted,
                border: `1px solid ${activeTab === tab.id ? THEME.border.accent : "transparent"}`,
                boxShadow: activeTab === tab.id ? THEME.shadow.glow : "none",
                transition: THEME_TRANSITION,
              }}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="showcaseTabActive"
                  className="mx-auto mt-1 h-0.5 w-full rounded-full"
                  style={{ backgroundColor: THEME.accent.primary }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Preview Area */}
        <AnimatePresence mode="wait">
          <motion.div
            className="relative min-h-[500px]"
            variants={itemVariants}
          >
            <ComponentPreviewCard
              key={activeTab}
              activeTabId={activeTab}
              component={currentData.preview}
              codeTabs={currentData.codeTabs}
              docsHref={currentData.docsHref}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
