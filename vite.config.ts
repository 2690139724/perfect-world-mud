import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/src/data/')) {
            if (id.includes('blueprints/') || id.includes('BlueprintDB')) return 'data-blueprints';
            if (id.includes('items/') || id.includes('item_data') || id.includes('/seed/items')) return 'data-items';
            if (id.includes('methods/') || id.includes('techniques') || id.includes('talents/')) return 'data-cultivation';
            if (id.includes('npc_data_zhetian')) return 'npc-zhetian';
            if (id.includes('npc_data_shengxu')) return 'npc-shengxu';
            if (id.includes('npc_data_doupo')) return 'npc-doupo';
            if (id.includes('npc_data_shenmu')) return 'npc-shenmu';
            if (id.includes('npc_data_fanren')) return 'npc-fanren';
            if (id.includes('npc_data_xianni')) return 'npc-xianni';
            if (id.includes('npcs/') || id.includes('monsters/')) return 'data-world-base';
            if (id.includes('maps/map_data_')) return 'data-maps';
            if (id.includes('quests/')) return 'data-quests';
            if (id.includes('sects/')) return 'data-sects';
            if (id.includes('storylines/')) return 'data-storylines';
            return 'data-misc';
          }

          if (id.includes('BreakthroughService')) return 'svc-breakthrough';
          if (id.includes('SceneGenerator')) return 'svc-scene';
          if (id.includes('QuestManager')) return 'svc-quest';
          if (id.includes('HiddenStorylineService')) return 'svc-storyline';
          if (id.includes('AscensionService')) return 'svc-ascension';
          if (id.includes('OriginSystem')) return 'svc-origin';

          if (id.includes('SaveManager')) return 'svc-save';

          if (id.includes('Renderer') || id.includes('ModalManager')) return 'ui-renderer';

          if (id.includes('electron') || id.includes('main.js')) return 'electron-main';
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  optimizeDeps: {
    exclude: [],
  },
});
