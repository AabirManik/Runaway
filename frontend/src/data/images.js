/**
 * Optimised landing imagery.
 * Source PNGs live untouched in design/assets/landing/.
 * These WebP derivatives are what actually ships (≈97% smaller).
 */
import heroPortrait from '../assets/img/hero-portrait.webp'
import paperPlane from '../assets/img/paper-plane.webp'
import media01 from '../assets/img/media-01.webp'
import media02 from '../assets/img/media-02.webp'
import media03 from '../assets/img/media-03.webp'
import media04 from '../assets/img/media-04.webp'
import media05 from '../assets/img/media-05.webp'
import media06 from '../assets/img/media-06.webp'
import media07 from '../assets/img/media-07.webp'
import media08 from '../assets/img/media-08.webp'

export { heroPortrait, paperPlane }

export const mediaImages = [
  media01,
  media02,
  media03,
  media04,
  media05,
  media06,
  media07,
  media08,
]

export const mediaAlt = [
  'Ceramic mug and leaves in warm daylight',
  'Coastal town above a blue sea',
  'Dried palm leaves in sunlight',
  'Potted plant with dappled shadow',
  'Mediterranean coastline from above',
  'Branches in bright sunlight',
  'Sunlit chair beside a plant',
  'Broad leaves against a pale wall',
]

export function mediaAt(index) {
  const i = ((index % mediaImages.length) + mediaImages.length) % mediaImages.length
  return { src: mediaImages[i], alt: mediaAlt[i] }
}
