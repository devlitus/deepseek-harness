/** devlitus occupants for the generic browser-brand slots and the document tab icon. */
import type { ClientContext } from '@deepseek-ai/dsh-client-runtime/client'
import type {} from '@deepseek-ai/dsh-client-ui-conversation/client'
import type {} from '@deepseek-ai/dsh-client-ui-sidebar/client'
import { DevlitusBrandMark, DevlitusBrandName, devlitusMarkSvg } from './Brand.tsx'

/** Required service: the UI slot registry. */
export const inject = ['slots']

/**
 * Point the document's icon link at the devlitus mark.
 * @returns a disposer that restores the previous icon link attributes, or removes the link it created.
 */
function replaceTabIcon(): () => void {
  const existing = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
  const link = existing ?? document.head.appendChild(Object.assign(document.createElement('link'), { rel: 'icon' }))
  const previous = { href: link.getAttribute('href'), type: link.getAttribute('type') }
  link.type = 'image/svg+xml'
  link.href = `data:image/svg+xml,${encodeURIComponent(devlitusMarkSvg())}`
  return () => {
    if (existing === null) {
      link.remove()
      return
    }
    for (const [attribute, value] of Object.entries(previous)) {
      if (value === null) link.removeAttribute(attribute)
      else link.setAttribute(attribute, value)
    }
  }
}

/**
 * Fill every shipped brand slot as one declaration-aware registration set and
 * replace the tab icon, only in the `devlitus` client build profile.
 * @param ctx - Client root context.
 */
export function apply(ctx: ClientContext): void {
  if (process.env.DSH_CLIENT_BUILD_PROFILE !== 'devlitus') return
  ctx.effect(replaceTabIcon)
  ctx.slots.inject('sidebar.brand.mark', () =>
    ctx.slots.inject('sidebar.brand.name', () =>
      ctx.slots.inject('conversation.hero.brand.mark', function* () {
        yield ctx.slots.register({ name: 'sidebar.brand.mark' }, DevlitusBrandMark)
        yield ctx.slots.register({ name: 'sidebar.brand.name' }, DevlitusBrandName)
        yield ctx.slots.register({ name: 'conversation.hero.brand.mark' }, DevlitusBrandMark)
      })))
}
