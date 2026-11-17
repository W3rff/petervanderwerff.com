import { describe, expect, it } from 'vitest';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import App from '~/app.vue';

describe('app.vue', () => {
  it('wraps the page in the app-shell container', async () => {
    const wrapper = await mountSuspended(App);

    expect(wrapper.find('.app-shell').exists()).toBe(true);
  });
});
