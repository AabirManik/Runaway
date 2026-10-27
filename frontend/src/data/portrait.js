/**
 * Measured geometry of `design/assets/landing/hero-portrait.png`.
 *
 * The file's canvas is 1024x1536 but the subject does not fill it:
 *   - rows 0..203 are fully transparent (13.28% of the height) — that empty
 *     band is what made her read as "too small and too low";
 *   - from row 1040 her right shoulder reaches x=1023, the canvas edge, so
 *     anything shown below that is sliced vertically by the photo itself.
 *
 * SILHOUETTE samples the visible subject from row 204 to row 1010 as pairs of
 * [left, right] edges expressed as a fraction of the image width. The hero
 * uses it to land the orbit connectors exactly on her outline instead of on
 * the (much larger) bounding box.
 */
export const SUBJECT_TOP = 204
export const SUBJECT_BOTTOM = 1010
export const CANVAS_HEIGHT = 1536

/** 204 / 1536 — how far the image has to be pulled up for her hair to sit on the stage top. */
export const TRANSPARENT_TOP = 204 / 1536

export const SILHOUETTE = [
  0.5, 0.5, 0.474, 0.587, 0.431, 0.65, 0.37, 0.683,
  0.353, 0.716, 0.313, 0.738, 0.307, 0.758, 0.267, 0.757,
  0.248, 0.76, 0.228, 0.804, 0.213, 0.814, 0.199, 0.823,
  0.187, 0.838, 0.162, 0.833, 0.139, 0.813, 0.129, 0.833,
  0.128, 0.843, 0.126, 0.841, 0.107, 0.839, 0.114, 0.827,
  0.125, 0.854, 0.101, 0.865, 0.089, 0.857, 0.082, 0.843,
  0.068, 0.843, 0.104, 0.878, 0.093, 0.801, 0.091, 0.813,
  0.065, 0.848, 0.065, 0.846, 0.081, 0.835, 0.058, 0.841,
  0.043, 0.94,
]

const SAMPLES = SILHOUETTE.length / 2

/** Silhouette edges at a canvas row, as a fraction of the image width. */
export function silhouetteAt(canvasRow) {
  const t = (canvasRow - SUBJECT_TOP) / (SUBJECT_BOTTOM - SUBJECT_TOP)
  const clamped = Math.min(1, Math.max(0, t))
  const pos = clamped * (SAMPLES - 1)
  const i = Math.min(SAMPLES - 2, Math.floor(pos))
  const f = pos - i
  const l = SILHOUETTE[i * 2] + (SILHOUETTE[(i + 1) * 2] - SILHOUETTE[i * 2]) * f
  const r = SILHOUETTE[i * 2 + 1] + (SILHOUETTE[(i + 1) * 2 + 1] - SILHOUETTE[i * 2 + 1]) * f
  return [l, r]
}

/**
 * Height of the visible stage as a share of the photograph's own height.
 *
 * The stage is always 0.7871 * pw tall and the image is always 1.5 * pw tall,
 * while the image is shifted up by 0.199219 * pw to cancel its transparent
 * top band. So the stage's bottom edge always falls at the same fraction of
 * the image no matter the breakpoint or portrait size:

     (0.7871 + 0.199219) / 1.5 = 0.65755

 * Used to fade her out exactly where the stage ends, rather than cutting her.
 */
export const STAGE_BOTTOM_IN_IMAGE = 0.65755
