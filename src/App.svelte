<script>
  import { fade } from "svelte/transition";
  import { windowStore } from "./lib/stores/windowStore";

  // Controllers
  import { WindowController } from "./controllers/WindowController";
  import { ThemeController } from "./controllers/ThemeController";

  // Models
  import { dockApps, appConfig } from "./models/AppData";

  // OS Components (Views)
  import MenuBar from "./views/os/MenuBar.svelte";
  import Dock from "./views/os/Dock.svelte";
  import Window from "./views/os/Window.svelte";
  import Widget from "./views/os/Widget.svelte";
  import SplashScreen from "./views/os/SplashScreen.svelte";
  import BootScreen from "./views/os/BootScreen.svelte";
  import ControlCenter from "./views/os/ControlCenter.svelte";
  import SplashCursor from "./views/components/SplashCursor.svelte";

  let splashComplete = false;
  let booted = false;
  let controlCenterVisible = false;

  // Initialize theme on mount
  ThemeController.initTheme();

  function handleSplashStart() {
    splashComplete = true;
  }

  function handleBootComplete() {
    booted = true;
    // Open Welcome window after boot
    setTimeout(() => {
      const welcomeApp = dockApps.find((app) => app.id === "welcome");
      if (welcomeApp) {
        WindowController.openApp(welcomeApp);
      }
    }, 500);
  }

  function toggleControlCenter(event) {
    // Prevent the click from propagating to the global handler immediately
    if (event) event.stopPropagation();
    controlCenterVisible = !controlCenterVisible;
  }

  function closeControlCenter() {
    controlCenterVisible = false;
  }

  // Handle click outside - using window to catch all clicks
  function handleGlobalClick(e) {
    // If control center is visible
    if (controlCenterVisible) {
      const target = e.target;
      // Check if click is outside control center AND outside the toggle button
      if (
        !target.closest(".control-center") &&
        !target.closest(".control-center-toggle")
      ) {
        closeControlCenter();
      }
    }
  }
</script>

<svelte:window on:click={handleGlobalClick} />

<main class="desktop">
  {#if !splashComplete}
    <SplashScreen on:start={handleSplashStart} />
  {:else if !booted}
    <BootScreen on:complete={handleBootComplete} />
  {:else}
    <div class="wallpaper" in:fade={{ duration: 1000 }}></div>

    <SplashCursor />

    <Widget />

    <MenuBar on:toggleControlCenter={toggleControlCenter} />
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

    <Dock apps={dockApps} />
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
