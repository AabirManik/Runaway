import { integrationCards, integrationTiles } from '../../data/landing'
import {
  ArrowRight,
  GlyphMore,
  GlyphSocial,
  GlyphText,
  GlyphVideo,
  IconGrid,
  IconShield,
  IconSliders,
} from '../ui/Icons'
import Reveal from '../ui/Reveal'
import { MockCalendarMonth } from './mockups'

const TILE_GLYPHS = {
  social: GlyphSocial,
  video: GlyphVideo,
  text: GlyphText,
  more: GlyphMore,
}

/* reference palette for the four generic tiles — deliberately brand-free */
const TILE_BG = {
  social: 'bg-accent',
  video: 'bg-coral',
  text: 'bg-sky',
  more: 'bg-lilac',
}

const CARD_ICONS = { shield: IconShield, grid: IconGrid, sliders: IconSliders }

function Tile({ tile, side }) {
  const Glyph = TILE_GLYPHS[tile.id]
  const planned = tile.status === 'Planned'

  return (
    <div className={`integration-tile integration-tile--${side} relative rounded-2xl border border-line bg-canvas-2 p-4`}>
      <span className="connector" aria-hidden="true" />
      <div className="flex items-center gap-3">
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${TILE_BG[tile.id]}`}>
          <Glyph size={20} />
        </span>
        <div className="min-w-0">
          <div className="truncate text-[0.98rem] font-semibold tracking-tight text-ink">
            {tile.title}
          </div>
          <span
            className={`mt-1.5 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[0.72rem] font-medium ${
              planned ? 'bg-accent text-ink' : 'bg-canvas-3 text-muted'
            }`}
          >
            <i
              className={`h-1.5 w-1.5 rounded-full ${planned ? 'bg-accent-2' : 'bg-muted-2'}`}
              aria-hidden="true"
            />
            {tile.status}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function Integrations() {
  return (
    <section id="integrations" className="overflow-hidden py-20 sm:py-24">
      <div className="shell">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Integrations</p>
          <h2 className="display mt-4 text-[clamp(2.05rem,4.6vw,3.35rem)]">
            Your channels, in one clear runway.
          </h2>
          <p className="lede mx-auto mt-4 max-w-[46ch] text-[1.05rem]">
            Connect supported accounts through official authorization, then plan
            channel-specific content from one workspace.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)_minmax(0,1fr)] lg:items-center lg:gap-7">
          <div className="order-2 grid gap-5 lg:order-1">
            <Tile tile={integrationTiles[0]} side="left" />
            <Tile tile={integrationTiles[1]} side="left" />
          </div>

          <div className="order-1 lg:order-2">
            <MockCalendarMonth />
          </div>

          <div className="order-3 grid gap-5">
            <Tile tile={integrationTiles[2]} side="right" />
            <Tile tile={integrationTiles[3]} side="right" />
          </div>
        </Reveal>

        <p className="mt-5 text-center text-[0.82rem] text-muted-2">
          Generic channel types — Runway does not name a platform until its official API
          access has been reviewed.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {integrationCards.map((card, index) => {
            const Icon = CARD_ICONS[card.icon]
            return (
              <Reveal
                as="article"
                key={card.title}
                delay={index * 90}
                className="rounded-[20px] border border-line bg-canvas-2 p-6"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent">
                  <Icon size={20} />
                </span>
                <h3 className="display mt-5 text-[1.35rem]">{card.title}</h3>
                <p className="lede mt-3 text-[0.95rem]">{card.body}</p>
              </Reveal>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 border-b border-ink pb-1 text-[1rem] font-medium text-ink transition-opacity duration-200 hover:opacity-70"
          >
            Explore the workflow
            <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>
  )
}
