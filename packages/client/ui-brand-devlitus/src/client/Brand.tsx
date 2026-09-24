import { useId } from 'react'
import type { HeroBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-conversation/client'
import type { SidebarBrandMarkOwnerProps } from '@deepseek-ai/dsh-client-ui-sidebar/client'

type DevlitusBrandMarkProps = HeroBrandMarkOwnerProps & SidebarBrandMarkOwnerProps

/** Top gradient stop of the tile (violet). */
const TILE_FROM = '#4C1D95'
/** Bottom gradient stop of the tile (pink). */
const TILE_TO = '#DB2777'
/** Fill of the four-point spark. */
const SPARK = '#FBBF24'
/** Four-point spark polygon centered at (17.76, 6.24) in the 24x24 mark grid. */
const SPARK_POINTS = '17.76,2.64 18.77,5.23 21.36,6.24 18.77,7.25 17.76,9.84 16.75,7.25 14.16,6.24 16.75,5.23'

/**
 * Build the standalone mark SVG markup for the browser tab icon.
 * @returns the mark as a self-contained SVG document string.
 */
export function devlitusMarkSvg(): string {
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">'
    + `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${TILE_FROM}"/><stop offset="1" stop-color="${TILE_TO}"/></linearGradient></defs>`
    + '<rect x="0.75" y="0.75" width="22.5" height="22.5" rx="5.3" fill="url(#g)"/>'
    + '<g fill="none" stroke="#fff" stroke-width="2.88" stroke-linecap="round"><circle cx="9.12" cy="15.36" r="4.32"/><path d="M13.44 7.2V19.68"/></g>'
    + `<polygon points="${SPARK_POINTS}" fill="${SPARK}"/>`
    + '</svg>'
}

/**
 * Render the devlitus mark: a violet-to-pink tile with a lowercase "d" and an amber spark.
 * @param props - Host-supplied mark presentation.
 * @returns the square mark SVG, `size` pixels on each side.
 */
export function DevlitusBrandMark({ size, className }: DevlitusBrandMarkProps) {
  const gradientId = useId()
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={TILE_FROM} />
          <stop offset="1" stopColor={TILE_TO} />
        </linearGradient>
      </defs>
      <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="5.3" fill={`url(#${gradientId})`} />
      <g fill="none" stroke="#fff" strokeWidth="2.88" strokeLinecap="round">
        <circle cx="9.12" cy="15.36" r="4.32" />
        <path d="M13.44 7.2V19.68" />
      </g>
      <polygon points={SPARK_POINTS} fill={SPARK} />
    </svg>
  )
}

/**
 * Render the devlitus name text; typography comes from the sidebar name container.
 * @returns the name text.
 */
export function DevlitusBrandName() {
  return <span style={{ whiteSpace: 'nowrap' }}>devlitus</span>
}
