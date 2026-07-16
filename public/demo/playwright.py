#!/usr/bin/env python3
"""
TheFarm.com — narrated product demo (Playwright).

Drives a real browser through every major feature of the app and pauses on
each beat long enough for the matching narration in `cues.json` to be read.
A caption overlay (the cue's `caption`) is burned onto the page, so the
recording is self-explanatory even without a voiceover.

Features demonstrated
  1. Landing page  — hero, feature grid, "how it works", for-brands / OAuth,
     final call-to-action.
  2. Auth          — the login screen, real social-login buttons + the
     "not configured yet" modal, and email/password sign-in.
  3. The Field     — the main feed: image-grid posts, an inline video player,
     the trending / suggested-brands sidebar.
  4. Composing     — writing and planting a new post (lands at the top).
  5. Watering      — the "like" gesture, with an optimistic count bump.
  6. Trust & legal — the wellness disclaimer / legal suite.

Setup (one time)
    pip install playwright
    playwright install chromium

Run (dev server must be up:  npm run dev)
    python public/demo/playwright.py

Environment knobs
    BASE_URL   default http://localhost:3000
    HEADLESS   "1" to hide the browser (default "0" — watch it live)
    VIDEO      "1" (default) to save a .webm recording under public/demo/video/
    CAPTIONS   "1" (default) to burn cue captions onto the page
    SPEED      global pace multiplier for the `hold` values (default 1.0)
"""

import json
import os
import sys
import time
from pathlib import Path

# This file is literally named `playwright.py`, so its own directory (which
# Python puts on sys.path[0] when the script is run directly) shadows the real
# `playwright` package. Drop that directory before importing the package.
_SELF_DIR = str(Path(__file__).resolve().parent)
sys.path[:] = [p for p in sys.path if p not in ("", ".", _SELF_DIR)]

try:
    from playwright.sync_api import TimeoutError as PWTimeout
    from playwright.sync_api import sync_playwright
except ImportError:
    sys.exit(
        "Playwright is not installed.\n"
        "  pip install playwright && playwright install chromium\n"
    )

HERE = Path(__file__).resolve().parent
CUES_PATH = HERE / "cues.json"
VIDEO_DIR = HERE / "video"

BASE_URL = os.environ.get("BASE_URL", "http://localhost:3000").rstrip("/")
HEADLESS = os.environ.get("HEADLESS", "0") == "1"
RECORD = os.environ.get("VIDEO", "1") == "1"
CAPTIONS = os.environ.get("CAPTIONS", "1") == "1"
SPEED = float(os.environ.get("SPEED", "1.0"))

DEMO = json.loads(CUES_PATH.read_text())
META = DEMO["meta"]
CUES = {c["id"]: c for c in DEMO["cues"]}
VIEWPORT = META.get("viewport", {"width": 1440, "height": 900})

# Demo login — any valid email + a 6-char password is accepted (see lib/auth.js).
DEMO_EMAIL = "grower@thefarm.com"
DEMO_PASSWORD = "harvest"


# --------------------------------------------------------------------------- #
# Small helpers
# --------------------------------------------------------------------------- #
def log(msg):
    print(f"  {msg}", flush=True)


def sleep(seconds):
    time.sleep(seconds * SPEED)


def show_caption(page, cue):
    """Burn the cue's caption + section chip onto the page as a fixed overlay."""
    if not CAPTIONS:
        return
    section = cue.get("section", "")
    caption = cue.get("caption", "")
    page.evaluate(
        """([section, caption]) => {
            let el = document.getElementById('__demo_caption__');
            if (!el) {
                el = document.createElement('div');
                el.id = '__demo_caption__';
                el.style.cssText = [
                    'position:fixed', 'left:50%', 'bottom:36px',
                    'transform:translateX(-50%)', 'z-index:2147483647',
                    'max-width:min(900px,90vw)', 'pointer-events:none',
                    'display:flex', 'flex-direction:column', 'align-items:center',
                    'gap:10px', 'text-align:center',
                    "font-family:'Inter',system-ui,-apple-system,sans-serif",
                    'transition:opacity .35s ease', 'opacity:0'
                ].join(';');
                el.innerHTML =
                    '<span id="__demo_chip__" style="' + [
                        'font-size:12px','font-weight:700','letter-spacing:.08em',
                        'text-transform:uppercase','color:#dcfce7',
                        'background:rgba(22,101,52,.92)','padding:5px 12px',
                        'border-radius:999px','box-shadow:0 6px 20px rgba(0,0,0,.25)'
                    ].join(';') + '"></span>' +
                    '<span id="__demo_text__" style="' + [
                        'font-size:24px','font-weight:800','line-height:1.3',
                        'color:#fff','background:rgba(41,37,36,.9)',
                        'padding:14px 22px','border-radius:16px',
                        'box-shadow:0 10px 34px rgba(0,0,0,.35)',
                        '-webkit-font-smoothing:antialiased'
                    ].join(';') + '"></span>';
                document.body.appendChild(el);
            }
            el.querySelector('#__demo_chip__').textContent = section;
            el.querySelector('#__demo_text__').textContent = caption;
            requestAnimationFrame(() => { el.style.opacity = '1'; });
        }""",
        [section, caption],
    )


def narrate(page, cue_id, hold_override=None):
    """Look up a cue, show its caption, log narration, and hold for the beat."""
    cue = CUES[cue_id]
    # htmlfilm driver mode: drop a narration beat so --skeleton can time it and
    # the voiceover lands here. On a plain Playwright Page (standalone run) the
    # page has no .mark(), so this is a no-op.
    if hasattr(page, "mark"):
        page.mark(cue_id)
    show_caption(page, cue)
    log(f"[{cue['section']}] {cue['narration']}")
    sleep(hold_override if hold_override is not None else cue.get("hold", 5))


def smooth_scroll_to(page, selector=None, y=None, steps=26, pause=0.03):
    """Ease-scroll to a locator (CSS or text= selector) or an absolute y."""
    if selector is not None:
        loc = page.locator(selector).first
        try:
            loc.wait_for(state="attached", timeout=5000)
            target = loc.evaluate(
                """(el) => {
                    const r = el.getBoundingClientRect();
                    return window.scrollY + r.top - (window.innerHeight/2 - r.height/2);
                }"""
            )
        except Exception:
            return
    else:
        target = y if y is not None else 0

    start = page.evaluate("window.scrollY")
    target = max(0, target)
    for i in range(1, steps + 1):
        t = i / steps
        ease = 1 - (1 - t) ** 3  # easeOutCubic
        page.evaluate("(y) => window.scrollTo(0, y)", start + (target - start) * ease)
        sleep(pause)


def safe(fn, label):
    """Run a demo step; log and continue if a selector isn't found."""
    try:
        fn()
        return True
    except PWTimeout:
        log(f"! timed out during: {label} (skipping)")
    except Exception as exc:  # keep the demo rolling
        log(f"! skipped {label}: {exc}")
    return False


# --------------------------------------------------------------------------- #
# Demo sections
# --------------------------------------------------------------------------- #
def act_landing(page):
    log("→ Landing page")
    page.goto(f"{BASE_URL}/", wait_until="networkidle")
    page.wait_for_selector("text=takes root")
    narrate(page, "intro")
    narrate(page, "hero")

    def features():
        smooth_scroll_to(page, "#features")
        narrate(page, "features")

    def how():
        smooth_scroll_to(page, "text=From seed to sale, in the open")
        narrate(page, "how-it-works")

    def brands():
        smooth_scroll_to(page, "#brands")
        narrate(page, "for-brands")

    def cta():
        smooth_scroll_to(page, "text=Ready to put down roots?")
        narrate(page, "final-cta")

    safe(features, "features section")
    safe(how, "how-it-works section")
    safe(brands, "for-brands / OAuth section")
    safe(cta, "final CTA")


def act_auth(page):
    log("→ Auth")
    page.goto(f"{BASE_URL}/login", wait_until="networkidle")
    page.wait_for_selector("#email")
    narrate(page, "login")

    # Real social buttons — click Google to reveal the "not configured" modal.
    def social():
        page.get_by_role("button", name="Continue with Google").click()
        page.wait_for_selector('[role="dialog"]')
        narrate(page, "social-modal")
        page.get_by_role("button", name="Got it").click()
        page.wait_for_selector('[role="dialog"]', state="detached")

    safe(social, "social-login modal")

    # Email / password sign-in.
    def email_login():
        if hasattr(page, "mark"): page.mark("email-login")
        show_caption(page, CUES["email-login"])
        log(f"[Auth] {CUES['email-login']['narration']}")
        page.fill("#email", DEMO_EMAIL)
        sleep(0.6)
        page.fill("#password", DEMO_PASSWORD)
        sleep(CUES["email-login"].get("hold", 6) - 1.0)
        page.get_by_role("button", name="Log in").click()
        page.wait_for_url("**/feed", timeout=15000)

    safe(email_login, "email sign-in")


def act_feed(page):
    log("→ The Field (feed)")
    if "/feed" not in page.url:
        page.goto(f"{BASE_URL}/feed", wait_until="networkidle")
    page.wait_for_selector("text=The Field")
    page.wait_for_selector("article")
    narrate(page, "feed-intro")

    def images():
        # First seed post carries a two-photo image grid.
        smooth_scroll_to(page, "article img")
        narrate(page, "feed-images")

    def video():
        smooth_scroll_to(page, "article video")
        safe(lambda: page.evaluate(
            "() => { const v = document.querySelector('article video');"
            " if (v) { v.muted = true; v.play().catch(()=>{}); } }"
        ), "play inline video")
        narrate(page, "feed-video")

    def sidebar():
        smooth_scroll_to(page, "text=Growing now")
        narrate(page, "sidebar")

    safe(images, "image-grid post")
    safe(video, "inline video post")
    safe(sidebar, "trending sidebar")


def act_compose(page):
    log("→ Compose + plant a post")

    def compose():
        smooth_scroll_to(page, "textarea", steps=18)
        if hasattr(page, "mark"): page.mark("compose")
        show_caption(page, CUES["compose"])
        log(f"[The Field] {CUES['compose']['narration']}")
        box = page.locator("textarea").first
        box.click()
        message = (
            "First harvest of the season is in 🌾 Sun-cured, single-origin, "
            "and the COA is already up. Radical transparency, one post at a time. "
            "#regenerative #transparency"
        )
        box.type(message, delay=28)
        sleep(1.5)
        page.get_by_role("button", name="Plant post").click()

    def planted():
        # New post is prepended — wait for our text to show up in the feed.
        page.wait_for_selector("article:has-text('First harvest of the season')")
        smooth_scroll_to(page, "text=First harvest of the season", steps=16)
        narrate(page, "planted")

    safe(compose, "composer")
    safe(planted, "planted post at top of feed")


def act_water(page):
    log("→ Water a post")

    def water():
        # The button's accessible name is its count text, so target the title attr.
        # Water a seed post (not our freshly-planted 0-count one) for a nicer bump.
        buttons = page.locator('button[title="Water this post"]')
        btn = buttons.nth(1) if buttons.count() > 1 else buttons.first
        btn.scroll_into_view_if_needed()
        if hasattr(page, "mark"): page.mark("water")
        show_caption(page, CUES["water"])
        log(f"[The Field] {CUES['water']['narration']}")
        before = " ".join(btn.inner_text().split())
        btn.click()
        # Poll (real time, independent of SPEED) until the optimistic count lands.
        after = before
        for _ in range(30):
            time.sleep(0.1)
            after = " ".join(btn.inner_text().split())
            if after != before:
                break
        log(f"  water count: {before!r} -> {after!r}")
        sleep(CUES["water"].get("hold", 5.5) - 1.2)

    safe(water, "water a post")


def act_legal(page):
    log("→ Wellness disclaimer / legal suite")
    page.goto(f"{BASE_URL}/legal/disclaimer", wait_until="networkidle")
    sleep(0.8)
    narrate(page, "disclaimer")
    safe(lambda: smooth_scroll_to(page, y=650, steps=22), "scroll disclaimer")


def act_outro(page):
    log("→ Outro + sign out")
    page.goto(f"{BASE_URL}/", wait_until="networkidle")
    page.wait_for_selector("text=takes root")
    smooth_scroll_to(page, y=0, steps=14)
    narrate(page, "outro")
    # Sign out to leave the app in a clean state for the next run.
    safe(
        lambda: page.get_by_role("button", name="Sign out").click(timeout=4000),
        "sign out",
    )
    sleep(1.0)


# --------------------------------------------------------------------------- #
# htmlfilm driver entry point
# --------------------------------------------------------------------------- #
def run(page):
    """Entry point for htmlfilm's --playwright scripted mode.

    htmlfilm opens the page (its --url) and records the playthrough itself,
    mixing in music/voiceover — so unlike main() we don't launch a browser or
    record video here, we just walk the product on the page htmlfilm hands us.
    The target is taken from that page's URL, so `htmlfilm --url <site>` drives
    whichever deployment you point at (guest-only steps self-skip via safe()).
    """
    global BASE_URL
    try:
        from urllib.parse import urlparse
        u = urlparse(page.url)
        if u.scheme and u.netloc:
            BASE_URL = f"{u.scheme}://{u.netloc}"
    except Exception:
        pass
    log(f"htmlfilm driver — base: {BASE_URL}")
    act_landing(page)
    act_auth(page)
    act_feed(page)
    act_compose(page)
    act_water(page)
    act_legal(page)
    act_outro(page)


# --------------------------------------------------------------------------- #
# Main
# --------------------------------------------------------------------------- #
def main():
    total_hold = sum(c.get("hold", 0) for c in DEMO["cues"])
    print(f"\n🌱  {META['title']}")
    print(f"    “{META['tagline']}”")
    print(f"    base: {BASE_URL}   headless: {HEADLESS}   record: {RECORD}")
    print(f"    narration beats: {len(CUES)}   ≈ {total_hold * SPEED:.0f}s\n")

    if RECORD:
        VIDEO_DIR.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=HEADLESS, args=["--autoplay-policy=no-user-gesture-required"])
        context = browser.new_context(
            viewport=VIEWPORT,
            record_video_dir=str(VIDEO_DIR) if RECORD else None,
            record_video_size=VIEWPORT if RECORD else None,
        )
        page = context.new_page()
        page.set_default_timeout(12000)

        try:
            act_landing(page)
            act_auth(page)
            act_feed(page)
            act_compose(page)
            act_water(page)
            act_legal(page)
            act_outro(page)
        except Exception as exc:
            log(f"! demo aborted: {exc}")
        finally:
            video = page.video
            context.close()  # flush the recording
            browser.close()
            if RECORD and video:
                try:
                    saved = Path(video.path())
                    print(f"\n🎬  Recording saved: {saved}")
                except Exception:
                    print(f"\n🎬  Recording saved under: {VIDEO_DIR}")
            print("✅  Demo complete.\n")


if __name__ == "__main__":
    main()
