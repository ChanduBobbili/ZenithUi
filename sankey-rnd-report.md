**R&D REPORT**

**React Sankey Chart Component**

Open-Source Implementation Research

Version 1.0 | April 2026

Prepared for Open-Source Publication

# **1\. Executive Summary**

Sankey charts are specialized flow diagrams that visually communicate how quantities move through interconnected stages or categories. Named after Captain Matthew Henry Phineas Riall Sankey, who in 1898 used such a diagram to depict the energy losses in a steam engine, these charts have become indispensable in modern data visualization for their ability to show proportional flows at a glance.

Today, Sankey diagrams are widely used in energy auditing, financial analysis, supply-chain tracking, user-journey analytics (e.g., Google Analytics funnel views), budget allocation reporting, and network traffic visualization. Their core value proposition is communicating both the path of flow and its magnitude simultaneously.

Despite this widespread utility, the React ecosystem lacks a fully open-source, framework-agnostic, production-ready Sankey component that (a) requires no commercial license, (b) ships with full TypeScript support, (c) provides rich interactivity, and (d) is designed for composability and theming. The three leading React charting ecosystems - MUI X Charts Pro, AG Charts, and React Google Charts - each gate their Sankey implementation behind either a commercial license or a proprietary rendering engine with external dependencies.

This report documents the comprehensive technical research required to design and build a first-class, MIT-licensed React Sankey Chart component. It analyzes the three reference implementations in depth, surveys the underlying algorithms and libraries, defines a detailed feature set, proposes a concrete technical architecture, and outlines a phased implementation roadmap.

Key recommendation: Build on d3-sankey for layout computation with a pure React+SVG rendering layer, exposing a composable, TypeScript-first API modeled on the best patterns observed in MUI X Charts Pro's Sankey implementation.

# **2\. Technical Research**

## **2.1 What is a Sankey Chart?**

A Sankey chart is a directed graph where nodes represent entities (states, categories, processes) and links represent the flow of some quantity between those entities. Three invariants define it:

- Nodes are rendered as rectangles whose height is proportional to total flow passing through them.
- Links are rendered as curved bands (Bézier paths) whose width is proportional to the flow value they carry.
- The horizontal position of a node encodes its depth (column) in the directed acyclic graph (DAG); time or process stage typically reads left-to-right.

Each node accumulates two sets of links: incoming (targetLinks) and outgoing (sourceLinks). The node's rendered height equals max(sum of incoming values, sum of outgoing values). Links connect a node's right edge to another node's left edge via a smooth cubic Bézier curve.

## **2.2 Key Algorithms**

### **DAG Layout & Columnization**

The first step is assigning each node to a horizontal column (layer). D3-sankey implements four strategies:

- sankeyLeft - node depth equals its BFS depth from source nodes.
- sankeyRight - node depth equals its reverse BFS depth from sink nodes.
- sankeyCenter - nodes with no incoming links use left alignment; others use a weighted average of source depths.
- sankeyJustify (default) - like sankeyLeft, but sink nodes (no outgoing links) are pushed to the rightmost column.

The MUI X Charts Pro documentation explicitly exposes this as the alignment prop with values 'left', 'right', 'center', and 'justify'. AG Charts exposes it as node.alignment with identical semantics.

### **Vertical Position Relaxation**

After columnar assignment, nodes within each column must be ordered vertically to minimize link crossings. D3-sankey uses an iterative relaxation algorithm with a configurable number of passes (iterations prop in MUI X, defaulting to 32). Each pass alternates between:

- Top-down pass - sorts nodes by their weighted average source y-coordinate.
- Bottom-up pass - sorts nodes by their weighted average target y-coordinate.

After each pass, a collision resolution step pushes overlapping nodes apart. More iterations trade computation time for a cleaner layout. MUI exposes this directly as the iterations prop on the series.

### **Link Path Rendering**

Links are rendered as SVG &lt;path&gt; elements using the d3.sankeyLinkHorizontal() generator, which produces a cubic Bézier path with horizontal tangents at both endpoints. The control points are placed at x = (x_source + x_target) / 2, creating the characteristic S-curve. MUI X provides a curveCorrection prop that shifts the control-point x-coordinate to adjust visual thickness perception.

### **Cycle Detection**

Standard Sankey layout requires a DAG (no cycles). All three surveyed implementations handle cycles by detection and removal. Nivo's documentation explicitly warns: 'something like A → A or A → B → C → A will crash.' AG Charts documentation states that 'links forming a circular loop will be removed.' A production implementation should detect cycles using DFS (depth-first search) with a visited + recursion-stack marker and either remove offending links or raise a descriptive error.

## **2.3 Key JavaScript/TypeScript Libraries**

| **Library**         | **Version** | **License** | **Bundle (min)** | **Notes**                                                                                                       |
| ------------------- | ----------- | ----------- | ---------------- | --------------------------------------------------------------------------------------------------------------- |
| d3-sankey           | 0.12.3      | BSD-3       | ~18 KB           | Gold-standard layout engine. Used under the hood by Nivo, Google Charts, and MUI X. Pure layout - no rendering. |
| @nivo/sankey        | 0.88+       | MIT         | ~85 KB           | Full React component. SVG-based. d3-sankey layout + react-spring animations. Server-side rendering capable.     |
| recharts Sankey     | 2.x         | MIT         | ~70 KB           | Part of Recharts. Index-based node references (0,1,2…). Limited customization compared to nivo.                 |
| plotly.js Sankey    | 2.x         | MIT         | ~3.5 MB          | Powerful but enormous bundle. Supports draggable nodes and multi-level display. Canvas + SVG hybrid.            |
| visx / @visx/sankey | 3.x         | MIT         | ~12 KB           | Airbnb primitives. Very low-level - layout only, no built-in rendering or styling.                              |
| ECharts Sankey      | 5.x         | Apache 2.0  | ~900 KB          | Canvas-based. Full-featured including drag, zoom. Own layout engine independent of d3-sankey.                   |

# **3\. Competitive Analysis of Reference Implementations**

## **3.1 MUI X Charts Pro - SankeyChart**

Source: <https://mui.com/x/react-charts/sankey/> | License: MUI X Pro (commercial)

### **Architecture & Component Structure**

MUI X Charts Pro implements the Sankey chart using a layered, composable architecture. The top-level &lt;SankeyChart /&gt; is a convenience wrapper that composes the following primitives:

&lt;SankeyDataProvider series={series}&gt;

&lt;ChartsWrapper&gt;

&lt;ChartsSurface&gt;

&lt;SankeyLinkPlot onClick={onLinkClick} /&gt;

&lt;SankeyNodePlot onClick={onNodeClick} /&gt;

&lt;SankeyLinkLabelPlot /&gt;

&lt;SankeyNodeLabelPlot /&gt;

&lt;FocusedSankeyNode /&gt;

&lt;FocusedSankeyLink /&gt;

&lt;ChartsOverlay /&gt;

&lt;/ChartsSurface&gt;

&lt;ChartsTooltip trigger='item' /&gt;

&lt;/ChartsWrapper&gt;

&lt;/SankeyDataProvider&gt;

This composition pattern gives advanced users full control over rendering layers while providing a simple one-component API for typical use cases. The SankeyDataProvider uses React context to distribute layout state, following the same pattern as other MUI X chart types.

### **API Design & Data Input**

Data is passed through a series prop using a typed object structure:

// Minimal usage - nodes created automatically

<SankeyChart

height={400}

series={{

data: {

links: \[

{ source: 'A', target: 'B', value: 10 },

{ source: 'A', target: 'C', value: 5 },

\],

},

nodeOptions: {

color: '#1976d2', width: 15, padding: 10,

showLabels: true,

highlight: 'links', fade: 'global',

sort: 'auto', // or 'fixed' or custom compareFn

},

linkOptions: {

color: 'source', // 'source' | 'target' | hex

opacity: 0.6,

showValues: true,

curveCorrection: 10,

sort: 'auto',

},

iterations: 32,

valueFormatter: (val, ctx) =>

ctx.location === 'tooltip' ? \`\${val}B USD\` : \`\${val}\`,

}}

/>

Node IDs can be strings or numbers. If a node appears only in links (not in the nodes array), it is auto-created with its ID as label - an excellent ergonomic DX feature.

### **Rendering Approach**

Pure SVG rendered by React. No d3 DOM manipulation - d3-sankey is used only for layout computation (computing x0, x1, y0, y1 for nodes and y0, y1, width for links). React then renders &lt;rect&gt; elements for nodes and &lt;path&gt; elements for links.

### **Customization Capabilities**

- Per-node and per-link colors, including 'source' and 'target' keywords for link color inheritance.
- nodeOptions.highlight controls what gets highlighted on hover: 'nodes', 'links', 'incoming', 'outgoing', or 'none'.
- Controlled highlighting via highlightedItem + onHighlightChange props (useful for synchronized dashboards).
- Custom valueFormatter for tooltip and label display.
- Slot-based tooltip customization: import { SankeyTooltip, SankeyTooltipContent } from '@mui/x-charts-pro/SankeyChart'.
- Node and link sorting via 'auto', 'fixed', or custom comparator function.
- Four alignment algorithms: left, right, center, justify.

### **TypeScript Support**

Fully typed with exported types: SankeyNodeIdentifier, SankeyLinkIdentifier, SankeyNodeIdentifierWithData, SankeyLinkIdentifierWithData, SankeyItemIdentifierWithData. Module augmentation for MUI theme integration is documented.

### **Accessibility**

Inherits MUI X Charts accessibility infrastructure. FocusedSankeyNode and FocusedSankeyLink subcomponents provide keyboard focus management. SVG role='img' with aria-label support. Part of the broader MUI X accessibility initiative.

### **License & Maintenance**

MUI X Pro license - commercial, per-developer seat pricing. The Sankey chart specifically is listed as a Pro feature. Very actively maintained (v9.0.2 as of Q1 2026, with v9 released alongside Material UI v9). The SankeyChart classes were refactored as recently as April 2026 (PR #21654), indicating active development.

### **Strengths & Weaknesses**

| **Strengths**                            | **Weaknesses**                                  |
| ---------------------------------------- | ----------------------------------------------- |
| Best-in-class composable architecture    | Requires commercial MUI X Pro license           |
| Controlled highlighting system is unique | Requires @mui/material peer dependency          |
| Excellent TypeScript definitions         | Cannot be used standalone outside MUI ecosystem |
| Auto-node creation from link data        | No drag-and-drop node repositioning             |
| curveCorrection prop for visual tuning   | No canvas fallback for large datasets           |

## **3.2 AG Charts - Sankey Series**

Source: <https://www.ag-grid.com/charts/react/sankey-series/> | License: AG Charts Enterprise (commercial)

### **Architecture & Component Structure**

AG Charts uses a framework-agnostic, options-object pattern rather than a component hierarchy. The chart is initialized via a &lt;AgCharts options={options} /&gt; React wrapper, where all configuration lives in a plain JavaScript options object. There are no composable subcomponents - all customization is data-driven through the options API.

import { AgCharts } from 'ag-charts-react';

import { AgChartsEnterpriseModule, SankeyModule } from 'ag-charts-enterprise';

AgChartsEnterpriseModule.with(SankeyModule);

const options = {

data: \[

{ from: 'A', to: 'B', size: 10 },

{ from: 'A', to: 'C', size: 5 },

\],

series: \[{

type: 'sankey',

fromKey: 'from',

toKey: 'to',

sizeKey: 'size',

node: {

alignment: 'justify', // left | right | center | justify

verticalAlignment: 'top', // top | bottom | center

sort: 'auto', // data | ascending | descending | auto

fill: '#34495e',

stroke: '#2c3e50',

strokeWidth: 2,

},

link: {

fill: '#34495e',

fillOpacity: 0.25,

stroke: '#2c3e50',

strokeWidth: 1,

},

}\],

};

### **Rendering Approach**

AG Charts is a fully canvas-based rendering engine with no third-party dependencies. The entire chart, including Sankey nodes and links, is rendered on an HTML5 Canvas element. This delivers outstanding frame rates for animations and large datasets, but means accessibility and print quality require additional workarounds (AG Charts includes an aria-hidden fallback SVG overlay for accessibility).

The canvas approach also means that React reconciliation does not apply to chart internals. The options object change triggers AG Charts' internal diff algorithm to efficiently update the canvas.

### **Customization Capabilities**

- node.alignment: left, right, center, justify.
- node.verticalAlignment: top, bottom, center.
- node.sort: data, ascending, descending, auto (v12.3.0 added improved auto sort).
- Label placement: left, right, center, with edgePlacement for first/last nodes.
- Per-node and per-link fill, stroke, fillOpacity, strokeOpacity, strokeWidth.
- v12.3.0 (October 2025) added improved Sankey layout algorithm and new layout options.

### **TypeScript Support**

Full TypeScript support via exported AgSankeySeriesOptions interface. The options-object API maps cleanly to TypeScript interfaces. All series types are discriminated union members of AgChartOptions.

### **Accessibility**

AG Charts has dedicated accessibility documentation. The canvas renderer is supplemented with aria attributes. Since Sankey is an Enterprise feature, accessibility documentation applies but may not be as deep as the Community chart types.

### **License & Maintenance**

AG Charts Enterprise license - commercial. AG Charts Community (MIT) does not include Sankey. The Enterprise package (ag-charts-enterprise) is available on npm but requires a valid license key in production. Actively maintained: v12.3 released October 2025 with Sankey-specific layout improvements. No watermarks during trial/development.

### **Strengths & Weaknesses**

| **Strengths**                                                       | **Weaknesses**                                                      |
| ------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 60+ FPS canvas rendering, ideal for large data                      | Commercial license required for Sankey                              |
| No third-party dependencies at all                                  | Canvas-based: harder to customize individual elements via CSS       |
| Framework-agnostic options API (works with Vue, Angular)            | No composable subcomponent pattern                                  |
| Data-key-based config (fromKey/toKey/sizeKey) is flexible           | Harder to integrate custom React components (e.g., custom tooltips) |
| Vertically alignment option (top/bottom/center) unique to AG Charts | SSR/print quality requires extra effort with canvas                 |

## **3.3 RakanNimer/react-google-charts**

Source: <https://github.com/RakanNimer/react-google-charts> | License: MIT (wrapper); Google Charts: Apache 2.0

### **Architecture & Component Structure**

react-google-charts is a thin React wrapper around Google's proprietary visualization library, which is loaded asynchronously from Google's CDN. The entire chart rendering, layout computation, and interaction handling is delegated to the google.visualization.Sankey class. The React layer only handles:

- Loading google.charts script asynchronously (via useEffect with dynamic script injection).
- Marshaling React props into a Google Visualization DataTable.
- Forwarding events (select, ready, error) via callbacks.

import { Chart } from 'react-google-charts';

const data = \[

\['From', 'To', 'Weight'\],

\['Brazil', 'Portugal', 5\],

\['Brazil', 'France', 1\],

\['Canada', 'Portugal', 1\],

\['USA', 'England', 5\],

\];

const options = {

sankey: {

node: {

width: 30,

nodePadding: 80,

label: { fontSize: 16 },

interactivity: true,

colors: \['#a6cee3', '#b2df8a'\],

},

link: {

color: {

fill: '#d3d3d3',

fillOpacity: 0.6,

stroke: 'none',

},

},

},

};

<Chart

chartType='Sankey'

data={data}

width='100%'

height='400px'

options={options}

/>

Data format uses a 2D array - the first row is headers \['From', 'To', 'Weight'\] and subsequent rows are link definitions. Node objects are not directly declarable; node colors are set as an array mapping to node index order.

### **Rendering Approach**

Google Charts renders Sankey diagrams as SVG (falling back to VML for legacy IE). The layout algorithm is derived from d3-sankey (as documented by Google). Rendering is entirely opaque to the React developer - the SVG DOM is owned and managed by the Google Charts library, not React.

### **Customization Capabilities**

- sankey.node.colors - array of hex colors in node-index order.
- sankey.node.label - font styling (fontName, fontSize, color, bold, italic).
- sankey.node.nodePadding, sankey.node.width - layout dimensions.
- sankey.link.color.fill / fillOpacity - link styling.
- sankey.link.colorMode - 'unique', 'gradient', 'source', or 'target'.

Customization is more limited than MUI X or AG Charts. Because rendering is delegated, advanced customizations like custom SVG overlays or custom tooltip React components are not possible.

### **TypeScript Support**

The wrapper exports ChartWrapperOptions with partial Google Charts option typings. However, as shown in GitHub issue #378, some options (e.g., fillOpacity) are typed but don't work as expected - a common problem with wrappers around external APIs that change independently. TypeScript coverage is partial and community-maintained.

### **Accessibility**

Accessibility is entirely at Google Charts' discretion. Google Charts SVG output is generally not screen-reader-friendly. No ARIA landmark roles or keyboard navigation are exposed through the react-google-charts wrapper.

### **Bundle Size & Performance**

The npm package itself is tiny (~15 KB min+gzip). However, it loads a ~200 KB Google Charts JavaScript bundle from an external CDN at runtime. This creates: a hard dependency on network connectivity, a privacy/GDPR concern (data is rendered client-side but scripts come from Google), and a rendering delay on first load. No offline or SSR support.

### **License & Maintenance**

The wrapper is MIT-licensed with ~1.7k GitHub stars and ~341 forks. Last stable release was v5.2.1 in October 2024. The underlying Google Charts API is Apache 2.0 but is closed-source and controlled entirely by Google. The latest release was 18 months ago as of April 2026, with 89 open issues and only 5 open PRs - maintenance is slow.

### **Strengths & Weaknesses**

| **Strengths**                             | **Weaknesses**                               |
| ----------------------------------------- | -------------------------------------------- |
| Tiny npm bundle (~15 KB)                  | Loads ~200 KB from Google CDN at runtime     |
| Simplest data format (2D array)           | No offline/SSR support                       |
| Free, MIT wrapper over Apache 2.0 engine  | Opaque rendering - no React component access |
| Low barrier to entry for simple use cases | Slow maintenance, 89 open issues             |
| Handles multilevel Sankeys automatically  | Poor TypeScript coverage, GDPR concerns      |

## **3.4 Comprehensive Comparison Table**

| **Criterion**  | **MUI X Charts Pro**       | **AG Charts Enterprise**             | **React Google Charts**      |
| -------------- | -------------------------- | ------------------------------------ | ---------------------------- |
| License        | MUI X Pro (commercial)     | AG Enterprise (commercial)           | MIT + Apache 2.0 (free)      |
| Rendering      | SVG (React-rendered)       | Canvas (60+ FPS)                     | SVG (Google-owned)           |
| Architecture   | Composable subcomponents   | Options-object pattern               | Thin wrapper / delegation    |
| TypeScript     | Excellent (exported types) | Excellent (interfaces)               | Partial (community)          |
| Data format    | {nodes\[\], links\[\]}     | flat data + fromKey/toKey            | 2D array \[\[from,to,val\]\] |
| Animations     | Via MUI animation system   | Built-in (Enterprise)                | Via Google Charts only       |
| Node alignment | left/right/center/justify  | left/right/center/justify + vertical | Auto only                    |
| Highlighting   | Controlled + hover (rich)  | Series highlighting                  | Basic hover via Google       |
| Accessibility  | Keyboard focus components  | Canvas + ARIA overlay                | Minimal / Google-defined     |
| SSR support    | Yes (SVG)                  | Limited (canvas)                     | No (CDN dependency)          |
| Theming        | MUI theme integration      | AG Charts themes                     | None (Google-controlled)     |
| Maintenance    | Very active (v9, 2026)     | Very active (v12.3, 2025)            | Slow (v5.2.1, Oct 2024)      |

# **4\. Feature Requirements for Open-Source React Component**

## **4.1 Essential Features (MVP)**

- Basic Sankey rendering - nodes as rectangles, links as cubic Bézier paths.
- Data binding - accept nodes\[\] + links\[\] data structure. Auto-create nodes from link data.
- Node alignment - left, right, center, justify strategies (matching d3-sankey API).
- Link coloring - solid color, 'source', 'target' color inheritance modes.
- Basic labels - display node label inside or beside node rectangle.
- Responsive sizing - auto-resize to container via ResizeObserver.
- Click events - onNodeClick, onLinkClick callbacks.
- Tooltip - default tooltip showing node/link name and value.
- TypeScript - full type definitions exported from the package.
- Cycle detection - graceful handling (remove cycles, emit warning).

## **4.2 Desirable Features (Phase 2)**

- Animations - entry animations using CSS transitions or react-spring for node/link appearance.
- Hover highlighting - configurable highlight behavior (highlight connected links, source, target).
- Controlled highlighting - highlightedItem + onHighlightChange for dashboard synchronization.
- Value formatting - valueFormatter(value, context) callback for custom number display.
- Node and link sorting - 'auto', 'fixed', or custom comparator function.
- curveCorrection - adjust Bézier control point offset for visual tuning.
- Theming - CSS custom properties and dark mode support.
- Custom tooltip - slot-based replacement of the default tooltip component.
- Layout iterations - configurable iteration count for layout algorithm.

## **4.3 Advanced Features (Phase 3)**

- Draggable nodes - allow users to manually reposition nodes vertically.
- Zoom and pan - pinch-to-zoom and drag-to-pan for large diagrams.
- Canvas fallback - opt-in canvas rendering for datasets with 500+ nodes.
- Server-side rendering - full compatibility with Next.js App Router and Remix.
- Data aggregation helpers - utility functions to group/collapse nodes.
- Custom node renderer - replace default &lt;rect&gt; with custom React component.
- Export - PNG/SVG export utility.
- Vertical orientation - support top-to-bottom flow direction.

## **4.4 Accessibility & Internationalization**

- WCAG 2.2 AA compliance: SVG role='img' with descriptive aria-label.
- Keyboard navigation: Tab through nodes and links; Enter/Space to select.
- Focus ring visible on nodes and links (FocusedSankeyNode/Link components).
- Screen reader support: aria-labelledby on tooltip, descriptive text alternatives.
- RTL layout support: horizontal mirroring for right-to-left locales.
- i18n: number formatting via Intl.NumberFormat, locale-aware value formatters.
- Reduced motion: respect prefers-reduced-motion media query.

# **5\. Technical Architecture Recommendations**

## **5.1 Rendering Approach: SVG (Recommended)**

Recommendation: React-rendered SVG, using d3-sankey only for layout computation.

Justification: SVG is the correct choice for an open-source MIT library targeting the broadest possible use case:

- Accessibility: SVG elements can receive ARIA attributes, tab focus, and screen-reader text natively. Canvas requires a separate accessibility layer that adds complexity.
- CSS & theming: SVG elements can be styled via CSS custom properties and stylesheet overrides. This enables seamless dark mode, Design System integration, and user customization.
- SSR compatibility: SVG markup can be rendered on the server (Next.js, Remix) without browser APIs. Canvas requires shimming.
- Composability: Individual SVG elements (&lt;rect&gt;, &lt;path&gt;) are React components. Developers can slot in custom components (e.g., custom node shapes) at any layer.
- Print quality: SVG scales to any resolution. Canvas captures at screen DPI.

For the 99% of Sankey use cases (up to ~500 nodes), SVG performance is sufficient. For very large datasets, a canvas fallback can be added as a Phase 3 opt-in. MUI X Charts Pro validates this approach - it ships SVG-based Sankey in production for enterprise customers.

## **5.2 State Management Strategy**

// Recommended: Context for layout state, props for config

// 1. SankeyDataContext - holds computed layout (nodes with x0/y0/x1/y1,

// links with y0/y1/width). Computed once per data/size change.

// 2. SankeyInteractionContext - holds highlightedItem, hoveredItem.

// Allows FocusedSankeyNode and SankeyTooltip to read state

// without prop-drilling.

// 3. SankeyConfigContext - holds nodeOptions, linkOptions, valueFormatter.

// Shallow-equal comparison to avoid unnecessary layout recomputation.

// Layout is computed via useMemo:

const layout = useMemo(() => {

const generator = sankey()

.nodeWidth(nodeOptions.width ?? 15)

.nodePadding(nodeOptions.padding ?? 8)

.nodeAlign(alignmentMap\[nodeOptions.alignment ?? 'justify'\])

.extent(\[\[0, 0\], \[width, height\]\])

.iterations(iterations ?? 32);

return generator({ nodes: parsedNodes, links: parsedLinks });

}, \[data, width, height, nodeOptions, iterations\]);

## **5.3 Recommended Data Input Schema**

// Core input types

interface SankeyNode {

id: string | number;

label?: string;

color?: string;

// extensible via generics: SankeyNode&lt;TData = unknown&gt;

}

interface SankeyLink {

source: string | number; // node id

target: string | number; // node id

value: number;

color?: string; // overrides link-level default

label?: string; // shown on link if showValues=true

}

interface SankeyData {

nodes?: SankeyNode\[\]; // optional - auto-created from links

links: SankeyLink\[\];

}

// Node & link options

interface SankeyNodeOptions {

width?: number; // px, default 15

padding?: number; // px, default 8

color?: string; // default color for all nodes

alignment?: 'left'|'right'|'center'|'justify';

highlight?: 'nodes'|'links'|'incoming'|'outgoing'|'none';

fade?: 'global'|'none';

sort?: 'auto'|'fixed'|((a: SankeyLayoutNode, b: SankeyLayoutNode) => number);

showLabels?: boolean;

}

interface SankeyLinkOptions {

color?: string | 'source' | 'target';

opacity?: number;

curveCorrection?: number;

showValues?: boolean;

highlight?: 'links'|'nodes'|'source'|'target'|'none';

fade?: 'global'|'none';

sort?: 'auto'|'fixed'|((a: SankeyLayoutLink, b: SankeyLayoutLink) => number);

}

// Top-level component props

interface SankeyChartProps {

data: SankeyData;

width?: number | string; // default '100%'

height: number;

nodeOptions?: SankeyNodeOptions;

linkOptions?: SankeyLinkOptions;

iterations?: number;

valueFormatter?: (value: number, context: SankeyValueContext) => string;

onNodeClick?: (event: React.MouseEvent, node: SankeyLayoutNode) => void;

onLinkClick?: (event: React.MouseEvent, link: SankeyLayoutLink) => void;

highlightedItem?: SankeyNodeIdentifier | SankeyLinkIdentifier | null;

onHighlightChange?: (item: SankeyItemIdentifier | null) => void;

tooltip?: React.ComponentType&lt;SankeyTooltipProps&gt; | false;

className?: string;

style?: React.CSSProperties;

'aria-label'?: string;

}

## **5.4 Theming System**

Use CSS custom properties as the theming mechanism. This provides framework-agnostic theming that works with any CSS-in-JS solution, Tailwind, or plain CSS:

/\* Default theme (light mode) \*/

.sankey-chart {

\--sankey-node-color: #1976d2;

\--sankey-node-hover-opacity: 1;

\--sankey-node-fade-opacity: 0.15;

\--sankey-link-color: #90a4ae;

\--sankey-link-opacity: 0.5;

\--sankey-link-hover-opacity: 0.8;

\--sankey-link-fade-opacity: 0.05;

\--sankey-label-color: #333;

\--sankey-label-font-size: 12px;

\--sankey-tooltip-bg: #fff;

\--sankey-tooltip-border: #e0e0e0;

}

/\* Dark mode - auto via prefers-color-scheme \*/

@media (prefers-color-scheme: dark) {

.sankey-chart {

\--sankey-label-color: #e0e0e0;

\--sankey-tooltip-bg: #1e1e1e;

\--sankey-tooltip-border: #444;

}

}

## **5.5 Bundle Size Optimization**

- Tree-shakeable ESM exports: export each subcomponent individually so unused features are dropped.
- Use d3-sankey (18 KB) as the only layout dependency - do not import all of d3.
- Optional animation: import react-spring as a peer/optional dep; ship a static variant by default.
- Code-split the tooltip: lazy-load the tooltip portal to keep initial bundle tight.
- Target: < 25 KB min+gzip for the core SankeyChart component with d3-sankey included.
- Publish both CJS and ESM builds. Use package.json exports map for correct tree-shaking.

# **6\. Implementation Roadmap**

## **Phase 1: MVP (Weeks 1-4)**

Goal: A working, published npm package with core Sankey rendering and basic interactivity.

- Project scaffolding: Vite library build, TypeScript, ESLint, Prettier, Vitest, Storybook.
- Data parsing layer: Parse nodes+links input; auto-create missing nodes; cycle detection with console.warn.
- Layout engine integration: Wrap d3-sankey in a useSankeyLayout() hook with memoization.
- SankeyNodePlot: Render &lt;rect&gt; elements for each node with color and label.
- SankeyLinkPlot: Render &lt;path&gt; elements using sankeyLinkHorizontal() with configurable opacity.
- Responsive container: useResizeObserver hook for auto-sizing.
- Click events: onNodeClick / onLinkClick with typed event objects.
- Basic tooltip: Portal-based HTML tooltip triggered on hover.
- TypeScript types: Export all public interfaces and type aliases.
- Initial documentation: README with installation, quickstart, and API reference.
- CI/CD: GitHub Actions for lint, test, and npm publish on tag.

## **Phase 2: Enhanced Customization & Interactivity (Weeks 5-10)**

Goal: Feature parity with the best open-source aspects of MUI X's Sankey, fully accessible.

- Composable architecture: Extract SankeyDataProvider, SankeyNodePlot, SankeyLinkPlot, SankeyNodeLabelPlot as individual exports.
- Controlled highlighting: highlightedItem + onHighlightChange props; highlight/fade states for nodes and links.
- Rich highlighting modes: 'nodes', 'links', 'incoming', 'outgoing', 'source', 'target', 'none'.
- Slot-based tooltip: Accept custom React component via tooltip prop.
- Value formatter: valueFormatter callback with context object.
- Sorting: node/link sort options ('auto', 'fixed', custom comparator).
- curveCorrection: Adjustable Bézier control point offset.
- CSS custom property theming + dark mode support.
- Accessibility: ARIA roles, keyboard Tab/Enter navigation, FocusedSankeyNode/Link.
- Link color modes: 'source', 'target', gradient, solid.
- Animations: CSS transition-based entry animations (no hard dep on react-spring).
- Testing: 80%+ unit test coverage; Storybook interaction tests.

## **Phase 3: Performance & Advanced Features (Weeks 11-16)**

Goal: Production-hardened component suitable for complex enterprise dashboards.

- Draggable nodes: Allow vertical drag-repositioning with re-layout on drop.
- Canvas fallback: Opt-in CanvasSankeyChart for datasets with 500+ nodes.
- Zoom and pan: Controlled zoom via SVG viewBox manipulation.
- Export utility: exportSankeyAsSVG() and exportSankeyAsPNG() helper functions.
- Vertical orientation: top-to-bottom flow direction via transform prop.
- SSR hardening: Verify full compatibility with Next.js 15 App Router and Remix.
- Performance audit: Benchmark with 100, 250, 500 node datasets; memoize aggressively.
- Data aggregation utilities: groupNodes(), collapseLayer() helper functions.
- RTL support: CSS logical properties and horizontal mirroring.
- Storybook: Full interactive documentation with live prop editors.
- Contribution guide + detailed architecture docs for open-source maintainability.

# **7\. Risks and Mitigations**

| **Risk**              | **Description**                                                                                                                        | **Mitigation**                                                                                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Layout complexity     | d3-sankey's relaxation algorithm can produce poor results with unusual data shapes or very large graphs.                               | Expose the iterations prop (default 32, max 128). Document known edge cases. Provide a fixedValue option per node to override auto-sizing.                      |
| Cycle handling        | Cyclic data (A→B→C→A) will crash d3-sankey with no useful error message.                                                               | Implement DFS cycle detection before passing data to d3-sankey. Emit descriptive console.error with the cycle path. Remove cyclic links and continue rendering. |
| Performance at scale  | Graphs with 500+ nodes and 1000+ links may cause jank during hover (many SVG hit tests) and layout recomputation.                      | Use pointer-events on link paths only (not nodes in hover-zone). Debounce highlight state updates. Phase 3: canvas fallback for large datasets.                 |
| React version compat  | React 18 concurrent mode and React 19 changes may affect how the layout hook interacts with Suspense and StrictMode double-invocation. | Declare peer dep as react >= 17. Test against React 17, 18, and 19. Use useMemo (not useEffect) for layout - pure functions are concurrent-safe.                |
| d3-sankey maintenance | d3-sankey v0.12 has not been updated since 2018. It depends on older d3 modules.                                                       | Vendor the relevant d3-sankey source (MIT license allows this) with TypeScript types. This eliminates the external dep risk and allows layout customization.    |
| Tooltip portaling     | Custom tooltip portal may conflict with z-index stacking or CSS containment in some host apps.                                         | Use document.body as default portal target. Accept a container prop. Use CSS inert attribute to prevent focus trapping.                                         |
| Bundle size creep     | Feature additions in Phase 2-3 may push bundle above the 25 KB target.                                                                 | Add size-limit CI check (e.g., size-limit npm package). Gate each Phase 2+ feature as an optional import. Tree-shake animations behind a separate import path.  |

# **8\. Conclusion and Recommendation**

## **8.1 Summary of Findings**

The competitive analysis reveals a clear gap in the React ecosystem: no MIT-licensed, fully-featured, composable Sankey chart component exists. The three analyzed implementations either require commercial licenses (MUI X Pro, AG Charts Enterprise) or delegate rendering to an external CDN (react-google-charts), making them unsuitable as building blocks for open-source products.

From a technical perspective, the field has converged on d3-sankey as the de facto layout engine, and the React ecosystem has validated SVG-based rendering as the right approach for interactive, accessible data visualization.

## **8.2 Recommended Architecture**

Architecture: React + SVG rendering | Layout: d3-sankey (vendored) | API: MUI X-inspired composable patterns | Styling: CSS custom properties

The recommended implementation adopts the following concrete decisions:

- Layout engine: Vendor d3-sankey source (under MIT) as an internal module. Eliminates external dependency risk and enables TypeScript typing improvements.
- Rendering: React-rendered SVG. D3 is used only for math (layout computation), never for DOM manipulation.
- API design: Model the series+nodeOptions+linkOptions structure closely on MUI X Charts Pro - it is the most thoughtful React-native API of the three. The auto-node-creation feature is a high-value DX win to replicate.
- Composability: Export both a convenience SankeyChart component and individual primitives (SankeyDataProvider, SankeyNodePlot, SankeyLinkPlot, etc.) modeled on MUI X's composition pattern.
- Data format: The {nodes?, links\[\]} object structure is superior to AG Charts' flat array (requires key mapping) and react-google-charts' 2D array (hard to type). String IDs are more ergonomic than numeric indices.
- Highlighting: Implement MUI X's controlled highlighting pattern (highlightedItem + onHighlightChange). This unique feature enables dashboard synchronization and is absent from all MIT-licensed alternatives.
- Link colors: Implement 'source', 'target', and gradient modes as observed in both MUI X and AG Charts. The curveCorrection prop from MUI X is a high-value visual tuning feature.
- Accessibility: Target WCAG 2.2 AA. Implement keyboard navigation and FocusedSankeyNode/Link pattern from MUI X.
- Theming: CSS custom properties for maximum compatibility with any CSS framework.

## **8.3 Differentiating Features vs. Existing Open-Source**

Relative to the existing MIT-licensed options (Nivo @nivo/sankey, Recharts Sankey), the new component should differentiate on:

- Controlled highlighting API - not present in Nivo or Recharts.
- Auto-node creation from link data - cleaner DX than Recharts' index-based node references.
- CSS custom property theming - Nivo uses an internal theme object; CSS vars are more interoperable.
- Composable subcomponent exports - Nivo and Recharts expose a single monolithic component.
- Better TypeScript coverage - Recharts Sankey types are partial; this component targets 100% type coverage.
- Full SSR support verified against Next.js 15 App Router - Nivo has historical SSR issues.

## **8.4 Final Statement**

There is a clear and justified motivation to build a new MIT-licensed React Sankey chart component. The technical path is well-validated by the three reference implementations: d3-sankey for layout, React SVG for rendering, and MUI X Charts Pro's composable architecture as the API blueprint. A 16-week phased implementation as described in Section 6 will yield a component ready for production open-source use.

# **Appendix: Reference Links & Further Reading**

- MUI X Charts Pro Sankey: <https://mui.com/x/react-charts/sankey/>
- AG Charts React Sankey: <https://www.ag-grid.com/charts/react/sankey-series/>
- react-google-charts GitHub: <https://github.com/RakanNimer/react-google-charts>
- d3-sankey GitHub: <https://github.com/d3/d3-sankey>
- Google Charts Sankey API: <https://developers.google.com/chart/interactive/docs/gallery/sankey>
- Nivo Sankey: <https://nivo.rocks/sankey/>
- Recharts Sankey API: <https://recharts.github.io/en-US/api/Sankey/>
- KendoReact Sankey Accessibility: <https://www.telerik.com/kendo-react-ui/components/charts/sankey/accessibility/wai-aria-support>
- React Graph Gallery - Sankey Tutorial: <https://www.react-graph-gallery.com/sankey-diagram>
- AG Charts 12.3 Sankey Improvements: <https://blog.ag-grid.com/whats-new-in-ag-charts-12-3/>
