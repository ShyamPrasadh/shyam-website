<script>
  import { fade } from "svelte/transition";
  import { windowStore } from "./lib/stores/windowStore";
  import MenuBar from "./lib/os/MenuBar.svelte";
  import Dock from "./lib/os/Dock.svelte";
  import Window from "./lib/os/Window.svelte";
  import Widget from "./lib/os/Widget.svelte";

  // Content Components
  import About from "./lib/About.svelte";
  import Experience from "./lib/Experience.svelte";
  import Portfolio from "./lib/Portfolio.svelte";
  import Contact from "./lib/Contact.svelte";
  import Hero from "./lib/Hero.svelte"; // Using Hero as "Welcome" app
  import Resume from "./lib/Resume.svelte";
  import SplashScreen from "./lib/os/SplashScreen.svelte";
  import BootScreen from "./lib/os/BootScreen.svelte";
  import ControlCenter from "./lib/os/ControlCenter.svelte";

  let splashComplete = false;
  let booted = false;
  let controlCenterVisible = false;

  function handleSplashStart() {
    splashComplete = true;
  }

  function handleBootComplete() {
    booted = true;
    // Open Welcome window after boot
    setTimeout(() => {
      windowStore.openWindow("welcome", "Welcome", Hero, {}, 200, 100);
    }, 500);
  }

  const apps = [
    {
      id: "about",
      title: "About Me",
      icon: import.meta.env.BASE_URL + "icons/finder.png",
      fallback: "👤",
      color: "#FF9F0A",
      component: About,
    },
    {
      id: "experience",
      title: "Journey",
      icon: "https://raw.githubusercontent.com/homarr-labs/dashboard-icons/main/png/apple-maps.png",
      fallback: "🎓",
      color: "#30D158",
      component: Experience,
    },
    {
      id: "portfolio",
      title: "Work",
      icon: import.meta.env.BASE_URL + "icons/work.png",
      fallback: "💼",
      color: "#0A84FF",
      component: Portfolio,
    },
    {
      id: "resume",
      title: "Resume",
      icon: "https://raw.githubusercontent.com/homarr-labs/dashboard-icons/main/png/apple-notes.png",
      fallback: "📄",
      color: "#FFD60A",
      component: Resume,
    },
    {
      id: "contact",
      title: "Messages",
      icon: "https://upload.wikimedia.org/wikipedia/commons/5/51/IMessage_logo.svg",
      fallback: "💬",
      color: "#34C759",
      component: Contact,
    },
    {
      id: "welcome",
      title: "Welcome",
      icon: "https://icon-icons.com/icons2/2506/PNG/512/launchpad_macos_bigsur_icon_150392.png",
      fallback: "👋",
      color: "#FF375F",
      component: Hero,
    },
  ];

  // Open Welcome window on mount - REMOVED, now handled by boot
  // import { onMount } from "svelte";
  // onMount(() => {
  //   windowStore.openWindow("welcome", "Welcome", Hero, {}, 200, 100);
  // });
</script>

<main class="desktop">
  {#if !splashComplete}
    <SplashScreen on:start={handleSplashStart} />
  {:else if !booted}
    <BootScreen on:complete={handleBootComplete} />
  {:else}
    <div class="wallpaper" in:fade={{ duration: 1000 }}></div>

    <Widget />

    <MenuBar
      on:toggleControlCenter={() =>
        (controlCenterVisible = !controlCenterVisible)}
    />
    <ControlCenter visible={controlCenterVisible} />

    <div class="windows-container">
      {#each $windowStore.windows as window (window.id)}
        <Window
          id={window.id}
          title={window.title}
          x={window.x}
          y={window.y}
          zIndex={window.zIndex}
          minimized={window.minimized}
          maximized={window.maximized}
          width={window.width}
          height={window.height}
        >
          <svelte:component this={window.component} {...window.props} />
        </Window>
      {/each}
    </div>

    <Dock {apps} />
  {/if}
</main>

<style>
  :global(body) {
    overflow: hidden; /* Prevent body scroll, desktop handles it */
  }

  .desktop {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
  }

  .wallpaper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("https://images.unsplash.com/photo-1621682372775-533449e5502d?q=80&w=2832&auto=format&fit=crop")
      no-repeat center center;
    background-size: cover;
    z-index: 0;
  }

  .windows-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
    pointer-events: none;
  }

  :global(.windows-container > *) {
    pointer-events: auto;
  }
</style>
